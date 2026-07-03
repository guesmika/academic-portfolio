const translations = {
    en: {
        publications: "Publications",
        projects: "Projects",
        students: "Students"
    },
    fr: {
        publications: "Publications",
        projects: "Projets",
        students: "Étudiants"
    },
    ar: {
        publications: "منشورات",
        projects: "مشاريع",
        students: "طلبة"
    }
};

function setLanguage(lang) {

    document.querySelectorAll("[data-i18n]").forEach(el => {

        const key = el.getAttribute("data-i18n");

        el.innerText = translations[lang][key];

    });

}