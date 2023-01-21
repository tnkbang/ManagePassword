using Data.Models;
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

        public string ReadProfile(string url, User user) {
            string body = ReadHtml(url);
            string fullName = user.FistName + " " + user.LastName;
            string sex = user.Sex == 1 ? "Nam" : "Nữ";
            string? birthday = string.IsNullOrEmpty(user.Birthday.ToString()) ? "N/A" : user.Birthday?.ToString("dd/MM/yyyy");
            body = body.Replace("{{name}}", string.IsNullOrWhiteSpace(fullName) ? user.Uid : fullName);
            body = body.Replace("{{description}}", user.Description ?? "Không có gì cả");
            body = body.Replace("{{age}}", birthday);
            body = body.Replace("{{created}}", user.Created.ToString("dd/MM/yyyy"));
            body = body.Replace("{{sex}}", sex);

            return body;
        }

        public string ReadNavigation(string url, User user)
        {
            string body = ReadHtml(url);
            body = body.Replace("{{user-image}}", string.IsNullOrEmpty(user.Image) ? "/css/images/avt-default.jpg" : "/content/img/user/" + user.Image);
            body = body.Replace("{{user-username}}", user.Username ?? "ABC 123");
            body = body.Replace("{{user-email}}", string.IsNullOrEmpty(user.Uid) ? "abc123@gmail.com" : user.Username + "@gmail.com");
            body = body.Replace("{{hasLogout}}", string.IsNullOrEmpty(user.Uid) ? "hide" : null);

            return body;
        }
    }
}
