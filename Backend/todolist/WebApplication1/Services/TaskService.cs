using Microsoft.EntityFrameworkCore;
using TodoList.Data;

namespace TodoList.Services
{
  public class TaskService : ITaskService
  {

    public async Task Add(Guid userId, ToDoTask task)
    {
      using var db = new TodolistContext();
      var user = db.Users.FirstOrDefault(user => user.Id == userId);

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

    public IEnumerable<ToDoTask> GetTasks(Guid userId, int take)
    {
      using var db = new TodolistContext();
      var user = db.Users.FirstOrDefault(user => user.Id == userId);

      if (user != null)
      {
        // Retrieve tasks for the user and limit the results to 'take' items
        var userTasks = db.Tasks.Take(take).Where(t => t.UserId == userId);
        return userTasks;
      }
      else
      {
        return new List<ToDoTask>();
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


  public interface ITaskService
  {
    IEnumerable<ToDoTask> GetTasks(Guid userId, int take);
    Task Add(Guid userId, ToDoTask task);
    Task Delete(Guid taskId);
  }
}
