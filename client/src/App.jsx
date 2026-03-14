import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Home from './pages/auth/Home.jsx';
import Layout from './components/layout/Layout.jsx';
import Users from './pages/admin/Users.jsx';
import AcademicStructure from './pages/admin/AcademicStructure.jsx';
import CourseDetails from './pages/admin/CourseDetails.jsx';
import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
import Profile from './pages/profile/Profile.jsx';
import StudentCourses from './pages/student/StudentCourses.jsx';
import FacultyCourses from './pages/faculty/FacultyCourses.jsx';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* Admin rute */}
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/academic-structure" element={<AcademicStructure />} />
                    <Route path="/admin/courses/:id" element={<CourseDetails />} />

                    {/* Student rute */}
                    <Route path="/my-courses" element={<StudentCourses />} />

                    {/* Faculty rute */}
                    <Route path="/faculty/courses" element={<FacultyCourses />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;