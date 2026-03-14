import { useState, useEffect } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import toast from "react-hot-toast";
import { getUserProfile, updateUserProfile } from "../../services/profileApi.js";

const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({ phoneNumber: "", address: "", dateOfBirth: "", password: "" });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await getUserProfile();
            setProfile(res.data);
            setFormData({
                phoneNumber: res.data.phoneNumber || "",
                address: res.data.address || "",
                dateOfBirth: res.data.dateOfBirth || "",
                password: ""
            });
        } catch (error) { toast.error("Greška pri učitavanju profila"); }
        finally { setIsLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToUpdate = { ...formData };
            if (!dataToUpdate.password) delete dataToUpdate.password;

            await updateUserProfile(dataToUpdate);
            toast.success("Profil uspješno ažuriran!");
            loadProfile();
        } catch (error) { toast.error("Greška pri ažuriranju profila"); }
    };

    if (isLoading) return <p>Učitavanje...</p>;

    return (
        <div className="p-6 max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold mb-6">Moj Profil</h1>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Ime i Prezime: <span className="font-bold text-gray-800">{profile.firstName} {profile.lastName}</span></p>
                <p className="text-sm text-gray-500">Email: <span className="font-bold text-gray-800">{profile.email}</span></p>
                <p className="text-sm text-gray-500">Uloga: <span className="font-bold text-indigo-600">{profile.role}</span></p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input label="Telefon" name="phoneNumber" value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} required />
                <Input label="Adresa" name="address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required />
                <Input label="Datum rođenja" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} required />
                <Input label="Nova Lozinka (ostavi prazno ako ne mijenjaš)" type="password" name="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />

                <div className="mt-4 w-48"><Button type="submit">Spasi Izmjene</Button></div>
            </form>
        </div>
    );
};

export default Profile;