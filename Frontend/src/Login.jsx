import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { API_URL } from "./config";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {

    if (!email.trim()) {
        toast.error("Please enter your email");
        return;
    }

    if (!password.trim()) {
        toast.error("Please enter your password");
        return;
    }

    setLoading(true);

    try {

        const response = await fetch(`${API_URL}/api/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            toast.error(
                data.message || "Invalid email or password"
            );

            return;
        }

        
        localStorage.setItem("token", data.token);

        localStorage.setItem(
        "user",
        JSON.stringify(data.user)
        );

        toast.success("Login successful 🎉");

        navigate("/dashboard");

    } catch (error) {

        console.error("Login error:", error);

        toast.error(
            "Unable to connect to server"
        );

    } finally {

        setLoading(false);
    }
};
  
  return (
    <div className="loginPage">

        <div className="loginCard">

            <img
                src="/favicon.png"
                alt="Vyora AI"
                className="loginLogo"
            />

            <h1>Welcome Back</h1>

            <p className="loginSubtitle">
                Sign in to continue using <span>Vyora AI</span>
            </p>

            {/* Email */}
            <div className="inputGroup">
                <Mail size={18} />

                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* Password */}
            <div className="inputGroup">
                <Lock size={18} />

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="button"
                    className="eyeBtn"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>
            </div>

            <div className="forgotRow">
                <a href="#">Forgot Password?</a>
            </div>

            <button
                className="loginBtn"
                disabled={loading}
                onClick={handleLogin}
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            <div className="divider">
                <span>OR</span>
            </div>

            <button className="socialBtn">
                <FcGoogle size={22} />
                Continue with Google
            </button>

            <button className="socialBtn github">
                <FaGithub size={20} />
                Continue with GitHub
            </button>

            <p className="signupText">
                Don't have an account?
                <Link to="/signup"> Sign Up</Link>
            </p>

        </div>

    </div>
);
}

export default Login;