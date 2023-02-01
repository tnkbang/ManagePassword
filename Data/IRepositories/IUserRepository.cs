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

        User Details(string id);

        User Details(string uname, string pass);

        User GetWithUsername(string uname);

        void Create(User user);

        void Update(User user);

        void Delete(User user);
    }
}
