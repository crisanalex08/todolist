using Microsoft.EntityFrameworkCore;
using TodoList.Data;
using TodoList.DTOs.ToDoTask;
using TodoList.Migrations;

namespace TodoList.Services
{
  public class TaskService : ITaskService
  {

    public async Task Add(Guid userId, ToDoTask task)
    {
      using var db = new TodolistContext();
      task.Id =  Guid.NewGuid();
      task.CreatedDate = DateTime.Now;
      task.UpdatedDate = DateTime.Now;
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

    public async Task<IEnumerable<ToDoTask>> GetTasks(Guid userId, int take)
    {
      using var db = new TodolistContext();
      var user = db.Users.FirstOrDefault(user => user.Id == userId);

      if (user != null)
      {

        // Retrieve tasks for the user and limit the results to 'take' items
        if (take > 0)
        {
          var userTasks = await db.Tasks.Where(t => t.UserId == userId).Take(take).ToListAsync();
          return userTasks;
        }
        else
        {
          var userTasks = await db.Tasks.Where(t => t.UserId == userId).ToListAsync();
          return userTasks;
        }
      }
      else
      {
        return new List<ToDoTask>();
      }
    }

    public async Task Delete(string tId)
    {
      var taskId = Guid.Parse(tId);
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

    public async Task Edit(ToDoTaskEdit task)
    {
      try
      {
        using var db = new TodolistContext();

        var oldTask = db.Tasks.FirstOrDefault(t => t.Id == task.Id);
        if (oldTask != null)
        {
          oldTask.IsDeleted = task.IsDeleted ?? oldTask.IsDeleted;
          oldTask.Status = task.Status ?? oldTask.Status;
          oldTask.DueDate = task.DueDate ?? oldTask.DueDate;
          oldTask.CreatedDate = task.CreatedDate ?? oldTask.CreatedDate;
          oldTask.UpdatedDate = task.UpdatedDate ?? oldTask.UpdatedDate;
          oldTask.Description = task.Description ?? oldTask.Description;
          oldTask.Title = task.Title ?? oldTask.Title;
          oldTask.Priority = task.Priority ?? oldTask.Priority;

          await db.SaveChangesAsync();
        }
        else
        {
          throw new Exception($"Error while editing the task: {task.Id}");
        }
      }
      catch (Exception)
      {

        throw;
      }
    }
  }


  public interface ITaskService
  {
    Task<IEnumerable<ToDoTask>> GetTasks(Guid userId, int take);
    Task Add(Guid userId, ToDoTask task);
    Task Edit(ToDoTaskEdit task);
    Task Delete(string taskId);
  }
}
