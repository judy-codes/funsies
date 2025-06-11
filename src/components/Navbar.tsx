import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition: number = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <ul className="navbar-links">
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink></li>
        <li><NavLink to="/experience" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Experience</NavLink></li>
        <li><NavLink to="/proud" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>What I'm Proud Of</NavLink></li>
        <li><NavLink to="/beyond-work" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Beyond Work</NavLink></li>
        <li><NavLink to="/values" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Values</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar; 