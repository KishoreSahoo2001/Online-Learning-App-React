import React, { useState } from "react";
import '../styles/SignUpPage.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignupPage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/auth/signup",
                { username, email, password }
            );

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', username);
                navigate('/home');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Signup failed");
            } else {
                setError("Signup failed");
            }
        }
    };

    return (
        <div className="background">
            <div className="signup-form">
                <div className="header">
                    <h2>Create an Account</h2>
                </div>
                <form onSubmit={handleSignup}>
                    <div>
                        <img id='logo' src='/assets/images/user1.png' alt="User" />
                        <input
                            type="text"
                            value={username}
                            placeholder="Enter username"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <img id='logo' src='/assets/images/envelope2.png' alt="User" />
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter email id"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <img id='logo' src='/assets/images/key1.png' alt="User" />
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <img id='logo' src='/assets/images/key1.png' alt="Confirm Password" /> {/* ✅ Added confirm password field */}
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;