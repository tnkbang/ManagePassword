using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.IRepositories
{
    public interface IPasswordServices
    {
        Task<List<HasPassword>> GetList();

        Task<HasPassword> Details(string id, string code, string uname);

        void Create(HasPassword password);

        void Update(HasPassword password);

        void Delete(HasPassword password);

        Task<bool> HasUser(string uid);

        Task<bool> HasType(string code);
    }
}
