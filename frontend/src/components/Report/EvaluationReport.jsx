import React from 'react';
import { useNavigate } from 'react-router-dom';
import ScoreCard from './ScoreCard';
// import './EvaluationReport.css';

const EvaluationReport = ({ interview }) => {
  const navigate = useNavigate();

  return (
    <div className="evaluation-report">
      <div className="report-header">
        <h1>Interview Evaluation Report</h1>
        <p className="candidate-name">Candidate: {interview.candidateName}</p>
        <p className="report-date">
          Completed: {new Date(interview.completedAt || Date.now()).toLocaleDateString()}
        </p>
      </div>

      <ScoreCard score={interview.overallScore} />

      <div className="report-section">
        <div className="strengths-weaknesses">
          <div className="strengths-card">
            <h3>💪 Strengths</h3>
            <ul>
              {interview.strengths?.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>

          <div className="weaknesses-card">
            <h3>📈 Areas for Improvement</h3>
            <ul>
              {interview.weaknesses?.map((weakness, index) => (
                <li key={index}>{weakness}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="report-section">
        <div className="summary-card">
          <h3>📝 Summary</h3>
          <p>{interview.summary}</p>
        </div>
      </div>

      {interview.responses && interview.responses.length > 0 && (
        <div className="report-section">
          <h3>Question-wise Performance</h3>
          {interview.responses.map((response, index) => (
            <div key={index} className="response-card">
              <div className="response-header">
                <h4>Q{index + 1}: {response.questionText}</h4>
                <div className="response-score">{response.score}%</div>
              </div>
              <p className="response-transcript">{response.transcript}</p>
              {response.missingKeywords?.length > 0 && (
                <div className="missing-keywords">
                  <strong>Missing concepts:</strong> {response.missingKeywords.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="report-actions">
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
        <button className="btn btn-outline" onClick={() => navigate('/interview')}>
          Take Another Interview
        </button>
      </div>
    </div>
  );
};

export default EvaluationReport;
