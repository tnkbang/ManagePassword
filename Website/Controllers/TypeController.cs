using Data.Models;
using Logic.IRepositories;
using Microsoft.AspNetCore.Mvc;

namespace Website.Controllers
{
    public class TypeController : Controller
    {
        private readonly ITypeServices typeServices;

        public TypeController(ITypeServices typeServices)
        {
            this.typeServices = typeServices;
        }

        [HttpPost]
        public async Task<JsonResult> GetList(string code)
        {
            List<TypePassword> lst = await typeServices.GetList();
            lst = lst.Where(x => x.TypeName.ToLower().Contains(code.ToLower())).ToList();

            List<string> result = new List<string>();
            lst.ForEach(x => { result.Add(x.TypeName); });

            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> Create(string code, string name, string des, IFormFile img)
        {
            if (string.IsNullOrEmpty(code) || string.IsNullOrEmpty(name))
                return Json(new { tt = false, mess = "Thiếu thông tin !" });

            if (typeServices.HasCode(code))
                return Json(new { tt = false, mess = "Mã loại mật khẩu đã tồn tại !"});

            TypePassword type = new TypePassword();
            type.TypeCode = code;
            type.TypeName = name;
            type.Description = des;

            if(img != null)
                type.Image = await typeServices.SetImages(type.TypeCode, img) ?? type.Image;

            typeServices.Create(type);

            return Json(new { tt = true, mess = "Thêm mới loại mật khẩu thành công !" });
        }

        [HttpPost]
        public async Task<JsonResult> Update(string code, string name, string des, IFormFile img)
        {
            if (string.IsNullOrEmpty(code) || string.IsNullOrEmpty(name))
                return Json(new { tt = false, mess = "Thiếu thông tin !" });

            if (typeServices.HasCode(code))
                return Json(new { tt = false, mess = "Mã loại mật khẩu đã tồn tại !" });

            TypePassword type = typeServices.Details(code);
            type.TypeName = name;
            type.Description = des;

            if(img != null)
                type.Image = await typeServices.SetImages(type.TypeCode, img) ?? type.Image;

            typeServices.Update(type);

            return Json(new { tt = true, mess = "Cập nhật loại mật khẩu thành công !" });
        }

        [HttpPost]
        public JsonResult Delete(string code)
        {
            TypePassword type = typeServices.Details(code);

            if (string.IsNullOrEmpty(type.TypeCode))
                return Json(new { tt = false, mess = "Không tìm thấy thông tin !" });

            if(typeServices.HasReferences(code))
                return Json(new { tt = false, mess = "Không thể xóa loại mật khẩu này !" });

            typeServices.Delete(type);

            return Json(new { tt = true, mess = "Xóa loại mật khẩu thành công !" });
        }
    }
}
