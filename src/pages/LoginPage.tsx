import React, { useState } from 'react';
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import api from '../interceptor/api';
import InputField from '../components/InputField';
import ErrorMessage from '../components/ErrorMessage';
import apiRoutes from "../routes/apiRoutes";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post(apiRoutes.LOGIN, { username, password });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', username);
                navigate('/home');
            }
        } catch (error: unknown) {
            setError('Login failed. Please check your credentials and try again.');
            console.error('error', error);
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
                {error && <ErrorMessage message={error} />}
                <form onSubmit={handleSubmit}>
                    <InputField
                        type="text"
                        placeholder="Enter username"
                        ariaLabel="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        imgSrc="/assets/images/user1.png"
                    />
                    <InputField
                        type="password"
                        placeholder="Enter password"
                        ariaLabel="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        imgSrc="/assets/images/key1.png"
                        isPasswordField={true}
                        showPassword={showPassword}
                        togglePasswordVisibility={() => setShowPassword(!showPassword)}
                    />
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