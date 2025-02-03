import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const username = localStorage.getItem('username') ?? 'User';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="homepage-container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h1>Welcome, {username}</h1>
    </div>
  );
};

export default HomePage;