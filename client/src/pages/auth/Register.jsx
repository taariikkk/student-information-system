import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Register = () => {

    const { register, isLoading } = useAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        dateOfBirth: "",
        address: "",
        role: "STUDENT",
        studentType: "STANDARD"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-2xl shadow-xl w-[600px] flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold text-center">Registracija</h2>

                <div className="grid grid-cols-2 gap-4">
                    <Input label="Ime" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    <Input label="Prezime" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    <Input label="Lozinka" type="password" name="password" value={formData.password} onChange={handleChange} required />
                    <Input label="Telefon" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    <Input label="Datum rođenja" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                    <div className="col-span-2">
                        <Input label="Adresa" name="address" value={formData.address} onChange={handleChange} required />
                    </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Registracija..." : "Registruj se"}
                </Button>

                <p className="text-center text-sm">
                    Imate nalog?{" "}
                    <Link to="/login" className="text-indigo-600 font-medium hover:underline">
                        Prijavite se
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;