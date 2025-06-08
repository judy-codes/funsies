import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Ask About Me</NavLink></li>
        <li><NavLink to="/experience" className={({ isActive }) => isActive ? 'active' : ''}>Experience</NavLink></li>
        <li><NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink></li>
        <li><NavLink to="/values" className={({ isActive }) => isActive ? 'active' : ''}>Values</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar; 