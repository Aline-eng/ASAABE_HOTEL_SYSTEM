import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'asaabe.settings')
django.setup()

from users.models import User
from rooms.models import Room
from bookings.models import Booking
from payments.models import Payment
from datetime import date, timedelta

# Create admin user
admin_user, created = User.objects.get_or_create(
    email='admin@asaabe.com',
    defaults={
        'username': 'admin',
        'first_name': 'Admin',
        'last_name': 'User',
        'role': 'admin',
        'is_staff': True,
        'is_superuser': True,
    }
)
if created:
    admin_user.set_password('admin123')
    admin_user.save()
    print("Admin user created")

# Create test customer
customer_user, created = User.objects.get_or_create(
    email='customer@test.com',
    defaults={
        'username': 'customer',
        'first_name': 'Test',
        'last_name': 'Customer',
        'role': 'customer',
    }
)
if created:
    customer_user.set_password('test123')
    customer_user.save()
    print("Customer user created")

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
    room, created = Room.objects.get_or_create(
        title=room_data['title'],
        defaults=room_data
    )
    if created:
        print(f"Room '{room.title}' created")

print("Sample data populated successfully!")