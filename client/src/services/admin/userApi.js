import axiosClient from '../api.js';

export const getAllUsers = () => {
    return axiosClient.get("/admin/users");
};

export const createUser = (userData) => {
    return axiosClient.post("/admin/users", userData);
};