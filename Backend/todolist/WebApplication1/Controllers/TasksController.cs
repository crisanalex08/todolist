using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TodoList.Data;
using TodoList.Services;

namespace TodoList.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TasksController : ControllerBase
  {
    private readonly ILogger<TasksController> _logger;
    private readonly IMapper _mapper;
    private readonly ITaskService taskService;
    public TasksController(ILogger<TasksController> logger,
      ITaskService taskService,
      IMapper mapper)
    {
      this.taskService = taskService;
      _logger = logger;
      _mapper = mapper;
    }
    
    [HttpGet("{userId}/{take}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
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
