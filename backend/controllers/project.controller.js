const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/projects - Get all projects with optional skill filter
const getAllProjects = async (req, res) => {
  try {
    const { skills, search } = req.query;

    let where = {};

    // Filter by skills (case-insensitive, multiple skills supported)
    if (skills) {
      const skillList = skills.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      // Match projects where any required skill matches
      where = {
        skillsRequired: {
          hasSome: skillList.map(s => s)
        }
      };
    }

    // Search by title or description
    if (search) {
      where = {
        ...where,
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      };
    }

    const projects = await prisma.project.findMany({
      where,
      include: {
        owner: { select: { id: true, name: true, email: true, skills: true } },
        _count: { select: { applications: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ projects });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects.', details: err.message });
  }
};

// GET /api/projects/:id - Get single project
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: {
        owner: { select: { id: true, name: true, email: true, skills: true } },
        applications: {
          include: {
            user: { select: { id: true, name: true, email: true, skills: true } }
          }
        }
      }
    });

    if (!project) return res.status(404).json({ error: 'Project not found.' });

    res.json({ project });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch project.', details: err.message });
  }
};

// POST /api/projects - Create a new project (protected)
const createProject = async (req, res) => {
  try {
    const { title, description, skillsRequired, teamSize } = req.body;
    const userId = req.user.id;

    if (!title || !description || !teamSize) {
      return res.status(400).json({ error: 'Title, description, and team size are required.' });
    }

    const skillsArray = Array.isArray(skillsRequired)
      ? skillsRequired
      : skillsRequired ? skillsRequired.split(',').map(s => s.trim()).filter(Boolean) : [];

    const project = await prisma.project.create({
      data: {
        title,
        description,
        skillsRequired: skillsArray,
        teamSize: parseInt(teamSize),
        createdBy: userId
      },
      include: {
        owner: { select: { id: true, name: true, email: true } }
      }
    });

    res.status(201).json({ message: 'Project created successfully.', project });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project.', details: err.message });
  }
};

// GET /api/projects/recommended - Skill-based recommendations
const getRecommendedProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.skills.length === 0) {
      return res.json({ projects: [] });
    }

    // Find projects that match user's skills
    const projects = await prisma.project.findMany({
      where: {
        skillsRequired: { hasSome: user.skills },
        createdBy: { not: userId } // Exclude own projects
      },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        _count: { select: { applications: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 6
    });

    res.json({ projects });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recommendations.', details: err.message });
  }
};

module.exports = { getAllProjects, getProjectById, createProject, getRecommendedProjects };
