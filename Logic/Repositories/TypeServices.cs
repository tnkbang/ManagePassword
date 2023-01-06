using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.IRepositories;
using Data.Models;
using Logic.IRepositories;

namespace Logic.Repositories
{
    public class TypeServices : ITypeServices
    {
        private readonly ITypeRepository<TypePassword> repositories;

        public TypeServices(ITypeRepository<TypePassword> repo)
        {
            repositories = repo;
        }

        public async Task<List<TypePassword>> GetList()
        {
            try
            {
                return await repositories.GetList();
            }
            catch
            {
                throw;
            }
        }

        public async Task<TypePassword> Details(string id)
        {
            try
            {
                return await repositories.Details(id);
            }
            catch
            {
                throw;
            }
        }

        public void Create(TypePassword type)
        {
            try
            {
                repositories.Create(type);
            }
            catch
            {
                throw;
            }
        }

        public void Update(TypePassword type)
        {
            try
            {
                repositories.Update(type);
            }
            catch
            {
                throw;
            }
        }

        public void Delete(TypePassword type)
        {
            try
            {
                repositories.Delete(type);
            }
            catch
            {
                throw;
            }
        }
    }
}
