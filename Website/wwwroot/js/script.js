
const options = {
    strings: ["Good boy", "Web Designer", "Web Developer", "full stack web developer", "Accountant", "Comedian", "Good Advisor", "good boy 😍", "Astrologer"],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
};

$(document).on('DOMContentLoaded', () => {
    new Typed('#profession', options);

    new Typed('#inpSearch', {
        strings: ['Tìm kiếm tại đây...', 'Bạn đang cần gì?', 'Bạn cần giúp đỡ?', 'Hãy nhập vào tôi...'],
        typeSpeed: 100,
        backSpeed: 100,
        attr: 'placeholder',
        shuffle: true,
        bindInputFocusEvents: true,
        loop: true
    });
})

$('.drop-down').on('click', (e) => {
    e.preventDefault();
    $('.dropdown').toggleClass('active');
    if ($('.dropdown').hasClass('active')) $('.material-icons.carrot').html('expand_less')
    else $('.material-icons.carrot').html('expand_more')
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

$("#inpSearch").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "/default/gettype",
            type: 'GET',
            data: {
                term: request.term
            },
            success: function (data) {
                response(data);
            }
        });
    },
    minLength: 1
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