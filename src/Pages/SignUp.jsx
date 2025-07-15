import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Background from "../Components/Background";

const SignUp = () => {
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.username.trim()) return toast.error("Username required");
        if (!formData.email.trim()) return toast.error("Email required");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Format");
        if (!formData.password) return toast.error("Password required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

        return true;
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valid = validateForm(formData);
        if (valid === true) {
            await signup(formData)
            navigate("/");
        };
    };

    return (
        
        <div className="relative z-10 text-center h-screen flex flex-col justify-center items-center">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-96 border-4 border-red-600">
                <h2 className="text-2xl font-bold text-center mb-4 font-mono text-red-600">
                    SIGN UP
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        
                    />
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
                            className="absolute right-3 top-2 text-gray-500"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={isSigningUp}
                        className="bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-all disabled:bg-gray-400"
                    >
                        {isSigningUp ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-700">
                    Existing user?{" "}
                    <Link to="/login" className="text-red-600 font-bold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
        
    );
};

export default SignUp;
