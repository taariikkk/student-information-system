// src/components/layout/Layout.jsx
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex bg-gray-50 min-h-screen font-sans">
            <Sidebar />
            <div className="flex flex-col flex-1 h-screen overflow-hidden">
                <Topbar />
                {/* Ovdje se renderuje Home, Grades, Profile... */}
                <div className="flex-1 overflow-auto p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;