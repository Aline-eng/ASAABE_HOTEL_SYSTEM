# 🚀 Run Migrations on Railway - Simple Guide

## You run these commands on YOUR COMPUTER, not in Railway!

### Step 1: Open Command Prompt (Windows)

Press `Win + R`, type `cmd`, press Enter

### Step 2: Install Railway CLI

```bash
npm i -g @railway/cli
```

Wait for installation to complete.

### Step 3: Login to Railway

```bash
railway login
```

This will open your browser. Login with your Railway account.

### Step 4: Navigate to Your Project

```bash
cd C:\Users\KARLIE\Documents\aline\ASAABE\ASAABE_HOTEL_SYSTEM\backend
```

### Step 5: Link to Railway Project

```bash
railway link
```

Select your project from the list.

### Step 6: Run Migrations

```bash
railway run python manage.py migrate
```

You should see:
```
Operations to perform:
  Apply all migrations...
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  ...
```

### Step 7: Initialize Data

```bash
railway run python init_production.py
```

You should see:
```
✓ Admin user created
✓ Room 'Deluxe Sea View' created
✓ Room 'Executive Suite' created
✓ Room 'Standard Room' created
```

### Step 8: Verify

Go to your Railway URL in browser:
```
https://your-app.up.railway.app/admin/
```

Login with:
- Email: admin@asaabe.com
- Password: admin123

---

## ❌ If Railway CLI Doesn't Work

### Alternative: Use Railway Dashboard

1. Go to Railway dashboard
2. Click your backend service
3. Click "Settings" tab
4. Scroll to "Deploy"
5. In "Start Command" field, temporarily add:
   ```
   python manage.py migrate && python init_production.py && gunicorn asaabe.wsgi:application --bind 0.0.0.0:${PORT:-8000}
   ```
6. Click "Redeploy"
7. After successful deployment, remove the migration commands and keep only:
   ```
   gunicorn asaabe.wsgi:application --bind 0.0.0.0:${PORT:-8000}
   ```

---

## ✅ Success Indicators

After running migrations, your Railway logs should show:
- No "relation does not exist" errors
- Service stays active (green status)
- Admin page loads successfully
- API endpoints return data

---

## 🆘 Still Having Issues?

Share the exact error message from Railway logs and I'll help fix it!
