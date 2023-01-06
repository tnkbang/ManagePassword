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
    public class TypeRepository<TModel> : ITypeRepository<TModel> where TModel : class
    {
        private readonly PasswordManagerContext _db;

        public TypeRepository(PasswordManagerContext db)
        {
            _db = db;
        }

        public async Task<List<TypePassword>> GetList()
        {
            try
            {
                return await _db.Set<TypePassword>().ToListAsync();
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
                var type = await _db.TypePasswords.FirstOrDefaultAsync(x => x.TypeCode == id);
                return type != null ? type : new TypePassword();
            }
            catch
            {
                throw;
            }
        }

        public void Create(TypePassword model)
        {
            try
            {
                _db.Set<TypePassword>().Add(model);
                _db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void Update(TypePassword model)
        {
            try
            {
                _db.Set<TypePassword>().Update(model);
                _db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void Delete(TypePassword model)
        {
            try
            {
                _db.Set<TypePassword>().Remove(model);
                _db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }
    }
}
