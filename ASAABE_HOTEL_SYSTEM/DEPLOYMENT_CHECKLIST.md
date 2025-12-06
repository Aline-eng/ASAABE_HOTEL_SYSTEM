# ASAABE Hotel System - Deployment Checklist

## ✅ Pre-Deployment Verification

### Backend Checks
- [ ] Django server runs without errors: `python manage.py runserver`
- [ ] All migrations applied: `python manage.py migrate`
- [ ] Admin user exists: admin@asaabe.com / admin123
- [ ] Sample rooms populated in database
- [ ] API endpoints working:
  - [ ] POST /api/users/register/
  - [ ] POST /api/users/login/
  - [ ] GET /api/rooms/
  - [ ] POST /api/bookings/
  - [ ] GET /api/bookings/my_bookings/
  - [ ] GET /api/payments/
  - [ ] PATCH /api/bookings/{id}/update_status/
  - [ ] PATCH /api/payments/{id}/update_status/

### Frontend Checks
- [ ] Next.js dev server runs: `npm run dev`
- [ ] All pages load without errors:
  - [ ] Home (/)
  - [ ] Rooms (/rooms)
  - [ ] Login (/login)
  - [ ] Signup (/signup)
  - [ ] Bookings (/bookings)
  - [ ] Admin Dashboard (/admin-dashboard)
- [ ] Password visibility toggle works
- [ ] Password strength indicator works
- [ ] Sticky navbar works on scroll
- [ ] Footer displays correctly
- [ ] Notification menu works

### User Flow Tests
- [ ] **Registration**:
  - [ ] User can register with email, name, phone, password
  - [ ] Password strength indicator shows
  - [ ] User auto-logged in after registration
  - [ ] User data saved to database

- [ ] **Login**:
  - [ ] Customer login redirects to home
  - [ ] Admin login redirects to admin dashboard
  - [ ] Password visibility toggle works
  - [ ] Invalid credentials show error

- [ ] **Room Browsing**:
  - [ ] Rooms load from database
  - [ ] Search and filters work
  - [ ] Room cards display correctly

- [ ] **Booking Flow**:
  - [ ] User can select room and dates
  - [ ] Booking creates successfully
  - [ ] Payment record created
  - [ ] User redirected to My Bookings

- [ ] **My Bookings (Customer)**:
  - [ ] Shows only user's bookings
  - [ ] Displays booking status
  - [ ] Shows payment status
  - [ ] Updates when admin approves/denies

- [ ] **Admin Dashboard**:
  - [ ] Shows all bookings
  - [ ] Displays user credentials (name, email, phone)
  - [ ] Shows payment status
  - [ ] Can approve bookings (status → confirmed, payment → approved)
  - [ ] Can deny bookings (status → cancelled, payment → rejected)
  - [ ] Payment status updates correctly
  - [ ] Admin notes saved

### Security Checks
- [ ] JWT authentication working
- [ ] Users can only see their own bookings
- [ ] Admin-only endpoints protected
- [ ] CORS configured correctly
- [ ] Passwords hashed in database

### Database Checks
- [ ] Users table has data
- [ ] Rooms table has sample data
- [ ] Bookings table structure correct
- [ ] Payments table structure correct
- [ ] Foreign keys working

## 🚀 Deployment Steps

### Backend Deployment
1. Update settings.py:
   - Set DEBUG = False
   - Update ALLOWED_HOSTS
   - Configure production database
   - Set SECRET_KEY from environment
   - Configure static files

2. Collect static files:
   ```bash
   python manage.py collectstatic
   ```

3. Run migrations on production:
   ```bash
   python manage.py migrate
   ```

4. Create superuser:
   ```bash
   python manage.py createsuperuser
   ```

### Frontend Deployment
1. Update API URLs in:
   - pages/login.tsx
   - pages/signup.tsx
   - pages/rooms.tsx
   - pages/bookings.tsx
   - pages/admin-dashboard.tsx
   - src/components/BookingFlow.tsx

2. Build production:
   ```bash
   npm run build
   ```

3. Test production build:
   ```bash
   npm start
   ```

## 📝 Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com
DATABASE_URL=your-database-url
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## 🎯 Final Verification
- [ ] Test complete user journey from registration to booking
- [ ] Test admin approval/denial flow
- [ ] Verify payment status updates
- [ ] Check mobile responsiveness
- [ ] Test on different browsers
- [ ] Verify all links work
- [ ] Check error handling

## 📞 Support Information
- Hotel Location: NR11, Rubengeraa, Karongi, Kibuye, Rwanda
- Admin Email: admin@asaabe.com
- System Version: 1.0.0
