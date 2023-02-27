# Quản lý tài khoản cá nhân

Website quản lý tài khoản cá nhân sử dụng jquery UI.
</br>
Có thể sử dụng để quản lý các tài khoản cá nhân phòng trừ thất lạc. Hệ thống sử dụng giải thuật AES để mã hóa mật khẩu nên tính an toàn cực cao.

## Kỹ Thuật

- ASP.Net Core 6
- Mô hình 3 lớp
- Bootstrap 5
- Jquery UI
- Thuật toán AES

## Cài đặt

```
git clone https://github.com/tnkbang/ManagePassword.git
```

Lấy file script sql tại:
```
./wwwroot/content/sql/script.sql
```

Cấu hình kết nối csdl tại:
```
./appsettings.json

Change: "Data Source=TNKBANG-PC\\SQLSERVER;Initial Catalog=PasswordManager;Persist Security Info=True;User ID=sa;Password=khanhbang;TrustServerCertificate=True"
```

## Demo

![This is an image](/Website/wwwroot/demo/trangchu.png)
![This is an image](/Website/wwwroot/demo/layout.png)
![This is an image](/Website/wwwroot/demo/profile.png)
![This is an image](/Website/wwwroot/demo/pass.png)
![This is an image](/Website/wwwroot/demo/updateAvt.png)

Và nhiều hơn thế nữa.....
