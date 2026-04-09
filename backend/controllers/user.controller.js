const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

// GET /api/users/profile - Get current user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, name: true, email: true, skills: true, createdAt: true,
        projects: {
          select: { id: true, title: true, description: true, skillsRequired: true, teamSize: true, createdAt: true },
          orderBy: { createdAt: 'desc' }
        },
        applications: {
          include: {
            project: { select: { id: true, title: true, description: true, skillsRequired: true } }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile.', details: err.message });
  }
};

// PUT /api/users/profile - Update current user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, skills, password } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (skills) {
      updateData.skills = Array.isArray(skills)
        ? skills
        : skills.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { id: true, name: true, email: true, skills: true, updatedAt: true }
    });

    res.json({ message: 'Profile updated successfully.', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile.', details: err.message });
  }
};

module.exports = { getProfile, updateProfile };
