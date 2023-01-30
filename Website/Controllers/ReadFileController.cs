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
            string fullName = user.FirstName + " " + user.LastName;
            string[] gioiTinh = { "Khác", "Nam", "Nữ" };
            string? birthday = string.IsNullOrEmpty(user.Birthday.ToString()) ? "N/A" : user.Birthday?.ToString("dd/MM/yyyy");

            body = body.Replace("{{image}}", string.IsNullOrEmpty(user.Image) ? "/content/img/user/avt-default.jpg" : "/content/img/user/" + user.Image);
            body = body.Replace("{{name}}", string.IsNullOrWhiteSpace(fullName) ? user.Uid : fullName);
            body = body.Replace("{{description}}", user.Description ?? "Không có gì cả");
            body = body.Replace("{{age}}", birthday);
            body = body.Replace("{{created}}", user.Created.ToString("dd/MM/yyyy"));
            body = body.Replace("{{sex}}", gioiTinh[user.Sex ?? 0]);

            return body;
        }

        public string ChangeProfile(string url, User user)
        {
            string body = ReadHtml(url);
            body = body.Replace("{{first_name}}", user.FirstName);
            body = body.Replace("{{last_name}}", user.LastName);
            body = body.Replace("{{birthday}}", user.Birthday?.ToString("yyyy-MM-dd"));
            body = body.Replace("{{phone}}", user.Phone);
            body = body.Replace("{{description}}", user.Description);

            return body;
        }

        public string ReadNavigation(string url, User user)
        {
            string body = ReadHtml(url);
            body = body.Replace("{{user-image}}", string.IsNullOrEmpty(user.Image) ? "/content/img/user/avt-default.jpg" : "/content/img/user/" + user.Image);
            body = body.Replace("{{user-username}}", user.Username ?? "ABC 123");
            body = body.Replace("{{user-email}}", string.IsNullOrEmpty(user.Uid) ? "abc123@gmail.com" : user.Username + "@gmail.com");
            body = body.Replace("{{hasLogout}}", string.IsNullOrEmpty(user.Uid) ? "hide" : null);

            return body;
        }
    }
}
