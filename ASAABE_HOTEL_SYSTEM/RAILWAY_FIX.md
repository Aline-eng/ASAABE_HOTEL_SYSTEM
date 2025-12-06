# 🔧 Railway Deployment Fix

## Current Issue
- Deployment crashes after few seconds
- Database tables not created automatically

## ✅ Solution Steps

### Step 1: Push Latest Changes

```bash
cd ASAABE_HOTEL_SYSTEM
git add .
git commit -m "Fix Railway deployment with proper startup script"
git push origin main
```

### Step 2: Railway Settings

In Railway dashboard:

1. **Go to your backend service**
2. **Settings → Variables** - Verify these exist:
   ```
   DATABASE_URL=(auto-set by Railway)
   SECRET_KEY=your-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=*.railway.app,localhost
   CORS_ALLOWED_ORIGINS=http://localhost:3000
   PORT=8000
   ```

3. **Settings → Deploy** - Set:
   - Root Directory: `backend`
   - Start Command: (leave empty, uses Procfile)

### Step 3: Redeploy

Click "Redeploy" and watch the logs

### Step 4: Run Migrations Manually

Once deployed (even if crashed), run:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
railway run python manage.py migrate

# Test database
railway run python test_db.py

# Initialize data
railway run python init_production.py
```

### Step 5: Check Logs

In Railway dashboard:
1. Click on your service
2. Go to "Deployments" tab
3. Click latest deployment
4. Check logs for errors

## 🔍 Common Issues & Fixes

### Issue: "No module named 'X'"
**Fix:** Add missing package to requirements.txt

### Issue: "relation does not exist"
**Fix:** Run migrations:
```bash
railway run python manage.py migrate
```

### Issue: "ALLOWED_HOSTS"
**Fix:** Add Railway domain to ALLOWED_HOSTS:
```
ALLOWED_HOSTS=*.railway.app,*.up.railway.app,localhost
```

### Issue: "Port already in use"
**Fix:** Railway sets PORT automatically, don't hardcode it

### Issue: Database connection timeout
**Fix:** 
1. Check PostgreSQL service is running (green status)
2. Verify DATABASE_URL is set
3. Check both services are in same project

## 📝 Manual Migration Commands

If automatic migrations fail, run these:

```bash
# Connect to Railway
railway link

# Make migrations
railway run python manage.py makemigrations

# Apply migrations
railway run python manage.py migrate

# Create superuser
railway run python manage.py createsuperuser

# Or use init script
railway run python init_production.py
```

## ✅ Verification

After deployment, test these URLs:

1. **Health Check:**
   ```
   https://your-app.up.railway.app/admin/
   ```
   Should show Django admin login

2. **API Test:**
   ```
   https://your-app.up.railway.app/api/rooms/
   ```
   Should return JSON (might be empty initially)

## 🎯 Expected Behavior

**Successful deployment shows:**
- ✓ Build completed
- ✓ Migrations applied
- ✓ Static files collected
- ✓ Gunicorn started
- ✓ Service status: Active (green)
- ✓ No crash loops

**Logs should show:**
```
Running migrations...
Operations to perform:
  Apply all migrations: admin, auth, bookings, contenttypes, payments, rooms, sessions, users
Running migrations:
  Applying contenttypes.0001_initial... OK
  ...
Collecting static files...
Starting Gunicorn...
[INFO] Listening at: http://0.0.0.0:8000
```

## 🚨 If Still Crashing

1. **Check Railway logs** for exact error
2. **Verify DATABASE_URL** is set correctly
3. **Test locally** with PostgreSQL:
   ```bash
   # Install PostgreSQL locally
   # Update .env with local DATABASE_URL
   python manage.py migrate
   python manage.py runserver
   ```

4. **Contact Railway Support** if issue persists

## 📞 Next Steps

Once backend is stable:
1. ✓ Note your Railway URL
2. ✓ Test all API endpoints
3. ✓ Run init_production.py
4. ✓ Proceed to frontend deployment
