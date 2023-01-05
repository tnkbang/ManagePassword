using Data.Models;
using Logic.IRepositories;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using Website.Models;

namespace Website.Controllers
{
    public class HomeController : Controller
    {
        private readonly IUserServices userServices;

        public HomeController(IUserServices uServices)
        {
            userServices = uServices;
        }

        public async Task<IActionResult> ShowNguoiDung()
        {
            List<User> lst = await userServices.GetList();
            return View(lst);
        }

        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}