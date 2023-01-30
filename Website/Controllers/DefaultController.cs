using Data.Models;
using Logic.IRepositories;
using Logic.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Website.Controllers
{
    public class DefaultController : Controller
    {
        private readonly ITypeServices typeServices;
        private readonly IUserServices userServices;
        private readonly ReadFileController readFile;

        public DefaultController(ITypeServices typeServices, IUserServices userServices)
        {
            this.typeServices = typeServices;
            this.readFile = new ReadFileController();
            this.userServices = userServices;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetNavigation()
        {
            User user= new User();

            if(User.Identity != null && User.Identity.IsAuthenticated)
            {
                user = userServices.Details(User.Claims.First().Value);
            }

            string body = readFile.ReadNavigation("/Data/Web/Navigation.html", user);
            return Json(new { body });
        }

        [HttpGet]
        public JsonResult GetInfo()
        {
            string body = readFile.ReadHtml("/Data/Web/Info.html");
            return Json(new { body });
        }

        [HttpGet]
        public async Task<JsonResult> GetType(string term)
        {
            List <TypePassword> lst = await typeServices.GetList();
            lst = lst.Where(x => x.TypeName.ToLower().Contains(term.ToLower())).ToList();

            List<string> result = new List<string>();
            lst.ForEach(x => { result.Add(x.TypeName); });

            return Json(result);
        }
    }
}
