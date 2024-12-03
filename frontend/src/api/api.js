// api/api.js
// import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// // Додавання токена в заголовки
// API.interceptors.request.use((req) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         req.headers.Authorization = `Bearer ${token}`;
//     }
//     return req;
// });

// export const registerUser = (formData) => API.post('/auth/register', formData);  // Додаємо функцію для реєстрації
// export const loginUser = (formData) => API.post('/auth/login', formData);

// api/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const registerUser = (formData) => API.post('/auth/register', formData);
export const loginUser = (formData) => API.post('/auth/login', formData); // Ось тут експорт функції loginUser

export const addProduct = (product) => API.post('/products/add', product);
export const updateProduct = (id, product) => API.put(`/products/edit/${id}`, product);
export const getProducts = () => API.get('/products');
export const deleteProduct = (id) => API.delete(`/products/${id}`);
