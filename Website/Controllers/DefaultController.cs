using Data.Models;
using Logic.IRepositories;
using Microsoft.AspNetCore.Mvc;

namespace Website.Controllers
{
    public class DefaultController : Controller
    {
        private readonly ITypeServices typeServices;

        public DefaultController(ITypeServices typeServices)
        {
            this.typeServices = typeServices;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<JsonResult> getType(string term)
        {
            List <TypePassword> lst = await typeServices.GetList();
            lst = lst.Where(x => x.TypeName.ToLower().Contains(term.ToLower())).ToList();

            List<string> result = new List<string>();
            lst.ForEach(x => { result.Add(x.TypeName); });

            return Json(result);
        }
    }
}
