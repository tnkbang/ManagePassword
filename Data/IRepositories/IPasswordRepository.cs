using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.IRepositories
{
    public interface IPasswordRepository<TModel> where TModel : class
    {
        Task<List<HasPassword>> GetList();

        Task<HasPassword> Details(string id, string code, string uname);

        void Create(HasPassword model);

        void Update(HasPassword model);

        void Delete(HasPassword model);

        Task<bool> HasUser(string uid);

        Task<bool> HasType(string code);
    }
}
