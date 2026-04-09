# 🔐 Google OAuth Setup Guide for CollabConnect

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `CollabConnect`
4. Click "Create"

## Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API" 
3. Click on it and press "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure OAuth consent screen first:
   - Choose "External" user type
   - Fill in app name: `CollabConnect`
   - Add your email as developer contact
   - Save and continue through all steps

4. For OAuth client ID:
   - Application type: "Web application"
   - Name: `CollabConnect Web Client`
   - Authorized JavaScript origins:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000` (for development)
     - `https://yourdomain.com` (for production)

5. Click "Create"
6. Copy the Client ID (looks like: `123456789-abcdef.apps.googleusercontent.com`)

## Step 4: Configure Environment Variables

### Backend (.env)
```env
# Add this to your backend/.env file
GOOGLE_CLIENT_ID="your-actual-client-id.apps.googleusercontent.com"
```

### Frontend (.env)
Create `frontend/.env` file:
```env
REACT_APP_GOOGLE_CLIENT_ID="your-actual-client-id.apps.googleusercontent.com"
```

## Step 5: Install Dependencies

### Backend
```bash
cd backend
npm install google-auth-library
```

### Frontend
```bash
cd frontend
npm install @react-oauth/google
```

## Step 6: Test Google Authentication

1. Start your backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start your frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Visit `http://localhost:3000`
4. Click "Sign Up" or "Login"
5. Click "Continue with Google"
6. Complete Google OAuth flow

## Step 7: Production Deployment

### Update OAuth Settings
1. Go back to Google Cloud Console → Credentials
2. Edit your OAuth client ID
3. Add your production domain to:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com`

### Update Environment Variables
- Update `GOOGLE_CLIENT_ID` in production environment
- Update `REACT_APP_GOOGLE_CLIENT_ID` in frontend build

## 🔧 Troubleshooting

### Common Issues:

**"redirect_uri_mismatch" error:**
- Ensure your domain is added to authorized origins
- Check that you're using the correct protocol (http vs https)

**"invalid_client" error:**
- Verify your Client ID is correct in environment variables
- Make sure the Client ID matches your Google Cloud project

**Google button not appearing:**
- Check browser console for JavaScript errors
- Verify `@react-oauth/google` is installed correctly
- Ensure `REACT_APP_GOOGLE_CLIENT_ID` is set

**Backend authentication failing:**
- Verify `google-auth-library` is installed
- Check that `GOOGLE_CLIENT_ID` matches frontend
- Ensure token verification is working

### Testing Commands:

```bash
# Test backend Google auth endpoint
curl -X POST http://localhost:5000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"token":"your-google-jwt-token"}'

# Check environment variables
echo $REACT_APP_GOOGLE_CLIENT_ID  # Frontend
echo $GOOGLE_CLIENT_ID            # Backend
```

## 🎯 Security Best Practices

1. **Never commit credentials** to version control
2. **Use different Client IDs** for development and production
3. **Regularly rotate** OAuth credentials
4. **Monitor usage** in Google Cloud Console
5. **Implement rate limiting** on auth endpoints
6. **Validate tokens** on every request

## ✅ Success Indicators

When properly configured, you should see:
- ✅ Google "Continue with Google" button appears
- ✅ Clicking opens Google OAuth popup
- ✅ After authorization, user is logged in
- ✅ User data is stored in database
- ✅ JWT token is generated and stored
- ✅ User is redirected to `/browse` page

## 📞 Support

If you encounter issues:
1. Check Google Cloud Console logs
2. Review browser developer console
3. Verify all environment variables are set
4. Ensure domains match OAuth configuration

Your CollabConnect app now supports secure Google OAuth authentication! 🚀