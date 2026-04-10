// Centralized API service for all backend calls
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Helper to get auth headers
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`
});

// Generic request handler with better error handling
const request = async (url, options = {}) => {
  try {
    const fullUrl = `${BASE_URL}${url}`;
    console.log('API Request:', fullUrl); // Debug log
    
    const res = await fetch(fullUrl, options);
    
    // Check if response is JSON
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Expected JSON but got ${contentType}. URL: ${fullUrl}`);
    }
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Something went wrong');
    return data;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
};

// Auth API
export const authAPI = {
  register: (body) => request('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }),
  login: (body) => request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }),
  googleAuth: (token) => request('/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  })
};

// Projects API
export const projectsAPI = {
  getAll: (params = '') => request(`/projects${params}`),
  getById: (id) => request(`/projects/${id}`),
  create: (body) => request('/projects', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body)
  }),
  getRecommended: () => request('/projects/recommended', { headers: authHeaders() })
};

// Applications API
export const applicationsAPI = {
  apply: (projectId) => request('/apply', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ projectId })
  }),
  getMyApplications: () => request('/apply/my', { headers: authHeaders() }),
  getApplicants: (projectId) => request(`/applicants/${projectId}`, { headers: authHeaders() }),
  updateStatus: (body) => request('/application/status', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body)
  })
};

// User API
export const userAPI = {
  getProfile: () => request('/users/profile', { headers: authHeaders() }),
  updateProfile: (body) => request('/users/profile', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body)
  })
};
