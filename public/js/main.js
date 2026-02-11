// Variabel Global untuk Kuis
let currentQuestions = [];
let currentQuestionIndex = 0;
let currentDifficulty = 'normal';
let timerInterval = null;
let timeLeft = 0;
let totalScore = 0;
let userAnswers = [];
let quizTopicId = '';
let isTransitioning = false;

document.addEventListener('DOMContentLoaded', () => {
    // Ambil topik dari URL, contoh: /quiz.html?topic=simple-present
    const params = new URLSearchParams(window.location.search);
    const topicId = params.get('topic');

    if (topicId) {
        loadQuiz(topicId);
    } else {
        document.getElementById('quiz-container').innerHTML = '<p>Error: No topic selected. Please go back and select a topic.</p>';
    }
});

async function loadQuiz(topicId) {
    quizTopicId = topicId;
    const headerTitle = document.querySelector('.app-header h1');
    const headerSubtitle = document.querySelector('.app-header p');
    const loadingText = document.getElementById('loading-text');

    try {
        // Mengambil data soal dari API Backend
        const response = await fetch(`/api/questions/${topicId}`);
        if (!response.ok) {
            throw new Error('Quiz topic not found.');
        }
        const quiz = await response.json();
        currentQuestions = quiz.questions;

        headerTitle.textContent = quiz.title;
        headerSubtitle.textContent = 'Select difficulty to start.';
        
        // Sembunyikan loading, tampilkan pilihan kesulitan
        loadingText.style.display = 'none';
        document.getElementById('difficulty-selection').style.display = 'block';

    } catch (error) {
        document.getElementById('quiz-container').innerHTML = `<p>Error: ${error.message}. Please try again.</p>`;
        console.error('Error:', error);
    }
}

// Fungsi memulai kuis setelah memilih kesulitan
window.startQuiz = function(difficulty) {
    currentDifficulty = difficulty;
    currentQuestionIndex = 0;
    totalScore = 0;
    userAnswers = [];
    
    document.getElementById('difficulty-selection').style.display = 'none';
    document.getElementById('quiz-active').style.display = 'block';
    
    showQuestion();
};

function showQuestion() {
    const questionArea = document.getElementById('question-area');
    const question = currentQuestions[currentQuestionIndex];
    
    // Reset Timer berdasarkan kesulitan
    if (currentDifficulty === 'easy') timeLeft = 60;
    else if (currentDifficulty === 'normal') timeLeft = 30;
    else if (currentDifficulty === 'hard') timeLeft = 10;

    updateTimerUI();
    startTimer();

    // Render Soal
    let optionsHTML = '';
    question.options.forEach(option => {
        // Menghapus onclick dari label
        optionsHTML += `
            <label>
                <input type="radio" name="current-answer" value="${option}">
                ${option}
            </label>
        `;
    });

    questionArea.innerHTML = `
        <div class="question-card">
            <h3>Question ${currentQuestionIndex + 1} of ${currentQuestions.length}</h3>
            <p style="font-size: 1.2rem; margin-bottom: 20px;">${question.text}</p>
            <div class="options">${optionsHTML}</div>
            <button onclick="nextQuestion()">Next</button>
        </div>
    `;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerUI();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleAnswer(null); // Waktu habis = salah
        }
    }, 1000);
}

function updateTimerUI() {
    const timeEl = document.getElementById('time-left');
    timeEl.textContent = timeLeft;
    if (timeLeft <= 5) timeEl.classList.add('timer-warning');
    else timeEl.classList.remove('timer-warning');
}

window.nextQuestion = function() {
    let selectedAnswer = null;
    const selectedRadio = document.querySelector('input[name="current-answer"]:checked');
    if (selectedRadio) {
        selectedAnswer = selectedRadio.value;
    }
     clearInterval(timerInterval);
     handleAnswer(selectedAnswer);
 };

/*window.selectAnswer = function(answer) {
   if (isTransitioning) return;
   isTransitioning = true;
   clearInterval(timerInterval);
   handleAnswer(answer);
};*/
async function handleAnswer(answer) {
    const question = currentQuestions[currentQuestionIndex];
    
    // Simpan jawaban user
    userAnswers.push({
        questionId: question.id,
        answer: answer
    });

    // Hitung Skor (Hanya jika jawaban ada, validasi benar/salah dilakukan di backend nanti untuk hasil akhir,
    // tapi untuk skor real-time kita butuh logika sederhana atau tunggu backend.
    // Agar aman dan cepat, kita hitung skor nanti setelah validasi backend, 
    // TAPI user minta "semakin cepat menjawab semakin tinggi score".
    // Kita akan hitung potensi skor berdasarkan waktu di sini, lalu validasi di akhir.
    
    // Max poin per soal = 100.
    // Rumus: (Sisa Waktu / Total Waktu) * 100
    let maxTime = currentDifficulty === 'easy' ? 60 : currentDifficulty === 'normal' ? 30 : 10;
    let timeScore = Math.round((timeLeft / maxTime) * 100);
    
    // Kita simpan timeScore ini sementara, nanti dikalikan 1 jika benar, 0 jika salah
    userAnswers[userAnswers.length - 1].potentialScore = timeScore;

    // Lanjut ke soal berikutnya
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

async function finishQuiz() {
    document.getElementById('quiz-active').innerHTML = '<p class="loading">Submitting results...</p>';

    // Kirim jawaban ke backend untuk validasi
    const resultResponse = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId: quizTopicId, answers: userAnswers })
    });
    const resultData = await resultResponse.json();

    // Hitung Total Skor Akhir (Gabungan validasi backend + waktu frontend)
    let finalScore = 0;
    resultData.results.forEach((res, idx) => {
        if (res.isCorrect) {
            finalScore += userAnswers[idx].potentialScore || 0;
        }
    });

    // --- SIMPAN KE SUPABASE ---
    if (window.supabaseClient) {
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        if (session) {
            const user = session.user;
            const username = user.user_metadata.username || user.email;
            await window.supabaseClient.from('quiz_attempts').insert({
                user_id: user.id,
                username: username,
                topic_id: quizTopicId,
                score: finalScore, // Skor Poin
                total: currentQuestions.length * 100, // Max Poin (100 per soal)
                difficulty: currentDifficulty // Kolom baru
            });
            checkAndAwardBadges(user.id);
        }
    }

    // Simpan hasil untuk halaman result
    const finalResult = {
        ...resultData,
        score: finalScore, // Override score backend (jumlah benar) dengan skor poin
        total: currentQuestions.length * 100,
        difficulty: currentDifficulty
    };
    
    sessionStorage.setItem('quizResult', JSON.stringify(finalResult));
    window.location.href = '/results.html';
}