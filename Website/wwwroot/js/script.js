
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
$('#inpSearch').autocomplete({
    source: function (request, response) {
        $.ajax({
            url: '/default/gettype',
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

//Hiển thị thông tin ứng dụng
$('#appInfo').dialog({
    autoOpen: false,
    modal: false,
    show: {
        effect: 'clip',
        duration: 1000
    },
    hide: {
        effect: 'clip',
        duration: 1000
    }
});

$('.view-info').on('click', function () {
    $('#appInfo').dialog('open');
});

//Xử lý hiện hiệu ứng loading khi thực hiện tác vụ
function runLoadAnimate(type) {
    return type ? $('.task-runner').css('display', 'block') : $('.task-runner').css('display', 'none')
}

//Xử lý đăng nhập và đăng ký
$('.login-register').dialog({
    autoOpen: false,
    width: 350,
    modal: true,
    show: {
        effect: 'clip',
        duration: 1000
    },
    hide: {
        effect: 'clip',
        duration: 1000
    }
});

$('.login-register').tabs({
    activate: () => {
        clearLoginRegister()
    }
});

$('.btn-login').on('click', () => {
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

    $('#loginUsername').val('')
    $('#loginPassword').val('')
    $('#registerUsername').val('')
    $('#registerPassword').val('')
    $('#registerRePassword').val('')

    $('#loginPassword').attr('type', 'password');
    $('#registerPassword').attr('type', 'password');
    $('#registerRePassword').attr('type', 'password');
    $('.view-pass').html('visibility')
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

function checkUsername(inp, lbl) {
    const checker = /^[a-zA-Z0-9]{5,20}$/;
    if (!checker.test($(inp).val())) {
        setStateInp(false, inp, lbl, 'Tên người dùng không hợp lệ !')
        return false;
    }
    return true;
}

function checkPassword(inpUsername, inpPassword, lblPassword) {
    const textPass = $(inpPassword).val()

    if ($(inpUsername).val() == $(inpPassword).val()) {
        setStateInp(false, inpPassword, lblPassword, 'Mật khẩu trùng với tên người dùng !')
        return false;
    }

    if (!textPass.match(/[0-9]/) || !textPass.match(/[a-z]/) || !textPass.match(/[A-Z]/) || textPass.length < 5) {
        setStateInp(false, inpPassword, lblPassword, 'Mật khẩu quá yếu !')
        return false;
    }

    setStateInp(true, inpPassword, lblPassword, 'Mật khẩu hợp lệ !')
    return true;
}

function checkRePassword(inpPass, inpRePass, lblRePass) {
    if ($(inpPass).val() == $(inpRePass).val()) {
        setStateInp(true, inpRePass, lblRePass, 'Mật khẩu nhập lại hợp lệ !')
        return true;
    }
    else {
        setStateInp(false, inpRePass, lblRePass, 'Nhập lại khẩu chưa khớp !')
        return false;
    }
}

function callLoginRegister(isRegister, inpUsername, inpPassword, ckcUsername) {
    $.ajax({
        url: '/user/checkusername',
        type: 'POST',
        data: {
            uname: $(inpUsername).val()
        },
        success: function (data) {
            if (data) setStateInp(!isRegister, inpUsername, ckcUsername, 'Tên người dùng đã tồn tại !')
            else setStateInp(isRegister, inpUsername, ckcUsername, 'Không tìm thấy tên người dùng !')

            if ($(inpUsername).hasClass('is-invalid')) return

            if (isRegister) setRegister(inpUsername, inpPassword)
            else setLogin(inpUsername, inpPassword)
        }
    })
}

//Xử lý đăng ký tài khoản
$('#registerSubmit').on('click', (e) => {
    e.preventDefault()

    const inpUsername = '#registerUsername'
    const inpPassword = '#registerPassword'
    const inpRePassword = '#registerRePassword'
    const ckcUsername = '#ckcRegisterUsername'
    const ckcPassword = '#ckcRegisterPassword'
    const ckcRePassword = '#ckcRegisterRePassword'

    const ckcUname = checkUsername(inpUsername, ckcUsername)
    const ckcPass = checkPassword(inpUsername, inpPassword, ckcPassword)
    const ckcRePass = checkRePassword(inpPassword, inpRePassword, ckcRePassword)
    if (!ckcUname || !ckcPass || !ckcRePass) return;

    callLoginRegister(true, inpUsername, inpPassword, ckcUsername)
})

function setRegister(inpUsername, inpPassword) {
    $.ajax({
        url: '/user/create',
        type: 'POST',
        data: {
            uname: $(inpUsername).val(),
            pass: $(inpPassword).val()
        },
        success: function (data) {
            console.log(data)
        }
    });
}

//Xử lý đăng nhập
$('#loginSubmit').on('click', (e) => {
    e.preventDefault()

    const inpUsername = '#loginUsername'
    const inpPassword = '#loginPassword'
    const ckcUsername = '#ckcLoginUsername'
    const ckcPassword = '#ckcLoginPassword'

    const ckcUname = checkUsername(inpUsername, ckcUsername)
    const ckcPass = checkPassword(inpUsername, inpPassword, ckcPassword)
    if (!ckcUname || !ckcPass) return

    callLoginRegister(false, inpUsername, inpPassword, ckcUsername)
})

function setLogin(inpUsername, inpPassword) {
    $.ajax({
        url: '/user/getlogin',
        type: 'POST',
        data: {
            uname: $(inpUsername).val(),
            pass: $(inpPassword).val()
        },
        success: function (data) {
            if (data.tt) {
                getThongBao('success', 'Thông báo', 'Đăng nhập thành công !')
                $('.user-name').html(data.user.username)
                $(".login-register").dialog('close');
                $('.btn-login').hide()
                return
            }
            getThongBao('error', 'Lỗi đăng nhập', data.mess)
        }
    })
}