using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Data.IRepositories;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    public class UserRepository<TModel> : IUserRepository<TModel> where TModel : class
    {
        private readonly PasswordManagerContext _db;

        public UserRepository(PasswordManagerContext db)
        {
            _db = db;
        }

        public async Task<List<User>> GetList()
        {
            try
            {
                return await _db.Set<User>().ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public User Details(string id)
        {
            try
            {
                var user = _db.Users.FirstOrDefault(x => x.Uid == id);
                return user != null ? user : new User();
            }
            catch
            {
                throw;
            }
        }

        public User GetWithUsername(string uname)
        {
            try
            {
                var user = _db.Users.FirstOrDefault(x => x.Username == uname);
                return user != null ? user : new User();
            }
            catch
            {
                throw;
            }
        }

        public void Create(User model)
        {
            try
            {
                _db.Set<User>().Add(model);
                _db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void Update(User model)
        {
            try
            {
                _db.Set<User>().Update(model);
                _db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void Delete(User model)
        {
            try
            {
                _db.Set<User>().Remove(model);
                _db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }
    }
}
