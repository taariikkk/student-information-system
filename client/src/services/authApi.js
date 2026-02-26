import axiosClient from './api.js';

export const registerUser = (userData) => {
    return axiosClient.post('/auth/register', userData);
};

export const loginUser = (credentials) => {
    return axiosClient.post('/auth/login', credentials);
};