import axiosClient from './api.js';

export const getUserProfile = () => axiosClient.get("/users/profile");
export const updateUserProfile = (data) => axiosClient.put("/users/profile", data);