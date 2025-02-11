import React from 'react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} My Online Learning App. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;