@echo off
echo 🚀 CollabConnect Setup Script
echo.

echo 📍 Navigating to project directory...
cd /d "C:\Users\suwetha\OneDrive\Desktop\fsd prj\collabconnect"

echo.
echo 📦 Installing backend dependencies...
cd backend
call npm install

echo.
echo ⚙️ Generating Prisma client...
call npx prisma generate

echo.
echo 🗄️ Running database migrations...
call npx prisma migrate dev --name init

echo.
echo 🌱 Seeding database with sample data...
call node prisma/seed.js

echo.
echo ✅ Backend setup complete!
echo.
echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install

echo.
echo 🎉 Setup complete!
echo.
echo 🔑 Test login credentials:
echo Email: alice@example.com
echo Password: password123
echo.
echo 📝 Next steps:
echo 1. Make sure PostgreSQL is running
echo 2. Update backend/.env with your database password
echo 3. Run: npm run dev (in backend folder)
echo 4. Run: npm start (in frontend folder)
echo.
pause