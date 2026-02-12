const MATERIALS_DATA = {
    "simple-present": {
        title: "Simple Present Tense",
        definition: "Simple Present Tense adalah bentuk waktu yang digunakan untuk menyatakan fakta, kebenaran umum, kebiasaan (habitual action), atau kejadian yang terjadi saat ini.",
        usage: [
            "Menyatakan rutinitas atau kebiasaan sehari-hari.",
            "Menyatakan kebenaran umum atau fakta ilmiah.",
            "Menyatakan perasaan, pikiran, atau kepemilikan."
        ],
        formula: {
            positive: "S + V1 (s/es) + O",
            negative: "S + do/does + not + V1 + O",
            interrogative: "Do/Does + S + V1 + O?"
        },
        examples: [
            "Positive: She drinks coffee every morning.",
            "Negative: He does not (doesn't) like spicy food.",
            "Interrogative: Do you play football?"
        ]
    },
    "present-continuous": {
        title: "Present Continuous Tense",
        definition: "Present Continuous Tense digunakan untuk membicarakan aksi yang sedang berlangsung sekarang atau rencana di masa depan yang sudah pasti.",
        usage: [
            "Menyatakan kejadian yang sedang terjadi saat bicara (now, right now).",
            "Menyatakan kejadian yang sedang berlangsung sekitar waktu sekarang (this week, this month).",
            "Menyatakan rencana masa depan yang sudah pasti."
        ],
        formula: {
            positive: "S + am/is/are + V-ing + O",
            negative: "S + am/is/are + not + V-ing + O",
            interrogative: "Am/Is/Are + S + V-ing + O?"
        },
        examples: [
            "Positive: I am studying English right now.",
            "Negative: They are not watching TV.",
            "Interrogative: Is she sleeping?"
        ]
    },
    "simple-past": {
        title: "Simple Past Tense",
        definition: "Simple Past Tense digunakan untuk membicarakan kejadian yang sudah selesai terjadi di masa lampau.",
        usage: [
            "Menyatakan kejadian yang terjadi dan selesai di waktu tertentu di masa lalu (yesterday, last week, in 2010).",
            "Menyatakan serangkaian kejadian di masa lalu."
        ],
        formula: {
            positive: "S + V2 + O",
            negative: "S + did + not + V1 + O",
            interrogative: "Did + S + V1 + O?"
        },
        examples: [
            "Positive: We went to Bali last year.",
            "Negative: She did not (didn't) come to the party.",
            "Interrogative: Did you finish your homework?"
        ]
    },
    "past-continuous": {
        title: "Past Continuous Tense",
        definition: "Past Continuous Tense digunakan untuk menyatakan aksi yang sedang berlangsung pada waktu tertentu di masa lampau.",
        usage: [
            "Menyatakan aksi yang sedang terjadi ketika aksi lain terjadi di masa lampau (biasanya menggunakan 'when' atau 'while').",
            "Menyatakan dua aksi yang sedang berlangsung bersamaan di masa lampau."
        ],
        formula: {
            positive: "S + was/were + V-ing + O",
            negative: "S + was/were + not + V-ing + O",
            interrogative: "Was/Were + S + V-ing + O?"
        },
        examples: [
            "Positive: I was reading a book when he called.",
            "Negative: They were not playing football.",
            "Interrogative: Were you sleeping at 9 PM?"
        ]
    },
    "descriptive-text": {
        title: "Descriptive Text",
        definition: "Descriptive text adalah teks yang menjelaskan atau mendeskripsikan orang, binatang, atau benda tertentu secara spesifik (Specific Participant). Tujuannya adalah untuk menggambarkan ciri-ciri khusus dari objek tersebut.",
        usage: [
            "Mendeskripsikan tempat wisata atau bangunan bersejarah.",
            "Memberikan informasi rinci tentang ciri fisik atau kualitas suatu objek.",
            "Menggunakan Simple Present Tense dan banyak Adjectives (Kata Sifat)."
        ],
        structure: [
            { part: "Identification", desc: "Pendahuluan yang memperkenalkan objek yang akan dideskripsikan (nama, lokasi)." },
            { part: "Description", desc: "Penjelasan rinci mengenai ciri-ciri objek (fisik, kualitas, bagian-bagiannya)." }
        ],
        examples: [
            "Pink Beach is a beautiful beach located in Komodo Island.",
            "The sand is pink because it is a mixture of white sand and red coral fragments.",
            "It has amazing underwater life with hundreds of coral species."
        ]
    },
    "present-perfect": {
        title: "Present Perfect Tense",
        definition: "Present Perfect Tense digunakan untuk menyatakan kejadian yang terjadi di masa lampau namun waktunya tidak spesifik, atau kejadian yang dimulai di masa lampau dan masih berlanjut/berdampak sampai sekarang.",
        usage: [
            "Menyatakan pengalaman hidup (Life Experiences) tanpa menyebut waktu spesifik.",
            "Menyatakan kejadian yang baru saja selesai (Just).",
            "Menyatakan tindakan yang dimulai di masa lalu dan masih berlanjut (Since/For)."
        ],
        formula: {
            positive: "S + have/has + V3 + O",
            negative: "S + have/has + not + V3 + O",
            interrogative: "Have/Has + S + V3 + O?"
        },
        examples: [
            "Positive: I have visited Bali twice.",
            "Negative: She has not (haven't) finished her homework yet.",
            "Interrogative: Have you ever eaten Sushi?"
        ]
    },
    "application-letter": {
        title: "Application Letter",
        definition: "Surat lamaran kerja (Cover Letter) adalah surat formal yang dikirimkan bersama CV untuk melamar pekerjaan. Tujuannya untuk memperkenalkan diri dan meyakinkan perekrut bahwa pelamar cocok untuk posisi tersebut.",
        usage: [
            "Melamar pekerjaan di perusahaan atau instansi.",
            "Menjelaskan kualifikasi dan pengalaman kerja secara ringkas.",
            "Menunjukkan antusiasme dan profesionalisme pelamar."
        ],
        structure: [
            { part: "Salutation", desc: "Salam pembuka formal (e.g., Dear Hiring Manager)." },
            { part: "Body Paragraphs", desc: "Menjelaskan posisi yang dilamar, kualifikasi, dan pengalaman relevan." },
            { part: "Closing & Signature", desc: "Harapan wawancara, salam penutup, dan tanda tangan." }
        ],
        examples: [
            "I am writing to apply for the Graphic Designer position.",
            "I have experience in using Adobe Photoshop and Illustrator.",
            "I look forward to hearing from you. Sincerely, Budi."
        ]
    },
    "recount-text": {
        title: "Recount Text",
        definition: "Recount text adalah teks yang menceritakan kembali kejadian atau pengalaman di masa lampau secara berurutan. Tujuannya adalah untuk memberikan informasi atau menghibur pembaca.",
        usage: [
            "Menceritakan pengalaman liburan atau pribadi (Personal Recount).",
            "Menceritakan biografi tokoh (Biographical Recount).",
            "Menceritakan sejarah (Historical Recount)."
        ],
        structure: [
            { part: "Orientation", desc: "Pengenalan tentang siapa, di mana, dan kapan peristiwa terjadi." },
            { part: "Events", desc: "Rangkaian peristiwa yang terjadi secara berurutan (chronological order)." },
            { part: "Reorientation", desc: "Kesimpulan atau komentar pribadi penulis tentang peristiwa tersebut (opsional)." }
        ],
        examples: [
            "Last holiday, I went to Bali with my family.",
            "First, we visited Kuta Beach. Then, we had lunch.",
            "It was a wonderful experience."
        ]
    },
    "narrative-text": {
        title: "Narrative Text",
        definition: "Narrative text adalah teks imajinatif atau faktual yang bertujuan untuk menghibur pembaca dengan sebuah cerita yang memiliki komplikasi atau masalah dan resolusinya.",
        usage: [
            "Dongeng (Fairy tales), Legenda (Legends), Mitos (Myths).",
            "Cerita pendek (Short stories).",
            "Fabel (Fables - cerita hewan)."
        ],
        structure: [
            { part: "Orientation", desc: "Pendahuluan tokoh, waktu, dan tempat." },
            { part: "Complication", desc: "Munculnya masalah atau konflik dalam cerita." },
            { part: "Resolution", desc: "Penyelesaian masalah (akhir bahagia atau sedih)." }
        ],
        examples: [
            "Once upon a time, there lived a poor widow and her son, Malin Kundang.",
            "One day, Malin Kundang sailed away to become rich.",
            "In the end, he turned into a stone because he disobeyed his mother."
        ]
    },
    "news-item": {
        title: "News Item Text",
        definition: "News Item text adalah teks yang memberikan informasi kepada pembaca tentang peristiwa yang bernilai berita (newsworthy) yang terjadi sehari-hari.",
        usage: [
            "Berita koran atau majalah.",
            "Berita online.",
            "Siaran berita televisi/radio."
        ],
        structure: [
            { part: "Main Event", desc: "Ringkasan berita atau peristiwa utama (Headline)." },
            { part: "Background Events", desc: "Latar belakang peristiwa (siapa, di mana, kapan, bagaimana)." },
            { part: "Sources", desc: "Sumber informasi (komentar saksi, ahli, atau pihak terkait)." }
        ],
        examples: [
            "Jakarta - Heavy rain caused floods in several areas of Jakarta yesterday.",
            "According to the BMKG, the rain will continue until tomorrow.",
            "Residents are advised to stay alert."
        ]
    },
    "conditional-sentences": {
        title: "Conditional Sentences",
        definition: "Conditional Sentences (Kalimat Pengandaian) digunakan untuk menyatakan situasi yang mungkin terjadi (real) atau tidak nyata (unreal/imaginary) jika syarat tertentu terpenuhi.",
        usage: [
            "Type 1: Situasi yang mungkin terjadi di masa depan (Future Possibility).",
            "Type 2: Situasi yang tidak nyata saat ini (Present Unreal).",
            "Type 3: Situasi yang tidak nyata di masa lalu (Past Unreal)."
        ],
        structure: [
            { part: "Type 1 (Future)", desc: "If + Simple Present, Simple Future (Will)" },
            { part: "Type 2 (Present Unreal)", desc: "If + Simple Past, Past Future (Would)" },
            { part: "Type 3 (Past Unreal)", desc: "If + Past Perfect, Past Future Perfect (Would have)" }
        ],
        examples: [
            "Type 1: If I study hard, I will pass the exam.",
            "Type 2: If I were you, I would not do that.",
            "Type 3: If I had known, I would have come."
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const topicId = params.get('topic');

    if (topicId) {
        loadMaterial(topicId);
    } else {
        document.getElementById('material-content').innerHTML = '<p>Error: No topic selected.</p>';
    }
});

async function loadMaterial(topicId) {
    const titleElement = document.getElementById('material-title');
    const contentContainer = document.getElementById('material-content');
    const startQuizBtn = document.getElementById('start-quiz-btn');

    try {
        const material = MATERIALS_DATA[topicId];
        if (!material) throw new Error('Material not found');

        // Set Title
        titleElement.textContent = material.title;
        document.title = `${material.title} - EngLearn`;

        // Logic untuk menampilkan Rumus (Formula) ATAU Struktur (Structure)
        let structureHTML = '';
        if (material.formula) {
            structureHTML = `
            <section class="material-section">
                <h2>Rumus (Formula)</h2>
                <div class="formula-box">
                    <p><strong>(+)</strong> ${material.formula.positive}</p>
                    <p><strong>(-)</strong> ${material.formula.negative}</p>
                    <p><strong>(?)</strong> ${material.formula.interrogative}</p>
                </div>
            </section>`;
        } else if (material.structure) {
            structureHTML = `
            <section class="material-section">
                <h2>Struktur Teks (Generic Structure)</h2>
                <div class="formula-box">
                    ${material.structure.map(s => `<p><strong>${s.part}:</strong> ${s.desc}</p>`).join('')}
                </div>
            </section>`;
        }

        // Build Content HTML
        let htmlContent = `
            <section class="material-section">
                <h2>Pengertian</h2>
                <p>${material.definition}</p>
            </section>

            <section class="material-section">
                <h2>Kegunaan (Usage)</h2>
                <ul>
                    ${material.usage.map(u => `<li>${u}</li>`).join('')}
                </ul>
            </section>

            ${structureHTML}

            <section class="material-section">
                <h2>Contoh Kalimat</h2>
                <ul class="example-list">
                    ${material.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            </section>
        `;

        contentContainer.innerHTML = htmlContent;

        // Setup Quiz Button
        startQuizBtn.onclick = () => window.location.href = `/quiz.html?topic=${topicId}`;

    } catch (error) {
        contentContainer.innerHTML = `<p>Error loading material: ${error.message}</p>`;
    }
}