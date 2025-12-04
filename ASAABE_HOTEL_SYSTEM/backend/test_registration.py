import os
import django
import requests
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'asaabe.settings')
django.setup()

# Test registration endpoint
url = 'http://localhost:8000/api/users/register/'
data = {
    'email': 'test@example.com',
    'first_name': 'Test',
    'last_name': 'User',
    'password': 'test123',
    'password_confirm': 'test123'
}

try:
    response = requests.post(url, json=data, headers={'Content-Type': 'application/json'})
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
    print("Make sure Django server is running on localhost:8000")