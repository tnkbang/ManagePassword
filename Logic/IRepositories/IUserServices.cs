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

        Task<User> Details(string id);

        void Create(User user);

        void Update(User user);

        void Delete(User user);
    }
}
