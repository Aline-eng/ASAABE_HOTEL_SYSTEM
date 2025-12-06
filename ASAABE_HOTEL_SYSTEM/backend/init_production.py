import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'asaabe.settings')
django.setup()

from users.models import User
from rooms.models import Room

print("Starting initialization...")

# Create admin user
try:
    if not User.objects.filter(email='admin@asaabe.com').exists():
        admin = User.objects.create_user(
            email='admin@asaabe.com',
            username='admin',
            first_name='Admin',
            last_name='User',
            password='admin123',
            role='admin',
            is_staff=True,
            is_superuser=True
        )
        print("✓ Admin user created")
    else:
        print("✓ Admin user already exists")
except Exception as e:
    print(f"✗ Error creating admin: {e}")

# Create sample rooms
rooms_data = [
    {
        'title': 'Deluxe Sea View',
        'price': 120.00,
        'description': 'Spacious room with stunning sea views and modern amenities.',
        'image_url': '/room1.jpg',
        'capacity': 2,
        'bed_type': 'Queen'
    },
    {
        'title': 'Executive Suite',
        'price': 180.00,
        'description': 'Luxurious suite with separate living area and premium facilities.',
        'image_url': '/room2.jpg',
        'capacity': 4,
        'bed_type': 'King'
    },
    {
        'title': 'Standard Room',
        'price': 80.00,
        'description': 'Comfortable room with all essential amenities.',
        'image_url': '/room3.jpg',
        'capacity': 2,
        'bed_type': 'Double'
    }
]

for room_data in rooms_data:
    try:
        room, created = Room.objects.get_or_create(
            title=room_data['title'],
            defaults=room_data
        )
        if created:
            print(f"✓ Room '{room.title}' created")
        else:
            print(f"✓ Room '{room.title}' already exists")
    except Exception as e:
        print(f"✗ Error creating room: {e}")

print("Initialization complete!")
