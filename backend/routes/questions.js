const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get questions by category
router.get('/category/:category', async (req, res) => {
  try {
    const questions = await Question.find({ category: req.params.category });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create question
router.post('/', async (req, res) => {
  const question = new Question({
    text: req.body.text,
    category: req.body.category,
    keywords: req.body.keywords,
    difficulty: req.body.difficulty
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update question
router.put('/:id', async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete question
router.delete('/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;