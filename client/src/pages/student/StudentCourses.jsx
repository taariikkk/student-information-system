import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getAllCourses, getAllYears } from "../../services/admin/academicApi.js";
import { getTeachersForCourse } from "../../services/userRolesApi.js";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const StudentCourses = () => {
    const [courses, setCourses] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedCourseTeachers, setSelectedCourseTeachers] = useState([]);
    const [activeCourseId, setActiveCourseId] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [cRes, yRes] = await Promise.all([getAllCourses(), getAllYears()]);
                setCourses(cRes.data);
                setYears(yRes.data);
                const activeYear = yRes.data.find(y => y.active);
                if (activeYear) setSelectedYear(activeYear.id);
            } catch (err) { toast.error("Greška pri učitavanju podataka."); }
        };
        loadData();
    }, []);

    const handleViewTeachers = async (courseId) => {
        if (!selectedYear) return toast.error("Odaberite akademsku godinu");
        try {
            const res = await getTeachersForCourse(courseId, selectedYear);
            setSelectedCourseTeachers(res.data);
            setActiveCourseId(courseId);
        } catch (err) { toast.error("Greška pri učitavanju profesora."); }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Pregled Predmeta i Profesora</h1>
                <select
                    value={selectedYear}
                    onChange={(e) => { setSelectedYear(e.target.value); setActiveCourseId(null); }}
                    className="px-4 py-2 border rounded-lg font-medium"
                >
                    <option value="">Odaberi godinu...</option>
                    {years.map(y => <option key={y.id} value={y.id}>{y.name}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                    {courses.map(c => (
                        <Card key={c.id}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg text-indigo-600">{c.name}</h3>
                                    <p className="text-sm text-gray-500">{c.ectsPoints} ECTS</p>
                                </div>
                                <div className="w-32">
                                    <Button onClick={() => handleViewTeachers(c.id)} variant="secondary">
                                        Vidi profesore
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {activeCourseId && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 h-fit">
                        <h2 className="text-xl font-bold mb-4 text-indigo-600">Dodijeljeno Osoblje</h2>
                        {selectedCourseTeachers.length === 0 ? (
                            <p className="text-gray-500 text-sm">Nema dodijeljenih profesora za ovu godinu.</p>
                        ) : (
                            <ul className="flex flex-col gap-3">
                                {selectedCourseTeachers.map(t => (
                                    <li key={t.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center border border-gray-100">
                                        <div>
                                            <p className="font-bold text-gray-800">{t.firstName} {t.lastName}</p>
                                            <p className="text-xs text-gray-500">{t.email}</p>
                                        </div>
                                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded font-bold">Profesor</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
export default StudentCourses;