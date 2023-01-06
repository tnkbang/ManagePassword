using Data.Models;
using Logic.IRepositories;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Website.Models;

namespace Website.Controllers
{
    public class HomeController : Controller
    {
        private readonly ITypeServices typeServices;

        public HomeController(ITypeServices uServices)
        {
            typeServices = uServices;
        }

        public async Task<IActionResult> Index()
        {
            List<TypePassword> lst= new List<TypePassword>();
            lst = await typeServices.GetList();
            return View(lst);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}