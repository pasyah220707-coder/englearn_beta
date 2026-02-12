document.addEventListener('DOMContentLoaded', async () => {
    const content = document.getElementById('leaderboard-content');

    // Daftar topik yang tersedia (Hardcoded berdasarkan materi yang ada)
    // Struktur ini memudahkan penambahan materi Kelas 10 atau 12 nantinya
    const topics = [
        { id: 'descriptive-text', name: 'Descriptive Text (Kelas 10)' },
        { id: 'recount-text', name: 'Recount Text (Kelas 10)' },
        { id: 'narrative-text', name: 'Narrative Text (Kelas 10)' },
        { id: 'simple-present', name: 'Simple Present Tense (Kelas 11)' },
        { id: 'present-continuous', name: 'Present Continuous Tense (Kelas 11)' },
        { id: 'simple-past', name: 'Simple Past Tense (Kelas 11)' },
        { id: 'past-continuous', name: 'Past Continuous Tense (Kelas 11)' },
        { id: 'present-perfect', name: 'Present Perfect Tense (Kelas 11)' },
        { id: 'application-letter', name: 'Application Letter (Kelas 12)' },
        { id: 'news-item', name: 'News Item Text (Kelas 12)' },
        { id: 'conditional-sentences', name: 'Conditional Sentences (Kelas 12)' },
        { id: 'irregular-verbs', name: 'Irregular Verbs (Umum)' },
        { id: 'to-be', name: 'To Be (Umum)' }
    ];

    // 1. Buat UI Selector Topik (Dropdown)
    const selectorContainer = document.createElement('div');
    selectorContainer.style.marginBottom = '20px';
    selectorContainer.style.textAlign = 'center';
    
    const selectLabel = document.createElement('label');
    selectLabel.textContent = 'Pilih Materi: ';
    selectLabel.style.marginRight = '10px';
    selectLabel.style.fontWeight = 'bold';
    
    const select = document.createElement('select');
    select.id = 'topic-selector';
    select.style.padding = '8px';
    select.style.borderRadius = '5px';
    select.style.border = '1px solid #ccc';
    select.style.fontSize = '1rem';
    
    topics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic.id;
        option.textContent = topic.name;
        select.appendChild(option);
    });

    selectorContainer.appendChild(selectLabel);
    selectorContainer.appendChild(select);
    
    // Reset konten lama dan tambahkan selector + container tabel baru
    content.innerHTML = '';
    content.appendChild(selectorContainer);
    
    const tableContainer = document.createElement('div');
    tableContainer.id = 'leaderboard-table-container';
    tableContainer.className = 'table-container'; // Tambahkan class ini agar tabel bisa discroll di HP
    content.appendChild(tableContainer);

    // 2. Fungsi Load Leaderboard
    async function loadLeaderboard(topicId) {
        tableContainer.innerHTML = '<p class="loading">Loading scores...</p>';

        // Ambil SEMUA data skor untuk topik ini dari database
        const { data: allAttempts, error } = await window.supabaseClient
            .from('quiz_attempts')
            .select('*')
            .eq('topic_id', topicId);

        if (error) {
            console.error('Error fetching leaderboard:', error);
            tableContainer.innerHTML = '<p>Gagal memuat leaderboard.</p>';
            return;
        }

        if (!allAttempts || allAttempts.length === 0) {
            tableContainer.innerHTML = '<p>Belum ada data skor untuk materi ini. Jadilah yang pertama!</p>';
            return;
        }

        // 3. Proses Data: Filter Skor Terbaik per User & Sorting
        // Bobot kesulitan: Hard > Normal > Easy
        const difficultyWeight = { 'hard': 3, 'normal': 2, 'easy': 1 };
        const userBestAttempts = {};

        allAttempts.forEach(attempt => {
            const userId = attempt.user_id;
            const currentBest = userBestAttempts[userId];
            
            // Normalisasi difficulty (default easy jika kosong)
            const attemptDiff = attempt.difficulty ? attempt.difficulty.toLowerCase() : 'easy';
            const attemptWeight = difficultyWeight[attemptDiff] || 1;
            
            // Logika: Update jika belum ada data user ini, 
            // ATAU difficulty percobaan ini lebih tinggi, 
            // ATAU difficulty sama tapi skor lebih tinggi
            const isBetter = !currentBest || 
                             (attemptWeight > currentBest.weight) || 
                             (attemptWeight === currentBest.weight && attempt.score > currentBest.score);

            if (isBetter) {
                userBestAttempts[userId] = {
                    ...attempt,
                    weight: attemptWeight,
                    difficulty: attemptDiff // Simpan difficulty yang sudah dinormalisasi
                };
            }
        });

        // Convert object ke array untuk di-sort
        let sortedLeaderboard = Object.values(userBestAttempts);
        
        sortedLeaderboard.sort((a, b) => {
            // Prioritas 1: Tingkat Kesulitan (Hard paling atas)
            if (b.weight !== a.weight) {
                return b.weight - a.weight;
            }
            // Prioritas 2: Skor Tertinggi
            return b.score - a.score;
        });

        // Ambil Top 25 User Saja
        sortedLeaderboard = sortedLeaderboard.slice(0, 25);

        // 4. Render Tabel
        let tableHTML = `
            <table class="leaderboard-table">
                <thead>
                    <tr>
                        <th width="10%">Rank</th>
                        <th>Player</th>
                        <th>Difficulty</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
        `;

        sortedLeaderboard.forEach((item, index) => {
            const rank = index + 1;
            const rankClass = rank <= 3 ? `rank-${rank}` : '';
            const playerName = item.username || 'Anonymous';
            
            // Badge Difficulty dengan Warna
            let diffLabel = 'Easy';
            let diffColor = '#28a745'; // Green
            
            if (item.difficulty === 'hard') {
                diffLabel = 'Hard';
                diffColor = '#dc3545'; // Red
            } else if (item.difficulty === 'normal') {
                diffLabel = 'Normal';
                diffColor = '#ffc107'; // Yellow/Orange
            }

            const diffBadge = `<span style="color: ${diffColor}; font-weight: bold;">${diffLabel}</span>`;

            tableHTML += `
                <tr>
                    <td class="${rankClass}">#${rank}</td>
                    <td style="font-weight: 600;">${playerName}</td>
                    <td>${diffBadge}</td>
                    <td>${item.score} / ${item.total}</td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;
        tableContainer.innerHTML = tableHTML;
    }

    // Event Listener saat user mengganti materi di dropdown
    select.addEventListener('change', (e) => {
        loadLeaderboard(e.target.value);
    });

    // Load awal (topik pertama di list)
    if (topics.length > 0) {
        loadLeaderboard(topics[0].id);
    }
});
