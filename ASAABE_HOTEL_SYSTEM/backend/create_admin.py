#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'asaabe.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

if not User.objects.filter(email='admin@asaabe.com').exists():
    User.objects.create_superuser(
        username='admin',
        email='admin@asaabe.com',
        password='admin123',
        first_name='Admin',
        last_name='User'
    )
    print("Admin user created: admin@asaabe.com / admin123")
else:
    print("Admin user already exists")