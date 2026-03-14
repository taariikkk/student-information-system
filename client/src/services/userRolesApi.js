import axiosClient from './api.js';

// Za Studente - pregled profesora na kursu
export const getTeachersForCourse = (courseId, yearId) =>
    axiosClient.get(`/student/course/${courseId}/teachers?yearId=${yearId}`);

// Za Profesore - pregled studenata na kursu
export const getStudentsForCourse = (courseId, yearId) =>
    axiosClient.get(`/faculty/course/${courseId}/students?yearId=${yearId}`);