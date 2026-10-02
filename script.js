const API_URL = "https://script.google.com/macros/s/AKfycbw-VDtIIEkRcrh3uWkYjS7fVphQNeGcMiE90Z3h6KmlHfbf9z9dfo7IEvO26Zs-PqVP/exec";

function animateNumber(element, target) {
    const duration = 900;
    const startTime = performance.now();

    function update(currentTime) {
        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        element.textContent = Math.round(target * easedProgress);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

async function loadDashboard() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        animateNumber(
            document.getElementById("teamCount"),
            data.teams
        );

        animateNumber(
            document.getElementById("participantCount"),
            data.participants
        );

        animateNumber(
            document.getElementById("collegeCount"),
            data.colleges
        );

        animateNumber(
            document.getElementById("selectedCount"),
            data.selected
        );

    } catch (error) {
        console.error("Dashboard data error:", error);
    }
}

loadDashboard();

setInterval(loadDashboard, 60000);
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;
        const icon = question.querySelector("span");

        if (answer.style.display === "block") {
            answer.style.display = "none";
            icon.textContent = "+";
        } else {
            answer.style.display = "block";
            icon.textContent = "−";
        }

    });

});