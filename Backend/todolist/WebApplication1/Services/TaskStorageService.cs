using Microsoft.AspNetCore.Components.Forms;
using System;
using System.Linq;
using System.Net.WebSockets;
using WebApplication1.Data;

namespace WebApplication1.Services
{
  public class TaskStorageService:ITaskStorageService
  {

    public async Task Add(ToDoTask task)
    {
      using var db = new TodolistContext();

      db.Add(task);
      await db.SaveChangesAsync();
    }

    public IEnumerable<ToDoTask> GetTasks(int take)
    {
      var db = new TodolistContext();
      return new List<ToDoTask>();
    }
  }


  public interface ITaskStorageService
  {
    IEnumerable<ToDoTask> GetTasks(int take);
    Task Add(ToDoTask task);
  }
}
