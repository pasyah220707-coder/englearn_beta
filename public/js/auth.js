document.addEventListener('DOMContentLoaded', async () => {
    const authContainer = document.getElementById('auth-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // 1. Cek Status Login Saat Ini
    updateAuthUI();
    
    // 2. Jalankan Statistik Footer
    initFooterStats();

    // 3. Handle Register
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageEl = document.getElementById('auth-message');

            messageEl.textContent = 'Processing...';
            
            const { data, error } = await window.supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username // Simpan username ke metadata
                    }
                }
            });

            if (error) {
                messageEl.textContent = `Error: ${error.message}`;
                messageEl.style.color = 'red';
            } else if (data.session) {
                // Jika konfirmasi email dimatikan, user langsung login & dapat session
                messageEl.textContent = 'Registration successful! Redirecting...';
                messageEl.style.color = 'green';
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                // Jika konfirmasi email masih aktif
                messageEl.textContent = 'Registration successful! Please check your email to confirm.';
                messageEl.style.color = 'green';
                registerForm.reset();
            }
        });
    }

    // 4. Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageEl = document.getElementById('auth-message');

            messageEl.textContent = 'Logging in...';

            const { data, error } = await window.supabaseClient.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                messageEl.textContent = `Error: ${error.message}`;
                messageEl.style.color = 'red';
            } else {
                // Redirect ke halaman utama setelah login sukses
                window.location.href = '/';
            }
        });
    }
});

// Fungsi untuk update tampilan tombol Login/Logout di Header
async function updateAuthUI() {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer) return;

    const { data: { session } } = await window.supabaseClient.auth.getSession();

    if (session) {
        // Jika user login
        const userEmail = session.user.email;
        // Ambil username dari metadata, jika tidak ada (akun lama) pakai email
        const userName = session.user.user_metadata.username || userEmail;
        const userRole = session.user.user_metadata.role; // Ambil role
        const firstLetter = userName.charAt(0).toUpperCase();
        
        // Cek tema saat ini untuk icon awal
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const themeIcon = isDark ? '☀️' : '🌙';
        const themeText = isDark ? 'Light Mode' : 'Dark Mode';

        const roleBadge = userRole === 'teacher' ? '<span class="nav-role-badge">Guru</span>' : '';

        authContainer.innerHTML = `
            <div class="user-dropdown-container">
                <button id="user-menu-btn" class="user-menu-btn">
                    <div class="nav-avatar">${firstLetter}</div>
                    <span class="nav-username">${userName} ${roleBadge}</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                <div id="user-dropdown-menu" class="user-dropdown-menu">
                    <div class="dropdown-header">
                        <strong>${userName}</strong>
                        <span style="font-size: 0.8rem; color: #666;">${userEmail}</span>
                    </div>
                    <a href="/profile.html" class="dropdown-item">👤 My Profile</a>
                    <a href="/leaderboard.html" class="dropdown-item mobile-only">🏆 Leaderboard</a>
                    <!-- Tombol Tema di dalam Dropdown -->
                    <button id="theme-toggle-dropdown" class="dropdown-item">
                        <span class="theme-icon-span">${themeIcon}</span> <span class="theme-text-span">${themeText}</span>
                    </button>
                    <div class="dropdown-divider"></div>
                    <button id="logout-btn" class="dropdown-item logout-item">Logout</button>
                </div>
            </div>
        `;

        // Event Listener untuk Dropdown
        const menuBtn = document.getElementById('user-menu-btn');
        const dropdownMenu = document.getElementById('user-dropdown-menu');

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah event bubbling
            dropdownMenu.classList.toggle('show');
        });

        // Event Listener untuk Tombol Tema di Dropdown
        document.getElementById('theme-toggle-dropdown').addEventListener('click', (e) => {
            e.stopPropagation(); // Agar menu tidak langsung tertutup (opsional)
            if (window.toggleTheme) window.toggleTheme();
        });

        // Tutup dropdown jika klik di luar
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });

        document.getElementById('logout-btn').addEventListener('click', async () => {
            await window.supabaseClient.auth.signOut();
            window.location.reload();
        });
    } else {
        // Jika user belum login
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const themeIcon = isDark ? '☀️' : '🌙';
        
        authContainer.innerHTML = `
            <button id="theme-toggle-nav" class="theme-toggle-btn" style="margin-right: 10px;">
                <span class="theme-icon-span">${themeIcon}</span>
            </button>
            <a href="/login.html" class="auth-btn">Login</a>
            <a href="/register.html" class="auth-btn" style="background: #4CAF50;">Register</a>
        `;
        
        document.getElementById('theme-toggle-nav').addEventListener('click', () => {
            if (window.toggleTheme) window.toggleTheme();
        });
    }
}

// Fungsi Statistik Footer dengan Animasi
async function initFooterStats() {
    const quizCountEl = document.getElementById('stat-quiz-count');
    const badgeCountEl = document.getElementById('stat-badge-count');
    const userCountEl = document.getElementById('stat-user-count');

    // Hanya jalankan jika elemen footer ada di halaman
    if (!quizCountEl || !badgeCountEl) return;

    try {
        // Ambil jumlah data dari Supabase (count: 'exact', head: true artinya hanya ambil jumlahnya saja, hemat bandwidth)
        const { count: quizTotal } = await window.supabaseClient
            .from('quiz_attempts')
            .select('*', { count: 'exact', head: true });

        const { count: badgeTotal } = await window.supabaseClient
            .from('user_badges')
            .select('*', { count: 'exact', head: true });

        // Hitung User Aktif (Unique User ID dari tabel quiz_attempts)
        // Kita gunakan ini karena tidak bisa akses tabel auth.users secara langsung dari client demi keamanan
        const { data: attempts } = await window.supabaseClient
            .from('quiz_attempts')
            .select('user_id');
        const userTotal = attempts ? new Set(attempts.map(a => a.user_id)).size : 0;

        // Jalankan animasi
        animateValue(quizCountEl, 0, quizTotal || 0, 2000);
        animateValue(badgeCountEl, 0, badgeTotal || 0, 2000);
        if (userCountEl) animateValue(userCountEl, 0, userTotal || 0, 2000);

    } catch (error) {
        console.error("Error fetching stats:", error);
        quizCountEl.textContent = "-";
        badgeCountEl.textContent = "-";
        if (userCountEl) userCountEl.textContent = "-";
    }
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Efek ease-out (cepat di awal, lambat di akhir)
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value.toLocaleString(); // Tambah koma pemisah ribuan
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}
