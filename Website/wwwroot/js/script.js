
//Xử lý hiệu ứng tự gõ chữ
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

//Xử lý thay đổi ký hiệu khi nhấn dropdown của nav
$('.drop-down').on('click', (e) => {
    e.preventDefault();
    $('.dropdown').toggleClass('active');
    if ($('.dropdown').hasClass('active')) $('.material-icons.carrot').html('expand_less')
    else $('.material-icons.carrot').html('expand_more')
})

//Xử lý ẩn hiện nav
$('.nav-toggler').on('click', () => {
    $('.sidebar').addClass('show')
    navigator.vibrate([50, 100, 50]);
})

const hideSidebar = () => {
    $('.sidebar').removeClass('show')
}

$('.sidebar_header').on('click', () => {
    hideSidebar()
})

$('.overlay').on('click', () => {
    hideSidebar()
})

//Xử lý ẩn hiện icon group
$('.action-btn').on('click', () => {
    $('.action-btn-group').toggleClass('active');
})

//Xử lý đề xuất khi nhập vào textbox tìm kiếm
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

////////////
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
        effect: "clip",
        duration: 1000
    }
});

$("#opener").on("click", function () {
    $("#dialog").dialog("open");
});

//Xử lý hiện hiệu ứng loading khi thực hiện tác vụ
function runLoadAnimate(type) {
    return type ? $('.task-runner').css('display', 'block') : $('.task-runner').css('display', 'none')
}

//Xử lý đăng nhập và đăng ký
$(".login-register").dialog({
    autoOpen: false,
    width: 350,
    modal: true,
    show: {
        effect: "clip",
        duration: 1000
    },
    hide: {
        effect: "clip",
        duration: 1000
    }
});

$(".login-register").tabs();

$(".contact").on("click", () => {
    clearLoginRegister()
    $(".login-register").dialog("open");
});

$('.view-pass').on('click', (e) => {
    if (e.target.textContent == 'visibility') {
        $(e.target.parentElement.firstElementChild).attr('type', 'text');
        $(e.target).html('visibility_off')
    }
    else {
        $(e.target.parentElement.firstElementChild).attr('type', 'password');
        $(e.target).html('visibility')
    }
})

function clearLoginRegister() {
    $('#loginUsername').attr('class', 'form-control')
    $('#loginPassword').attr('class', 'form-control')
    $('#registerUsername').attr('class', 'form-control')
    $('#registerPassword').attr('class', 'form-control')
    $('#registerRePassword').attr('class', 'form-control')
}

function setStateInp(state, inp, lbl, text) {
    if (state) {
        $(inp).removeClass('is-invalid').addClass('is-valid')
        $(lbl).removeClass('invalid-feedback').addClass('valid-feedback').hide()
    }
    else {
        $(inp).removeClass('is-valid').addClass('is-invalid')
        $(lbl).html(text).removeClass('valid-feedback').addClass('invalid-feedback').show()
    }
}

$('#loginUsername').on('focusout', (e) => {
    if ($(e.target).hasClass('is-valid'))
        setStateInp(false, e.target, '#ckcLoginUsername', 'Username đã tồn tại !')
    else setStateInp(true, e.target, '#ckcLoginUsername', 'Username đã tồn tại !')
})

//Xử lý đăng ký tài khoản
$('#registerUsername').on('focusout', (e) => {
    var checker = /^[a-zA-Z0-9]{5,20}$/;
    if (!checker.test($('#registerUsername').val())) {
        setStateInp(false, e.target, '#ckcRegisterUsername', 'Tên người dùng không hợp lệ !')
        return;
    }

    $.ajax({
        url: "/user/checkusername",
        type: 'POST',
        data: {
            uname: $('#registerUsername').val()
        },
        success: function (data) {
            console.log(data)
            if (!data) setStateInp(true, e.target, '#ckcRegisterUsername', 'Tên người dùng hợp lệ !')
            else setStateInp(false, e.target, '#ckcRegisterUsername', 'Tên người dùng đã tồn tại !')
        }
    });
})

$('#registerPassword').on('focusout', (e) => {
    setStateInp(true, e.target, '#ckcRegisterPassword', 'Mật khẩu hợp lệ !')
})

$('#registerRePassword').on('focusout', (e) => {
    if ($('#registerPassword').val() == $('#registerRePassword').val()) {
        setStateInp(true, e.target, '#ckcRegisterRePassword', 'Mật khẩu hợp lệ !')
        $('#registerSubmit').prop('disabled', false);
    }
    else {
        setStateInp(false, e.target, '#ckcRegisterRePassword', 'Nhập lại khẩu chưa khớp !')
        $('#registerSubmit').prop('disabled', true);
    }
})

$('#registerSubmit').on('click', (e) => {

    e.preventDefault()

    console.log($('#registerUsername').val())
    console.log($('#registerPassword').val())
    console.log($('#registerRePassword').val())


    $.ajax({
        url: "/user/create",
        type: 'POST',
        data: {
            uname: $('#registerUsername').val(),
            pass: $('#registerPassword').val()
        },
        success: function (data) {
            console.log(data)
        }
    });
})