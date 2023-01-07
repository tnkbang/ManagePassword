using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.IRepositories;
using Data.Models;
using Logic.IRepositories;
using Microsoft.AspNetCore.Http;

namespace Logic.Repositories
{
    public class TypeServices : ITypeServices
    {
        private readonly ITypeRepository<TypePassword> repositories;
        private readonly IPasswordServices passwordServices;

        public TypeServices(ITypeRepository<TypePassword> repo, IPasswordServices password)
        {
            repositories = repo;
            passwordServices = password;
        }

        public async Task<List<TypePassword>> GetList()
        {
            try
            {
                return await repositories.GetList();
            }
            catch
            {
                throw;
            }
        }

        public async Task<TypePassword> Details(string id)
        {
            try
            {
                return await repositories.Details(id);
            }
            catch
            {
                throw;
            }
        }

        public void Create(TypePassword type)
        {
            try
            {
                repositories.Create(type);
            }
            catch
            {
                throw;
            }
        }

        public void Update(TypePassword type)
        {
            try
            {
                repositories.Update(type);
            }
            catch
            {
                throw;
            }
        }

        public void Delete(TypePassword type)
        {
            try
            {
                repositories.Delete(type);
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> HasCode(string code)
        {
            TypePassword type = await Details(code);
            return string.IsNullOrEmpty(type.TypeCode) ? true : false;
        }

        public async Task<bool> HasReferences(string code)
        {
            return await passwordServices.HasType(code);
        }

        public async Task<string?> SetImages(string code, IFormFile img)
        {
            //Khai báo đường dẫn lưu file
            var basePath = Path.Combine(Directory.GetCurrentDirectory() + "\\wwwroot\\Content\\Img\\typePassword\\");
            bool basePathExists = Directory.Exists(basePath);

            //Nếu thư mục không có thì tạo mới
            if (!basePathExists) Directory.CreateDirectory(basePath);

            string file_extension = Path.GetFileName(img.FileName).Substring(Path.GetFileName(img.FileName).LastIndexOf('.'));
            var fileName = "type-" + code + "-" + DateTime.Now.Millisecond + file_extension;
            var filePath = Path.Combine(basePath, fileName);

            //Xóa file cũ khỏi server
            TypePassword type = await Details(code);
            if (!String.IsNullOrEmpty(type.Image) && System.IO.File.Exists(Path.Combine(basePath, type.Image)))
            {
                System.IO.File.Delete(basePath + type.Image);
            }

            //Thêm file vào server và trả về tên file
            if (fileName != null && !System.IO.File.Exists(filePath))
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await img.CopyToAsync(stream);
                }
                return fileName;
            }

            return null;
        }
    }
}
