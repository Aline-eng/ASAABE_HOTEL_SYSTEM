from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    tags = serializers.ReadOnlyField()
    
    class Meta:
        model = Room
        fields = ['id', 'title', 'price', 'description', 'image_url', 'capacity', 'bed_type', 'tags']