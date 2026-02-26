const Card = ({ children }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            {children}
        </div>
    );
};

export default Card;