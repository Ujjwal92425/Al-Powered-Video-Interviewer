import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EvaluationReport from '../components/Report/EvaluationReport';
import { interviewsAPI } from '../services/api';
import './Report.css';

const Report = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterview();
  }, [id]);

  const fetchInterview = async () => {
    try {
      const response = await interviewsAPI.getById(id);
      setInterview(response.data);
    } catch (error) {
      console.error('Error fetching interview:', error);
      // Use demo data if API fails
      setInterview({
        candidateName: 'Demo User',
        overallScore: 75,
        responses: [],
        strengths: ['Good communication', 'Clear answers'],
        weaknesses: ['Could provide more examples'],
        summary: 'Overall good performance with room for improvement.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="report-page">
        <div className="loading">Loading report...</div>
      </div>
    );
  }

  return (
    <div className="report-page">
      {interview ? (
        <EvaluationReport interview={interview} />
      ) : (
        <div className="error-message">
          <h2>Report Not Found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Go Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Report;