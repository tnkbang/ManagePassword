using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

using Data.IRepositories;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    public class PasswordRepository<TModel> : IPasswordRepository<TModel> where TModel : class
    {
        private readonly PasswordManagerContext _db;

        public PasswordRepository(PasswordManagerContext db)
        {
            _db = db;
        }

        public async Task<List<HasPassword>> GetList()
        {
            try
            {
                return await _db.Set<HasPassword>().ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public HasPassword Details(string id, string code, string uname)
        {
            try
            {
                var pass = _db.HasPasswords.FirstOrDefault(x => x.Uid == id && x.TypeCode == code && x.Username == uname);
                return pass != null ? pass : new HasPassword();
            }
            catch
            {
                throw;
            }
        }

        public void Create(HasPassword model)
        {
            try
            {
                _db.Set<HasPassword>().Add(model);
                _db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void Update(HasPassword model)
        {
            try
            {
                _db.Set<HasPassword>().Update(model);
                _db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void Delete(HasPassword model)
        {
            try
            {
                _db.Set<HasPassword>().Remove(model);
                _db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public bool HasUser(string uid)
        {
            try
            {
                var pass = _db.HasPasswords.FirstOrDefault(x => x.Uid == uid);
                return pass != null ? true : false;
            }
            catch
            {
                throw;
            }
        }

        public bool HasType(string code)
        {
            try
            {
                var pass = _db.HasPasswords.FirstOrDefault(x => x.TypeCode == code);
                return pass != null ? true : false;
            }
            catch
            {
                throw;
            }
        }
    }
}
