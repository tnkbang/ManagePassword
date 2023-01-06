
const options = {
    strings: ["Good boy", "Web Designer", "Web Developer", "full stack web developer", "Accountant", "Comedian", "Good Advisor", "good boy 😍", "Astrologer"],
    typeSpeed: 100,
    loop: true,
};

$(document).on('DOMContentLoaded', () => {
    const profession = document.querySelector("#profession");
    new Typed(profession, options);
})

$('.drop-down').on('click', (e) => {
    e.preventDefault();
    $('.dropdown').toggleClass('active');
})

$('.nav-toggler').on('click', () => {
    $('.sidebar').addClass('show')
    navigator.vibrate([50, 100, 50]);
})

const hideSidebar = () => {
    $('.sidebar').removeClass('show')
}

$('.action-btn').on('click', () => {
    $('.action-btn-group').toggleClass('active');
})

$('.sidebar_header').on('click', () => {
    hideSidebar()
})

$('.overlay').on('click', () => {
    hideSidebar()
})

var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
];

$("#tags").autocomplete({
    source: availableTags
});

$("#dialog").dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    show: {
        effect: "clip",
        duration: 1000
    },
    hide: {
        effect: "explode",
        duration: 1000
    }
});

$("#opener").on("click", function () {
    $("#dialog").dialog("open");
});