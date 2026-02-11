document.addEventListener('DOMContentLoaded', async () => {
    const content = document.getElementById('profile-content');

    // 1. Cek Session
    const { data: { session } } = await window.supabaseClient.auth.getSession();

    if (!session) {
        window.location.href = '/login.html';
        return;
    }

    const user = session.user;
    const username = user.user_metadata.username || user.email;

    // 2. Ambil Riwayat Skor dari Database
    const { data: history, error } = await window.supabaseClient
        .from('quiz_attempts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    // Ambil Lencana yang dimiliki
    const { data: userBadges, error: badgesError } = await window.supabaseClient
        .from('user_badges')
        .select('badge_id')
        .eq('user_id', user.id);

    if (error) {
        console.error('Error fetching history:', error);
        content.innerHTML = '<p>Error loading history.</p>';
        return;
    }

    // 3. Render Tampilan
    let historyHTML = '';
    if (history && history.length > 0) {
        historyHTML = `
            <div class="table-container">
            <table class="history-table">
                <thead>
                    <tr>
                        <th>Topic</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${history.map(item => `
                        <tr>
                            <td>${formatTopic(item.topic_id)}</td>
                            <td><strong>${item.score}</strong> / ${item.total}</td>
                            <td>${new Date(item.created_at).toLocaleDateString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            </div>
        `;
    } else {
        historyHTML = '<p style="color: #666;">You haven\'t taken any quizzes yet.</p>';
    }

    // Render Lencana
    let badgesHTML = '';
    if (userBadges && userBadges.length > 0) {
        badgesHTML = `
            <div class="badges-grid">
                ${userBadges.map(badge => {
                    const badgeInfo = BADGES[badge.badge_id];
                    return badgeInfo ? `
                        <div class="badge-item" title="${badgeInfo.description}">
                            <div class="badge-item-icon">${badgeInfo.icon}</div>
                            <div class="badge-item-name">${badgeInfo.name}</div>
                        </div>
                    ` : '';
                }).join('')}
            </div>
        `;
    } else {
        badgesHTML = '<p style="color: #666;">No badges earned yet. Keep learning!</p>';
    }

    content.innerHTML = `
        <div class="profile-header">
            <h2 style="margin-bottom: 5px;">${username}</h2>
            <p style="color: #666;">${user.email}</p>
        </div>
        <div class="badges-section">
            <h3>My Badges</h3>
            ${badgesHTML}
        </div>
        <div class="history-section">
            <h3>Quiz History</h3>
            ${historyHTML}
        </div>
    `;
});

function formatTopic(topicId) {
    // Mengubah "simple-present" menjadi "Simple Present"
    return topicId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}