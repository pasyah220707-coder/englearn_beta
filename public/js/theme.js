document.addEventListener('DOMContentLoaded', () => {
    // Fungsi untuk memuat file CSS Dark Mode
    const loadDarkTheme = () => {
        // Cek apakah sudah ada, jika belum baru buat
        if (!document.getElementById('dark-theme-link')) {
            const link = document.createElement('link');
            link.id = 'dark-theme-link';
            link.rel = 'stylesheet';
            link.href = 'css/dark-mode.css'; // File CSS khusus dark mode
            document.head.appendChild(link);
        }
        // Tetap set atribut agar logika icon di auth.js tahu statusnya
        document.body.setAttribute('data-theme', 'dark');
    };

    // Fungsi untuk menghapus file CSS Dark Mode (Balik ke Normal)
    const removeDarkTheme = () => {
        const link = document.getElementById('dark-theme-link');
        if (link) {
            link.remove(); // Cabut file CSS dari halaman
        }
        document.body.removeAttribute('data-theme');
    };

    // 1. Cek Tema Tersimpan saat loading
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        loadDarkTheme();
    }

    // 2. Expose fungsi toggle ke global
    window.toggleTheme = function() {
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            removeDarkTheme();
            localStorage.setItem('theme', 'light');
            if (window.updateThemeIcons) window.updateThemeIcons('light');
        } else {
            loadDarkTheme();
            localStorage.setItem('theme', 'dark');
            if (window.updateThemeIcons) window.updateThemeIcons('dark');
        }
    };

    // 3. Fungsi helper untuk update icon (Matahari/Bulan)
    window.updateThemeIcons = function(theme) {
        const icon = theme === 'dark' ? '☀️' : '🌙';
        const text = theme === 'dark' ? 'Light Mode' : 'Dark Mode';

        document.querySelectorAll('.theme-icon-span').forEach(el => el.textContent = icon);
        document.querySelectorAll('.theme-text-span').forEach(el => el.textContent = text);
    };
});