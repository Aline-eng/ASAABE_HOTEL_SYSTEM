from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from rooms.models import Room, RoomType, Amenity
from decimal import Decimal

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate database with sample hotel data'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')
        
        # Create room types
        room_types_data = [
            {'name': 'Standard Room', 'description': 'Comfortable standard accommodation'},
            {'name': 'Deluxe Room', 'description': 'Spacious room with premium amenities'},
            {'name': 'Suite', 'description': 'Luxurious suite with separate living area'},
            {'name': 'Presidential Suite', 'description': 'Ultimate luxury accommodation'},
        ]
        
        room_types = {}
        for rt_data in room_types_data:
            rt, created = RoomType.objects.get_or_create(
                name=rt_data['name'],
                defaults={'description': rt_data['description']}
            )
            room_types[rt.name] = rt
            if created:
                self.stdout.write(f'Created room type: {rt.name}')
        
        # Create amenities
        amenities_data = [
            {'name': 'WiFi', 'icon': 'wifi'},
            {'name': 'Air Conditioning', 'icon': 'ac_unit'},
            {'name': 'Television', 'icon': 'tv'},
            {'name': 'Minibar', 'icon': 'local_bar'},
            {'name': 'Safe', 'icon': 'security'},
            {'name': 'Room Service', 'icon': 'room_service'},
            {'name': 'Spa Access', 'icon': 'spa'},
            {'name': 'Gym Access', 'icon': 'fitness_center'},
        ]
        
        amenities = {}
        for am_data in amenities_data:
            am, created = Amenity.objects.get_or_create(
                name=am_data['name'],
                defaults={'icon': am_data['icon']}
            )
            amenities[am.name] = am
            if created:
                self.stdout.write(f'Created amenity: {am.name}')
        
        # Create sample rooms
        rooms_data = [
            {
                'title': 'Ocean View Standard',
                'room_number': '101',
                'room_type': 'Standard Room',
                'floor': 1,
                'price': Decimal('150.00'),
                'description': 'Beautiful ocean view standard room with modern amenities',
                'capacity': 2,
                'size': 25,
                'bed_type': 'Queen',
                'image_url': '/room1.jpg',
                'has_sea_view': True,
                'has_balcony': True,
                'is_featured': True,
            },
            {
                'title': 'City View Deluxe',
                'room_number': '201',
                'room_type': 'Deluxe Room',
                'floor': 2,
                'price': Decimal('250.00'),
                'description': 'Spacious deluxe room with stunning city views',
                'capacity': 3,
                'size': 35,
                'bed_type': 'King',
                'image_url': '/room2.jpg',
                'has_city_view': True,
                'has_balcony': True,
                'has_minibar': True,
                'is_featured': True,
            },
            {
                'title': 'Executive Suite',
                'room_number': '301',
                'room_type': 'Suite',
                'floor': 3,
                'price': Decimal('450.00'),
                'description': 'Luxurious suite with separate living area and premium amenities',
                'capacity': 4,
                'size': 60,
                'bed_type': 'King',
                'image_url': '/room3.jpg',
                'has_sea_view': True,
                'has_balcony': True,
                'has_minibar': True,
                'has_safe': True,
                'is_featured': True,
            },
            {
                'title': 'Standard Twin',
                'room_number': '102',
                'room_type': 'Standard Room',
                'floor': 1,
                'price': Decimal('120.00'),
                'description': 'Comfortable twin bed room perfect for business travelers',
                'capacity': 2,
                'size': 22,
                'bed_type': 'Twin',
                'image_url': '/room1.jpg',
            },
            {
                'title': 'Garden View Deluxe',
                'room_number': '202',
                'room_type': 'Deluxe Room',
                'floor': 2,
                'price': Decimal('220.00'),
                'description': 'Peaceful garden view deluxe room',
                'capacity': 2,
                'size': 32,
                'bed_type': 'Queen',
                'image_url': '/room2.jpg',
                'has_minibar': True,
            },
        ]
        
        for room_data in rooms_data:
            room_type_name = room_data.pop('room_type')
            room, created = Room.objects.get_or_create(
                room_number=room_data['room_number'],
                defaults={
                    **room_data,
                    'room_type': room_types[room_type_name]
                }
            )
            
            if created:
                # Add amenities to room
                if room.has_wifi:
                    room.amenities.add(amenities['WiFi'])
                if room.has_ac:
                    room.amenities.add(amenities['Air Conditioning'])
                if room.has_tv:
                    room.amenities.add(amenities['Television'])
                if room.has_minibar:
                    room.amenities.add(amenities['Minibar'])
                if room.has_safe:
                    room.amenities.add(amenities['Safe'])
                
                # Add premium amenities to suites
                if 'Suite' in room_type_name:
                    room.amenities.add(amenities['Room Service'])
                    room.amenities.add(amenities['Spa Access'])
                    room.amenities.add(amenities['Gym Access'])
                
                self.stdout.write(f'Created room: {room.room_number} - {room.title}')
        
        # Create admin user if doesn't exist
        if not User.objects.filter(email='admin@asaabe.com').exists():
            admin_user = User.objects.create_user(
                username='admin',
                email='admin@asaabe.com',
                password='admin123',
                first_name='Admin',
                last_name='User',
                role='admin',
                is_staff=True,
                is_superuser=True
            )
            self.stdout.write('Created admin user: admin@asaabe.com (password: admin123)')
        
        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))