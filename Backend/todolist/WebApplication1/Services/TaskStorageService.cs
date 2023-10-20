using WebApplication1.Data;

namespace WebApplication1.Services
{
  public class TaskStorageService : ITaskStorageService
  {

    public async Task Add(Guid userId, ToDoTask task)
    {
      using var db = new TodolistContext();
      var user = db.Users.FirstOrDefault(u => u.Id == userId);

      if (user != null)
      {
        db.Tasks.Add(task);
        await db.SaveChangesAsync();
      }
    }

    public IEnumerable<ToDoTask> GetTasks(Guid userId, int take)
    {
      var db = new TodolistContext();

      var user = db.Users.FirstOrDefault(u => userId == u.Id);

      if(user != null)
      {
        var userTasks = db.Tasks.Take(take).Where(t => t.UserId == userId);
        return userTasks;
      }
      return new List<ToDoTask>();
    }
  }


  public interface ITaskStorageService
  {
    IEnumerable<ToDoTask> GetTasks(Guid userId, int take);
    Task Add(Guid userId, ToDoTask task);
  }
}
