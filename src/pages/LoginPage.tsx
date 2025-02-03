import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                username,
                password
            });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', username);
                navigate('/home');
            }
        } catch (error: unknown) {
            console.error("Login error:", error);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    const goToSignUp = () => {
        navigate('/signup');
    };

    return (
        <div className="background">
            <div className="login-form">
                <div className="header">
                    <h2>Log in into your Account</h2>
                </div>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <img id='logo' src="/assets/images/user1.png" alt="User" />
                        <input
                            type="text"
                            placeholder="Enter username"
                            aria-label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <img id='logo' src='/assets/images/key1.png' alt="User" />
                        <input
                            type="password"
                            placeholder="Enter password"
                            aria-label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit">Login</button>
                        <button type="button" onClick={goToSignUp}>Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;