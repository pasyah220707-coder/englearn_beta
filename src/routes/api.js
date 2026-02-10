const express = require('express');
const router = express.Router();
const quizController = require('../models/quizController');
const materialController = require('../controllers/materialController');

// Route: GET /api/questions/:topicId (Ambil soal berdasarkan topik)
router.get('/questions/:topicId', quizController.getQuestions);

// Route: GET /api/material/:topicId (Ambil materi penjelasan)
router.get('/material/:topicId', materialController.getMaterial);

// Route: POST /api/submit-quiz (Kirim semua jawaban untuk dinilai)
router.post('/submit-quiz', quizController.submitQuiz);

module.exports = router;