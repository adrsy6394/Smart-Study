import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Needed for sending/receiving HTTP-Only Cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
