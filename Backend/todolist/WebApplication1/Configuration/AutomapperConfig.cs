using AutoMapper;
using Microsoft.AspNetCore.Identity;
using TodoList.Data;
using TodoList.DTOs.ToDoTask;
using TodoList.DTOs.Users;

namespace TodoList.Configuration
{
  public class AutomapperConfig : Profile
  {
    public AutomapperConfig()
    {
      CreateMap<User, UserAdd>().ReverseMap();
      CreateMap<User, UserEdit>().ReverseMap();
      CreateMap<User, UserResult>().ReverseMap();
      CreateMap<User, UserResult>().ReverseMap();
      CreateMap<User, UserLogin>().ReverseMap();
      CreateMap<UserAdd, UserLogin>().ReverseMap();

      CreateMap<ToDoTask, ToDoTaskAdd>().ReverseMap();
      CreateMap<ToDoTask, ToDoTaskEdit>().ReverseMap();
      CreateMap<ToDoTask, ToDoTaskResult>().ReverseMap();
    }
  }
}
