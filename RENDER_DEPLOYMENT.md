# Render.com Deployment Guide

## Overview
This guide will help you deploy CollabConnect (full-stack app) to Render.com using the `render.yaml` blueprint.

## What Gets Deployed
1. **PostgreSQL Database** - Free tier database
2. **Backend API** - Node.js/Express server with Prisma ORM
3. **Frontend** - React.js static site

---

## Prerequisites
- GitHub account
- Render.com account (free)
- Google OAuth Client ID (for authentication)

---

## Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - CollabConnect"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/collabconnect.git
git branch -M main
git push -u origin main
```

---

## Step 2: Connect to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select the `collabconnect` repository
5. Render will detect `render.yaml` automatically

---

## Step 3: Configure Environment Variables

### Backend Environment Variables
Set these in the Render dashboard for `collabconnect-backend`:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Auto-generated | Automatically linked from database |
| `JWT_SECRET` | Auto-generated | Render generates a secure random value |
| `GOOGLE_CLIENT_ID` | Your Google Client ID | Get from Google Cloud Console |
| `PORT` | 5001 | Already set in render.yaml |
| `NODE_ENV` | production | Already set in render.yaml |

### Frontend Environment Variables
Set these in the Render dashboard for `collabconnect-frontend`:

| Variable | Value | Notes |
|----------|-------|-------|
| `REACT_APP_API_URL` | Auto-generated | Automatically linked from backend service |
| `REACT_APP_GOOGLE_CLIENT_ID` | Your Google Client ID | Same as backend |

---

## Step 4: Update Google OAuth Settings

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** → **Credentials**
3. Edit your OAuth 2.0 Client ID
4. Add authorized JavaScript origins:
   - `https://collabconnect-frontend.onrender.com` (or your custom domain)
5. Add authorized redirect URIs:
   - `https://collabconnect-frontend.onrender.com`
   - `https://collabconnect-frontend.onrender.com/login`

---

## Step 5: Deploy

1. Click **"Apply"** in Render dashboard
2. Render will:
   - Create PostgreSQL database
   - Deploy backend (install deps, run migrations, start server)
   - Deploy frontend (build React app, serve static files)
3. Wait 5-10 minutes for initial deployment

---

## Step 6: Verify Deployment

### Check Backend
- URL: `https://collabconnect-backend.onrender.com/api/health`
- Should return: `{"status": "ok"}`

### Check Frontend
- URL: `https://collabconnect-frontend.onrender.com`
- Should load the landing page

### Check Database
- Go to Render dashboard → `collabconnect-db`
- Click **"Connect"** to see connection details
- Verify migrations ran successfully in logs

---

## Important Notes

### Free Tier Limitations
- **Backend/Frontend**: Spins down after 15 minutes of inactivity
- **First request after spin-down**: Takes 30-60 seconds to wake up
- **Database**: 90-day expiration on free tier
- **Build minutes**: 500 minutes/month

### Database Migrations
- Migrations run automatically on deployment via `npx prisma migrate deploy`
- To run seed data, add to `buildCommand`: `&& npm run seed`

### Custom Domains
- Go to service settings → **"Custom Domain"**
- Add your domain and configure DNS

### Environment Variables
- Never commit `.env` files to GitHub
- All secrets are managed in Render dashboard
- Update variables in dashboard, then trigger manual deploy

---

## Troubleshooting

### Backend won't start
- Check logs: Render dashboard → `collabconnect-backend` → **"Logs"**
- Verify `DATABASE_URL` is set correctly
- Ensure Prisma migrations completed

### Frontend shows blank page
- Check if `REACT_APP_API_URL` is set
- Verify backend is running
- Check browser console for errors

### Database connection errors
- Verify `DATABASE_URL` format: `postgresql://user:password@host:port/database`
- Check if database service is running
- Ensure IP allowlist is empty (allows all connections)

### Google OAuth not working
- Verify authorized origins/redirect URIs in Google Console
- Check `GOOGLE_CLIENT_ID` matches in both frontend and backend
- Ensure using HTTPS URLs (not HTTP)

---

## Monitoring

### View Logs
- Backend: `collabconnect-backend` → **"Logs"**
- Frontend: `collabconnect-frontend` → **"Logs"**
- Database: `collabconnect-db` → **"Logs"**

### Metrics
- CPU/Memory usage
- Request count
- Response times
- Available in each service's dashboard

---

## Updating Your App

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main
```

Render will automatically:
1. Detect the push
2. Rebuild services
3. Deploy new version

---

## Cost Optimization

### Upgrade to Paid Plans (Optional)
- **Starter Plan ($7/month)**: No spin-down, faster builds
- **Standard Plan ($25/month)**: More resources, better performance
- **Database Plan ($7/month)**: Persistent database, no expiration

### Keep Free Tier Active
- Use a service like [UptimeRobot](https://uptimerobot.com/) to ping your app every 14 minutes
- Prevents spin-down during active hours

---

## Additional Resources
- [Render Documentation](https://render.com/docs)
- [Render Blueprint Spec](https://render.com/docs/blueprint-spec)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-render)
