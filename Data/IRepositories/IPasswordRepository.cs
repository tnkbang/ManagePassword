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

        HasPassword Details(string id, string code, string uname);

        void Create(HasPassword model);

        void Update(HasPassword model);

        void Delete(HasPassword model);

        bool HasUser(string uid);

        bool HasType(string code);
    }
}
