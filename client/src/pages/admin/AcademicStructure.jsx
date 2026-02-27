import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import toast from "react-hot-toast";
import { getAllYears, createYear, getAllPrograms, createProgram, getAllCourses, createCourse } from "../../services/admin/academicApi.js";

const AcademicStructure = () => {
    const [activeTab, setActiveTab] = useState("YEARS");
    const [years, setYears] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [courses, setCourses] = useState([]);
    const [newYearName, setNewYearName] = useState("");
    const [newProgram, setNewProgram] = useState({ name: "", duration: "" });
    const [newCourse, setNewCourse] = useState({ name: "", ects: "", syllabus: "", programId: "" });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [yRes, pRes, cRes] = await Promise.all([getAllYears(), getAllPrograms(), getAllCourses()]);
            setYears(yRes.data);
            setPrograms(pRes.data);
            setCourses(cRes.data);
        } catch (error) {
            toast.error("Greška pri učitavanju podataka.");
        }
    };

    const handleCreateYear = async (e) => {
        e.preventDefault();
        try {
            await createYear(newYearName);
            toast.success("Godina kreirana!");
            setNewYearName("");
            loadData();
        } catch (err) { toast.error("Greška."); }
    };

    const handleCreateProgram = async (e) => {
        e.preventDefault();
        try {
            await createProgram(newProgram.name, newProgram.duration);
            toast.success("Program kreiran!");
            setNewProgram({ name: "", duration: "" });
            loadData();
        } catch (err) { toast.error("Greška."); }
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        try {
            await createCourse(newCourse);
            toast.success("Kurs kreiran!");
            setNewCourse({ name: "", ects: "", syllabus: "", programId: "" });
            loadData();
        } catch (err) { toast.error("Greška."); }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Akademska Struktura</h1>

            {/* TABS */}
            <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button onClick={() => setActiveTab("YEARS")} className={`pb-2 px-4 ${activeTab === "YEARS" ? "border-b-2 border-indigo-600 font-bold text-indigo-600" : "text-gray-500"}`}>Godine</button>
                <button onClick={() => setActiveTab("PROGRAMS")} className={`pb-2 px-4 ${activeTab === "PROGRAMS" ? "border-b-2 border-indigo-600 font-bold text-indigo-600" : "text-gray-500"}`}>Programi</button>
                <button onClick={() => setActiveTab("COURSES")} className={`pb-2 px-4 ${activeTab === "COURSES" ? "border-b-2 border-indigo-600 font-bold text-indigo-600" : "text-gray-500"}`}>Kursevi</button>
            </div>

            {/* SADRŽAJ TABOVA */}

            {/* 1. GODINE */}
            {activeTab === "YEARS" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Lista */}
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                        <h3 className="font-bold mb-4">Postojeće Godine</h3>
                        <ul>
                            {years.map(y => (
                                <li key={y.id} className="p-2 border-b flex justify-between">
                                    <span>{y.name}</span>
                                    <span className={y.active ? "text-green-600 text-xs" : "text-red-600 text-xs"}>{y.active ? "Aktivna" : "Neaktivna"}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Forma */}
                    <div className="bg-gray-50 p-6 rounded-xl h-fit">
                        <h3 className="font-bold mb-4">Nova Godina</h3>
                        <form onSubmit={handleCreateYear} className="flex gap-2">
                            <Input placeholder="npr. 2023/2024" value={newYearName} onChange={(e) => setNewYearName(e.target.value)} required />
                            <Button type="submit">Dodaj</Button>
                        </form>
                    </div>
                </div>
            )}

            {/* 2. PROGRAMI */}
            {activeTab === "PROGRAMS" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                        <h3 className="font-bold mb-4">Postojeći Programi</h3>
                        <ul>
                            {programs.map(p => (
                                <li key={p.id} className="p-2 border-b flex justify-between">
                                    <span>{p.name}</span>
                                    <span className="text-gray-500 text-sm">{p.durationInYears} god.</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl h-fit">
                        <h3 className="font-bold mb-4">Novi Program</h3>
                        <form onSubmit={handleCreateProgram} className="flex flex-col gap-4">
                            <Input label="Naziv" value={newProgram.name} onChange={(e) => setNewProgram({...newProgram, name: e.target.value})} required />
                            <Input label="Trajanje (god)" type="number" value={newProgram.duration} onChange={(e) => setNewProgram({...newProgram, duration: e.target.value})} required />
                            <Button type="submit">Kreiraj</Button>
                        </form>
                    </div>
                </div>
            )}

            {/* 3. KURSEVI */}
            {activeTab === "COURSES" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                        <h3 className="font-bold mb-4">Postojeći Kursevi</h3>
                        <ul>
                            {courses.map(c => (
                                <li key={c.id} className="p-2 border-b">
                                    <div className="font-medium">{c.name} ({c.ectsPoints} ECTS)</div>
                                    <div className="text-xs text-gray-500">{c.program?.name}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl h-fit">
                        <h3 className="font-bold mb-4">Novi Kurs</h3>
                        <form onSubmit={handleCreateCourse} className="flex flex-col gap-4">
                            <Input label="Naziv" value={newCourse.name} onChange={(e) => setNewCourse({...newCourse, name: e.target.value})} required />
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="ECTS" type="number" value={newCourse.ects} onChange={(e) => setNewCourse({...newCourse, ects: e.target.value})} required />

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-600">Program</label>
                                    <select
                                        value={newCourse.programId}
                                        onChange={(e) => setNewCourse({...newCourse, programId: e.target.value})}
                                        className="px-4 py-2 border border-gray-200 rounded-xl"
                                        required
                                    >
                                        <option value="">Odaberi...</option>
                                        {programs.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <Input label="Syllabus" value={newCourse.syllabus} onChange={(e) => setNewCourse({...newCourse, syllabus: e.target.value})} required />
                            <Button type="submit">Kreiraj</Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AcademicStructure;