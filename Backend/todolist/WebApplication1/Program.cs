using TodoList.Configuration;
using TodoList.Services;
using AutoMapper;
using System.Reflection;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
  c.SwaggerDoc("v1", new OpenApiInfo()
  {
    Title = "TodoList API",
    Version = "v1",
  });
});
builder.Services.ResolveDependencies();

builder.Services.AddCors(o =>
{
  o.AddPolicy("AllowAll", p =>
  {
    p.WithOrigins("http://localhost:4200")
    .AllowAnyMethod()
    .AllowAnyHeader();
  });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI(c =>
  {
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
  });
  app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.MapControllers();

app.Run();

