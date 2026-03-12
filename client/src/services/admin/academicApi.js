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

// Dohvati jedan kurs
export const getCourseById = (id) =>
    axiosClient.get(`/admin/academic/courses/${id}`);

// Dohvati studente na kursu (za određenu godinu)
export const getStudentsOnCourse = (courseId, yearId) =>
    axiosClient.get(`/admin/academic/courses/${courseId}/students?yearId=${yearId}`);

// Dohvati profesore na kursu
export const getTeachersOnCourse = (courseId, yearId) =>
    axiosClient.get(`/admin/academic/courses/${courseId}/teachers?yearId=${yearId}`);

// Dodijeli profesora (POST)
export const assignTeacher = (courseId, teacherId, yearId) =>
    axiosClient.post(`/admin/academic/courses/${courseId}/assign-teacher/${teacherId}?yearId=${yearId}`);

// Upiši studenta (POST)
export const enrollStudent = (courseId, studentId, yearId) =>
    axiosClient.post(`/admin/academic/courses/${courseId}/enroll-student/${studentId}?yearId=${yearId}`);

export const getAllUsers = () => {
    return axiosClient.get("/admin/users");
};