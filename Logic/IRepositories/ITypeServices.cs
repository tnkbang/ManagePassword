using Data.Models;
using Microsoft.AspNetCore.Http;
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

        TypePassword Details(string id);

        void Create(TypePassword type);

        void Update(TypePassword type);

        void Delete(TypePassword type);

        bool HasCode(string code);

        bool HasReferences(string code);

        Task<string?> SetImages(string code, IFormFile img);
    }
}
