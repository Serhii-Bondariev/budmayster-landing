// api/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Додавання токена в заголовки
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const registerUser = (formData) => API.post('/auth/register', formData);  // Додаємо функцію для реєстрації
export const loginUser = (formData) => API.post('/auth/login', formData);
