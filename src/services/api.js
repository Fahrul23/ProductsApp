import axios from 'axios';
import { getToken } from '../utils/storage';

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: inject auth token
api.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error injecting token:', error);
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// Response interceptor: handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                // Token expired or invalid — will be handled by AuthContext
                console.warn('Unauthorized: token may be expired');
            }
        }
        return Promise.reject(error);
    },
);

// === AUTH API ===
export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/auth/login', {
            username,
            password,
            expiresInMins: 60,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// === PRODUCTS API ===
export const fetchProducts = async (limit = 20, skip = 0) => {
    try {
        const response = await api.get('/products', {
            params: { limit, skip },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;
