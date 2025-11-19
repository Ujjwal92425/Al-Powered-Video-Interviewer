import React from 'react';
import './QuestionDisplay.css';

const QuestionDisplay = ({ question, questionNumber }) => {
  return (
    <div className="question-display">
      <div className="question-badge">{question.category}</div>
      <h2 className="question-number">Question {questionNumber}</h2>
      <p className="question-text">{question.text}</p>
    </div>
  );
};

export default QuestionDisplay;