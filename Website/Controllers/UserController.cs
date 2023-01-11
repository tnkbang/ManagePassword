using Data.Models;
using Logic.IRepositories;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace Website.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserServices userServices;

        public UserController(IUserServices userServices)
        {
            this.userServices = userServices;
        }

        [HttpPost]
        public async Task<JsonResult> GetList(string name)
        {
            List<User> lst = await userServices.GetList();
            lst = lst.Where(x => string.Concat(x.FistName, " ", x.LastName).ToLower().Contains(name.ToLower())).ToList();

            return Json(lst);
        }

        [HttpPost]
        public JsonResult CheckUsername(string uname)
        {
            bool check = userServices.HasUsername(uname);

            return Json(check);
        }

        [HttpPost]
        public async Task<JsonResult> Create(string uname, string pass)
        {
            if (string.IsNullOrEmpty(uname) || string.IsNullOrEmpty(pass))
                return Json(new { tt = false, mess = "Thiếu thông tin !" });

            if (userServices.HasUsername(uname))
                return Json(new { tt = false, mess = "Tên người dùng đã tồn tại !" });

            userServices.Create(uname, pass);

            User user = userServices.Details(uname, userServices.AsPassword(uname, pass));
            await setLogin(user);

            return Json(new { tt = true, user = user });
        }

        //Xác thực đăng nhập
        private async Task<int> setLogin(User user)
        {
            //Trạng thái của return:
            // 0 - Email hoặc mật khẩu không chính xác
            // 1 - Tài khoản bị khóa
            // 2 - Đăng nhập thành công
            if (user.Uid != null)
            {
                if (!user.Active)
                {
                    return 1;
                }

                //Tạo list lưu chủ thể đăng nhập
                List<Claim> claims = new List<Claim>() {
                        new Claim("Uid", user.Uid),
                        new Claim("Uname", user.Username)
                    };

                //Tạo Identity để xác thực và xác nhận
                ClaimsIdentity identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                ClaimsPrincipal principal = new ClaimsPrincipal(identity);

                //Gọi hàm đăng nhập bất đồng bộ của HttpContext
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, new AuthenticationProperties()
                {
                    //Không nhớ tài khoản
                    IsPersistent = false
                });

                return 2;
            }

            return 0;
        }

        //Gọi đăng nhập
        [HttpPost]
        public async Task<IActionResult> getLogin(string uname, string pass)
        {
            User user = userServices.Details(uname, userServices.AsPassword(uname, pass));
            int login = await setLogin(user);

            if (login == 2)
            {
                return Json(new { tt = true, user = user });
            }
            if (login == 1)
            {
                return Json(new { tt = false, mess = "Tài khoản của bạn bị khóa !" });
            }
            return Json(new { tt = false, mess = "Không tìm thấy tài khoản đăng nhập !" });
        }
    }
}
