import React, { useState, useEffect } from 'react';
import audioService from '../../services/audioService';
import speechService from '../../services/speechService';
import { AVATAR_STATES } from '../../utils/constants';
import './AudioRecorder.css';

const AudioRecorder = ({ onComplete, disabled, avatarState }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      await audioService.startRecording();
      
      speechService.startRecognition(
        (result) => {
          setTranscript((prev) => prev + result.final);
          setInterimTranscript(result.interim);
        },
        () => {
          console.log('Recognition ended');
        },
        (error) => {
          console.error('Recognition error:', error);
        }
      );

      setIsRecording(true);
    } catch (error) {
      alert('Microphone access denied. Please enable microphone permissions.');
    }
  };

  const stopRecording = async () => {
    try {
      const { audioBlob } = await audioService.stopRecording();
      speechService.stopRecognition();
      
      setIsRecording(false);
      setInterimTranscript('');
      
      if (transcript.trim()) {
        onComplete(transcript, audioBlob);
        setTranscript('');
      } else {
        alert('No speech detected. Please try again.');
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const canRecord = !disabled && avatarState === AVATAR_STATES.LISTENING;

  return (
    <div className="audio-recorder">
      {(transcript || interimTranscript) && (
        <div className="transcript-display">
          <h4>Your Response:</h4>
          <p>{transcript}<span className="interim">{interimTranscript}</span></p>
        </div>
      )}

      <div className="recorder-controls">
        {!isRecording ? (
          <button
            className={`btn btn-record ${!canRecord ? 'disabled' : ''}`}
            onClick={startRecording}
            disabled={!canRecord}
          >
            <span className="mic-icon">🎤</span>
            {canRecord ? 'Start Recording' : 'Wait for question...'}
          </button>
        ) : (
          <div className="recording-active">
            <div className="recording-indicator">
              <div className="pulse"></div>
              <span className="recording-text">Recording...</span>
            </div>
            <div className="recording-time">{formatTime(recordingTime)}</div>
            <button className="btn btn-stop" onClick={stopRecording}>
              Stop & Submit
            </button>
          </div>
        )}
      </div>

      <div className="recorder-tips">
        <p>💡 Speak clearly and take your time. You can record for up to 2 minutes.</p>
      </div>
    </div>
  );
};

export default AudioRecorder;