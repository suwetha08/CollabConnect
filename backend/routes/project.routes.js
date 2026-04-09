const express = require('express');
const router = express.Router();
const { getAllProjects, getProjectById, createProject, getRecommendedProjects } = require('../controllers/project.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/recommended', authMiddleware, getRecommendedProjects);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', authMiddleware, createProject);

module.exports = router;
