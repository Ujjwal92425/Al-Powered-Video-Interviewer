import React, { useState, useEffect } from 'react';
import { questionsAPI } from '../../services/api';
import { QUESTION_CATEGORIES, DIFFICULTY_LEVELS } from '../../utils/constants';
import './QuestionManager.css';

const QuestionManager = () => {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    category: 'Technical',
    keywords: '',
    difficulty: 'Medium'
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await questionsAPI.getAll();
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const questionData = {
      ...formData,
      keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean)
    };

    try {
      if (editingQuestion) {
        await questionsAPI.update(editingQuestion._id, questionData);
      } else {
        await questionsAPI.create(questionData);
      }
      
      fetchQuestions();
      resetForm();
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Failed to save question');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await questionsAPI.delete(id);
        fetchQuestions();
      } catch (error) {
        console.error('Error deleting question:', error);
        alert('Failed to delete question');
      }
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setFormData({
      text: question.text,
      category: question.category,
      keywords: question.keywords.join(', '),
      difficulty: question.difficulty
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      text: '',
      category: 'Technical',
      keywords: '',
      difficulty: 'Medium'
    });
    setEditingQuestion(null);
    setShowForm(false);
  };

  return (
    <div className="question-manager">
      <div className="manager-header">
        <h2>Question Bank ({questions.length} questions)</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '✕ Cancel' : '+ Add Question'}
        </button>
      </div>

      {showForm && (
        <form className="question-form" onSubmit={handleSubmit}>
          <h3>{editingQuestion ? 'Edit Question' : 'Add New Question'}</h3>
          
          <div className="form-group">
            <label className="form-label">Question Text *</label>
            <textarea
              className="form-textarea"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              required
              placeholder="Enter your question here..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {Object.values(QUESTION_CATEGORIES).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Difficulty *</label>
              <select
                className="form-select"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              >
                {Object.values(DIFFICULTY_LEVELS).map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Keywords (comma separated) *</label>
            <input
              type="text"
              className="form-input"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              placeholder="e.g., javascript, closure, scope"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-success">
              {editingQuestion ? 'Update Question' : 'Add Question'}
            </button>
            <button type="button" className="btn btn-outline" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="questions-list">
        {questions.map((question) => (
          <div key={question._id} className="question-card">
            <div className="question-card-header">
              <div>
                <span className={`category-badge ${question.category.toLowerCase()}`}>
                  {question.category}
                </span>
                <span className={`difficulty-badge ${question.difficulty.toLowerCase()}`}>
                  {question.difficulty}
                </span>
              </div>
              <div className="question-actions">
                <button
                  className="btn-icon edit"
                  onClick={() => handleEdit(question)}
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  className="btn-icon delete"
                  onClick={() => handleDelete(question._id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
            <p className="question-text">{question.text}</p>
            <div className="question-keywords">
              <strong>Keywords:</strong> {question.keywords.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionManager;