const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const applicationRoutes = require('./routes/application.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/apply', applicationRoutes);
app.use('/api/users', userRoutes);

// Application status route
app.use('/api/application', applicationRoutes);
app.use('/api/applicants', applicationRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', message: 'CollabConnect API running' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
