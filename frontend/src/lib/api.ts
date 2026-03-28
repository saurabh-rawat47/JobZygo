import axios from 'axios';
import { User, JobPost, AuthResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: async (userData: User): Promise<AuthResponse> => {
    try {
      const response = await api.post('/api/auth/signup', userData);
      const token = response.headers.authorization;
      if (token && typeof window !== 'undefined') {
        localStorage.setItem('token', token.replace('Bearer ', ''));
      }
      return response.data;
    } catch (error: unknown) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  login: async (userData: { username: string; password: string }): Promise<AuthResponse> => {
    try {
      const response = await api.post('/api/auth/login', userData);
      const token = response.headers.authorization;
      if (token && typeof window !== 'undefined') {
        localStorage.setItem('token', token.replace('Bearer ', ''));
      }
      return response.data;
    } catch (error: unknown) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
};

// Jobs API
export const jobsAPI = {
  getAllJobs: async (): Promise<JobPost[]> => {
    try {
      const response = await api.get('/api/jobs');
      return response.data;
    } catch (error: unknown) {
      console.error('Get jobs error:', error);
      return [];
    }
  },

  searchJobs: async (searchText: string): Promise<JobPost[]> => {
    try {
      const response = await api.get(`/api/jobs/search/${encodeURIComponent(searchText)}`);
      return response.data;
    } catch (error: unknown) {
      console.error('Search jobs error:', error);
      return [];
    }
  },

  createJob: async (jobData: JobPost): Promise<JobPost> => {
    try {
      const response = await api.post('/api/jobs', jobData);
      return response.data;
    } catch (error: unknown) {
      console.error('Create job error:', error);
      throw error;
    }
  },
};

export default api;
