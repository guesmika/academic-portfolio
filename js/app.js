/* =========================================================
   PROFESSOR KAMEL GUESMI - MAIN APPLICATION SCRIPT
   Phase 1 - JavaScript Core Engine
========================================================= */

/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Professor Portfolio Initialized");

    initSmoothScroll();
    initNavbarScroll();
    initSectionObserver();
    initBackToTop();
initScrollProgress();
initActiveSectionHighlight() 

});

function initScrollProgress() {

    const progressBar = document.getElementById("scroll-progress");

    window.addEventListener("scroll", () => {

        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;

        const progress = (scrollTop / docHeight) * 100;

        progressBar.style.width = progress + "%";

    });

}

function initActiveSectionHighlight() {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop;

            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }

        });

    });

}

/* =========================================================
   SMOOTH SCROLLING
========================================================= */

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });

            }

        });

    });

}

/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

function initNavbarScroll() {

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });

}

/* =========================================================
   SECTION OBSERVER (SCROLL SPY)
========================================================= */

function initSectionObserver() {

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (link.getAttribute("href").substring(1) === entry.target.id) {
                        link.classList.add("active");
                    }

                });

            }

        });

    }, {
        threshold: 0.6
    });

    sections.forEach(section => observer.observe(section));

}

/* =========================================================
   BACK TO TOP BUTTON
========================================================= */

function initBackToTop() {

    const btn = document.createElement("button");

    btn.innerHTML = "↑";
    btn.classList.add("back-to-top");

    document.body.appendChild(btn);

    btn.style.position = "fixed";
    btn.style.bottom = "30px";
    btn.style.right = "30px";
    btn.style.display = "none";
    btn.style.padding = "10px 15px";
    btn.style.borderRadius = "50%";
    btn.style.border = "none";
    btn.style.background = "#0B1F3A";
    btn.style.color = "white";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "999";

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }

    });

    btn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

document.addEventListener("DOMContentLoaded", function () {

    initSmoothScroll();
    initNavbarScroll();
    initSectionObserver();
    initScrollProgress();
    initCustomCursor();

    // Phase 2
    loadProfile();
    loadPublications();
    loadProjects();

    // Phase 5 (NEW)
    initResearchEngine();

});


function safeQuery(selector) {
    return safeQuery(selector);
}

function initCustomCursor() {

    const dot = document.querySelector(".cursor-dot");
    const outline = document.querySelector(".cursor-outline");

    window.addEventListener("mousemove", (e) => {

        const x = e.clientX;
        const y = e.clientY;

        dot.style.transform = `translate(${x}px, ${y}px)`;
        outline.style.transform = `translate(${x - 15}px, ${y - 15}px)`;

    });

}

function initLazyLoading() {

    const images = document.querySelectorAll("img");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const img = entry.target;
                img.src = img.dataset.src || img.src;

                observer.unobserve(img);

            }

        });

    });

    images.forEach(img => observer.observe(img));

}

function initResearchChart() {

    const ctx = document.getElementById("researchChart");

    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Publications", "Projects", "Students", "Years"],
            datasets: [{
                label: "Academic Impact",
                data: [120, 15, 40, 25],
                backgroundColor: [
                    "#0B1F3A",
                    "#C9A227",
                    "#1E88E5",
                    "#43A047"
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

}


