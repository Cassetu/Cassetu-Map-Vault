document.addEventListener("DOMContentLoaded", () => {
    const searchToggle = document.getElementById("searchToggle");
    const searchDashboard = document.getElementById("searchDashboard");

    searchToggle.addEventListener("click", () => {
        searchDashboard.classList.toggle("open");
        searchToggle.classList.toggle("active");
    });
});