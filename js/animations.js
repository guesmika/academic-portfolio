/* =========================================================
   PROFESSOR KAMEL GUESMI - ANIMATION ENGINE
   Phase 1 - Visual Interaction Layer
========================================================= */

/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initScrollAnimations();
    initFadeInObserver();
    initCounterAnimation();

});

/* =========================================================
   SCROLL ANIMATIONS (PARALLAX LIGHT)
========================================================= */

function initScrollAnimations() {

    window.addEventListener("scroll", function () {

        const scrolled = window.scrollY;

        const hero = document.querySelector(".hero-section");

        if (hero) {

            hero.style.backgroundPositionY = scrolled * 0.3 + "px";

        }

    });

}

/* =========================================================
   FADE-IN ON SCROLL (INTERSECTION OBSERVER)
========================================================= */

function initFadeInObserver() {

    const elements = document.querySelectorAll(
        ".card, .research-card, .stat-card, .timeline-item, section"
    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach(el => {

        el.style.opacity = 0;
        el.style.transform = "translateY(30px)";
        el.style.transition = "0.6s ease";

        observer.observe(el);

    });

}
/* =========================================================
   COUNTER ANIMATION (RESEARCH METRICS)
========================================================= */

function initCounterAnimation() {

    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {

        const target = +counter.innerText.replace("+", "");
        let count = 0;

        const step = target / 100;

        const update = () => {

            count += step;

            if (count < target) {

                counter.innerText = Math.floor(count) + "+";

                requestAnimationFrame(update);

            } else {

                counter.innerText = target + "+";

            }

        };

        update();

    };

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));

}

document.querySelectorAll("section").forEach(section => {
    section.classList.add("fade-in");
});