using Data.Models;
using Logic.IRepositories;
using Logic.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Website.Controllers
{
    [Authorize]
    public class PasswordController : Controller
    {
        private readonly IPasswordServices passwordServices;

        public PasswordController(IPasswordServices passwordServices)
        {
            this.passwordServices = passwordServices;
        }

        [HttpPost]
        public JsonResult Create(HasPassword pass)
        {
            string uid = User.Claims.First().Value;

            if (string.IsNullOrEmpty(pass.Username) || string.IsNullOrEmpty(pass.Password))
                return Json(new { tt = false, mess = "Thiếu thông tin !" });

            if (passwordServices.HasPassword(uid, pass.TypeCode, pass.Username))
                return Json(new { tt = false, mess = "Username đã tồn tại !" });

            HasPassword password = new HasPassword();
            password.Uid = uid;
            password.TypeCode = pass.TypeCode;
            password.Username = pass.Username;
            password.Password = pass.Password;
            password.Created = DateTime.Now;

            passwordServices.Create(password);

            return Json(new { tt = true, mess = "Thêm mới mật khẩu thành công !" });
        }

        [HttpPost]
        public JsonResult Update(HasPassword pass)
        {
            string uid = User.Claims.First().Value;

            if (string.IsNullOrEmpty(pass.Username) || string.IsNullOrEmpty(pass.Password))
                return Json(new { tt = false, mess = "Thiếu thông tin !" });

            HasPassword password = passwordServices.Details(uid, pass.Username, pass.Password);
            password.TypeCode = pass.TypeCode;
            password.Username = pass.Username;
            password.Password = pass.Password;

            passwordServices.Update(password);

            return Json(new { tt = true, mess = "Cập nhật mật khẩu thành công !" });
        }

        [HttpPost]
        public JsonResult Delete(HasPassword pass)
        {
            string uid = User.Claims.First().Value;

            HasPassword password = passwordServices.Details(uid, pass.TypeCode, pass.Username);

            if (string.IsNullOrEmpty(pass.Uid))
                return Json(new { tt = false, mess = "Không tìm thấy thông tin !" });

            passwordServices.Delete(password);

            return Json(new { tt = true, mess = "Xóa mật khẩu thành công !" });
        }
    }
}
