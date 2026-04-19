import axios from 'axios';
const instance = axios.create({
// Use env variable in production, fallback to localhost for dev
baseURL: process.env.REACT_APP_API_URL || 'https://thefolio-backend.onrender.com/api/auth/login',
});
instance.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
if (token) config.headers.Authorization = `Bearer ${token}`;
return config;
});
export default instance;