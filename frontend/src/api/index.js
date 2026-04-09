// Centralized API service for all backend calls
const BASE_URL = '/api';

// Helper to get auth headers
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`
});

// Generic request handler
const request = async (url, options = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
};

// Auth API
export const authAPI = {
  register: (body) => request('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }),
  login: (body) => request('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }),
  googleAuth: (token) => request('/auth/google', {
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
