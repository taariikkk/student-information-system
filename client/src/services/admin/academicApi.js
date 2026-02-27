import axiosClient from "../api.js";

// POST i GET za YEARS
export const getAllYears = () =>
    axiosClient.get("/admin/academic/years");

export const createYear = (name) =>
    axiosClient.post("/admin/academic/years", {name});

// POST i GET za PROGRAMS
export const getAllPrograms = () =>
    axiosClient.get("/admin/academic/programs");

export const createProgram = (name, duration) =>
    axiosClient.post("/admin/academic/programs", {name, duration});

// POST i GET za COURSES
export const getAllCourses = () =>
    axiosClient.get("/admin/academic/courses");

export const createCourse = (courseData) =>
    axiosClient.post("/admin/academic/courses", courseData);