import React from 'react';
import './Avatar.css';

const Avatar = ({ state = 'idle' }) => {
  return (
    <div className="avatar-container">
      <div className={`avatar ${state}`}>
        <div className="avatar-head">
          <div className="avatar-face">
            <div className="avatar-eyes">
              <div className="eye left"></div>
              <div className="eye right"></div>
            </div>
            <div className={`avatar-mouth ${state === 'speaking' ? 'speaking' : ''}`}></div>
          </div>
        </div>
        <div className="avatar-body"></div>
      </div>
      
      {state === 'speaking' && (
        <div className="sound-waves">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>
      )}
      
      {state === 'listening' && (
        <div className="listening-indicator">
          <div className="mic-icon">🎤</div>
          <div className="pulse-ring"></div>
        </div>
      )}
      
      <div className="avatar-status">
        {state === 'idle' && <span>Ready to Interview</span>}
        {state === 'speaking' && <span>Speaking...</span>}
        {state === 'listening' && <span>Listening...</span>}
      </div>
    </div>
  );
};

export default Avatar;