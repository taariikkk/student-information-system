import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
    const { user } = useAuth();

    return (
        <div className="w-64 h-screen bg-slate-900 text-white p-6 hidden md:flex flex-col">
            <h2 className="text-2xl font-bold mb-10 text-indigo-400">SIS <span className="text-xs text-gray-500">v1.0</span></h2>

            <nav className="flex flex-col gap-2 text-gray-400 font-medium">
                <NavItem to="/" label="Dashboard" />

                {/* Samo za Studente */}
                {user?.role === 'STUDENT' && (
                    <>
                        <NavItem to="/my-courses" label="Moji Predmeti" />
                        <NavItem to="/grades" label="Ocjene" />
                    </>
                )}

                {/* Samo za Profesore */}
                {user?.role === 'FACULTY' && (
                    <>
                        <NavItem to="/faculty/courses" label="Moji Kursevi" />
                        <NavItem to="/faculty/schedule" label="Raspored" />
                        <NavItem to="/admin/users" label="Korisnici" />
                    </>
                )}

                {/* Samo za Admine */}
                {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
                    <>
                        <div className="mt-4 mb-2 text-xs uppercase text-gray-600 font-bold">Admin</div>
                        <NavItem to="/admin/users" label="Korisnici" />
                        <NavItem to="/admin/academic-years" label="Akademske Godine" />
                        <NavItem to="/admin/academic-structure" label="Akademska Struktura" />
                    </>
                )}

                <div className="mt-auto">
                    <NavItem to="/profile" label="Moj Profil" />
                </div>
            </nav>
        </div>
    );
};

const NavItem = ({ to, label }) => (
    <Link to={to} className="px-4 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
        {label}
    </Link>
);

export default Sidebar;