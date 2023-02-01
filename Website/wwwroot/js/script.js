//Xử lý sau khi web đã tải
document.addEventListener('DOMContentLoaded', async () => {
    await loadScript('/js/lib-script.js')
    setBackground()

    //Trì hoãn 1s mới thực hiện js để tăng hiệu suất
    setTimeout(() => {
        //Xử lý loading khi gọi ajax về server
        $.ajaxSetup({
            beforeSend: () => {
                $('.task-runner').show()
            },
            complete: () => {
                $('.task-runner').hide()
            },
            error: (xhr) => {
                setPopupError(xhr)
            }
        })

        //Xử lý hiệu ứng tự gõ chữ
        const options = {
            strings: ["Good boy", "Web Designer", "Web Developer", "full stack web developer", "Accountant", "Comedian", "Good Advisor", "good boy 😍", "Astrologer"],
            typeSpeed: 100,
            backSpeed: 100,
            loop: true,
        }
        new Typed('#profession', options)

        //Gọi ajax để gán nav
        $.ajax({
            url: '/default/getnavigation',
            type: 'GET',
            success: (data) => {
                appendBody(data.body)

                //Ẩn nav khi nhấn vào header nav
                $('.close-nav').on('click', () => {
                    hideSidebar()
                })

                //Vô hiệu hóa đối với thẻ a
                $('a').click((e) => {
                    e.preventDefault()
                })

                //Xử lý nhấn thay đổi ảnh
                $('#inpChangeAvt').on('change', (e) => {
                    setFormChangeAvt(e.target.files)
                })

                setDropDown()
                setViewInfo()
                setSearchTyped()
                setLogout()
                getUserInfo()
            }
        })

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
                success: (data) => {
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

        //Xử lý thay đổi thông tin người dùng
        $('.btn-change-profile').on('click', () => {
            setFormChangeProfile()
        })

        //Xử lý thêm tài khoản quản lý
        $('.btn-create-pass').on('click', () => {
            setFormCreatePass()
        })
    }, 1000)
})

//Tải thêm js khi cần
function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector('script[src="' + src + '"]') === null) {
            let script = document.createElement('script')
            script.onload = () => {
                resolve()
            }
            script.onerror = () => {
                reject()
            }
            script.src = src
            document.body.appendChild(script)
        } else {
            resolve()
        }
    })
}

//Tải thêm css khi cần
function loadStyle(url) {
    return new Promise((resolve, reject) => {
        if (document.querySelector('link[href="' + url + '"]') === null) {
            let head = document.getElementsByTagName('head')[0]
            let link = document.createElement('link')
            link.onload = () => {
                resolve()
            }
            link.onerror = () => {
                reject()
            }
            link.rel = 'stylesheet'
            link.type = 'text/css'
            link.href = url
            head.appendChild(link)
        } else {
            resolve()
        }
    })
}

//Set popup error
function setPopupError(xhr) {
    if ($('#error').length) {
        $('#error').html('Với mã lỗi: ' + xhr.status)
        $('#error').dialog('open')
        return
    }

    appendBody('<div id="error" title="Lỗi truy cập">Với mã lỗi: ' + xhr.status + '</div>')
    setDialog('#error', false, true, 0, 0, 'clip', 1000)
    $('#error').dialog('open')
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
        source: (request, response) => {
            $.ajax({
                url: '/default/gettype',
                type: 'GET',
                data: {
                    term: request.term
                },
                success: (data) => {
                    response(data)
                }
            })
        },
        minLength: 1
    })
}

//Xử lý background
function setBackground() {
    $('.main').css('background', 'linear-gradient(30deg,rgba(0,0,0,0.3),rgba(0,0,0,0.2)), url("/css/images/background.jfif")')
    $('.main').css('background-size', 'cover')
    $('.main').css('background-repeat', 'no-repeat')
    $('.main').css('background-position', 'center center')
}

//Xử lý thay đổi ký hiệu khi nhấn dropdown của nav
function setDropDown() {
    $('.drop-down').on('click', (e) => {
        e.preventDefault()
        $('.dropdown').toggleClass('active')
        if ($('.dropdown').hasClass('active')) $('.material-icons.carrot').html('expand_less')
        else $('.material-icons.carrot').html('expand_more')
    })
}

//Khởi tạo dialog
function setDialog(dom, isOpen, isModel, width, height, effect, duration) {
    if (height == 0) height = 'auto'
    if (width == 0) width = 'auto'

    if ($(window).width() < width) width = $(window).width()
    if ($(window).height() < height) height = $(window).height()

    $(dom).dialog({
        autoOpen: isOpen,
        modal: isModel,
        width: width,
        height: height,
        maxWidth: $(window).width(),
        maxHeight: $(window).height() - 90,
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
    appendBody(stringDom)
    setDialog(nameDom, false, isModel, width, height, effect, duration)
}

//Xem thông tin ứng dụng
function setViewInfo() {
    $('.view-info').on('click', () => {
        if ($('#appInfo').length) {
            $('#appInfo').dialog('open')
            return
        }

        $.ajax({
            url: '/default/getinfo',
            type: 'GET',
            success: (data) => {
                appendDialogBody(data.body, '#appInfo', false, 0, 0, 'clip', 1000)
                $('#appInfo').dialog('open')
            }
        })
    })
}

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

//làm mới thẻ input
function clearStateInput(input) {
    $(input).attr('class', 'form-control')
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
        success: (data) => {
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
        success: (data) => {
            if (data.tt) {
                getThongBao('success', 'Thông báo', 'Đăng ký tài khoản thành công !')
                setUserInfo(true, data.user)

                $(".login-register").dialog('close')
                $('.btn-logout').attr('class', 'btn-logout text-danger')
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
        success: (data) => {
            if (data.tt) {
                getThongBao('success', 'Thông báo', 'Đăng nhập thành công !')
                setUserInfo(true, data.user)

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
            success: (data) => {
                if (data.tt) {
                    getThongBao('success', 'Thông báo', 'Đã đăng xuất tài khoản !')
                    setUserInfo(false, '')

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
function setUserInfo(isLogin, user) {
    const image = $('.user-image')
    const username = $('.user-username')
    const email = $('.user-email')

    if (isLogin && user != '') {
        if (user.image) image.attr('src', '/content/img/user/' + user.image)
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
            success: (data) => {
                $('#userProfile').remove()

                appendDialogBody(data.body, '#userProfile', false, 500, 0, 'clip', 1000)
                $('#userProfile').dialog('open')
            }
        })
    })
}

//Tạo form đổi ảnh
function setFormChangeAvt(fileSelected) {
    $.ajax({
        url: '/user/getformchangeavt',
        type: 'GET',
        success: (data) => {
            $('#changeAvt').remove()

            appendDialogBody(data.body, '#changeAvt', false, 400, 0, 'clip', 1000)

            $('#changeAvt').dialog({
                close: (event, ui) => {
                    if (cropper != null) {
                        cropper.destroy()
                        cropper = null
                    }
                }
            })

            setStartCropImg(fileSelected)

            $('#cropperConfirm').on('click', () => {
                confirmCropImg()
            })
        }
    })
}

//Xử lý cắt ảnh
let cropper
async function setStartCropImg(fileSelected) {
    const srcStyle = '/css/cropper.css'
    const srcScript = '/js/cropper.js'
    await loadStyle(srcStyle)
    await loadScript(srcScript)

    let image = document.getElementById('imgCropperAvt')
    const input = document.getElementById('inpChangeAvt')

    let files = fileSelected
    let done = (url) => {
        input.value = ''
        image.src = url
        cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 3,
        })
        $('#changeAvt').dialog('open')
    }

    let reader
    let file

    //Gán đã chọn vào vùng cropper
    if (files && files.length > 0) {
        file = files[0]

        //Kiểm tra đúng định dạng ảnh
        const anh = /(\.jpg|\.jpeg|\.png)$/i
        if (!anh.exec(file.name)) {
            getThongBao('error', 'Lỗi', 'Định dạng ảnh không chính xác !')
            return
        }

        if (URL) {
            done(URL.createObjectURL(file))
        } else if (FileReader) {
            reader = new FileReader()
            reader.onload = (e) => {
                done(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }
}

//Xử lý sau khi đã chọn vùng cắt ảnh
function confirmCropImg() {
    let initialAvatarURL
    let canvas
    let uAvatar = document.querySelector('.user-image')

    if (cropper) {
        canvas = cropper.getCroppedCanvas({
            width: 500,
            height: 500,
        })
        initialAvatarURL = uAvatar.src
        uAvatar.src = canvas.toDataURL()

        canvas.toBlob((blob) => {
            let formData = new FormData()
            formData.append('img', blob, 'avatar.jpg')

            //Gọi về server lưu ảnh
            $.ajax({
                url: '/user/changeavt',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: (data) => {
                    $('#changeAvt').dialog('close')
                    getThongBao('success', 'Thành công', "Cập nhật ảnh đại diện thành công !")
                },
                error: (xhr) => {
                    setPopupError(xhr)
                    uAvatar.src = initialAvatarURL
                }
            })
        })
    }
}

//Tạo form đổi thông tin
function setFormChangeProfile() {
    $.ajax({
        url: '/user/getformchangeprofile',
        type: 'GET',
        success: (data) => {
            $('#changeProfile').remove()

            appendDialogBody(data.body, '#changeProfile', false, 400, 0, 'clip', 1000)
            $('#changeSex').val(data.sex)

            $('#changeProfileSubmit').on('click', (e) => {
                e.preventDefault()

                let check = checkInputProfile()
                if (!check) return
                confirmChangeProfile()
            })

            $('#changeProfile').dialog('open')
        }
    })
}

//Kiểm tra thông tin nhập vào của change profile
function checkInputProfile() {
    const firstName = '#changeFirstName'
    const lastName = '#changeLastName'
    const birthday = '#changeBirthday'
    const phone = '#changePhone'
    const description = '#changeDescription'

    const ckcFirstName = '#ckcChangeFirstName'
    const ckcLastName = '#ckcChangeLastName'
    const ckcBirthday = '#ckcChangeBirthday'
    const ckcPhone = '#ckcChangePhone'
    const ckcDescription = '#ckcChangeDescription'

    clearStateInput(firstName)
    clearStateInput(lastName)
    clearStateInput(birthday)
    clearStateInput(phone)
    clearStateInput(description)

    if ($(firstName).val() == '') {
        setStateInp(false, firstName, ckcFirstName, 'Họ lót không được để trống !')
        return false
    }

    if ($(lastName).val() == '') {
        setStateInp(false, lastName, ckcLastName, 'Tên không được để trống !')
        return false
    }

    if ($(birthday).val() == '') {
        setStateInp(false, birthday, ckcBirthday, 'Ngày sinh không được để trống !')
        return false
    }

    if ($(phone).val() == '') {
        setStateInp(false, phone, ckcPhone, 'Sđt không được để trống !')
        return false
    }

    if ($(description).val() == '') {
        setStateInp(false, description, ckcDescription, 'Mô tả không được để trống !')
        return false
    }

    return true
}

//Lưu thay đổi thông tin
function confirmChangeProfile() {
    let formData = new FormData()
    formData.append('firstName', $('#changeFirstName').val())
    formData.append('lastName', $('#changeLastName').val())
    formData.append('sex', $('#changeSex').val())
    formData.append('birthday', $('#changeBirthday').val())
    formData.append('phone', $('#changePhone').val())
    formData.append('description', $('#changeDescription').val())

    $.ajax({
        url: '/user/changeprofile',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: (data) => {
            getThongBao('success', 'Thành công', "Cập nhật thông tin thành công !")
            $('#changeProfile').dialog('close')
        }
    })
}

//Tạo form thêm tài khoản quản lý
function setFormCreatePass() {
    $.ajax({
        url: '/password/getformcreate',
        type: 'GET',
        success: (data) => {
            $('#passCreate').remove()

            appendDialogBody(data.body, '#passCreate', false, 400, 0, 'clip', 1000)
            $.each(data.type, (index, value) => {
                $('#passCreateType').append(new Option(value.typeName, value.typeCode));
            })

            $('#passCreateSubmit').on('click', (e) => {
                e.preventDefault()

                let check = checkCreatePass()
                if (!check) return
                confirmCreatePass()
            })

            $('#passCreate').dialog('open')

            setTimeout(() => {
                $('#passCreateType').focus()
                $('#passCreateUnname').val('')
                $('#passCreatePass').val('')
            }, 900)
        }
    })
}

//Kiểm tra thêm mới quản lý mật khẩu
function checkCreatePass() {
    const type = '#passCreateType'
    const uname = '#passCreateUnname'
    const pass = '#passCreatePass'

    const ckcType = '#ckcPassCreateType'
    const ckcUname = '#ckcPassCreateUnname'
    const ckcPass = '#ckcPassCreatePass'

    $(type).attr('class', 'form-select')
    clearStateInput(uname)
    clearStateInput(pass)

    if ($(type).val() == '0') {
        setStateInp(false, type, ckcType, 'Chưa chọn loại tài khoản !')
        return false
    }

    if ($(uname).val() == '') {
        setStateInp(false, uname, ckcUname, 'Tên người dùng không được để trống !')
        return false
    }

    if ($(pass).val() == '') {
        setStateInp(false, pass, ckcPass, 'Mật khẩu không được để trống !')
        return false
    }

    return true
}

//Xác nhận thêm mới tài khoản
function confirmCreatePass() {
    let formData = new FormData()
    formData.append('typeCode', $('#passCreateType').val())
    formData.append('username', $('#passCreateUnname').val())
    formData.append('password', $('#passCreatePass').val())

    $.ajax({
        url: '/password/create',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: (data) => {
            if (!data.tt) {
                getThongBao('error', 'Lỗi', data.mess)
                return
            }
            getThongBao('success', 'Thành công', "Cập nhật thông tin thành công !")
            $('#passCreate').dialog('close')
        }
    })
}