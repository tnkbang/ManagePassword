using Microsoft.AspNetCore.Mvc;

namespace Website.Controllers
{
    public class DefaultController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
