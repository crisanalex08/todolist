using TodoList.Data;
using TodoList.Services;

namespace TodoList.Configuration
{
  public static class DependencyInjectionConfig
  {
    public static IServiceCollection ResolveDependencies( this IServiceCollection services)
    {
      services.AddScoped<TodolistContext>();

      services.AddScoped<IUserService, UserService>();
      services.AddScoped<ITaskService, TaskService>();

      return services;
    }
  }
}
