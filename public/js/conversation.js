document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const textInput = document.getElementById('text-input');
    const sendBtn = document.getElementById('send-btn');
    const micBtn = document.getElementById('mic-btn');
    const statusText = document.getElementById('status-text');

    // --- 1. SETUP SPEECH RECOGNITION (STT) ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition;
    let isRecording = false;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.lang = 'en-US'; // Set bahasa ke Inggris
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            isRecording = true;
            micBtn.classList.add('recording');
            statusText.textContent = "Listening...";
        };

        recognition.onend = () => {
            isRecording = false;
            micBtn.classList.remove('recording');
            statusText.textContent = "Click microphone to speak.";
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            textInput.value = transcript;
            sendMessage(); // Otomatis kirim setelah selesai bicara
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            statusText.textContent = "Error: " + event.error;
            isRecording = false;
            micBtn.classList.remove('recording');
        };

        micBtn.addEventListener('click', () => {
            if (isRecording) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });
    } else {
        micBtn.style.display = 'none';
        statusText.textContent = "Browser does not support Speech Recognition.";
    }

    // --- 2. SETUP TEXT TO SPEECH (TTS) ---
    function speakText(text) {
        if ('speechSynthesis' in window) {
            // Hentikan suara sebelumnya jika ada
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 1; // Kecepatan normal
            utterance.pitch = 1;

            // Pilih suara English jika tersedia
            const voices = window.speechSynthesis.getVoices();
            const englishVoice = voices.find(voice => voice.lang.includes('en-US') || voice.lang.includes('en-GB'));
            if (englishVoice) utterance.voice = englishVoice;

            window.speechSynthesis.speak(utterance);
        }
    }

    // --- 3. CHAT LOGIC ---
    sendBtn.addEventListener('click', sendMessage);
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    async function sendMessage() {
        const text = textInput.value.trim();
        if (!text) return;

        // Tampilkan pesan user
        appendMessage(text, 'user-message');
        textInput.value = '';
        statusText.textContent = "AI is thinking...";

        try {
            // Kirim ke Backend (Server.js)
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `Server Error: ${response.status}`);
            }

            if (data.reply) {
                appendMessage(data.reply, 'ai-message');
                speakText(data.reply); // AI berbicara
            } else {
                throw new Error("Empty response from AI");
            }
        } catch (error) {
            console.error(error);
            appendMessage(`Error: ${error.message}`, 'ai-message');
        } finally {
            statusText.textContent = "Click microphone to speak.";
        }
    }

    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        msgDiv.appendChild(contentDiv);
        chatBox.appendChild(msgDiv);
        
        // Auto scroll ke bawah
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Load voices untuk TTS (kadang perlu waktu di load awal browser)
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }
});