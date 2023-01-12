using Microsoft.AspNetCore.Mvc;

namespace Website.Controllers
{
    public class ReadFileController : Controller
    {
        public string ReadHtml(string url)
        {
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(Directory.GetCurrentDirectory() + url))
            {
                body = reader.ReadToEnd();
            }
            return body;
        }

        public string ReadProfile(string url, string uname) {
            string body = ReadHtml(url);
            body = body.Replace("{{uname}}", uname);

            return body;
        }
    }
}
