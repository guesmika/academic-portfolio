/* =========================================================
   ADVANCED DATA LOADER ENGINE
   Phase 2.7 - Dynamic Academic System Upgrade
========================================================= */

async function loadJSON(path) {
    const response = await fetch(path);
    return await response.json();
}

/* =========================================================
   PROFILE
========================================================= */

async function loadProfile() {

    const data = await loadJSON("data/profile.json");

    const setText = (id, value) => {
        const el = document.querySelector(id);
        if (el) el.innerText = value;
    };

    setText("#hero-name", data.name);
    setText("#hero-title", data.title);
    setText("#hero-institution", data.institution);
    setText("#hero-email", data.email);

    // Load stats dynamically
    animateStats(data.stats);
}

/* =========================================================
   PUBLICATIONS (WITH FILTERING)
========================================================= */

let ALL_PUBLICATIONS = [];

async function loadPublications() {

    ALL_PUBLICATIONS = await loadJSON("data/publications.json");

    renderPublications(ALL_PUBLICATIONS);

}

/* Render function */
function renderPublications(list) {

    const container = document.querySelector("#publications-container");

    if (!container) return;

    container.innerHTML = list.map(pub => `

        <div class="publication-card">

            <h4 class="publication-title">${pub.title}</h4>

            <p class="publication-meta">
                ${pub.type} • ${pub.year} • ${pub.journal}
            </p>

            <span class="badge-academic">
                Citations: ${pub.citations}
            </span>

        </div>

    `).join("");

}

/* Filter system */
function filterPublications(year) {

    if (year === "all") {
        renderPublications(ALL_PUBLICATIONS);
        return;
    }

    const filtered = ALL_PUBLICATIONS.filter(pub => pub.year == year);

    renderPublications(filtered);

}

/* =========================================================
   PROJECTS
========================================================= */

async function loadProjects() {

    const projects = await loadJSON("data/projects.json");

    const container = document.querySelector("#projects-container");

    if (!container) return;

    container.innerHTML = projects.map(p => `

        <div class="research-card">

            <h4>${p.name}</h4>
            <p>${p.description}</p>

            <span class="badge-academic">${p.status}</span>

        </div>

    `).join("");

}

/* =========================================================
   LIVE STATS ANIMATION
========================================================= */

function animateStats(stats) {

    Object.keys(stats).forEach(key => {

        const el = document.querySelector(`[data-stat="${key}"]`);

        if (!el) return;

        let count = 0;
        const target = stats[key];

        const step = target / 80;

        function update() {

            count += step;

            if (count < target) {
                el.innerText = Math.floor(count);
                requestAnimationFrame(update);
            } else {
                el.innerText = target;
            }

        }

        update();

    });

}

/* =========================================================
   SIMPLE SEARCH ENGINE
========================================================= */

function searchPublications(query) {

    const result = ALL_PUBLICATIONS.filter(pub => {

        return pub.title.toLowerCase().includes(query.toLowerCase()) ||
               pub.journal.toLowerCase().includes(query.toLowerCase());

    });

    renderPublications(result);

}