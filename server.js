require('dotenv').config(); // Load environment variables
const express = require('express');
const path = require('path');
const apiRoutes = require('./src/routes/api');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk membaca data JSON dari request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menyajikan file statis (Frontend) dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Menggunakan routes API untuk logika backend
app.use('/api', apiRoutes);

// --- ENDPOINT KHUSUS GEMINI AI CHAT ---
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

app.post('/api/chat', async (req, res) => {
    if (!genAI) {
        return res.status(500).json({ error: "Server Error: GEMINI_API_KEY is missing in .env file." });
    }

    try {
        const { message } = req.body;
        // Konfigurasi model agar bertindak sebagai tutor bahasa Inggris
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        
        const prompt = `
        Act as a friendly English tutor. The user is learning English. 
        Have a casual conversation with them. 
        If they make a grammar mistake, gently correct it at the end of your response. 
        Keep your responses concise (max 2-3 sentences) so the conversation flows.
        User says: "${message}"
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ reply: text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: error.message || "Failed to fetch response from AI" });
    }
});

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