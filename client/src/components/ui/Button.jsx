const Button = ({ children, type = "button", onClick, disabled, variant = "primary" }) => {

    const base = "w-full py-2 rounded-xl font-medium transition-all duration-300";

    const styles = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${styles[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {children}
        </button>
    );
};

export default Button;