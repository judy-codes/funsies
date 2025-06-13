import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Values from './pages/Values';
import Experience from './pages/Experience';
import Proud from './pages/Proud';
import BeyondWork from './pages/BeyondWork';
import SocialIcons from './components/SocialIcons/SocialIcons';

function App() {
  return (
    <Router basename="/funsies">
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/values" element={<Values />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/proud" element={<Proud />} />
            <Route path="/beyond-work" element={<BeyondWork />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <SocialIcons />
      </div>
    </Router>
  );
}

export default App;
