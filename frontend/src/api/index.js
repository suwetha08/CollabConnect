// Centralized API service for all backend calls
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Helper to get auth headers
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`
});

// Generic request handler with better error handling
const request = async (url, options = {}) => {
  try {
    const fullUrl = `${BASE_URL}${url}`;
    console.log('🚀 API Request:', fullUrl);
    console.log('📦 Request options:', options);
    
    const res = await fetch(fullUrl, options);
    
    console.log('📡 Response status:', res.status);
    console.log('📡 Response headers:', res.headers.get('content-type'));
    
    // Check if response is JSON
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      console.error('❌ Expected JSON but got:', contentType);
      console.error('❌ Response body:', text);
      throw new Error(`Expected JSON but got ${contentType}. Check console for details.`);
    }
    
    const data = await res.json();
    console.log('✅ Response data:', data);
    
    if (!res.ok) throw new Error(data.error || 'Something went wrong');
    return data;
  } catch (err) {
    console.error('❌ API Error:', err);
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
  getAll: (params = '') => request(`/api/projects${params}`),
  getById: (id) => request(`/api/projects/${id}`),
  create: (body) => request('/api/projects', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body)
  }),
  getRecommended: () => request('/api/projects/recommended', { headers: authHeaders() })
};

// Applications API
export const applicationsAPI = {
  apply: (projectId) => request('/api/apply', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ projectId })
  }),
  getMyApplications: () => request('/api/apply/my', { headers: authHeaders() }),
  getApplicants: (projectId) => request(`/api/applicants/${projectId}`, { headers: authHeaders() }),
  updateStatus: (body) => request('/api/application/status', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body)
  })
};

// User API
export const userAPI = {
  getProfile: () => request('/api/users/profile', { headers: authHeaders() }),
  updateProfile: (body) => request('/api/users/profile', {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(body)
  })
};
