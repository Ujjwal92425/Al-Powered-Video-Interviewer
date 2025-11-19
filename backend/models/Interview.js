const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  questionText: String,
  transcript: String,
  audioUrl: String,
  score: Number,
  keywordsFound: [String],
  missingKeywords: [String]
});

const InterviewSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true
  },
  candidateEmail: String,
  responses: [ResponseSchema],
  overallScore: Number,
  strengths: [String],
  weaknesses: [String],
  summary: String,
  status: {
    type: String,
    enum: ['in-progress', 'completed'],
    default: 'in-progress'
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date
});

module.exports = mongoose.model('Interview', InterviewSchema);