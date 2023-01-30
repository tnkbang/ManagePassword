using Data.IRepositories;
using Data.Models;
using Logic.IRepositories;
using Logic.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Repositories
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository<User> repositories;

        public UserServices(IUserRepository<User> repo)
        {
            repositories = repo;
        }

        public async Task<List<User>> GetList()
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

        public User Details(string id)
        {
            try
            {
                return repositories.Details(id);
            }
            catch
            {
                throw;
            }
        }

        public User Details(string uname, string pass)
        {
            try
            {
                return repositories.Details(uname, pass);
            }
            catch
            {
                throw;
            }
        }

        private string setUid()
        {
            User user = new User();
            string uid = "";
            do
            {
                uid = StringGenerator.StringNumber(10);
                user = repositories.Details(uid);
            } while (!string.IsNullOrEmpty(user.Uid));
            return uid;
        }

        public void Create(string uname, string pass)
        {
            try
            {
                User user = new User();
                user.Uid = setUid();
                user.Username = uname;
                user.Password = Protect.AsPassword(pass, user.Username);
                user.Active = true;
                user.Created = DateTime.Now;

                repositories.Create(user);
            }
            catch
            {
                throw;
            }
        }

        public void Update(User u)
        {
            try
            {
                repositories.Update(u);
            }
            catch
            {
                throw;
            }
        }

        public void Delete(User u)
        {
            try
            {
                repositories.Delete(u);
            }
            catch
            {
                throw;
            }
        }

        public bool HasUsername(string uname)
        {
            try
            {
                User user = repositories.GetWithUsername(uname);
                return string.IsNullOrEmpty(user.Username) ? false : true;
            }
            catch
            {
                throw;
            }
        }

        public string AsPassword(string uname, string pass)
        {
            try
            {
                return Protect.AsPassword(pass, uname);
            }
            catch
            {
                throw;
            }
        }

        public User HideSensitive(User user)
        {
            try
            {
                user.Password = "";
                return user;
            }
            catch
            {
                throw;
            }
        }

        public async Task<string?> SetImages(string code, IFormFile img)
        {
            //Khai báo đường dẫn lưu file
            var basePath = Path.Combine(Directory.GetCurrentDirectory() + "/wwwroot/content/img/user/");
            bool basePathExists = Directory.Exists(basePath);

            //Nếu thư mục không có thì tạo mới
            if (!basePathExists) Directory.CreateDirectory(basePath);

            string file_extension = Path.GetFileName(img.FileName).Substring(Path.GetFileName(img.FileName).LastIndexOf('.'));
            var fileName = "user-" + code + "-" + DateTime.Now.Millisecond + file_extension;
            var filePath = Path.Combine(basePath, fileName);

            //Xóa file cũ khỏi server
            User user = Details(code);
            if (!String.IsNullOrEmpty(user.Image) && System.IO.File.Exists(Path.Combine(basePath, user.Image)))
            {
                System.IO.File.Delete(basePath + user.Image);
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
