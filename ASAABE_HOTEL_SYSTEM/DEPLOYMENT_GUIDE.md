# 🚀 ASAABE Hotel System - Deployment Guide

## Railway (Backend) + Vercel (Frontend) - Free Plan

---

## 📋 Prerequisites

- GitHub account with your project pushed
- Railway account (sign up at railway.app)
- Vercel account (sign up at vercel.com)
- Project structure:
  ```
  ASAABE_HOTEL_SYSTEM/
  ├── backend/          # Django backend
  └── frontend/
      └── asaabe-frontend/  # Next.js frontend
  ```

---

## 🔧 PART 1: Prepare Backend for Deployment

### Step 1: Create Production Requirements File

Create `backend/requirements.txt` (if not exists):
```txt
Django==5.2.8
djangorestframework==3.15.2
djangorestframework-simplejwt==5.4.0
django-cors-headers==4.6.0
gunicorn==23.0.0
whitenoise==6.8.2
psycopg2-binary==2.9.10
dj-database-url==2.3.0
python-decouple==3.8
```

### Step 2: Update Django Settings

Edit `backend/asaabe/settings.py`:

```python
import os
from pathlib import Path
from datetime import timedelta
import dj_database_url
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY
SECRET_KEY = config('SECRET_KEY', default='django-insecure-f+)fetneiuxua1b0wgyphwfkpe#@(+r78pb^tni9&c@_wq=@v7')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1').split(',')

# Add Railway domain
RAILWAY_STATIC_URL = config('RAILWAY_STATIC_URL', default='')
if RAILWAY_STATIC_URL:
    ALLOWED_HOSTS.append(RAILWAY_STATIC_URL)

# INSTALLED APPS (keep existing)
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'users',
    'rooms',
    'bookings',
    'payments',
]

# MIDDLEWARE (keep existing, add whitenoise)
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# DATABASE
DATABASES = {
    'default': dj_database_url.config(
        default=f'sqlite:///{BASE_DIR / "db.sqlite3"}',
        conn_max_age=600
    )
}

# STATIC FILES
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# MEDIA FILES
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# CORS
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000'
).split(',')
CORS_ALLOW_CREDENTIALS = True

# Custom User Model
AUTH_USER_MODEL = 'users.User'

# REST Framework (keep existing)
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}

# JWT (keep existing)
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
}
```

### Step 3: Create Railway Configuration Files

Create `backend/railway.json`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn asaabe.wsgi:application",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

Create `backend/Procfile`:
```
web: gunicorn asaabe.wsgi:application --bind 0.0.0.0:$PORT
release: python manage.py migrate && python manage.py collectstatic --noinput
```

Create `backend/runtime.txt`:
```
python-3.13.1
```

### Step 4: Create Initialization Script

Create `backend/init_production.py`:
```python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'asaabe.settings')
django.setup()

from users.models import User
from rooms.models import Room

# Create admin user
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
    print("Admin user created")

# Create sample rooms
rooms_data = [
    {
        'title': 'Deluxe Sea View',
        'price': 120.00,
        'description': 'Spacious room with stunning sea views',
        'image_url': '/room1.jpg',
        'capacity': 2,
        'bed_type': 'Queen'
    },
    {
        'title': 'Executive Suite',
        'price': 180.00,
        'description': 'Luxurious suite with premium facilities',
        'image_url': '/room2.jpg',
        'capacity': 4,
        'bed_type': 'King'
    },
    {
        'title': 'Standard Room',
        'price': 80.00,
        'description': 'Comfortable room with essential amenities',
        'image_url': '/room3.jpg',
        'capacity': 2,
        'bed_type': 'Double'
    }
]

for room_data in rooms_data:
    Room.objects.get_or_create(title=room_data['title'], defaults=room_data)

print("Sample data initialized")
```

---

## 🚂 PART 2: Deploy Backend to Railway

### Step 1: Sign Up & Create Project

1. Go to https://railway.app
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub
5. Select your repository
6. Choose the `backend` folder as root directory

### Step 2: Add PostgreSQL Database

1. In your Railway project, click "+ New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically create a database
4. Copy the `DATABASE_URL` from the database service

### Step 3: Configure Environment Variables

In Railway project settings, add these variables:

```
SECRET_KEY=your-super-secret-key-here-change-this
DEBUG=False
ALLOWED_HOSTS=*.railway.app,localhost
DATABASE_URL=(automatically set by Railway)
CORS_ALLOWED_ORIGINS=http://localhost:3000
RAILWAY_STATIC_URL=your-app.railway.app
```

### Step 4: Configure Build Settings

1. Go to Settings → Build
2. Set Root Directory: `backend`
3. Set Build Command: `pip install -r requirements.txt`
4. Set Start Command: `gunicorn asaabe.wsgi:application --bind 0.0.0.0:$PORT`

### Step 5: Deploy & Initialize

1. Click "Deploy" - Railway will build and deploy
2. Once deployed, go to your service URL (e.g., `https://your-app.railway.app`)
3. Run initialization in Railway CLI or via Django admin:
   ```bash
   railway run python manage.py shell < init_production.py
   ```

### Step 6: Get Your Backend URL

- Your backend URL will be: `https://your-app-name.railway.app`
- Save this URL for frontend configuration

---

## 🔧 PART 3: Prepare Frontend for Deployment

### Step 1: Create Environment Variable File

Create `frontend/asaabe-frontend/.env.production`:
```
NEXT_PUBLIC_API_URL=https://your-app-name.railway.app
```

### Step 2: Update API Calls to Use Environment Variable

Create `frontend/asaabe-frontend/src/config/api.ts`:
```typescript
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
```

### Step 3: Update All API Calls

Replace all `http://localhost:8000` with `API_URL` in:

**pages/login.tsx:**
```typescript
import { API_URL } from '../src/config/api';

// Replace:
const response = await fetch('http://localhost:8000/api/users/login/', {
// With:
const response = await fetch(`${API_URL}/api/users/login/`, {
```

**pages/signup.tsx:**
```typescript
import { API_URL } from '../src/config/api';

const response = await fetch(`${API_URL}/api/users/register/`, {
```

**pages/rooms.tsx:**
```typescript
import { API_URL } from '../src/config/api';

const response = await fetch(`${API_URL}/api/rooms/`);
```

**pages/bookings.tsx:**
```typescript
import { API_URL } from '../src/config/api';

const response = await fetch(`${API_URL}/api/bookings/my_bookings/`, {
```

**pages/admin-dashboard.tsx:**
```typescript
import { API_URL } from '../src/config/api';

const response = await fetch(`${API_URL}/api/bookings/admin_bookings/`, {
```

**src/components/BookingFlow.tsx:**
```typescript
import { API_URL } from '../config/api';

const response = await fetch(`${API_URL}/api/bookings/`, {
```

### Step 4: Update Next.js Config

Edit `frontend/asaabe-frontend/next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
```

---

## ☁️ PART 4: Deploy Frontend to Vercel

### Step 1: Sign Up & Import Project

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the repository

### Step 2: Configure Project Settings

1. **Framework Preset:** Next.js
2. **Root Directory:** `frontend/asaabe-frontend`
3. **Build Command:** `npm run build`
4. **Output Directory:** `.next`
5. **Install Command:** `npm install`

### Step 3: Add Environment Variables

In Vercel project settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-app-name.railway.app
```

### Step 4: Deploy

1. Click "Deploy"
2. Vercel will build and deploy your frontend
3. You'll get a URL like: `https://your-project.vercel.app`

---

## 🔗 PART 5: Link Backend & Frontend

### Step 1: Update Railway CORS Settings

Go back to Railway → Your Backend Service → Variables:

Update `CORS_ALLOWED_ORIGINS`:
```
https://your-project.vercel.app,http://localhost:3000
```

Update `ALLOWED_HOSTS`:
```
*.railway.app,*.vercel.app,localhost
```

### Step 2: Redeploy Railway

Click "Redeploy" in Railway to apply new CORS settings

### Step 3: Test the Connection

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. Try to register a new user
3. Try to login
4. Check if rooms load from Railway backend

---

## ✅ PART 6: Post-Deployment Setup

### Step 1: Create Admin User (if not done)

In Railway CLI or Django admin:
```bash
railway run python manage.py createsuperuser
```

Or use the init_production.py script

### Step 2: Populate Sample Data

Run the initialization script:
```bash
railway run python manage.py shell < init_production.py
```

### Step 3: Test All Features

- [ ] User registration works
- [ ] User login works
- [ ] Rooms display from database
- [ ] Booking creation works
- [ ] Admin dashboard accessible
- [ ] Payment approval works

---

## 🎯 Quick Reference

### Your Deployed URLs

- **Frontend (Vercel):** `https://your-project.vercel.app`
- **Backend (Railway):** `https://your-app-name.railway.app`
- **Django Admin:** `https://your-app-name.railway.app/admin`

### Admin Credentials

- **Email:** admin@asaabe.com
- **Password:** admin123

### Important Commands

**Railway CLI:**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Run commands
railway run python manage.py migrate
railway run python manage.py createsuperuser
```

**Vercel CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Error:**
- Check DATABASE_URL in Railway variables
- Ensure PostgreSQL service is running

**Static Files Not Loading:**
- Run: `railway run python manage.py collectstatic --noinput`
- Check STATIC_ROOT and STATICFILES_STORAGE settings

**CORS Errors:**
- Verify CORS_ALLOWED_ORIGINS includes your Vercel URL
- Check ALLOWED_HOSTS includes both Railway and Vercel domains

### Frontend Issues

**API Connection Failed:**
- Verify NEXT_PUBLIC_API_URL is set correctly
- Check Railway backend is running
- Inspect browser console for exact error

**Build Fails:**
- Check all imports are correct
- Verify package.json dependencies
- Check Next.js version compatibility

---

## 💰 Free Plan Limits

### Railway Free Plan
- $5 credit per month
- 500 hours execution time
- 512MB RAM
- 1GB disk

### Vercel Free Plan
- 100GB bandwidth per month
- Unlimited deployments
- Automatic HTTPS
- Global CDN

---

## 🎉 Success!

Your ASAABE Hotel System is now live!

- Users can register and book rooms
- Admin can manage bookings and payments
- All data persists in PostgreSQL database
- Secure JWT authentication
- Professional production deployment

**Next Steps:**
1. Share your Vercel URL with users
2. Monitor Railway usage dashboard
3. Set up custom domain (optional)
4. Configure email notifications (optional)
5. Add analytics (optional)
