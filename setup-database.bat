@echo off
echo 🚀 CollabConnect Database Setup
echo.

echo 📦 Installing backend dependencies...
cd backend
call npm install

echo.
echo 🗄️ Setting up database...
call npx prisma generate
call npx prisma migrate dev --name init

echo.
echo 🌱 Seeding database with sample data...
call node prisma/seed.js

echo.
echo ✅ Database setup complete!
echo.
echo 🔑 Test login credentials:
echo Email: alice@example.com
echo Password: password123
echo.
echo 🚀 Starting backend server...
call npm run dev

pause