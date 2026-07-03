function generateCV() {

    const profile = window.PROFILE_DATA || {};

    const content = `
        NAME: ${profile.name}
        TITLE: ${profile.title}
        INSTITUTION: ${profile.institution}
    `;

    const blob = new Blob([content], { type: "text/plain" });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "CV.txt";

    link.click();

}