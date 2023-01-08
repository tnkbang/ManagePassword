using Data.IRepositories;
using Data.Models;
using Logic.IRepositories;
using Logic.Models;
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

        public UserServices(IUserRepository<User> repo)
        {
            repositories = repo;
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

        public async void Create(string uname, string pass)
        {
            try
            {
                User user = new User();

                string ma = "";
                do
                {
                    ma = StringGenerator.StringNumber(10);
                    user = await repositories.Details(ma);
                } while ( !string.IsNullOrEmpty(user.Uid) );

                user = new User();
                user.Uid = ma;
                user.Username = uname;
                user.Password = Protect.AsPassword(pass, user.Uid);
                user.Active = true;
                user.Created = DateTime.Now;

                repositories.Create(user);
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

        public async Task<bool> HasUsername(string uname)
        {
            try
            {
                User user = await repositories.GetWithUsername(uname);
                return string.IsNullOrEmpty(user.Username) ? true : false;
            }
            catch
            {
                throw;
            }
        }
    }
}
