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
        const response = await fetch(`/api/material/${topicId}`);
        if (!response.ok) throw new Error('Material not found');
        
        const material = await response.json();

        // Set Title
        titleElement.textContent = material.title;
        document.title = `${material.title} - EngLearn`;

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

            <section class="material-section">
                <h2>Rumus (Formula)</h2>
                <div class="formula-box">
                    <p><strong>(+)</strong> ${material.formula.positive}</p>
                    <p><strong>(-)</strong> ${material.formula.negative}</p>
                    <p><strong>(?)</strong> ${material.formula.interrogative}</p>
                </div>
            </section>

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