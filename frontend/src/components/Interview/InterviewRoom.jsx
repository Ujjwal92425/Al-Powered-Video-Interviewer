import React, { useState, useEffect } from 'react';
import Avatar from '../Avatar/Avatar';
import QuestionDisplay from './QuestionDisplay';
import AudioRecorder from './AudioRecorder';
import speechService from '../../services/speechService';
import { interviewsAPI } from '../../services/api';
import { AVATAR_STATES } from '../../utils/constants';
import './InterviewRoom.css';

const InterviewRoom = ({ questions, interviewId, candidateName, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [avatarState, setAvatarState] = useState(AVATAR_STATES.IDLE);
  const [responses, setResponses] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Greet and start first question
    setTimeout(() => {
      speakGreeting();
    }, 1000);
    // eslint-disable-next-line
  }, []);

  const speakGreeting = async () => {
    const greeting = `Hello ${candidateName}! Welcome to your interview. Let's begin with the first question.`;
    setAvatarState(AVATAR_STATES.SPEAKING);

    try {
      await speechService.speak(greeting);
      setTimeout(() => {
        speakCurrentQuestion(currentQuestionIndex);
      }, 500);
    } catch (error) {
      console.error('Speech error:', error);
      setAvatarState(AVATAR_STATES.IDLE);
    }
  };

  // FIX: Accept index as argument, default=currentQuestionIndex
  const speakCurrentQuestion = async (index = currentQuestionIndex) => {
    const currentQuestion = questions[index];
    setAvatarState(AVATAR_STATES.SPEAKING);

    try {
      await speechService.speak(currentQuestion.text);
      setAvatarState(AVATAR_STATES.LISTENING);
    } catch (error) {
      console.error('Speech error:', error);
      setAvatarState(AVATAR_STATES.IDLE);
    }
  };

  // MAIN FIX AREA: Only increment index AFTER speech for the next question
  const handleResponseComplete = async (transcript, audioBlob) => {
    setIsProcessing(true);
    setAvatarState(AVATAR_STATES.IDLE);

    const currentQuestion = questions[currentQuestionIndex];

    // Save response
    const newResponse = {
      questionId: currentQuestion._id,
      questionText: currentQuestion.text,
      transcript,
      keywords: currentQuestion.keywords,
    };

    try {
      // Submit to backend
      const formData = new FormData();
      formData.append('questionId', currentQuestion._id);
      formData.append('questionText', currentQuestion.text);
      formData.append('transcript', transcript);
      formData.append('keywords', JSON.stringify(currentQuestion.keywords));
      formData.append('audio', audioBlob);

      await interviewsAPI.submitResponse(interviewId, formData);

      setResponses((prev) => [...prev, newResponse]);

      // FIX: Only move to next after TTS for next, and FINISH only after all are done
      if (currentQuestionIndex < questions.length - 1) {
        const nextIndex = currentQuestionIndex + 1;
        // Advance question index FIRST, then speak the new question!
        setCurrentQuestionIndex(nextIndex);
        setTimeout(() => {
          speakCurrentQuestion(nextIndex);
        }, 1000);
      } else {
        await finishInterview();
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      // Still advance on error
      if (currentQuestionIndex < questions.length - 1) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        setTimeout(() => {
          speakCurrentQuestion(nextIndex);
        }, 1000);
      } else {
        await finishInterview();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const finishInterview = async () => {
    setAvatarState(AVATAR_STATES.SPEAKING);
    await speechService.speak(
      'Thank you for completing the interview. Please wait while we generate your evaluation report.'
    );

    try {
      await interviewsAPI.complete(interviewId);
    } catch (error) {
      console.error('Error completing interview:', error);
    }

    setAvatarState(AVATAR_STATES.IDLE);
    onComplete(interviewId);
  };

  const currentQuestion =
    questions && currentQuestionIndex < questions.length
      ? questions[currentQuestionIndex]
      : null;

  return (
    <div className="interview-room">
      <div className="interview-header">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
        <div className="progress-text">
          Question {Math.min(currentQuestionIndex + 1, questions.length)} of {questions.length}
        </div>
      </div>

      <div className="interview-content">
        <Avatar state={avatarState} />

        <QuestionDisplay
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
        />

        <AudioRecorder
          onComplete={handleResponseComplete}
          disabled={isProcessing || avatarState === AVATAR_STATES.SPEAKING}
          avatarState={avatarState}
        />
      </div>

      {isProcessing && (
        <div className="processing-overlay">
          <div className="spinner"></div>
          <p>Processing your response...</p>
        </div>
      )}
    </div>
  );
};

export default InterviewRoom;
