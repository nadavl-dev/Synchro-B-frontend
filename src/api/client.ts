import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://synchrob-api.onrender.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 502) {
      console.error('LLM service unavailable - falling back to filter-based results');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
