using Data.IRepositories;
using Data.Models;
using Logic.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Repositories
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository<User> repositories;

        public UserServices(IUserRepository<User> u)
        {
            repositories = u;
        }

        public async Task<List<User>> GetList()
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

        public async Task<User> Details(string id)
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

        public void Create(User u)
        {
            try
            {
                repositories.Create(u);
            }
            catch
            {
                throw;
            }
        }

        public void Update(User u)
        {
            try
            {
                repositories.Update(u);
            }
            catch
            {
                throw;
            }
        }

        public void Delete(User u)
        {
            try
            {
                repositories.Delete(u);
            }
            catch
            {
                throw;
            }
        }
    }
}
