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
    const userRole = user.user_metadata.role || 'student'; // Default student
    window.currentUser = user; // Simpan user ke global agar bisa diakses fungsi dashboard

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

    // Render Bagian Guru (Aktivasi atau Status)
    let teacherSectionHTML = '';
    if (userRole === 'teacher') {
        teacherSectionHTML = `
            <div class="teacher-section active">
                <h3>👨‍🏫 Teacher Status</h3>
                <p>You are a verified Teacher. You can access the teacher dashboard.</p>
                <button id="btn-teacher-dashboard" class="auth-btn" style="width:100%; margin-top:10px; background:#28a745;">Go to Teacher Dashboard</button>
            </div>
        `;
    } else {
        teacherSectionHTML = `
            <div class="teacher-section">
                <h3>👨‍🏫 Activate Teacher Account</h3>
                <p style="font-size: 0.9rem; color: #666; margin-bottom: 15px;">
                    Have an invitation code? Enter it below to upgrade your account to Teacher.
                </p>
                <form id="teacher-activation-form" style="display: flex; gap: 10px;">
                    <input type="text" id="invitation-code" placeholder="Enter Code (e.g. TCH-123)" required 
                        style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
                    <button type="submit" class="auth-btn">Activate</button>
                </form>
                <p id="activation-message" style="margin-top: 10px; font-size: 0.9rem;"></p>
            </div>
        `;
    }

    // Container untuk Kelas Privat
    const classesSectionHTML = `
        <div id="student-classes-section" class="classes-section"></div>
    `;

    content.innerHTML = `
        <div class="profile-header">
            <h2 style="margin-bottom: 5px;">${username}</h2>
            <p style="color: #666;">${user.email}</p>
            ${userRole === 'teacher' ? '<span class="role-badge">Teacher</span>' : ''}
        </div>
        
        ${teacherSectionHTML}
        
        ${classesSectionHTML}

        <div class="badges-section">
            <h3>My Badges</h3>
            ${badgesHTML}
        </div>
        <div class="history-section">
            <h3>Quiz History</h3>
            ${historyHTML}
        </div>
    `;

    // Load Kelas Siswa
    loadStudentClasses(user.id);

    // Event Listener Dashboard Guru
    const btnDashboard = document.getElementById('btn-teacher-dashboard');
    if (btnDashboard) {
        btnDashboard.addEventListener('click', () => {
            renderTeacherDashboard(user);
        });
    }

    // Event Listener untuk Form Aktivasi Guru
    const activationForm = document.getElementById('teacher-activation-form');
    if (activationForm) {
        activationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const codeInput = document.getElementById('invitation-code').value.trim();
            const msgEl = document.getElementById('activation-message');
            
            if (!codeInput) return;

            msgEl.textContent = 'Verifying code...';
            msgEl.style.color = '#666';

            try {
                // 1. Cek Kode di Database (Asumsi nama tabel: teacher_invitations)
                const { data: inviteData, error: inviteError } = await window.supabaseClient
                    .from('teacher_invitations')
                    .select('*')
                    .eq('code', codeInput)
                    .eq('is_used', false)
                    .single();

                if (inviteError || !inviteData) {
                    throw new Error('Invalid or used invitation code.');
                }

                // 2. Update Kode menjadi Used
                await window.supabaseClient
                    .from('teacher_invitations')
                    .update({ is_used: true, used_by: user.id })
                    .eq('id', inviteData.id);

                // 3. Masukkan ke tabel teachers (Opsional, sesuai request user)
                await window.supabaseClient
                    .from('teachers')
                    .insert([{ user_id: user.id }]);

                // 4. Update Metadata User (Supabase Auth) agar UI berubah
                const { error: updateError } = await window.supabaseClient.auth.updateUser({
                    data: { role: 'teacher' }
                });

                if (updateError) throw updateError;

                msgEl.textContent = 'Success! Upgrading account...';
                msgEl.style.color = 'green';
                setTimeout(() => window.location.reload(), 1500);

            } catch (err) {
                console.error(err);
                msgEl.textContent = err.message;
                msgEl.style.color = 'red';
            }
        });
    }
});

// --- LOGIKA KELAS PRIVAT (SISWA) ---

async function loadStudentClasses(userId) {
    const container = document.getElementById('student-classes-section');
    if (!container) return;

    // 1. Form Join Kelas
    let html = `
        <h3>📚 My Private Classes</h3>
        <div class="join-class-box">
            <input type="text" id="class-code-input" placeholder="Enter 6-digit Class Code" maxlength="6">
            <button id="join-class-btn" class="auth-btn small">Join Class</button>
        </div>
        <div id="my-classes-list" class="classes-grid" style="margin-top:15px;">Loading...</div>
    `;
    container.innerHTML = html;

    // Event Listener Join
    document.getElementById('join-class-btn').addEventListener('click', async () => {
        const code = document.getElementById('class-code-input').value.trim().toUpperCase();
        if (!code) return;

        // Cari kelas by code
        const { data: cls, error: clsError } = await window.supabaseClient
            .from('classes').select('id').eq('code', code).single();
        
        if (clsError || !cls) { alert("Class not found!"); return; }

        // Join
        const { error: joinError } = await window.supabaseClient
            .from('class_members').insert([{ class_id: cls.id, user_id: userId }]);

        if (joinError) {
            if(joinError.code === '23505') alert("You are already in this class.");
            else alert(joinError.message);
        } else {
            alert("Joined successfully!");
            fetchMyClasses(userId);
        }
    });

    fetchMyClasses(userId);
}

async function fetchMyClasses(userId) {
    const listEl = document.getElementById('my-classes-list');
    
    // Ambil kelas yang diikuti user
    const { data: members, error } = await window.supabaseClient
        .from('class_members')
        .select('class_id, classes(name, teacher_id)')
        .eq('user_id', userId);

    if (error || !members || members.length === 0) {
        listEl.innerHTML = '<p style="color:#666;">You haven\'t joined any private classes yet.</p>';
        return;
    }

    listEl.innerHTML = members.map(m => `
        <div class="class-card student-card">
            <h4>${m.classes.name}</h4>
            <button onclick="openClass('${m.class_id}', '${m.classes.name}')" class="btn-outline small">View Quizzes</button>
        </div>
    `).join('');
}

window.openClass = async (classId, className) => {
    const container = document.getElementById('student-classes-section');
    
    // 1. Ambil Materi
    const { data: materials } = await window.supabaseClient
        .from('class_materials')
        .select('*')
        .eq('class_id', classId)
        .order('created_at', { ascending: false });

    // 2. Ambil Kuis
    const { data: quizzes } = await window.supabaseClient
        .from('class_quizzes')
        .select('*')
        .eq('class_id', classId);

    // Render List Kuis
    let quizzesHTML = '';
    if(quizzes && quizzes.length > 0) {
        quizzesHTML = quizzes.map(q => `
            <div class="quiz-row">
                <span>${q.title}</span>
                <button onclick="takePrivateQuiz('${q.id}')" class="auth-btn small">Start / View Result</button>
            </div>
        `).join('');
    } else {
        quizzesHTML = '<p>No quizzes assigned yet.</p>';
    }

    // Render List Materi
    let materialsHTML = '';
    if(materials && materials.length > 0) {
        materialsHTML = materials.map(m => `
            <div class="quiz-row">
                <span>📄 ${m.title}</span>
                <button onclick="readMaterial('${m.id}')" class="auth-btn small" style="background:#17a2b8;">Read</button>
            </div>
        `).join('');
    } else {
        materialsHTML = '<p>No materials shared yet.</p>';
    }

    container.innerHTML = `
        <button onclick="window.location.reload()" class="back-link" style="font-size:0.9rem;">← Back</button>
        <h3>${className}</h3>
        
        <div style="margin-bottom: 20px;">
            <h4>📖 Learning Materials</h4>
            <div class="quiz-list-container">${materialsHTML}</div>
        </div>

        <div>
            <h4>📝 Quizzes</h4>
            <div class="quiz-list-container">${quizzesHTML}</div>
        </div>
        
        <div id="class-content-area" style="margin-top:20px; padding-top:20px; border-top:1px solid #eee;"></div>
    `;
};

window.takePrivateQuiz = async (quizId) => {
    const area = document.getElementById('class-content-area');
    const { data: { session } } = await window.supabaseClient.auth.getSession();
    const userId = session.user.id;

    // Cek apakah sudah pernah mengerjakan?
    const { data: attempt } = await window.supabaseClient
        .from('class_quiz_attempts')
        .select('*')
        .eq('quiz_id', quizId)
        .eq('user_id', userId)
        .single();

    if (attempt) {
        // SUDAH MENGERJAKAN -> TAMPILKAN HASIL (MASKED) & LEADERBOARD
        renderPrivateResult(area, attempt, quizId);
    } else {
        // BELUM MENGERJAKAN -> TAMPILKAN SOAL
        const { data: quiz } = await window.supabaseClient
            .from('class_quizzes').select('*').eq('id', quizId).single();
        
        renderPrivateQuizForm(area, quiz, userId);
    }
};

function renderPrivateQuizForm(container, quiz, userId) {
    let html = `<div class="private-quiz-box"><h4>${quiz.title}</h4>`;
    
    quiz.questions.forEach((q, idx) => {
        html += `
            <div class="pq-question">
                <p>${idx+1}. ${q.text}</p>
                ${q.options.map(opt => `
                    <label><input type="radio" name="q-${q.id}" value="${opt}"> ${opt}</label>
                `).join('')}
            </div>
        `;
    });

    html += `<button id="submit-private-quiz" class="auth-btn" style="margin-top:20px;">Submit Answers</button></div>`;
    container.innerHTML = html;

    document.getElementById('submit-private-quiz').onclick = async () => {
        let score = 0;
        const answers = [];
        
        quiz.questions.forEach(q => {
            const selected = document.querySelector(`input[name="q-${q.id}"]:checked`);
            const ans = selected ? selected.value : null;
            answers.push({ id: q.id, answer: ans });
            if (ans === q.correctAnswer) score++;
        });

        // Simpan ke DB
        await window.supabaseClient.from('class_quiz_attempts').insert([{
            quiz_id: quiz.id, user_id: userId, score, total: quiz.questions.length, answers
        }]);

        // Reload untuk lihat hasil
        takePrivateQuiz(quiz.id);
    };
}

async function renderPrivateResult(container, attempt, quizId) {
    // Ambil detail kuis lagi untuk cek jawaban benar (tapi hanya tampilkan jika user benar)
    const { data: quiz } = await window.supabaseClient.from('class_quizzes').select('*').eq('id', quizId).single();

    let resultHTML = `<div class="result-card"><h3>Your Score: ${attempt.score} / ${attempt.total}</h3>`;
    
    // Logika Masking Jawaban
    // Jika Salah -> Tampilkan "Incorrect", JANGAN tampilkan jawaban benar.
    // Jika Benar -> Tampilkan "Correct".
    
    resultHTML += `<p>Check your answers below. Note: Correct answers are hidden for incorrect attempts to prevent sharing.</p>`;
    
    attempt.answers.forEach((ans, idx) => {
        const question = quiz.questions.find(q => q.id === ans.id);
        const isCorrect = ans.answer === question.correctAnswer;
        
        resultHTML += `
            <div class="pq-result-item ${isCorrect ? 'correct-bg' : 'incorrect-bg'}" style="padding:10px; margin:5px 0; border-radius:5px;">
                <p><strong>Q${idx+1}:</strong> ${question.text}</p>
                <p>Your Answer: ${ans.answer || 'No Answer'}</p>
                <p style="font-weight:bold; color:${isCorrect ? 'green' : 'red'}">
                    ${isCorrect ? '✅ Correct' : '❌ Incorrect (Answer Hidden)'}
                </p>
            </div>
        `;
    });

    // Leaderboard Mini
    resultHTML += `<h4>🏆 Class Leaderboard</h4><div id="mini-leaderboard">Loading ranks...</div></div>`;
    container.innerHTML = resultHTML;

    // Fetch Leaderboard
    const { data: allAttempts } = await window.supabaseClient
        .from('class_quiz_attempts')
        .select('score, user_id') // Idealnya join ke profile user
        .eq('quiz_id', quizId)
        .order('score', { ascending: false });

    const lbContainer = document.getElementById('mini-leaderboard');
    if(allAttempts) {
        lbContainer.innerHTML = allAttempts.map((a, i) => `
            <div style="display:flex; justify-content:space-between; padding:5px; border-bottom:1px solid #eee;">
                <span>#${i+1} User-${a.user_id.substring(0,4)}...</span>
                <strong>${a.score}</strong>
            </div>
        `).join('');
    }
}

function formatTopic(topicId) {
    // Mengubah "simple-present" menjadi "Simple Present"
    return topicId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// --- TEACHER DASHBOARD LOGIC ---

async function renderTeacherDashboard(user) {
    const content = document.getElementById('profile-content');
    
    content.innerHTML = `
        <div class="profile-header">
            <button onclick="window.location.reload()" class="back-link" style="float:left;">← Back</button>
            <h2>👨‍🏫 Teacher Dashboard</h2>
            <p>Manage your classes and quizzes</p>
        </div>

        <div class="dashboard-actions" style="margin: 20px 0;">
            <button id="create-class-btn" class="auth-btn" style="background:var(--primary-color)">+ Create New Class</button>
        </div>

        <div id="classes-list" class="classes-grid">
            <p class="loading">Loading your classes...</p>
        </div>
        
        <!-- Modal Create Class -->
        <div id="create-class-modal" class="modal hidden">
            <div class="modal-content">
                <h3>Create New Class</h3>
                <input type="text" id="new-class-name" placeholder="Class Name (e.g. English Grade 10)" class="input-field">
                <div class="modal-actions" style="display:flex; gap:10px; justify-content:flex-end; margin-top:15px;">
                    <button id="cancel-create" class="auth-btn" style="background:#6c757d;">Cancel</button>
                    <button id="confirm-create" class="auth-btn">Create</button>
                </div>
            </div>
        </div>
    `;

    // Load Classes
    loadTeacherClasses(user.id);

    // Event Listeners for Modal
    const modal = document.getElementById('create-class-modal');
    document.getElementById('create-class-btn').onclick = () => modal.classList.remove('hidden');
    document.getElementById('cancel-create').onclick = () => modal.classList.add('hidden');
    
    document.getElementById('confirm-create').onclick = async () => {
        const name = document.getElementById('new-class-name').value;
        if (!name) return alert("Class name is required");

        const code = Math.random().toString(36).substring(2, 8).toUpperCase();

        const { error } = await window.supabaseClient
            .from('classes')
            .insert([{ teacher_id: user.id, name, code }]);

        if (error) alert(error.message);
        else {
            modal.classList.add('hidden');
            loadTeacherClasses(user.id);
        }
    };
}

async function loadTeacherClasses(teacherId) {
    const listEl = document.getElementById('classes-list');
    const { data: classes, error } = await window.supabaseClient
        .from('classes')
        .select('*')
        .eq('teacher_id', teacherId)
        .order('created_at', { ascending: false });

    if (error) {
        listEl.innerHTML = `<p class="error">${error.message}</p>`;
        return;
    }

    if (classes.length === 0) {
        listEl.innerHTML = '<p>No classes created yet.</p>';
        return;
    }

    listEl.innerHTML = classes.map(cls => `
        <div class="class-card">
            <h3>${cls.name}</h3>
            <div class="code-box">
                <span>Code: <strong>${cls.code}</strong></span>
                <button onclick="regenerateCode('${cls.id}')" class="icon-btn" title="Regenerate Code" style="background:none; border:none; cursor:pointer;">🔄</button>
            </div>
            <div class="card-actions" style="margin-top:15px;">
                <button onclick="viewClassDetails('${cls.id}', '${cls.name}')" class="auth-btn small">Manage Class</button>
            </div>
        </div>
    `).join('');
}

window.regenerateCode = async (classId) => {
    if(!confirm("Regenerate code? Old code will be invalid.")) return;
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const { error } = await window.supabaseClient
        .from('classes')
        .update({ code: newCode })
        .eq('id', classId);
        
    if(error) alert(error.message);
    else loadTeacherClasses(window.currentUser.id);
};

window.viewClassDetails = async (classId, className) => {
    const content = document.getElementById('profile-content');
    content.innerHTML = `
        <div class="profile-header">
            <button onclick="renderTeacherDashboard(window.currentUser)" class="back-link" style="float:left;">← Back</button>
            <h2>${className}</h2>
        </div>
        
        <div class="quiz-management" style="background:var(--bg-card); padding:20px; border-radius:10px; margin-top:20px;">
            <h3>📖 Class Materials</h3>
            <button id="btn-open-upload" class="auth-btn small" style="margin-bottom:15px; background:#17a2b8;">+ Upload Material</button>
            <div id="class-materials-list">Loading materials...</div>
        </div>

        <div class="quiz-management" style="background:var(--bg-card); padding:20px; border-radius:10px; margin-top:20px;">
            <h3>📝 Class Quizzes</h3>
            <button onclick="createQuizUI('${classId}')" class="auth-btn small" style="margin-bottom:15px;">+ Add Quiz</button>
            <div id="class-quizzes-list">Loading quizzes...</div>
        </div>

        <!-- Modal Create Quiz (UI Builder) -->
        <div id="create-quiz-modal" class="modal hidden">
            <div class="modal-content" style="max-width: 800px; width: 95%; max-height: 90vh; overflow-y: auto;">
                <h3>Create New Quiz</h3>
                <input type="text" id="quiz-title-input" placeholder="Quiz Title (e.g. Simple Present Test)" class="input-field" style="font-weight:bold;">
                
                <div id="questions-container" style="margin-top: 15px;"></div>
                
                <button id="btn-add-question" class="auth-btn small" style="background: #17a2b8; margin-top: 10px;">+ Add Question</button>
                
                <div class="modal-actions" style="display:flex; gap:10px; justify-content:flex-end; margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px;">
                    <button id="btn-cancel-quiz" class="auth-btn" style="background:#6c757d;">Cancel</button>
                    <button id="btn-save-quiz" class="auth-btn">Save Quiz</button>
                </div>
            </div>
        </div>

        <!-- Modal Upload Material -->
        <div id="upload-material-modal" class="modal hidden">
            <div class="modal-content">
                <h3>Upload Material</h3>
                <input type="text" id="upload-material-title" placeholder="Title (e.g. Chapter 1 PDF)" class="input-field">
                <input type="file" id="upload-material-file" class="input-field" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.png">
                <p id="upload-status" style="font-size:0.8rem; color:#666; margin-bottom:10px;"></p>
                <div class="modal-actions" style="display:flex; gap:10px; justify-content:flex-end;">
                    <button id="btn-cancel-upload" class="auth-btn" style="background:#6c757d;">Cancel</button>
                    <button id="btn-confirm-upload" class="auth-btn">Upload</button>
                </div>
            </div>
        </div>
    `;
    
    // Load Materials
    const { data: materials } = await window.supabaseClient.from('class_materials').select('*').eq('class_id', classId);
    document.getElementById('class-materials-list').innerHTML = materials && materials.length ? 
        materials.map(m => `<div class="quiz-row"><span>${m.title}</span> <button onclick="deleteMaterial('${m.id}', '${classId}', '${className}')" style="color:red; background:none; border:none; cursor:pointer;">Delete</button></div>`).join('') : 
        '<p>No materials yet.</p>';

    // Load Quizzes logic here (simplified for brevity, similar to student view but with delete option)
    const { data: quizzes } = await window.supabaseClient.from('class_quizzes').select('*').eq('class_id', classId);
    document.getElementById('class-quizzes-list').innerHTML = quizzes && quizzes.length ? 
        quizzes.map(q => `<div class="quiz-row"><span>${q.title}</span> <span>${q.questions.length} Qs</span></div>`).join('') : 
        '<p>No quizzes yet.</p>';

    // --- Event Listeners for Quiz Modal ---
    const quizModal = document.getElementById('create-quiz-modal');
    const questionsContainer = document.getElementById('questions-container');

    // Function to add a question block
    const addQuestionField = () => {
        const qIndex = questionsContainer.children.length;
        const timestamp = Date.now();
        
        const qDiv = document.createElement('div');
        qDiv.className = 'question-block';
        qDiv.style.cssText = 'background: #f8f9fa; padding: 15px; border-radius: 8px; border: 1px solid #dee2e6; margin-bottom: 15px; position: relative;';
        
        qDiv.innerHTML = `
            <button type="button" class="delete-q-btn" style="position:absolute; top:10px; right:10px; background:none; border:none; color:red; cursor:pointer; font-size:1.5rem; line-height:1;">&times;</button>
            <label style="display:block; margin-bottom:5px; font-weight:600;">Question ${qIndex + 1}</label>
            <input type="text" class="input-field q-text" placeholder="Enter question text" required style="margin-bottom:10px;">
            
            <div class="options-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                ${[0, 1, 2, 3].map(i => `
                    <div style="display:flex; align-items:center;">
                        <input type="radio" name="correct-${timestamp}-${qIndex}" value="${i}" style="margin-right:5px; transform: scale(1.2);">
                        <input type="text" class="input-field q-option" data-index="${i}" placeholder="Option ${String.fromCharCode(65+i)}" required style="margin:0;">
                    </div>
                `).join('')}
            </div>
            <p style="font-size:0.8rem; color:#666; margin-top:5px;">*Select the radio button for the correct answer.</p>
        `;
        
        qDiv.querySelector('.delete-q-btn').onclick = () => qDiv.remove();
        questionsContainer.appendChild(qDiv);
    };

    document.getElementById('btn-add-question').onclick = addQuestionField;
    
    document.getElementById('btn-cancel-quiz').onclick = () => {
        quizModal.classList.add('hidden');
    };

    document.getElementById('btn-save-quiz').onclick = async () => {
        const title = document.getElementById('quiz-title-input').value;
        if(!title) return alert("Please enter a quiz title.");
        
        const questionBlocks = document.querySelectorAll('.question-block');
        if(questionBlocks.length === 0) return alert("Please add at least one question.");
        
        const questions = [];
        
        for(let i=0; i<questionBlocks.length; i++) {
            const block = questionBlocks[i];
            const text = block.querySelector('.q-text').value.trim();
            const optionInputs = block.querySelectorAll('.q-option');
            const correctRadio = block.querySelector('input[type="radio"]:checked');
            
            if(!text) return alert(`Question ${i+1} text is missing.`);
            
            const options = [];
            let correctAnswer = null;
            let hasEmptyOption = false;
            
            optionInputs.forEach((input, idx) => {
                const val = input.value.trim();
                if(!val) hasEmptyOption = true;
                options.push(val);
                if(correctRadio && parseInt(correctRadio.value) === idx) {
                    correctAnswer = val;
                }
            });
            
            if(hasEmptyOption) return alert(`Please fill all options for Question ${i+1}.`);
            if(!correctAnswer) return alert(`Please select the correct answer for Question ${i+1}.`);
            
            questions.push({
                id: Date.now() + i,
                text: text,
                options: options,
                correctAnswer: correctAnswer
            });
        }
        
        try {
            document.getElementById('btn-save-quiz').textContent = 'Saving...';
            const { error } = await window.supabaseClient
                .from('class_quizzes')
                .insert([{ class_id: classId, title, questions }]);
                
            if(error) throw error;
            
            alert("Quiz created successfully!");
            quizModal.classList.add('hidden');
            viewClassDetails(classId, className);
        } catch(e) {
            alert("Error saving quiz: " + e.message);
            document.getElementById('btn-save-quiz').textContent = 'Save Quiz';
        }
    };

    // --- Event Listeners for Upload Modal ---
    const uploadModal = document.getElementById('upload-material-modal');
    
    document.getElementById('btn-open-upload').onclick = () => {
        uploadModal.classList.remove('hidden');
    };
    
    document.getElementById('btn-cancel-upload').onclick = () => {
        uploadModal.classList.add('hidden');
        document.getElementById('upload-status').textContent = '';
    };

    document.getElementById('btn-confirm-upload').onclick = async () => {
        const title = document.getElementById('upload-material-title').value;
        const fileInput = document.getElementById('upload-material-file');
        const file = fileInput.files[0];
        const statusEl = document.getElementById('upload-status');

        if (!title || !file) {
            alert("Please enter a title and select a file.");
            return;
        }

        statusEl.textContent = "Uploading file...";
        
        try {
            // 1. Upload ke Supabase Storage
            // Nama file unik: timestamp_filename
            const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '-')}`;
            const filePath = `${classId}/${fileName}`;

            const { data, error: uploadError } = await window.supabaseClient.storage
                .from('class-materials')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Ambil Public URL
            const { data: { publicUrl } } = window.supabaseClient.storage
                .from('class-materials')
                .getPublicUrl(filePath);

            // 3. Simpan ke Database (URL disimpan di kolom content)
            const { error: dbError } = await window.supabaseClient
                .from('class_materials')
                .insert([{ class_id: classId, title, content: publicUrl }]);

            if (dbError) throw dbError;

            alert("Material uploaded successfully!");
            uploadModal.classList.add('hidden');
            // Refresh view
            viewClassDetails(classId, className);

        } catch (err) {
            console.error(err);
            statusEl.textContent = "Error: " + err.message;
            statusEl.style.color = "red";
        }
    };
};

window.createQuizUI = (classId) => {
    const modal = document.getElementById('create-quiz-modal');
    const container = document.getElementById('questions-container');
    const titleInput = document.getElementById('quiz-title-input');
    
    // Reset Form
    titleInput.value = '';
    container.innerHTML = '';
    
    // Add first question automatically
    document.getElementById('btn-add-question').click();
    
    modal.classList.remove('hidden');
};

// --- MATERIAL FUNCTIONS ---

window.deleteMaterial = async (id, classId, className) => {
    if(!confirm("Delete this material?")) return;
    const { error } = await window.supabaseClient.from('class_materials').delete().eq('id', id);
    if(error) alert(error.message);
    else viewClassDetails(classId, className);
};

window.readMaterial = async (id) => {
    const area = document.getElementById('class-content-area');
    area.innerHTML = '<p>Loading...</p>';
    
    const { data: material } = await window.supabaseClient.from('class_materials').select('*').eq('id', id).single();
    if(material) {
        let contentHTML = '';
        // Cek apakah content adalah URL (File Upload)
        if (material.content.startsWith('http')) {
            contentHTML = `
                <p>This material is a file.</p>
                <a href="${material.content}" target="_blank" class="auth-btn" style="text-decoration:none; display:inline-block; margin-top:10px; background:#17a2b8;">Download / View File</a>
            `;
            // Jika PDF, coba embed
            if (material.content.toLowerCase().includes('.pdf')) {
                contentHTML += `<div style="margin-top:15px; height:500px;"><iframe src="${material.content}" width="100%" height="100%" style="border:none;"></iframe></div>`;
            }
        } else {
            // Teks biasa (Legacy)
            contentHTML = `<div class="material-body" style="line-height:1.6;">${material.content}</div>`;
        }

        area.innerHTML = `
            <div class="material-view" style="background:#f8f9fa; padding:20px; border-radius:10px; border:1px solid #ddd;">
                <h3 style="margin-top:0; color:var(--primary-color);">${material.title}</h3>
                ${contentHTML}
                <button onclick="document.getElementById('class-content-area').innerHTML=''" style="margin-top:20px;" class="btn-secondary">Close</button>
            </div>
        `;
    }
};