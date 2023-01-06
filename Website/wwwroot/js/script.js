
const navToggler = document.querySelector(".nav-toggler");
const sidebar = document.querySelector(".sidebar");
const dropdownBtn = document.querySelector(".drop-down");
const actionBtn = document.querySelector(".action-btn");
const dropdown = document.querySelector(".dropdown");
const profession = document.querySelector("#profession");
document.addEventListener("DOMContentLoaded", () => {
    new Typed(profession, options);
});
dropdownBtn.addEventListener("click", e => {
    e.preventDefault();
    dropdown.classList.toggle("active");
})
navToggler.addEventListener("click", () => {
    sidebar.classList.add("show");
    navigator.vibrate([50, 100, 50]);
})
const hideSidebar = () => {
    sidebar.classList.remove("show");
}
// Amardeep Kesharwani
const options = {
    strings: ["Good boy", "Web Designer", "Web Developer", "full stack web developer", "Accountant", "Comedian", "Good Advisor", "good boy 😍", "Astrologer"],
    typeSpeed: 100,
    loop: true,
};
actionBtn.addEventListener("click", () => {
    document.querySelector(".action-btn-group").classList.toggle("active");
});

document.querySelector('.sidebar_header').addEventListener('click', () => {
    hideSidebar()
})

document.querySelector('.overlay').addEventListener('click', () => {
    hideSidebar()
})