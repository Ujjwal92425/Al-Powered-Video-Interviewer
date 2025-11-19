import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InterviewRoom from '../components/Interview/InterviewRoom';
import { questionsAPI, interviewsAPI } from '../services/api';
import './Interview.css';

const Interview = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [interviewId, setInterviewId] = useState(null);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await questionsAPI.getAll();
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Failed to load questions. Using default questions.');
      // Fallback questions
      setQuestions([
        { _id: '1', text: "Tell me about yourself", category: "HR", keywords: ["experience", "skills", "background"] },
        { _id: '2', text: "What are your strengths?", category: "HR", keywords: ["leadership", "communication", "technical"] },
        { _id: '3', text: "Describe a challenging project", category: "Behavioral", keywords: ["problem", "solution", "teamwork"] }
      ]);
    }
  };

  const startInterview = async () => {
    if (!candidateName.trim()) {
      alert('Please enter your name');
      return;
    }

    setLoading(true);
    try {
      const response = await interviewsAPI.create({
        candidateName,
        candidateEmail
      });
      setInterviewId(response.data._id);
      setStarted(true);
    } catch (error) {
      console.error('Error starting interview:', error);
      // Continue anyway for demo purposes
      setInterviewId('demo-' + Date.now());
      setStarted(true);
    } finally {
      setLoading(false);
    }
  };

  if (started && questions.length > 0) {
    return (
      <InterviewRoom
        questions={questions}
        interviewId={interviewId}
        candidateName={candidateName}
        onComplete={(reportId) => navigate(`/report/${reportId || interviewId}`)}
      />
    );
  }

  return (
    <div className="interview-page">
      <div className="interview-setup-card">
        <h1>Ready for Your Interview?</h1>
        <p className="setup-description">
          Please provide your details below to begin the interview session.
        </p>

        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your full name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address (Optional)</label>
          <input
            type="email"
            className="form-input"
            placeholder="your.email@example.com"
            value={candidateEmail}
            onChange={(e) => setCandidateEmail(e.target.value)}
          />
        </div>

        <div className="interview-info">
          <h3>Interview Details:</h3>
          <ul>
            <li>📝 {questions.length} questions</li>
            <li>⏱️ Approximately {questions.length * 3} minutes</li>
            <li>🎤 Voice-based interaction</li>
            <li>📊 Instant AI evaluation</li>
          </ul>
        </div>

        <button
          className="btn btn-primary btn-large"
          onClick={startInterview}
          disabled={loading || !candidateName.trim()}
        >
          {loading ? 'Starting...' : 'Start Interview'}
        </button>

        <div className="setup-note">
          <p>💡 Tip: Make sure your microphone is enabled and you're in a quiet environment.</p>
        </div>
      </div>
    </div>
  );
};

export default Interview;