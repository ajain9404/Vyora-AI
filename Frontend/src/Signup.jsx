import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "./config";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

function Signup() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

   const handleSignup = async () => {

    if (!name.trim()) {
        toast.error("Please enter your name");
        return;
    }

    if (!email.trim()) {
        toast.error("Please enter your email");
        return;
    }

    if (!password.trim()) {
        toast.error("Please enter your password");
        return;
    }

    if (!confirmPassword.trim()) {
        toast.error("Please confirm your password");
        return;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }

    setLoading(true);

    try {

        const response = await fetch(`${API_URL}/api/signup`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {

            toast.error(
                data.message || "Signup failed"
            );

            return;
        }

        toast.success(
            "Account created successfully 🎉"
        );

        navigate("/login");

    } catch (error) {

        console.error("Signup error:", error);

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

                <h1>Create Account</h1>

                <p className="loginSubtitle">
                    Join <span>Vyora AI</span> and start building smarter.
                </p>

                <div className="inputGroup">
                    <User size={18} />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="inputGroup">
                    <Mail size={18} />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

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
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                <div className="inputGroup">
                    <Lock size={18} />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        className="eyeBtn"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                <button
                    className="loginBtn"
                    disabled={loading}
                    onClick={handleSignup}
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="signupText">
                    Already have an account?

                    <span
                        style={{
                            color: "#8B5CF6",
                            cursor: "pointer"
                        }}
                        onClick={() => navigate("/login")}
                    >
                        {" "}Login
                    </span>
                </p>

            </div>

        </div>
    );
}

export default Signup;