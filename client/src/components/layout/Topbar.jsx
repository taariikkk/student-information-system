import { useAuth } from "../../hooks/useAuth";

const Topbar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>

            <button
                onClick={logout}
                className="text-sm bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Topbar;