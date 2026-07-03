/* =========================================================
   PHASE 5 — RESEARCH INTELLIGENCE ENGINE
========================================================= */

let PUBLICATIONS_DATA = [];

async function initResearchEngine() {

    PUBLICATIONS_DATA = await loadJSON("data/publications.json");

    computeResearchMetrics();
    buildYearTimeline();
    buildCitationScore();

}

/* =========================================================
   METRICS ENGINE
========================================================= */

function computeResearchMetrics() {

    const totalPubs = PUBLICATIONS_DATA.length;

    const totalCitations = PUBLICATIONS_DATA.reduce((sum, p) => sum + p.citations, 0);

    const avgCitations = (totalCitations / totalPubs).toFixed(1);

    const years = [...new Set(PUBLICATIONS_DATA.map(p => p.year))];

    const el1 = document.querySelector("[data-metric='total_pubs']");
    const el2 = document.querySelector("[data-metric='total_citations']");
    const el3 = document.querySelector("[data-metric='avg_citations']");
    const el4 = document.querySelector("[data-metric='active_years']");

    if (el1) el1.innerText = totalPubs;
    if (el2) el2.innerText = totalCitations;
    if (el3) el3.innerText = avgCitations;
    if (el4) el4.innerText = years.length;

}
function buildYearTimeline() {

    const container = document.querySelector("#timeline");

    if (!container) return;

    const grouped = {};

    PUBLICATIONS_DATA.forEach(p => {

        if (!grouped[p.year]) grouped[p.year] = 0;
        grouped[p.year]++;

    });

    container.innerHTML = Object.keys(grouped)
        .sort((a, b) => b - a)
        .map(year => `
            <div class="timeline-item">
                <h4>${year}</h4>
                <p>${grouped[year]} publications</p>
            </div>
        `).join("");

}

function buildCitationScore() {

    const scored = PUBLICATIONS_DATA.map(p => ({
        title: p.title,
        score: p.citations * (2026 - p.year + 1)
    }));

    scored.sort((a, b) => b.score - a.score);

    const container = document.querySelector("#top-papers");

    if (!container) return;

    container.innerHTML = scored.slice(0, 5).map(p => `
        <div class="publication-card">
            <h4>${p.title}</h4>
            <p>Impact Score: ${p.score}</p>
        </div>
    `).join("");

}

function globalSearch(query) {

    const pubs = PUBLICATIONS_DATA;

    const results = pubs.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
    );

    const container = document.querySelector("#search-results");

    container.innerHTML = results.map(r => `
        <div class="publication-card">
            <h4>${r.title}</h4>
            <p>${r.year} • ${r.citations} citations</p>
        </div>
    `).join("");

}