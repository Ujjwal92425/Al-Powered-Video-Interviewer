import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Home from './pages/Home';
import Interview from './pages/Interview';
import Admin from './pages/Admin';
import Report from './pages/Report';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/report/:id" element={<Report />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;