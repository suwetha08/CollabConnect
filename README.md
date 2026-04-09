# CollabConnect – Student Skill Exchange Platform

A full-stack web application that connects students based on their skills to collaborate on projects. Built with React.js, Node.js, Express.js, PostgreSQL, and Prisma.

## 🚀 Features

### Core Functionality
- **Modern Landing Page**: Professional landing page with feature highlights
- **Dual Authentication**: Email/password + Google OAuth integration
- **Protected Routing**: Secure access to authenticated features
- **Smart Project Matching**: Skill-based recommendations and search
- **Project Management**: Create, browse, and manage projects
- **Application System**: Apply to projects, accept/reject applicants
- **User Profiles**: Manage skills and view project history
- **Responsive Dashboard**: Personalized content and statistics

### Authentication Features
- JWT-based authentication with bcrypt password hashing
- Google OAuth integration with @react-oauth/google
- Secure token storage and management
- Protected routes with automatic redirects
- Seamless login/signup experience

### Technical Features
- RESTful API architecture
- Protected routes with JWT middleware
- Real-time skill-based filtering
- Responsive design (mobile-first)
- Clean, modern UI with glassmorphism effects
- Error handling and loading states
- Google OAuth backend verification

## 🛠️ Tech Stack

**Frontend:**
- React.js (Functional components + Hooks)
- React Router DOM
- Context API for state management
- Google OAuth (@react-oauth/google)
- CSS3 (No external frameworks)

**Backend:**
- Node.js
- Express.js
- JWT Authentication
- Google OAuth verification (google-auth-library)
- bcryptjs for password hashing

**Database:**
- PostgreSQL
- Prisma ORM

## 📁 Project Structure

```
collabconnect/
├── backend/
│   ├── controllers/          # Business logic
│   ├── routes/              # API endpoints
│   ├── middleware/          # Auth middleware
│   ├── prisma/             # Database schema
│   ├── server.js           # Express server
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/         # Page components
    │   ├── context/       # React Context
    │   ├── api/          # API service layer
    │   └── App.js
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- npm or yarn

### 1. Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd collabconnect

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb collabconnect

# Update backend/.env with your database URL
DATABASE_URL="postgresql://username:password@localhost:5432/collabconnect"

# Generate Prisma client and run migrations
cd backend
npx prisma generate
npx prisma migrate dev
```

### 3. Environment Variables

Create `backend/.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/collabconnect"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=5000
```

### 4. Run the Application

```bash
# Terminal 1: Start backend server
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm start
```

Visit `http://localhost:3000` to see the application.

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth authentication

### Projects
- `GET /api/projects` - Get all projects (with optional filters)
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (protected)
- `GET /api/projects/recommended` - Get skill-based recommendations (protected)

### Applications
- `POST /api/apply` - Apply to project (protected)
- `GET /api/apply/my` - Get user's applications (protected)
- `GET /api/applicants/:projectId` - Get project applicants (owner only)
- `PUT /api/application/status` - Update application status (owner only)

### User
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

## 🎨 Key Components

### Frontend Components
- **Navbar**: Responsive navigation with auth state
- **ProjectCard**: Reusable project display component
- **ProtectedRoute**: Route guard for authenticated users
- **AuthContext**: Global authentication state management

### Backend Architecture
- **Controllers**: Handle business logic and database operations
- **Routes**: Define API endpoints and middleware
- **Middleware**: JWT authentication and error handling
- **Prisma Schema**: Database models and relationships

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation and sanitization
- CORS configuration
- SQL injection prevention (Prisma ORM)

## 📱 Pages

1. **Landing Page**: Modern landing page with features and CTAs
2. **Login**: Dedicated login page with Google OAuth
3. **Signup**: Registration page with Google OAuth
4. **Browse**: Search and filter projects by skills
5. **Post Project**: Create new project form
6. **Project Detail**: View project details and manage applicants
7. **Profile**: View/edit user profile and project history
8. **Dashboard**: Personalized recommendations and statistics

## 🎯 Smart Features

### Skill-Based Matching
- Projects recommended based on user skills
- Multi-skill search and filtering
- Case-insensitive skill matching

### Application Management
- Prevent duplicate applications
- Owner-only applicant management
- Status tracking (Pending/Accepted/Rejected)

### User Experience
- Loading states and error handling
- Responsive design for all devices
- Clean, modern UI with smooth animations
- Real-time search with debouncing

## 🚀 Production Deployment

### Backend Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to Netlify, Vercel, or similar platform
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built by a senior full-stack developer as a complete demonstration of modern web development practices.

---

**CollabConnect** - Where skills meet opportunity! 🚀