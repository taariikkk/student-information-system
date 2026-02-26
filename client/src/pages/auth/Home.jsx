import Card from "../../components/ui/Card";

const Home = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <h3 className="text-gray-500 text-sm">Ukupno predmeta</h3>
                <p className="text-3xl font-bold text-indigo-600">6</p>
            </Card>

            <Card>
                <h3 className="text-gray-500 text-sm">Prosjek ocjena</h3>
                <p className="text-3xl font-bold text-indigo-600">8.7</p>
            </Card>

            <Card>
                <h3 className="text-gray-500 text-sm">ECTS bodovi</h3>
                <p className="text-3xl font-bold text-indigo-600">180</p>
            </Card>
        </div>
    );
};

export default Home;