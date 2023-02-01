using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.IRepositories;
using Data.Models;
using Logic.IRepositories;
using Logic.Models;

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

        public HasPassword Details(string uid, string code, string uname)
        {
            try
            {
                HasPassword password = repositories.Details(uid, code, uname);

                if(!string.IsNullOrEmpty(password.Uid)) password.Password = Protect.Decrypt(password.Password, password.Uid + password.TypeCode);
                return password;
            }
            catch
            {
                throw;
            }
        }

        public List<HasPassword> Details(string uid, string code)
        {
            try
            {
                List<HasPassword> passwords = repositories.Details(uid, code);

                foreach(HasPassword p in passwords)
                {
                    p.Password = Protect.Decrypt(p.Password, p.Uid + p.TypeCode);
                }

                return passwords;
            }
            catch
            {
                throw;
            }
        }

        public void Create(HasPassword password)
        {
            try
            {
                password.Password = Protect.Encrypt(password.Password, password.Uid + password.TypeCode);
                repositories.Create(password);
            }
            catch
            {
                throw;
            }
        }

        public void Update(HasPassword password)
        {
            try
            {
                password.Password = Protect.Encrypt(password.Password, password.Uid + password.TypeCode);
                repositories.Update(password);
            }
            catch
            {
                throw;
            }
        }

        public void Delete(HasPassword password)
        {
            try
            {
                repositories.Delete(password);
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
                return repositories.HasUser(uid);
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
                return repositories.HasType(code);
            }
            catch
            {
                throw;
            }
        }

        public bool HasPassword(string uid, string code, string uname)
        {
            try
            {
                HasPassword password = Details(uid, code, uname);
                return string.IsNullOrEmpty(password.Uid) ? false : true;
            }
            catch
            {
                throw;
            }
        }
    }
}
