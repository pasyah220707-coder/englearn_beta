const express = require('express');
const path = require('path');
const apiRoutes = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk membaca data JSON dari request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menyajikan file statis (Frontend) dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Menggunakan routes API untuk logika backend
app.use('/api', apiRoutes);

// Route default: Kirim file HTML utama saat user membuka website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Jalankan server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server Englearn berjalan di http://localhost:${PORT}`);
    });
}

module.exports = app;