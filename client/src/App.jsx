import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Home from './pages/auth/Home.jsx';
import Layout from './components/layout/Layout.jsx';
import Users from './pages/admin/Users.jsx';
import AcademicStructure from './pages/admin/AcademicStructure.jsx';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/academic-structure" element={<AcademicStructure />} />
            </Route>
        </Routes>
    );
}

export default App;