using Data.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.IRepositories
{
    public interface IUserServices
    {
        Task<List<User>> GetList();

        User Details(string id);

        User Details(string uname, string pass);

        void Create(string uname, string pass);

        void Update(User user);

        void Delete(User user);

        bool HasUsername(string uname);

        string AsPassword(string uname, string pass);

        User HideSensitive(User user);

        Task<string?> SetImages(string code, IFormFile img);
    }
}
