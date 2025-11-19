import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">AI-Powered Video Interviewer</h1>
        <p className="hero-subtitle">
          Practice your interview skills with our AI interviewer. 
          Get instant feedback and improve your performance.
        </p>
        <button 
          className="btn btn-primary btn-large"
          onClick={() => navigate('/interview')}
        >
          Start Interview Now
        </button>
      </div>

      <div className="features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎤</div>
            <h3>Voice Interaction</h3>
            <p>Natural conversation with AI interviewer using voice recognition</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Evaluation</h3>
            <p>Get instant AI-powered feedback on your responses</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Detailed Reports</h3>
            <p>Comprehensive evaluation with scores and improvement areas</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Customizable</h3>
            <p>Add your own questions and customize interview rounds</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Practice?</h2>
        <div className="cta-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/interview')}
          >
            Take Interview
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => navigate('/admin')}
          >
            Manage Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;