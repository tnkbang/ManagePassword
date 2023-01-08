using Data.Models;
using Logic.IRepositories;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<JsonResult> Create(string uname, string pass)
        {
            if (string.IsNullOrEmpty(uname) || string.IsNullOrEmpty(pass))
                return Json(new { tt = false, mess = "Thiếu thông tin !" });

            if (await userServices.HasUsername(uname))
                return Json(new { tt = false, mess = "Tên người dùng đã tồn tại !" });

            userServices.Create(uname, pass);

            return Json(new { tt = true, mess = "Đăng ký tài khoản thành công !" });
        }
    }
}
