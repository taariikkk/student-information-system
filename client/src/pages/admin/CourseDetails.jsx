import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getCourseById, getStudentsOnCourse, getTeachersOnCourse,
    assignTeacher, enrollStudent, getAllYears } from "../../services/admin/academicApi.js";
import { getAllUsers } from "../../services/admin/academicApi.js";
import Button from "../../components/ui/Button.jsx";

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState("");
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [assignedTeachers, setAssignedTeachers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [selectedStudentId, setSelectedStudentId] = useState("");

    useEffect(() => {
        loadInitialData();
    }, [id]);

    useEffect(() => {
        if (selectedYear) {
            loadCourseData(selectedYear);
        }
    }, [selectedYear]);

    const loadInitialData = async () => {
        try {
            const [cRes, yRes, uRes] = await Promise.all([
                getCourseById(id),
                getAllYears(),
                getAllUsers()
            ]);
            setCourse(cRes.data);
            setYears(yRes.data);
            setAllUsers(uRes.data);

            const activeYear = yRes.data.find(y => y.active);
            if (activeYear) setSelectedYear(activeYear.id);
        } catch (err) {
            toast.error("Greška pri učitavanju podataka.");
        }
    };

    const loadCourseData = async (yearId) => {
        try {
            const [sRes, tRes] = await Promise.all([
                getStudentsOnCourse(id, yearId),
                getTeachersOnCourse(id, yearId)
            ]);
            setEnrolledStudents(sRes.data);
            setAssignedTeachers(tRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAssignTeacher = async () => {
        if (!selectedTeacherId || !selectedYear) return;
        try {
            await assignTeacher(id, selectedTeacherId, selectedYear);
            toast.success("Profesor dodijeljen!");
            loadCourseData(selectedYear);
        } catch (err) { toast.error("Greška pri dodjeli."); }
    };

    const handleEnrollStudent = async () => {
        if (!selectedStudentId || !selectedYear) return;
        try {
            await enrollStudent(id, selectedStudentId, selectedYear);
            toast.success("Student upisan!");
            loadCourseData(selectedYear);
        } catch (err) { toast.error("Greška pri upisu."); }
    };

    if (!course) return <p>Učitavanje...</p>;

    const availableTeachers = allUsers.filter(u => u.role === 'FACULTY');
    const availableStudents = allUsers.filter(u => u.role === 'STUDENT');

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{course.name}</h1>
                    <p className="text-gray-500">{course.program?.name} • {course.ectsPoints} ECTS</p>
                </div>

                {/* Selektor Godine */}
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-4 py-2 border rounded-lg font-medium"
                >
                    {years.map(y => <option key={y.id} value={y.id}>{y.name}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* 1. PROFESORI */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 text-indigo-600">Nastavno Osoblje</h2>

                    {/* Dodaj novog */}
                    <div className="flex gap-2 mb-4">
                        <select
                            className="border p-2 rounded flex-1"
                            value={selectedTeacherId}
                            onChange={(e) => setSelectedTeacherId(e.target.value)}
                        >
                            <option value="">Odaberi profesora...</option>
                            {availableTeachers.map(t => (
                                <option key={t.id} value={t.id}>{t.firstName} {t.lastName}</option>
                            ))}
                        </select>
                        <Button onClick={handleAssignTeacher}>Dodaj</Button>
                    </div>

                    {/* Lista */}
                    <ul>
                        {assignedTeachers.length === 0 && <p className="text-gray-400 text-sm">Nema dodijeljenih profesora.</p>}
                        {assignedTeachers.map(t => (
                            <li key={t.id} className="p-3 border-b flex justify-between items-center">
                                <div>
                                    <div className="font-medium">{t.firstName} {t.lastName}</div>
                                    <div className="text-xs text-gray-500">{t.email}</div>
                                </div>
                                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">Profesor</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 2. STUDENTI */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 text-green-600">Upisani Studenti</h2>

                    {/* Upiši novog */}
                    <div className="flex gap-2 mb-4">
                        <select
                            className="border p-2 rounded flex-1"
                            value={selectedStudentId}
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                        >
                            <option value="">Odaberi studenta...</option>
                            {availableStudents.map(s => (
                                <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>
                            ))}
                        </select>
                        <Button onClick={handleEnrollStudent}>Upiši</Button>
                    </div>

                    {/* Lista */}
                    <ul className="max-h-96 overflow-y-auto">
                        {enrolledStudents.length === 0 && <p className="text-gray-400 text-sm">Nema upisanih studenata.</p>}
                        {enrolledStudents.map(s => (
                            <li key={s.id} className="p-3 border-b flex justify-between items-center">
                                <div>
                                    <div className="font-medium">{s.firstName} {s.lastName}</div>
                                    <div className="text-xs text-gray-500">{s.email}</div>
                                </div>
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Redovan</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default CourseDetails;