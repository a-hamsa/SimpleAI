import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5190/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    withCredentials: true
});

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
        }
        return Promise.reject(error);
    }
);

export default api;