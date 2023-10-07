using Microsoft.AspNetCore.Components.Forms;
using System;
using System.Linq;
using System.Net.WebSockets;

namespace WebApplication1.Services
{
  public class TaskStorageService : ITaskStorageService
  {
    public async Task Add(ToDoTask task)
    {
      using var db = new TaskContext();

      db.Add(task);
      await db.SaveChangesAsync();
    }

    public IEnumerable<ToDoTask> GetTasks(int take)
    {
      var db = new TaskContext();
      return db.Tasks.Take(take);
    }
  }
}

public interface ITaskStorageService
{
 IEnumerable<ToDoTask> GetTasks(int take);
 Task Add(ToDoTask task);
}
