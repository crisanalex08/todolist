using Microsoft.AspNetCore.Mvc;
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
      using var db = new TaskContext();

      Console.WriteLine($"Database path: {db.DbPath}");
    }


    [HttpGet("{take}")]
    public IEnumerable<ToDoTask> Get(int take)
    {
      return taskService.GetTasks(take);
    }

    [HttpPost(Name = "AddTask")]
    public async Task Post(ToDoTask task)
    {
      await taskService.Add(task); 
    }
  }
}
