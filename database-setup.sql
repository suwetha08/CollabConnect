-- CollabConnect Database Setup Script
-- Run this script in PostgreSQL to create the database and user

-- Create database
CREATE DATABASE collabconnect;

-- Create user (optional - you can use existing postgres user)
CREATE USER collabconnect_user WITH PASSWORD 'collabconnect123';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE collabconnect TO collabconnect_user;

-- Connect to the database
\c collabconnect;

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO collabconnect_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO collabconnect_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO collabconnect_user;

-- Display success message
SELECT 'Database setup completed successfully!' as status;