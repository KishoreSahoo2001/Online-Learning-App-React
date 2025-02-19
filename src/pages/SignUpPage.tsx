import React, { useState } from "react";
import '../styles/SignUpPage.css';
import api from '../interceptor/api';
import { useNavigate } from "react-router-dom";
import InputField from '../components/InputField';
import ErrorMessage from '../components/ErrorMessage';
import apiRoutes from "../routes/apiRoutes";

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
            const response = await api.post(apiRoutes.SIGNUP, { username, email, password });

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
                {error && <ErrorMessage message={error} />}
                <form onSubmit={handleSignup}>
                    <InputField
                        type="text"
                        placeholder="Enter username"
                        ariaLabel="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        imgSrc='/assets/images/user1.png'
                    />
                    <InputField
                        type="email"
                        placeholder="Enter email id"
                        ariaLabel="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        imgSrc='/assets/images/envelope2.png'
                    />
                    <InputField
                        type="password"
                        placeholder="Enter password"
                        ariaLabel="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        imgSrc='/assets/images/key1.png'
                    />
                    <InputField
                        type="password"
                        placeholder="Confirm password"
                        ariaLabel="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        imgSrc='/assets/images/key1.png'
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;