# 🗄️ Database Setup Guide for CollabConnect

## Prerequisites
- PostgreSQL installed on your system
- Node.js and npm installed

## Step 1: Install PostgreSQL

### Windows:
1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer and follow the setup wizard
3. Remember your postgres user password
4. Default port is 5432

### macOS:
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## Step 2: Create Database

### Option A: Using psql command line
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE collabconnect;

# Create user (optional)
CREATE USER collabconnect_user WITH PASSWORD 'collabconnect123';
GRANT ALL PRIVILEGES ON DATABASE collabconnect TO collabconnect_user;

# Exit psql
\q
```

### Option B: Using pgAdmin (GUI)
1. Open pgAdmin
2. Right-click on "Databases" → Create → Database
3. Name: `collabconnect`
4. Click Save

## Step 3: Configure Environment

Update `backend/.env` with your database connection:

```env
# For default postgres user
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/collabconnect"

# Or for custom user
DATABASE_URL="postgresql://collabconnect_user:collabconnect123@localhost:5432/collabconnect"

JWT_SECRET="collabconnect_super_secret_jwt_key_2024"
JWT_EXPIRES_IN="7d"
PORT=5000
```

## Step 4: Run Database Migrations

```bash
cd backend

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with sample data
node prisma/seed.js
```

## Step 5: Verify Setup

```bash
# View database in Prisma Studio (optional)
npx prisma studio
```

## 🎯 Test Data

After seeding, you can login with these accounts:

| Email | Password | Skills |
|-------|----------|--------|
| alice@example.com | password123 | React, JavaScript, Node.js, UI/UX Design |
| bob@example.com | password123 | Python, Django, Machine Learning, Data Science |
| carol@example.com | password123 | Vue.js, PHP, MySQL, DevOps |
| david@example.com | password123 | React Native, Flutter, Mobile Development, Firebase |

## 🔧 Troubleshooting

### Connection Issues:
- Ensure PostgreSQL is running: `sudo systemctl status postgresql` (Linux) or check Services (Windows)
- Verify port 5432 is not blocked
- Check username/password in DATABASE_URL

### Permission Issues:
```sql
-- Grant additional permissions if needed
GRANT ALL ON SCHEMA public TO collabconnect_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO collabconnect_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO collabconnect_user;
```

### Reset Database:
```bash
# Drop and recreate database
npx prisma migrate reset
node prisma/seed.js
```

## ✅ Success!

If everything is set up correctly, you should see:
- Database `collabconnect` created
- Tables: User, Project, Application
- Sample data loaded
- Prisma client generated

Now you can start the backend server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`