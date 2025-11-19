const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Interview = require('../models/Interview');
const { evaluateResponse, generateOverallEvaluation } = require('../utils/evaluationEngine');

// Configure multer for audio uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Create new interview
router.post('/', async (req, res) => {
  try {
    const interview = new Interview({
      candidateName: req.body.candidateName,
      candidateEmail: req.body.candidateEmail
    });
    await interview.save();
    res.status(201).json(interview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Submit response
router.post('/:id/response', upload.single('audio'), async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    const { questionId, questionText, transcript, keywords } = req.body;
    
    const evaluation = evaluateResponse(
      transcript,
      JSON.parse(keywords)
    );
    
    const response = {
      questionId,
      questionText,
      transcript,
      audioUrl: req.file ? `/uploads/${req.file.filename}` : null,
      score: evaluation.score,
      keywordsFound: evaluation.keywordsFound,
      missingKeywords: evaluation.missingKeywords
    };
    
    interview.responses.push(response);
    await interview.save();
    
    res.json({ response, evaluation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Complete interview
router.post('/:id/complete', async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    const evaluation = generateOverallEvaluation(interview.responses);
    
    interview.overallScore = evaluation.overallScore;
    interview.strengths = evaluation.strengths;
    interview.weaknesses = evaluation.weaknesses;
    interview.summary = evaluation.summary;
    interview.status = 'completed';
    interview.completedAt = new Date();
    
    await interview.save();
    res.json(interview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get interview by ID
router.get('/:id', async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all interviews
router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find().sort({ startedAt: -1 });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;