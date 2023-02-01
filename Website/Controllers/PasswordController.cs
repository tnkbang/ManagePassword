using Data.Models;
using Logic.IRepositories;
using Logic.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Website.Controllers
{
    [Authorize]
    public class PasswordController : Controller
    {
        private readonly IPasswordServices passwordServices;
        private readonly ITypeServices typeServices;
        private readonly ReadFileController readFile;

        public PasswordController(IPasswordServices passwordServices, ITypeServices typeServices)
        {
            this.passwordServices = passwordServices;
            readFile = new ReadFileController();
            this.typeServices = typeServices;
        }

        [HttpPost]
        public JsonResult Details(HasPassword pass)
        {
            string uid = User.Claims.First().Value;

            List<HasPassword> lstPass = passwordServices.Details(uid, pass.TypeCode);

            if (lstPass.Count == 0)
                return Json(new { tt = false, mess = "Hiện không có tài khoản nào !" });

            return Json(new { tt = true, lstPass });
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

        [HttpGet]
        [Authorize]
        public async Task<JsonResult> GetFormCreate()
        {
            List<TypePassword> types = new List<TypePassword>();
            types = await typeServices.GetList();

            List<dynamic> result = new List<dynamic>();
            types.ForEach(x => {
                dynamic temp = new
                {
                    TypeCode = x.TypeCode,
                    TypeName = x.TypeName
                };

                result.Add(temp);
            });

            string body = readFile.ReadHtml("/Data/Pass/Create.html");
            return Json(new { body, type = result });
        }
    }
}
