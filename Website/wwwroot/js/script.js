//Biến toàn cục
const taskRunner = $('.task-runner')

//Xử lý khi gọi ajax về server
$.ajaxSetup({
    beforeSend: function () {
        taskRunner.show()
    },
    complete: function () {
        taskRunner.hide()
    },
    error: function (xhr) {
        if ($('#error').length) {
            $('#error').html('Với mã lỗi: ' + xhr.status)
            $('#error').dialog('open')
            return
        }

        $('body').append('<div id="error" title="Lỗi truy cập">Với mã lỗi: ' + xhr.status + '</div>')
        setDialog('#error', false, true, 0, 0, 'clip', 1000)
        $('#error').dialog('open')
    }
})

//Xử lý hiệu ứng tự gõ chữ
const options = {
    strings: ["Good boy", "Web Designer", "Web Developer", "full stack web developer", "Accountant", "Comedian", "Good Advisor", "good boy 😍", "Astrologer"],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
}

//Hiệu ứng gõ chữ tại ô tìm kiếm
function setSearchTyped() {
    new Typed('#inpSearch', {
        strings: ['Tìm kiếm tại đây...', 'Bạn đang cần gì?', 'Bạn cần giúp đỡ?', 'Hãy nhập vào tôi...'],
        typeSpeed: 100,
        backSpeed: 100,
        attr: 'placeholder',
        shuffle: true,
        bindInputFocusEvents: true,
        loop: true
    })

    $('#inpSearch').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: '/default/gettype',
                type: 'GET',
                data: {
                    term: request.term
                },
                success: function (data) {
                    response(data)
                }
            })
        },
        minLength: 1
    })
}

//Xử lý sau khi load trang
$(document).on('DOMContentLoaded', () => {
    new Typed('#profession', options)

    $.ajax({
        url: '/default/getnavigation',
        type: 'GET',
        success: function (data) {
            appendBody(data.body)

            //Ẩn nav khi nhấn vào header nav
            $('.sidebar_header').on('click', () => {
                hideSidebar()
            })

            //Vô hiệu hóa đối với thẻ a
            $('a').click(function (e) {
                e.preventDefault()
            })

            setDropDown()
            setViewInfo()
            setSearchTyped()
            setLogout()
            getUserInfo()
        }
    })

    //Hiển thị thông tin ứng dụng
    setDialog('#appInfo', false, false, 0, 0, 'clip', 1000)
})

//Xử lý thay đổi ký hiệu khi nhấn dropdown của nav
function setDropDown() {
    $('.drop-down').on('click', (e) => {
        e.preventDefault()
        $('.dropdown').toggleClass('active')
        if ($('.dropdown').hasClass('active')) $('.material-icons.carrot').html('expand_less')
        else $('.material-icons.carrot').html('expand_more')
    })
}

//Xử lý ẩn hiện nav
$('.nav-toggler').on('click', () => {
    $('.sidebar').addClass('show')
    $('.overlay').css('display', 'block')
    navigator.vibrate([50, 100, 50])
})

const hideSidebar = () => {
    $('.sidebar').removeClass('show')
    $('.overlay').css('display', 'none')
}

$('.overlay').on('click', () => {
    hideSidebar()
})

//Xử lý ẩn hiện icon group
$('.action-btn').on('click', () => {
    $('.action-btn-group').toggleClass('active')
})

//Khởi tạo dialog
function setDialog(dom, isOpen, isModel, width, height, effect, duration) {
    if (height == 0) height = 'auto'
    if (width == 0) width = 'auto'

    if (screen.width <= 290 && screen.width < width) width = 260

    $(dom).dialog({
        autoOpen: isOpen,
        modal: isModel,
        width: width,
        height: height,
        show: {
            effect: effect,
            duration: duration
        },
        hide: {
            effect: effect,
            duration: duration
        }
    })
}

//Thêm dom vào body
function appendBody(stringDom) {
    $('body').append(stringDom)
}

//Thêm dialog vào body
function appendDialogBody(stringDom, nameDom, isModel, width, height, effect, duration) {
    $('body').append(stringDom)
    setDialog(nameDom, false, isModel, width, height, effect, duration)
}

//Xem thông tin ứng dụng
function setViewInfo() {
    $('.view-info').on('click', function () {
        $('#appInfo').dialog('open')
    })
}

//Xử lý đăng nhập và đăng ký
$('.btn-login').on('click', () => {
    if ($('.login-register').length) {
        clearLoginRegister()
        $('.login-register').dialog('open')
        return
    }

    $.ajax({
        url: '/user/getformloginregister',
        type: 'GET',
        success: function (data) {
            appendDialogBody(data.body, '.login-register', false, 350, 0, 'clip', 1000)

            $('.login-register').tabs({
                activate: () => {
                    clearLoginRegister()
                }
            })

            setValidLogin()
            setValidRegister()
            setViewPassword()

            $('.login-register').dialog('open')
        }
    })
})

//Kiểm tra đăng nhập
function setValidLogin() {
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
}

//Kiểm tra đăng ký
function setValidRegister() {
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
        if (!ckcUname || !ckcPass || !ckcRePass) return

        callLoginRegister(true, inpUsername, inpPassword, ckcUsername)
    })
}

//Hiển thị mật khẩu
function setViewPassword() {
    $('.view-pass').on('click', (e) => {
        if (e.target.textContent == 'visibility') {
            $(e.target.parentElement.firstElementChild).attr('type', 'text')
            $(e.target).html('visibility_off')
        }
        else {
            $(e.target.parentElement.firstElementChild).attr('type', 'password')
            $(e.target).html('visibility')
        }
    })
}

//làm mới form đăng nhập và đăng ký
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

    $('#loginPassword').attr('type', 'password')
    $('#registerPassword').attr('type', 'password')
    $('#registerRePassword').attr('type', 'password')
    $('.view-pass').html('visibility')
}

//Set trạng thái inp
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

//Kiểm tra tên người dùng
function checkUsername(inp, lbl) {
    const checker = /^[a-zA-Z0-9]{5,20}$/
    if (!checker.test($(inp).val())) {
        setStateInp(false, inp, lbl, 'Tên người dùng không hợp lệ !')
        return false
    }
    return true
}

//Kiểm tra mật khẩu
function checkPassword(inpUsername, inpPassword, lblPassword) {
    const textPass = $(inpPassword).val()

    if ($(inpUsername).val() == $(inpPassword).val()) {
        setStateInp(false, inpPassword, lblPassword, 'Mật khẩu trùng với tên người dùng !')
        return false
    }

    if (!textPass.match(/[0-9]/) || !textPass.match(/[a-z]/) || !textPass.match(/[A-Z]/) || textPass.length < 5) {
        setStateInp(false, inpPassword, lblPassword, 'Mật khẩu quá yếu !')
        return false
    }

    setStateInp(true, inpPassword, lblPassword, 'Mật khẩu hợp lệ !')
    return true
}

//Kiểm tra xác thực mật khẩu
function checkRePassword(inpPass, inpRePass, lblRePass) {
    if ($(inpPass).val() == $(inpRePass).val()) {
        setStateInp(true, inpRePass, lblRePass, 'Mật khẩu nhập lại hợp lệ !')
        return true
    }
    else {
        setStateInp(false, inpRePass, lblRePass, 'Nhập lại khẩu chưa khớp !')
        return false
    }
}

//Gọi đăng nhập và đăng ký
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
function setRegister(inpUsername, inpPassword) {
    $.ajax({
        url: '/user/create',
        type: 'POST',
        data: {
            uname: $(inpUsername).val(),
            pass: $(inpPassword).val()
        },
        success: function (data) {
            if (data.tt) {
                getThongBao('success', 'Thông báo', 'Đăng ký tài khoản thành công !')
                setInfo(true, data.user)

                $(".login-register").dialog('close')
                $('.btn-login').hide()
                return
            }
            getThongBao('error', 'Lỗi đăng ký', data.mess)
        }
    })
}

//Xử lý đăng nhập
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
                setInfo(true, data.user)

                $(".login-register").dialog('close')
                $('.btn-logout').attr('class', 'btn-logout text-danger')
                $('.btn-login').hide()
                return
            }
            getThongBao('error', 'Lỗi đăng nhập', data.mess)
        }
    })
}

//Xử lý đăng xuất
function setLogout() {
    $('.btn-logout').on('click', (e) => {
        $.ajax({
            url: '/user/logout',
            type: 'GET',
            success: function (data) {
                if (data.tt) {
                    getThongBao('success', 'Thông báo', 'Đã đăng xuất tài khoản !')
                    setInfo(false, '')

                    $('.btn-logout').attr('class', 'btn-logout text-danger hide')
                    $('.btn-login').show()
                    return
                }
                getThongBao('error', 'Lỗi đăng xuất', data.mess)
            }
        })
    })
}

//Set thông tin người dùng
function setInfo(isLogin, user) {
    const image = $('.user-image')
    const username = $('.user-username')
    const email = $('.user-email')

    if (isLogin && user != '') {
        if (user.image) image.attr('src', user.image)
        username.html(user.username)
        if (user.email) email.html(user.email)
    }
    else {
        image.attr('src', 'https://haycafe.vn/wp-content/uploads/2021/12/Anh-anime-cute-1.jpg')
        username.html('ABC 123')
        email.html('abc123@gmail.com')
    }
}

//Lấy thông tin người dùng
function getUserInfo() {
    $('.user-btn').on('click', () => {
        $.ajax({
            url: '/user/getprofile',
            type: 'POST',
            success: function (data) {
                if ($('#userProfile').length) {
                    $('#userProfile').dialog('open')
                    return
                }

                appendDialogBody(data.body, '#userProfile', false, 500, 0, 'clip', 1000)
                $('#userProfile').dialog('open')
            }
        })
    })
}