from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Q
from .models import Room
from .serializers import RoomSerializer
from bookings.models import Booking

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['check_in'] = self.request.query_params.get('check_in')
        context['check_out'] = self.request.query_params.get('check_out')
        return context

    @action(detail=False, methods=['get'])
    def available(self, request):
        check_in = request.query_params.get('check_in')
        check_out = request.query_params.get('check_out')
        
        if not check_in or not check_out:
            rooms = Room.objects.all()
        else:
            # Get rooms that don't have overlapping bookings
            occupied_rooms = Booking.objects.filter(
                status__in=['confirmed', 'checked_in'],
                check_in__lt=check_out,
                check_out__gt=check_in
            ).values_list('room_id', flat=True)
            
            rooms = Room.objects.exclude(id__in=occupied_rooms)
        
        serializer = RoomSerializer(rooms, many=True, context=self.get_serializer_context())
        return Response(serializer.data)