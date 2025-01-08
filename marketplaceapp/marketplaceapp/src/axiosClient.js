import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Add request interceptor to handle CSRF token
axiosClient.interceptors.request.use(async (config) => {
    // Get the CSRF token if needed
    if (!document.cookie.includes('XSRF-TOKEN')) {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    }
    
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add response interceptor for better error handling
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Axios error:', error);
        return Promise.reject(error);
    }
);

export default axiosClient;