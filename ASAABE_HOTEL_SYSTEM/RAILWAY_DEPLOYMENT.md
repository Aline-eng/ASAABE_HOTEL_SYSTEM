# 🚂 Railway Deployment - Step by Step

## ✅ Pre-Deployment Checklist

All necessary files are now in place:
- ✓ `requirements.txt` - Python dependencies
- ✓ `runtime.txt` - Python 3.11.9
- ✓ `Procfile` - Railway process commands
- ✓ `nixpacks.toml` - Build configuration
- ✓ `.railwayignore` - Files to ignore
- ✓ `init_production.py` - Database initialization
- ✓ Updated `settings.py` - Production ready

---

## 🚀 Deployment Steps

### Step 1: Push to GitHub

```bash
cd ASAABE_HOTEL_SYSTEM
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### Step 2: Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. **IMPORTANT:** Set Root Directory to `backend`

### Step 3: Add PostgreSQL Database

1. In your Railway project dashboard
2. Click "+ New" → "Database" → "PostgreSQL"
3. Railway automatically creates and links the database
4. The `DATABASE_URL` variable is auto-set

### Step 4: Configure Environment Variables

Click on your backend service → "Variables" tab → Add these:

```
SECRET_KEY=django-insecure-CHANGE-THIS-TO-RANDOM-STRING-IN-PRODUCTION
DEBUG=False
ALLOWED_HOSTS=*.railway.app,localhost
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
PORT=8000
```

**Note:** Railway automatically provides `DATABASE_URL`

### Step 5: Configure Service Settings

1. Click on your backend service
2. Go to "Settings" tab
3. Set these values:
   - **Root Directory:** `backend`
   - **Start Command:** (leave empty, uses Procfile)
   - **Watch Paths:** `backend/**`

### Step 6: Deploy

1. Railway will automatically start deploying
2. Watch the build logs for any errors
3. Wait for "Build successful" and "Deployment live"

### Step 7: Run Migrations & Initialize Data

Once deployed, click on your service → "..." menu → "Run Command"

Run these commands one by one:

```bash
python manage.py migrate
python manage.py shell < init_production.py
```

Or use Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and link project
railway login
railway link

# Run commands
railway run python manage.py migrate
railway run python manage.py shell < init_production.py
```

### Step 8: Get Your Backend URL

1. Go to your backend service
2. Click "Settings" → "Networking"
3. Click "Generate Domain"
4. Your URL will be: `https://your-app.up.railway.app`

---

## 🔍 Verify Deployment

Test these endpoints in your browser or Postman:

1. **Health Check:**
   ```
   https://your-app.up.railway.app/admin/
   ```
   Should show Django admin login

2. **API Endpoints:**
   ```
   https://your-app.up.railway.app/api/rooms/
   ```
   Should return JSON with rooms

3. **Login:**
   - Email: admin@asaabe.com
   - Password: admin123

---

## 🐛 Troubleshooting

### Build Fails

**Check logs for:**
- Missing dependencies → Update requirements.txt
- Python version issues → Check runtime.txt
- Import errors → Check all imports in code

**Common fixes:**
```bash
# If psycopg2 fails, it's already in requirements.txt
# If whitenoise fails, it's already in requirements.txt
# If dj-database-url fails, it's already in requirements.txt
```

### Deployment Crashes

**Check deployment logs:**

1. Click on your service
2. Go to "Deployments" tab
3. Click on latest deployment
4. Check logs for errors

**Common issues:**

**"No module named 'X'"**
- Add missing package to requirements.txt
- Redeploy

**"relation does not exist"**
- Run migrations: `railway run python manage.py migrate`

**"ALLOWED_HOSTS"**
- Add Railway domain to ALLOWED_HOSTS variable
- Format: `*.railway.app,localhost`

**"CORS error"**
- Update CORS_ALLOWED_ORIGINS with your frontend URL
- Format: `http://localhost:3000,https://your-frontend.vercel.app`

### Database Connection Issues

**Check:**
1. PostgreSQL service is running (green status)
2. DATABASE_URL is set (automatic)
3. Both services are in same project

**Fix:**
- Restart PostgreSQL service
- Redeploy backend service

### Static Files Not Loading

**Run:**
```bash
railway run python manage.py collectstatic --noinput
```

---

## 📝 Environment Variables Reference

### Required Variables

```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=*.railway.app,localhost
CORS_ALLOWED_ORIGINS=http://localhost:3000
DATABASE_URL=(auto-set by Railway)
PORT=8000
```

### After Frontend Deployment

Update `CORS_ALLOWED_ORIGINS`:
```
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
```

---

## ✅ Success Indicators

Your deployment is successful when:

- ✓ Build completes without errors
- ✓ Service shows "Active" status (green)
- ✓ `/admin/` page loads
- ✓ `/api/rooms/` returns JSON data
- ✓ Can login to Django admin
- ✓ Database has admin user and sample rooms

---

## 🔄 Redeployment

To redeploy after code changes:

1. Push changes to GitHub
2. Railway auto-deploys (if enabled)
3. Or click "Deploy" in Railway dashboard

---

## 📞 Support

If deployment still fails:

1. Check Railway logs carefully
2. Verify all files are in `backend/` folder
3. Ensure GitHub repo is up to date
4. Check Railway status page: https://railway.app/status

---

## 🎯 Next Steps

Once backend is deployed successfully:

1. ✓ Note your Railway URL
2. ✓ Test all API endpoints
3. ✓ Proceed to frontend deployment on Vercel
4. ✓ Update frontend with Railway URL
5. ✓ Update Railway CORS with Vercel URL
