const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, skills } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Parse skills - accept array or comma-separated string
    const skillsArray = Array.isArray(skills)
      ? skills
      : skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, skills: skillsArray },
      select: { id: true, name: true, email: true, skills: true, createdAt: true }
    });

    const token = generateToken(user);
    res.status(201).json({ message: 'Registration successful.', token, user });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed.', details: err.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    res.json({ message: 'Login successful.', token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: 'Login failed.', details: err.message });
  }
};

// POST /api/auth/google - Google OAuth authentication
const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Google token is required.' });
    }

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    if (!email || !name) {
      return res.status(400).json({ error: 'Invalid Google token payload.' });
    }

    // Check if user exists
    let user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      // User exists, login
      const jwtToken = generateToken(user);
      const { password: _, ...userWithoutPassword } = user;
      return res.json({ 
        message: 'Google login successful.', 
        token: jwtToken, 
        user: userWithoutPassword 
      });
    } else {
      // User doesn't exist, create new account
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: '', // No password for Google users
          skills: [] // Empty skills initially
        },
        select: { id: true, name: true, email: true, skills: true, createdAt: true }
      });

      const jwtToken = generateToken(user);
      return res.status(201).json({ 
        message: 'Google account created successfully.', 
        token: jwtToken, 
        user 
      });
    }
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(500).json({ error: 'Google authentication failed.', details: err.message });
  }
};

module.exports = { register, login, googleAuth };
