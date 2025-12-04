from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.conf import settings
import stripe
from .models import Payment
from .serializers import PaymentSerializer, PaymentCreateSerializer
from bookings.models import Booking

stripe.api_key = settings.STRIPE_SECRET_KEY

class PaymentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return PaymentCreateSerializer
        return PaymentSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin' or user.role == 'staff':
            return Payment.objects.all()
        return Payment.objects.filter(booking__user=user)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_payment_intent(request):
    try:
        booking_id = request.data.get('booking_id')
        booking = Booking.objects.get(id=booking_id, user=request.user)
        
        # Create Stripe PaymentIntent
        intent = stripe.PaymentIntent.create(
            amount=int(booking.total_price * 100),  # Convert to cents
            currency='usd',
            metadata={
                'booking_id': booking.id,
                'user_id': request.user.id,
            }
        )
        
        # Create payment record
        payment = Payment.objects.create(
            booking=booking,
            amount=booking.total_price,
            method='stripe',
            status='pending',
            stripe_payment_intent_id=intent.id
        )
        
        return Response({
            'client_secret': intent.client_secret,
            'payment_id': payment.id
        })
    
    except Booking.DoesNotExist:
        return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def confirm_payment(request):
    try:
        payment_intent_id = request.data.get('payment_intent_id')
        
        # Retrieve PaymentIntent from Stripe
        intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        # Update payment status
        payment = Payment.objects.get(stripe_payment_intent_id=payment_intent_id)
        
        if intent.status == 'succeeded':
            payment.status = 'completed'
            payment.transaction_id = intent.id
            payment.booking.status = 'confirmed'
            payment.booking.save()
        else:
            payment.status = 'failed'
        
        payment.save()
        
        return Response({
            'status': payment.status,
            'booking_status': payment.booking.status
        })
    
    except Payment.DoesNotExist:
        return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)