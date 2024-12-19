import axios from 'axios';

// const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// const API_URL = 'https://postgres-project-v1.onrender.com/api/v1';
const API_URL = 'http://localhost:4000/api/v1';
const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.defaults.headers.common['Authorization'] =
  'Bearer' + localStorage.getItem('token');

axiosInstance.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      Authorization: `Bearer` + localStorage.getItem('token'),
    };
    return config;
  },
  (error) => Promise.resolve(error),
);

export default axiosInstance;
