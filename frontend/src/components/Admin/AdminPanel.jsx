import React, { useState } from 'react';
import QuestionManager from './QuestionManager';
import InterviewSettings from './InterviewSettings';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('questions');

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage interview questions and settings</p>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          📝 Question Bank
        </button>
        <button
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'questions' && <QuestionManager />}
        {activeTab === 'settings' && <InterviewSettings />}
      </div>
    </div>
  );
};

export default AdminPanel;