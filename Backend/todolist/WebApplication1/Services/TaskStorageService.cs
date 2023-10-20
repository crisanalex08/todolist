using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

namespace WebApplication1.Services
{
  public class TaskStorageService : ITaskStorageService
  {

    public async Task Add(Guid userId, ToDoTaskEntity task)
    {
      using var db = new TodolistContext();
      var user = db.Users.Include(u => u.Tasks).FirstOrDefault(user => user.Id == userId);

      if (user != null)
      {
        db.Tasks.Add(task);
        await db.SaveChangesAsync();
      }
      else
      {
        throw new Exception("User not found");
      }
    }

    public IEnumerable<ToDoTaskEntity> GetTasks(Guid userId, int take)
    {
      using var db = new TodolistContext();
      var user = db.Users.Include(u => u.Tasks).FirstOrDefault(user => user.Id == userId);

      if (user != null)
      {
        // Retrieve tasks for the user and limit the results to 'take' items
        var userTasks = user.Tasks.Take(take);
        return userTasks;
      }
      else
      {
        return new List<ToDoTaskEntity>();
      }
    }

    public async Task Delete(Guid taskId)
    {
      try
      {
        using var db = new TodolistContext();

        var task = db.Tasks.FirstOrDefault(t => t.Id == taskId);

        if (task != null)
        {
          db.Tasks.Remove(task);
          await db.SaveChangesAsync();
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }
  }


  public interface ITaskStorageService
  {
    IEnumerable<ToDoTaskEntity> GetTasks(Guid userId, int take);
    Task Add(Guid userId, ToDoTask task);
    Task Delete(Guid taskId);
  }
}
