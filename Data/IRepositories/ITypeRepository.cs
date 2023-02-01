using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.IRepositories
{
    public interface ITypeRepository<TModel> where TModel : class
    {
        Task<List<TypePassword>> GetList();

        TypePassword Details(string id);

        void Create(TypePassword type);

        void Update(TypePassword type);

        void Delete(TypePassword type);
    }
}
