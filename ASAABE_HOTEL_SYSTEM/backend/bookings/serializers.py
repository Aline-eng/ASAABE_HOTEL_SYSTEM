from rest_framework import serializers
from .models import Booking, BookingGuest
from rooms.serializers import RoomSerializer
from users.serializers import UserProfileSerializer

class BookingGuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingGuest
        fields = ['first_name', 'last_name', 'email', 'phone', 'id_number']

class BookingSerializer(serializers.ModelSerializer):
    guest_details = BookingGuestSerializer(many=True, required=False)
    room_details = RoomSerializer(source='room', read_only=True)
    user_details = UserProfileSerializer(source='user', read_only=True)
    nights = serializers.ReadOnlyField()
    
    class Meta:
        model = Booking
        fields = ['id', 'room', 'room_details', 'user', 'user_details', 'check_in', 'check_out', 
                 'guests', 'total_price', 'status', 'special_requests', 'booking_reference', 
                 'guest_details', 'nights', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'booking_reference', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        guest_details_data = validated_data.pop('guest_details', [])
        booking = Booking.objects.create(**validated_data)
        
        for guest_data in guest_details_data:
            BookingGuest.objects.create(booking=booking, **guest_data)
        
        return booking

class BookingCreateSerializer(serializers.ModelSerializer):
    guest_details = BookingGuestSerializer(many=True, required=False)
    
    class Meta:
        model = Booking
        fields = ['room', 'check_in', 'check_out', 'guests', 'special_requests', 'guest_details']
    
    def validate(self, attrs):
        check_in = attrs.get('check_in')
        check_out = attrs.get('check_out')
        room = attrs.get('room')
        
        if check_in >= check_out:
            raise serializers.ValidationError("Check-out date must be after check-in date")
        
        # Check room availability
        overlapping_bookings = Booking.objects.filter(
            room=room,
            status__in=['confirmed', 'checked_in'],
            check_in__lt=check_out,
            check_out__gt=check_in
        )
        
        if overlapping_bookings.exists():
            raise serializers.ValidationError("Room is not available for the selected dates")
        
        # Calculate total price
        nights = (check_out - check_in).days
        attrs['total_price'] = room.price * nights
        
        return attrs