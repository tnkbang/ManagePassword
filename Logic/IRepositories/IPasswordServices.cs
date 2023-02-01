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

        HasPassword Details(string uid, string code, string uname);

        List<HasPassword> Details(string uid, string code);

        void Create(HasPassword password);

        void Update(HasPassword password);

        void Delete(HasPassword password);

        bool HasUser(string uid);

        bool HasType(string code);

        bool HasPassword(string uid, string code, string uname);
    }
}
