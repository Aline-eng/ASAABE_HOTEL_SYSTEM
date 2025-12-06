from rest_framework import serializers
from .models import Booking, BookingGuest
from rooms.serializers import RoomSerializer

class BookingGuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingGuest
        fields = '__all__'

class UserBasicSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phone = serializers.CharField()
    role = serializers.CharField()

class BookingSerializer(serializers.ModelSerializer):
    room_details = RoomSerializer(source='room', read_only=True)
    guest_details = BookingGuestSerializer(many=True, read_only=True)
    user = UserBasicSerializer(read_only=True)
    nights = serializers.ReadOnlyField()

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ('user', 'booking_reference', 'created_at', 'updated_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        booking = super().create(validated_data)
        return booking

class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('room', 'check_in', 'check_out', 'guests', 'special_requests')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        # Calculate total price based on room price and nights
        room = validated_data['room']
        nights = (validated_data['check_out'] - validated_data['check_in']).days
        validated_data['total_price'] = room.price * nights
        return super().create(validated_data)