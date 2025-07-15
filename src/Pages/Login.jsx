import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Background from "../Components/Background";

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuthStore();
    const navigate = useNavigate();
    
    const validate = (data) => {
        if (!data.email.trim()) return toast.error("Email required");
        if (!data.password.trim()) return toast.error("Password required");

        return true;
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = validate(formData);
        if (success === true) { await login(formData); navigate("/")};
        
    };

    return (
        
        <div className="relative z-10 text-center h-screen flex flex-col justify-center items-center">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-96 border-4 border-red-600">
                <h2 className="text-2xl font-bold text-center mb-4 font-mono text-red-600">
                    LOGIN
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        
                    />
                    <div className="relative">
                        <input
                            type={showPass ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-red-500"
                            
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-500"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-all disabled:bg-gray-400"
                    >
                        {isLoggingIn ? "Logging In..." : "Login"}
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-700">
                    New here?{" "}
                    <Link to="/signup" className="text-red-600 font-bold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
        
    );
};

export default Login;
