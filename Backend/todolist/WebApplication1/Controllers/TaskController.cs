using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
  [ApiController]
  [Route("task")]
  public class TaskController : ControllerBase
  {
    private readonly ILogger<TaskController> _logger;
    private readonly ITaskStorageService taskService;
    public TaskController(ILogger<TaskController> logger, ITaskStorageService taskService)
    {
      this.taskService = taskService;
      _logger = logger;
      InitialTask();
    }

    private void InitialTask()
    {
      using var db = new TodolistContext();

      Console.WriteLine($"Database path: {db.DbPath}");
    }

    
    [HttpGet("{userId}/{take}")]
    public IEnumerable<ToDoTask> Get(Guid userId, int take)
    {
      return taskService.GetTasks(userId, take);
    }

    [HttpPost("add_task/{userId}")]
    public async Task Post(Guid userId,[FromBody]ToDoTask task)
    {
      await taskService.Add(userId, task); 
    }
  }
}
