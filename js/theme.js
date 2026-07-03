/* =========================================================
   PROFESSOR KAMEL GUESMI - THEME SYSTEM
   Phase 1 - Dark / Light Mode Engine
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initTheme();

});

/* =========================================================
   INITIAL THEME SETUP
========================================================= */

function initTheme() {

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    createThemeToggle();

}

/* =========================================================
   THEME TOGGLE BUTTON
========================================================= */

function createThemeToggle() {

    const btn = document.createElement("button");

    btn.innerHTML = "🌓";
    btn.classList.add("theme-toggle");

    document.body.appendChild(btn);

    /* Button styling */
    btn.style.position = "fixed";
    btn.style.bottom = "30px";
    btn.style.left = "30px";
    btn.style.zIndex = "999";
    btn.style.padding = "10px 12px";
    btn.style.borderRadius = "50%";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.background = "#0B1F3A";
    btn.style.color = "white";
    btn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";

    /* Click event */
    btn.addEventListener("click", function () {

        const currentTheme = document.documentElement.getAttribute("data-theme");

        if (currentTheme === "dark") {

            setTheme("light");

        } else {

            setTheme("dark");

        }

    });

}

/* =========================================================
   APPLY THEME
========================================================= */

function setTheme(theme) {

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

}