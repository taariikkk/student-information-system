import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const Login = () => {
    const { login, isLoading } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
    };

    return (
        <div className="min-h-screen flex">

            {/* Left branding */}
            <div className="hidden lg:flex w-1/2 bg-indigo-600 text-white items-center justify-center p-12">
                <div>
                    <h1 className="text-4xl font-bold mb-4">
                        Student Information System
                    </h1>
                    <p className="text-lg opacity-90">
                        Upravljajte studentima, predmetima i rezultatima na moderan način.
                    </p>
                </div>
            </div>

            {/* Right form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-10 rounded-2xl shadow-xl w-96 flex flex-col gap-5"
                >
                    <h2 className="text-2xl font-bold text-center">Prijava</h2>

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Lozinka"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Prijava u toku..." : "Prijavi se"}
                    </Button>

                    <p className="text-center text-sm">
                        Nemate nalog?{" "}
                        <Link to="/register" className="text-indigo-600 font-medium hover:underline">
                            Registrujte se
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;