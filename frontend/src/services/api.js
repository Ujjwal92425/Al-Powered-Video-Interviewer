import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Questions API
export const questionsAPI = {
  getAll: () => api.get('/questions'),
  getByCategory: (category) => api.get(`/questions/category/${category}`),
  create: (data) => api.post('/questions', data),
  update: (id, data) => api.put(`/questions/${id}`, data),
  delete: (id) => api.delete(`/questions/${id}`)
};

// Interviews API
export const interviewsAPI = {
  create: (data) => api.post('/interviews', data),
  getById: (id) => api.get(`/interviews/${id}`),
  getAll: () => api.get('/interviews'),
  submitResponse: (id, formData) => {
    return api.post(`/interviews/${id}/response`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  complete: (id) => api.post(`/interviews/${id}/complete`)
};

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data)
};

export default api;