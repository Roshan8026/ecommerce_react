// src/api.js
import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Using the environment variable
    withCredentials: true,

});

// Request interceptor to add the Authorization token if available
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyMzU3MTQxOCwiZXhwIjoxNzIzNTc1MDE4fQ.QyKV02cWFD0NQYtXsklncfelK_lby802xO8LLtPWbgY"
    
    // Exclude specific routes from adding the token
    const excludedRoutes = ['/login', '/register', '/send-otp', '/verify_otp'];
    const isExcluded = excludedRoutes.some(route => config.url.includes(route));
    
    if (token && !isExcluded) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  response => response,
  error => {
    // Handle specific error codes or show a notification
    if (error.response && error.response.status === 401) {
      // Example: Redirect to login if unauthorized
      window.location.href = '/login';
    } else if (error.response && error.response.status >= 400) {
      console.error('API error:', error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default api;
