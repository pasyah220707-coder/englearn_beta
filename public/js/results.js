document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results-container');
    const quizTitleElement = document.getElementById('quiz-title');

    // Ambil data hasil dari sessionStorage
    const resultData = sessionStorage.getItem('quizResult');

    if (!resultData) {
        resultsContainer.innerHTML = '<p>No quiz results found. Please complete a quiz first.</p>';
        return;
    }

    // Hapus data dari session storage setelah diambil agar tidak muncul lagi jika halaman di-refresh
    sessionStorage.removeItem('quizResult');

    const { score, total, results, title, difficulty } = JSON.parse(resultData);

    quizTitleElement.textContent = `Results: ${title}`;
    resultsContainer.innerHTML = ''; // Hapus loading text

    // Tampilkan skor
    const scoreElement = document.createElement('div');
    scoreElement.className = 'score-summary';
    const diffLabel = difficulty ? difficulty.charAt(0).toUpperCase() + difficulty.slice(1) : 'Standard';
    scoreElement.innerHTML = `<h2>Score: ${score} / ${total}</h2><p>Difficulty: <strong>${diffLabel}</strong></p>`;
    resultsContainer.appendChild(scoreElement);

    // Tampilkan ulasan setiap pertanyaan
    results.forEach(result => {
        const card = document.createElement('div');
        card.className = `result-card ${result.isCorrect ? 'correct-answer' : 'incorrect-answer'}`;

        let optionsHTML = '';
        result.options.forEach(option => {
            let className = '';
            if (option === result.correctAnswer) {
                className = 'correct-option';
            } else if (option === result.userAnswer && !result.isCorrect) {
                className = 'incorrect-option';
            }
            optionsHTML += `<li class="${className}">${option}</li>`;
        });

        card.innerHTML = `
            <h3>${result.text}</h3>
            <ul class="result-options">${optionsHTML}</ul>
            ${!result.isCorrect ? `<p class="correct-answer-text"><strong>Correct Answer:</strong> ${result.correctAnswer}</p>` : ''}
        `;

        resultsContainer.appendChild(card);
    });

    const backButton = document.createElement('a');
    backButton.href = '/kelas11.html';
    backButton.className = 'back-to-topics-btn';
    backButton.textContent = 'Back to Topics';
    resultsContainer.appendChild(backButton);
});