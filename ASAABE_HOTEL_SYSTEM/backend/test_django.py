#!/usr/bin/env python
import os
import sys
import django
from django.conf import settings

if __name__ == "__main__":
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'asaabe.settings')
    try:
        django.setup()
        print("Django setup successful!")
        
        # Test imports
        from users.models import User
        from rooms.models import Room, RoomType, Amenity
        from bookings.models import Booking
        from payments.models import Payment
        
        print("All models imported successfully!")
        
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)