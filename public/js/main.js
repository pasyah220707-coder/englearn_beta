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
    const container = document.getElementById('quiz-container');
    const headerTitle = document.querySelector('.app-header h1');
    const headerSubtitle = document.querySelector('.app-header p');

    try {
        // Mengambil data soal dari API Backend
        const response = await fetch(`/api/questions/${topicId}`);
        if (!response.ok) {
            throw new Error('Quiz topic not found.');
        }
        const quiz = await response.json();

        headerTitle.textContent = quiz.title;
        headerSubtitle.textContent = 'Answer all questions and submit at the end.';
        container.innerHTML = ''; // Hapus loading text

        // Buat form untuk menampung semua soal
        const form = document.createElement('form');
        form.id = 'quiz-form';

        quiz.questions.forEach((question, index) => {
            // Membuat elemen kartu soal
            const card = document.createElement('div');
            card.className = 'question-card';

            // Membuat opsi jawaban
            let optionsHTML = '';
            question.options.forEach(option => {
                optionsHTML += `
                    <label>
                        <input type="radio" name="question-${question.id}" value="${option}" required>
                        ${option}
                    </label>
                `;
            });

            card.innerHTML = `
                <h3>${index + 1}. ${question.text}</h3>
                <div class="options">${optionsHTML}</div>
            `;
            form.appendChild(card);
        });

        // Tambahkan tombol submit di akhir form
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit Quiz';
        form.appendChild(submitButton);

        container.appendChild(form);

        // Tambahkan event listener untuk form submission
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const formData = new FormData(form);
            const answers = [];
            for (const [key, value] of formData.entries()) {
                const questionId = parseInt(key.replace('question-', ''));
                answers.push({ questionId, answer: value });
            }

            // Kirim jawaban ke backend
            const resultResponse = await fetch('/api/submit-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topicId, answers })
            });
            const resultData = await resultResponse.json();

            // Simpan hasil di sessionStorage dan redirect ke halaman hasil
            sessionStorage.setItem('quizResult', JSON.stringify(resultData));
            window.location.href = '/results.html';
        });

    } catch (error) {
        container.innerHTML = `<p>Error: ${error.message}. Please try again.</p>`;
        console.error('Error:', error);
    }
}