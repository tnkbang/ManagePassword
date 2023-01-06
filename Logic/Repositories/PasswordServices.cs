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
    public class PasswordServices : IPasswordServices
    {
        private readonly IPasswordRepository<HasPassword> repositories;

        public PasswordServices(IPasswordRepository<HasPassword> repo)
        {
            repositories = repo;
        }

        public async Task<List<HasPassword>> GetList()
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

        public async Task<HasPassword> Details(string id, string code, string uname)
        {
            try
            {
                return await repositories.Details(id, code, uname);
            }
            catch
            {
                throw;
            }
        }

        public void Create(HasPassword type)
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

        public void Update(HasPassword type)
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

        public void Delete(HasPassword type)
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
