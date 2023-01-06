using Data.IRepositories;
using Data.Models;
using Data.Repositories;
using Logic.IRepositories;
using Logic.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add connection string
builder.Services.AddDbContext<PasswordManagerContext>(option =>
{
    option.UseSqlServer(builder.Configuration.GetConnectionString("MSSQL"));
});

//call linked three layer

builder.Services.AddTransient(typeof(IUserRepository<>), typeof(UserRepository<>));
builder.Services.AddScoped<IUserServices, UserServices>();

builder.Services.AddTransient(typeof(ITypeRepository<>), typeof(TypeRepository<>));
builder.Services.AddScoped<ITypeServices, TypeServices>();

builder.Services.AddTransient(typeof(IPasswordRepository<>), typeof(PasswordRepository<>));
builder.Services.AddScoped<IPasswordServices, PasswordServices>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/home/error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=home}/{action=index}/{id?}");

app.Run();
