import axiosClient from "../api.js";

// --- GODINE ---
export const getAllYears = () =>
    axiosClient.get("/admin/academic/years");
export const createYear = (name) =>
    axiosClient.post("/admin/academic/years", { name });


// --- PROGRAMI ---
export const getAllPrograms = () =>
    axiosClient.get("/admin/academic/programs");
export const createProgram = (name, duration) =>
    axiosClient.post("/admin/academic/programs", { name, duration });


// --- KURSEVI ---
export const getAllCourses = () =>
    axiosClient.get("/admin/academic/courses");
export const createCourse = (courseData) =>
    axiosClient.post("/admin/academic/courses", courseData);