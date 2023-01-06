using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.IRepositories
{
    public interface ITypeServices
    {
        Task<List<TypePassword>> GetList();

        Task<TypePassword> Details(string id);

        void Create(TypePassword type);

        void Update(TypePassword type);

        void Delete(TypePassword type);
    }
}
