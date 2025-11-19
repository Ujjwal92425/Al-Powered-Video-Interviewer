import React from 'react';
import './ScoreCard.css';

const ScoreCard = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#3b82f6'; // Blue
    if (score >= 40) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Improvement';
  };

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="score-card">
      <h2>Overall Performance</h2>
      <div className="score-circle-container">
        <svg className="score-circle" width="200" height="200">
          <circle
            className="score-circle-bg"
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          <circle
            className="score-circle-progress"
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke={getScoreColor(score)}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 100 100)"
          />
        </svg>
        <div className="score-text">
          <div className="score-number" style={{ color: getScoreColor(score) }}>
            {score}%
          </div>
          <div className="score-label">{getScoreLabel(score)}</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;