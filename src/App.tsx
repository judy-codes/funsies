import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Values from './pages/Values';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import SocialIcons from './components/SocialIcons';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/values" element={<Values />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
        <SocialIcons />
      </div>
    </Router>
  );
}

export default App;
