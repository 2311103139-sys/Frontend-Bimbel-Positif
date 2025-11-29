// File: src/api.js
import axios from 'axios';

// Kita ambil URL dari environment variable (supaya bisa beda antara localhost dan server asli)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', // Penting untuk Laravel agar mereturn JSON, bukan HTML saat error
    },
});

export default api;