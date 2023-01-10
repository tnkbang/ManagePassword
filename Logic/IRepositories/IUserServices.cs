using Data.Models;
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

        void Create(string uname, string pass);

        void Update(User user);

        void Delete(User user);

        Task<bool> HasUsername(string uname);
    }
}
