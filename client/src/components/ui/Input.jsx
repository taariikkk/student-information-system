const Input = ({ label, className, ...props }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-gray-600">{label}</label>
            <input
                {...props}
                className={`px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${className}`}
            />
        </div>
    );
};

export default Input;