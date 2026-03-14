import { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
    getAllYears, createYear, getAllPrograms, createProgram, getAllCourses, createCourse,
    getAllProgramLevels, createProgramLevel, getAllStudyYears, createStudyYear
} from "../../services/admin/academicApi.js";

const AcademicStructure = () => {
    const [activeTab, setActiveTab] = useState("LEVELS");
    const [levels, setLevels] = useState([]);
    const [studyYears, setStudyYears] = useState([]);
    const [years, setYears] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [courses, setCourses] = useState([]);

    const [newLevelName, setNewLevelName] = useState("");
    const [newStudyYearName, setNewStudyYearName] = useState("");
    const [newYearName, setNewYearName] = useState("");
    const [newProgram, setNewProgram] = useState({ name: "", duration: "", programLevelId: "" });
    const [newCourse, setNewCourse] = useState({ name: "", ects: "", syllabus: "", programIds: [] });

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const [lRes, syRes, yRes, pRes, cRes] = await Promise.all([
                getAllProgramLevels(), getAllStudyYears(), getAllYears(), getAllPrograms(), getAllCourses()
            ]);
            setLevels(lRes.data); setStudyYears(syRes.data); setYears(yRes.data);
            setPrograms(pRes.data); setCourses(cRes.data);
        } catch (error) { toast.error("Greška pri učitavanju podataka."); }
    };

    const handleCreateLevel = async (e) => { e.preventDefault(); await createProgramLevel(newLevelName); setNewLevelName(""); loadData(); toast.success("Kreirano"); };
    const handleCreateStudyYear = async (e) => { e.preventDefault(); await createStudyYear(newStudyYearName); setNewStudyYearName(""); loadData(); toast.success("Kreirano"); };
    const handleCreateYear = async (e) => { e.preventDefault(); await createYear(newYearName); setNewYearName(""); loadData(); toast.success("Kreirano"); };

    const handleCreateProgram = async (e) => {
        e.preventDefault();
        await createProgram(newProgram.name, newProgram.duration, newProgram.programLevelId);
        setNewProgram({ name: "", duration: "", programLevelId: "" }); loadData(); toast.success("Kreirano");
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();
        if(newCourse.programIds.length === 0) return toast.error("Odaberi bar jedan program!");
        await createCourse(newCourse);
        setNewCourse({ name: "", ects: "", syllabus: "", programIds: [] }); loadData(); toast.success("Kreirano");
    };

    const handleProgramCheckbox = (progId) => {
        setNewCourse(prev => ({
            ...prev,
            programIds: prev.programIds.includes(progId)
                ? prev.programIds.filter(id => id !== progId)
                : [...prev.programIds, progId]
        }));
    };

    const TabBtn = ({ id, label }) => (
        <button onClick={() => setActiveTab(id)} className={`pb-2 px-4 ${activeTab === id ? "border-b-2 border-indigo-600 font-bold text-indigo-600" : "text-gray-500"}`}>{label}</button>
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Akademska Struktura</h1>

            <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
                <TabBtn id="LEVELS" label="Nivoi Programa" />
                <TabBtn id="STUDY_YEARS" label="Studijske Godine" />
                <TabBtn id="YEARS" label="Akademske Godine" />
                <TabBtn id="PROGRAMS" label="Programi" />
                <TabBtn id="COURSES" label="Kursevi" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* LISTA */}
                <div className="bg-white p-4 rounded-xl shadow-sm h-fit max-h-[600px] overflow-y-auto">
                    <h3 className="font-bold mb-4 border-b pb-2">Postojeći Podaci</h3>
                    <ul className="flex flex-col gap-2">
                        {activeTab === "LEVELS" && levels.map(x => <li key={x.id} className="p-2 bg-gray-50 rounded">{x.name}</li>)}
                        {activeTab === "STUDY_YEARS" && studyYears.map(x => <li key={x.id} className="p-2 bg-gray-50 rounded">{x.name}</li>)}
                        {activeTab === "YEARS" && years.map(x => <li key={x.id} className="p-2 bg-gray-50 rounded">{x.name} {x.active && "(Aktivna)"}</li>)}
                        {activeTab === "PROGRAMS" && programs.map(x => <li key={x.id} className="p-2 bg-gray-50 rounded"><b>{x.name}</b> - {x.programLevel?.name} ({x.durationInYears} god)</li>)}
                        {activeTab === "COURSES" && courses.map(c => (
                            <li key={c.id} className="p-3 border rounded border-gray-200">
                                <Link to={`/admin/courses/${c.id}`} className="font-bold text-indigo-600 hover:underline">{c.name} ({c.ectsPoints} ECTS)</Link>
                                <p className="text-xs text-gray-500 mt-1">Programi: {c.programs?.map(p => p.name).join(', ')}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* FORMA ZA KREIRANJE */}
                <div className="bg-gray-50 p-6 rounded-xl h-fit border border-gray-200">
                    <h3 className="font-bold mb-4 text-indigo-600">Dodaj Novo</h3>

                    {activeTab === "LEVELS" && (
                        <form onSubmit={handleCreateLevel} className="flex flex-col gap-4">
                            <Input label="Naziv (npr. Bachelor)" value={newLevelName} onChange={(e) => setNewLevelName(e.target.value)} required />
                            <Button type="submit">Dodaj Nivo</Button>
                        </form>
                    )}

                    {activeTab === "STUDY_YEARS" && (
                        <form onSubmit={handleCreateStudyYear} className="flex flex-col gap-4">
                            <Input label="Naziv (npr. Godina I)" value={newStudyYearName} onChange={(e) => setNewStudyYearName(e.target.value)} required />
                            <Button type="submit">Dodaj Studijsku Godinu</Button>
                        </form>
                    )}

                    {activeTab === "YEARS" && (
                        <form onSubmit={handleCreateYear} className="flex flex-col gap-4">
                            <Input label="Naziv (npr. 2023/2024)" value={newYearName} onChange={(e) => setNewYearName(e.target.value)} required />
                            <Button type="submit">Dodaj Ak. Godinu</Button>
                        </form>
                    )}

                    {activeTab === "PROGRAMS" && (
                        <form onSubmit={handleCreateProgram} className="flex flex-col gap-4">
                            <Input label="Naziv Programa" value={newProgram.name} onChange={(e) => setNewProgram({...newProgram, name: e.target.value})} required />
                            <Input label="Trajanje (godine)" type="number" value={newProgram.duration} onChange={(e) => setNewProgram({...newProgram, duration: e.target.value})} required />
                            <select value={newProgram.programLevelId} onChange={(e) => setNewProgram({...newProgram, programLevelId: e.target.value})} className="p-2 border rounded" required>
                                <option value="">Odaberi nivo...</option>
                                {levels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                            </select>
                            <Button type="submit">Kreiraj Program</Button>
                        </form>
                    )}

                    {activeTab === "COURSES" && (
                        <form onSubmit={handleCreateCourse} className="flex flex-col gap-4">
                            <Input label="Naziv Kursa" value={newCourse.name} onChange={(e) => setNewCourse({...newCourse, name: e.target.value})} required />
                            <Input label="ECTS Bodovi" type="number" value={newCourse.ects} onChange={(e) => setNewCourse({...newCourse, ects: e.target.value})} required />
                            <Input label="Syllabus" value={newCourse.syllabus} onChange={(e) => setNewCourse({...newCourse, syllabus: e.target.value})} required />

                            {/* Višestruki odabir programa */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold text-gray-700">Pripada Programima:</label>
                                <div className="max-h-32 overflow-y-auto border p-2 rounded bg-white">
                                    {programs.map(p => (
                                        <label key={p.id} className="flex items-center gap-2 text-sm p-1 hover:bg-gray-50 cursor-pointer">
                                            <input type="checkbox" checked={newCourse.programIds.includes(p.id)} onChange={() => handleProgramCheckbox(p.id)} />
                                            {p.name} ({p.programLevel?.name})
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <Button type="submit">Kreiraj Kurs</Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
export default AcademicStructure;