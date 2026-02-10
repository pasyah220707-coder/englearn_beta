const quizzes = require('../models/questionModel');

// Mengambil daftar soal berdasarkan topik untuk dikirim ke frontend
exports.getQuestions = (req, res) => {
    const { topicId } = req.params;
    const quiz = quizzes[topicId];

    if (!quiz) {
        return res.status(404).json({ message: "Topik kuis tidak ditemukan." });
    }

    // Mengirim soal tanpa kunci jawaban untuk mencegah kecurangan
    const publicQuiz = {
        title: quiz.title,
        questions: quiz.questions.map(q => ({
            id: q.id,
            text: q.text,
            options: q.options
        }))
    };

    res.json(publicQuiz);
};

// Memeriksa semua jawaban yang dikirim user dan memberikan hasil
exports.submitQuiz = (req, res) => {
    const { topicId, answers } = req.body; // answers = [{ questionId: 101, answer: 'speaks' }, ...]
    const quiz = quizzes[topicId];

    if (!quiz) {
        return res.status(404).json({ message: "Topik kuis tidak ditemukan." });
    }

    let score = 0;
    const results = quiz.questions.map(q => {
        const userAnswerObj = answers.find(a => a.questionId === q.id);
        const userAnswer = userAnswerObj ? userAnswerObj.answer : null;
        const isCorrect = userAnswer === q.correctAnswer;

        if (isCorrect) {
            score++;
        }

        return {
            ...q, // Mengambil semua data soal (id, text, options, correctAnswer)
            userAnswer,
            isCorrect
        };
    });

    res.json({ score, total: quiz.questions.length, results, title: quiz.title });
};