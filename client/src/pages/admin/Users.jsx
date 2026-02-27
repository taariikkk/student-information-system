import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/admin/userApi.js";
import Button from "../../components/ui/Button";
import CreateUserModal from "../../components/admin/CreateUserModal";
import toast from "react-hot-toast";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res.data);
        } catch (error) {
            toast.error("Ne mogu učitati korisnike.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Upravljanje Korisnicima</h1>
                <div className="w-48">
                    <Button onClick={() => setIsModalOpen(true)}>+ Novi Korisnik</Button>
                </div>
            </div>

            {isLoading ? (
                <p>Učitavanje...</p>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Ime i Prezime</th>
                            <th className="p-4 font-semibold text-gray-600">Email</th>
                            <th className="p-4 font-semibold text-gray-600">Uloga</th>
                            <th className="p-4 font-semibold text-gray-600">Akcije</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-4 font-medium">{user.firstName} {user.lastName}</td>
                                <td className="p-4 text-gray-500">{user.email}</td>
                                <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                            ${user.role === 'ADMIN' ? 'bg-red-100 text-red-600' :
                                            user.role === 'FACULTY' ? 'bg-purple-100 text-purple-600' :
                                                'bg-green-100 text-green-600'}`}>
                                            {user.role}
                                        </span>
                                </td>
                                <td className="p-4">
                                    <button className="text-indigo-600 hover:underline text-sm">Uredi</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <CreateUserModal
                    onClose={() => setIsModalOpen(false)}
                    onUserCreated={fetchUsers}
                />
            )}
        </div>
    );
};

export default Users;