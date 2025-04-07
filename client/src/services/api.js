// api.js
import axios from 'axios';
import { useAuth } from './AuthContext';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth?.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.get('/api/auth/refresh', {
          withCredentials: true
        });
        const { accessToken } = response.data;

        localStorage.setItem('auth', JSON.stringify({
          accessToken,
          user: parseJwt(accessToken).userInfo
        }));

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('auth');
        window.location = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;