using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Data.Models;

namespace Data.IRepositories
{
    public interface IUserRepository<TModel> where TModel : class
    {
        Task<List<User>> GetList();

        Task<User> Details(string id);

        Task<User> GetWithUsername(string uname);

        void Create(User model);

        void Update(User model);

        void Delete(User model);
    }
}
