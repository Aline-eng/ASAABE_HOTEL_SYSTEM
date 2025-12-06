import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'asaabe.settings')
django.setup()

from django.db import connection

try:
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
        print("✓ Database connection successful!")
        
    from django.contrib.auth import get_user_model
    User = get_user_model()
    print(f"✓ User model loaded: {User}")
    print(f"✓ Total users: {User.objects.count()}")
    
    from rooms.models import Room
    print(f"✓ Room model loaded: {Room}")
    print(f"✓ Total rooms: {Room.objects.count()}")
    
except Exception as e:
    print(f"✗ Error: {e}")
