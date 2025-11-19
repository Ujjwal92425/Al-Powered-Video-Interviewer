import React, { useState } from 'react';
import './InterviewSettings.css';

const InterviewSettings = () => {
  const [settings, setSettings] = useState({
    defaultQuestionCount: 5,
    timePerQuestion: 3,
    enableWebcam: false,
    enableRecording: true,
    passingScore: 60
  });

  const handleSave = () => {
    // Save settings to backend/localStorage
    localStorage.setItem('interviewSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div className="interview-settings">
      <h2>Interview Settings</h2>
      
      <div className="settings-grid">
        <div className="setting-item">
          <label className="setting-label">
            Default Number of Questions
            <input
              type="number"
              className="form-input"
              value={settings.defaultQuestionCount}
              onChange={(e) => setSettings({ ...settings, defaultQuestionCount: parseInt(e.target.value) })}
              min="1"
              max="20"
            />
          </label>
        </div>

        <div className="setting-item">
          <label className="setting-label">
            Time Per Question (minutes)
            <input
              type="number"
              className="form-input"
              value={settings.timePerQuestion}
              onChange={(e) => setSettings({ ...settings, timePerQuestion: parseInt(e.target.value) })}
              min="1"
              max="10"
            />
          </label>
        </div>

        <div className="setting-item">
          <label className="setting-label">
            Passing Score (%)
            <input
              type="number"
              className="form-input"
              value={settings.passingScore}
              onChange={(e) => setSettings({ ...settings, passingScore: parseInt(e.target.value) })}
              min="0"
              max="100"
            />
          </label>
        </div>

        <div className="setting-item">
          <label className="setting-checkbox">
            <input
              type="checkbox"
              checked={settings.enableWebcam}
              onChange={(e) => setSettings({ ...settings, enableWebcam: e.target.checked })}
            />
            Enable Webcam Monitoring
          </label>
        </div>

        <div className="setting-item">
          <label className="setting-checkbox">
            <input
              type="checkbox"
              checked={settings.enableRecording}
              onChange={(e) => setSettings({ ...settings, enableRecording: e.target.checked })}
            />
            Enable Audio Recording
          </label>
        </div>
      </div>

      <button className="btn btn-success" onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
};

export default InterviewSettings;