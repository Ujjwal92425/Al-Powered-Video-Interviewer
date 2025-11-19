export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const QUESTION_CATEGORIES = {
  HR: 'HR',
  TECHNICAL: 'Technical',
  BEHAVIORAL: 'Behavioral'
};

export const DIFFICULTY_LEVELS = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
};

export const INTERVIEW_STATUS = {
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed'
};

export const AVATAR_STATES = {
  IDLE: 'idle',
  SPEAKING: 'speaking',
  LISTENING: 'listening'
};

export const SCORE_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  AVERAGE: 40,
  POOR: 0
};