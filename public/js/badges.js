// 1. Definisi semua lencana yang tersedia
const BADGES = {
    first_step: {
        name: "First Step",
        description: "Complete your first quiz.",
        icon: "👟",
        // Kriteria: memiliki setidaknya 1 riwayat kuis
        check: (history) => history.length >= 1
    },
    present_pro: {
        name: "Present Pro",
        description: "Get a perfect score on the Simple Present quiz.",
        icon: "✅",
        // Kriteria: ada riwayat kuis 'simple-present' dengan skor = total
        check: (history) => history.some(h => h.topic_id === 'simple-present' && h.score === h.total)
    },
    past_master: {
        name: "Past Master",
        description: "Get a perfect score on the Simple Past quiz.",
        icon: "📜",
        // Kriteria: ada riwayat kuis 'simple-past' dengan skor = total
        check: (history) => history.some(h => h.topic_id === 'simple-past' && h.score === h.total)
    },
    tense_explorer: {
        name: "Tense Explorer",
        description: "Complete quizzes on 3 different topics.",
        icon: "🗺️",
        // Kriteria: jumlah topik unik di riwayat >= 3
        check: (history) => {
            const uniqueTopics = new Set(history.map(h => h.topic_id));
            return uniqueTopics.size >= 3;
        }
    },
    perfectionist: {
        name: "Perfectionist",
        description: "Get a perfect score on 3 different topics.",
        icon: "🎯",
        // Kriteria: jumlah topik unik dengan skor sempurna >= 3
        check: (history) => {
            const perfectScoreTopics = new Set(history.filter(h => h.score === h.total).map(h => h.topic_id));
            return perfectScoreTopics.size >= 3;
        }
    }
};

// 2. Fungsi utama untuk memeriksa dan memberikan lencana
async function checkAndAwardBadges(userId) {
    if (!userId) return;

    const { data: history, error: historyError } = await window.supabaseClient.from('quiz_attempts').select('topic_id, score, total').eq('user_id', userId);
    if (historyError) return console.error("Error fetching user history for badges:", historyError);

    const { data: currentBadges, error: currentBadgesError } = await window.supabaseClient.from('user_badges').select('badge_id').eq('user_id', userId);
    if (currentBadgesError) return console.error("Error fetching current badges:", currentBadgesError);
    
    const currentBadgeIds = new Set(currentBadges.map(b => b.badge_id));
    const newBadgesToAward = [];

    for (const badgeId in BADGES) {
        if (!currentBadgeIds.has(badgeId) && BADGES[badgeId].check(history)) {
            newBadgesToAward.push({ user_id: userId, badge_id: badgeId });
        }
    }

    if (newBadgesToAward.length > 0) {
        const { error: insertError } = await window.supabaseClient.from('user_badges').insert(newBadgesToAward);
        if (!insertError) {
            newBadgesToAward.forEach(badge => showBadgeNotification(BADGES[badge.badge_id]));
        }
    }
}

// 3. Fungsi untuk menampilkan notifikasi lencana
function showBadgeNotification(badgeInfo) {
    const notification = document.createElement('div');
    notification.className = 'badge-notification';
    notification.innerHTML = `
        <div class="badge-icon">${badgeInfo.icon}</div>
        <div class="badge-text">
            <strong>New Badge Unlocked!</strong>
            <span>${badgeInfo.name}</span>
        </div>
    `;
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}