import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { createUser } from "../../services/admin/userApi.js";

const CreateUserModal = ({ onClose, onUserCreated }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        dateOfBirth: "",
        role: "STUDENT",
        studentType: "STANDARD", // Default vrijednost
        facultyType: "PROFESSOR" // Default vrijednost
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await createUser(formData);
            toast.success("Korisnik uspješno kreiran!");
            onUserCreated(); // Osvježi tabelu
            onClose(); // Zatvori modal
        } catch (error) {
            toast.error("Greška pri kreiranju korisnika.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[500px] max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Novi Korisnik</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Ime" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        <Input label="Prezime" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    <Input label="Lozinka" type="password" name="password" value={formData.password} onChange={handleChange} required />
                    <Input label="Telefon" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    <Input label="Adresa" name="address" value={formData.address} onChange={handleChange} required />
                    <Input label="Datum rođenja" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />

                    {/* Role Selection */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">Uloga</label>
                        <select name="role" value={formData.role} onChange={handleChange} className="px-4 py-2 border border-gray-200 rounded-xl">
                            <option value="STUDENT">Student</option>
                            <option value="FACULTY">Nastavno osoblje</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    {/* Conditional Fields */}
                    {formData.role === "STUDENT" && (
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Tip Studenta</label>
                            <select name="studentType" value={formData.studentType} onChange={handleChange} className="px-4 py-2 border border-gray-200 rounded-xl">
                                <option value="STANDARD">Redovan</option>
                                <option value="EXTERNAL">Vanredan</option>
                            </select>
                        </div>
                    )}

                    {formData.role === "FACULTY" && (
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-600">Tip Osoblja</label>
                            <select name="facultyType" value={formData.facultyType} onChange={handleChange} className="px-4 py-2 border border-gray-200 rounded-xl">
                                <option value="PROFESSOR">Profesor</option>
                                <option value="ASSISTANT">Asistent</option>
                            </select>
                        </div>
                    )}

                    <div className="flex gap-2 mt-4">
                        <Button variant="secondary" onClick={onClose}>Otkaži</Button>
                        <Button type="submit" disabled={isLoading}>{isLoading ? "Kreiranje..." : "Sačuvaj"}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserModal;