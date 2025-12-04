from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    tags = serializers.ReadOnlyField()
    is_available = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = '__all__'

    def get_is_available(self, obj):
        # Check if room is available for given dates
        check_in = self.context.get('check_in')
        check_out = self.context.get('check_out')
        
        if not check_in or not check_out:
            return True
        
        from bookings.models import Booking
        overlapping_bookings = Booking.objects.filter(
            room=obj,
            status__in=['confirmed', 'checked_in'],
            check_in__lt=check_out,
            check_out__gt=check_in
        )
        
        return not overlapping_bookings.exists()