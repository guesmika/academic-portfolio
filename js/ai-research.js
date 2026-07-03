/* =========================================================
   PHASE 6 — AI RESEARCH SUMMARY ENGINE (SIMULATED)
========================================================= */

async function generateResearchSummary() {

    const pubs = await loadJSON("data/publications.json");

    const summary = {
        total: pubs.length,
        strongest_year: getStrongestYear(pubs),
        main_topics: extractKeywords(pubs),
        impact_level: computeImpact(pubs)
    };

    renderAISummary(summary);

}

/* ----------------------------- */

function getStrongestYear(pubs) {

    const count = {};

    pubs.forEach(p => {
        count[p.year] = (count[p.year] || 0) + 1;
    });

    return Object.keys(count).reduce((a, b) =>
        count[a] > count[b] ? a : b
    );
}

/* ----------------------------- */

function extractKeywords(pubs) {

    const keywords = [];

    pubs.forEach(p => {

        const words = p.title.toLowerCase().split(" ");

        keywords.push(...words.slice(0, 3));

    });

    return [...new Set(keywords)].slice(0, 8);
}

/* ----------------------------- */

function computeImpact(pubs) {

    const total = pubs.reduce((s, p) => s + p.citations, 0);

    if (total > 200) return "High Impact Researcher";
    if (total > 100) return "Active Researcher";
    return "Emerging Researcher";
}

/* ----------------------------- */

function renderAISummary(data) {

    const container = document.querySelector("#ai-summary");

    if (!container) return;

    container.innerHTML = `
        <div class="stat-card">

            <h3>AI Research Insight</h3>

            <p><strong>Total Publications:</strong> ${data.total}</p>
            <p><strong>Peak Year:</strong> ${data.strongest_year}</p>
            <p><strong>Research Level:</strong> ${data.impact_level}</p>

            <p><strong>Key Topics:</strong> ${data.main_topics.join(", ")}</p>

        </div>
    `;
}