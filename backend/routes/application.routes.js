const express = require('express');
const router = express.Router();
const { applyToProject, getApplicants, updateApplicationStatus, getMyApplications } = require('../controllers/application.controller');
const authMiddleware = require('../middleware/auth.middleware');

// POST /api/apply
router.post('/', authMiddleware, applyToProject);

// GET /api/apply/my
router.get('/my', authMiddleware, getMyApplications);

// GET /api/applicants/:projectId
router.get('/:projectId', authMiddleware, getApplicants);

// PUT /api/application/status
router.put('/status', authMiddleware, updateApplicationStatus);

module.exports = router;
