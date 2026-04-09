const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/apply - Apply to a project
const applyToProject = async (req, res) => {
  try {
    const { projectId } = req.body;
    const userId = req.user.id;

    if (!projectId) {
      return res.status(400).json({ error: 'Project ID is required.' });
    }

    // Check project exists
    const project = await prisma.project.findUnique({ where: { id: parseInt(projectId) } });
    if (!project) return res.status(404).json({ error: 'Project not found.' });

    // Prevent owner from applying to own project
    if (project.createdBy === userId) {
      return res.status(400).json({ error: 'You cannot apply to your own project.' });
    }

    // Create application (unique constraint prevents duplicates)
    const application = await prisma.application.create({
      data: { userId, projectId: parseInt(projectId) },
      include: {
        project: { select: { id: true, title: true } },
        user: { select: { id: true, name: true, email: true } }
      }
    });

    res.status(201).json({ message: 'Application submitted successfully.', application });
  } catch (err) {
    // Unique constraint violation = duplicate application
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'You have already applied to this project.' });
    }
    res.status(500).json({ error: 'Failed to apply.', details: err.message });
  }
};

// GET /api/applicants/:projectId - Get all applicants for a project (owner only)
const getApplicants = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    const project = await prisma.project.findUnique({ where: { id: parseInt(projectId) } });
    if (!project) return res.status(404).json({ error: 'Project not found.' });

    // Only project owner can view applicants
    if (project.createdBy !== userId) {
      return res.status(403).json({ error: 'Access denied. Only project owner can view applicants.' });
    }

    const applications = await prisma.application.findMany({
      where: { projectId: parseInt(projectId) },
      include: {
        user: { select: { id: true, name: true, email: true, skills: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ applications });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applicants.', details: err.message });
  }
};

// PUT /api/application/status - Accept or reject an application
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId, status } = req.body;
    const userId = req.user.id;

    if (!applicationId || !status) {
      return res.status(400).json({ error: 'Application ID and status are required.' });
    }

    const validStatuses = ['ACCEPTED', 'REJECTED', 'PENDING'];
    if (!validStatuses.includes(status.toUpperCase())) {
      return res.status(400).json({ error: 'Invalid status. Use ACCEPTED, REJECTED, or PENDING.' });
    }

    // Verify the requester owns the project
    const application = await prisma.application.findUnique({
      where: { id: parseInt(applicationId) },
      include: { project: true }
    });

    if (!application) return res.status(404).json({ error: 'Application not found.' });

    if (application.project.createdBy !== userId) {
      return res.status(403).json({ error: 'Access denied. Only project owner can update status.' });
    }

    const updated = await prisma.application.update({
      where: { id: parseInt(applicationId) },
      data: { status: status.toUpperCase() },
      include: {
        user: { select: { id: true, name: true, email: true } },
        project: { select: { id: true, title: true } }
      }
    });

    res.json({ message: 'Application status updated.', application: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status.', details: err.message });
  }
};

// GET /api/apply/my - Get current user's applications
const getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await prisma.application.findMany({
      where: { userId },
      include: {
        project: {
          include: { owner: { select: { id: true, name: true } } }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ applications });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications.', details: err.message });
  }
};

module.exports = { applyToProject, getApplicants, updateApplicationStatus, getMyApplications };
