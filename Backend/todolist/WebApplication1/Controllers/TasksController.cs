using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TodoList.Data;
using TodoList.DTOs.ToDoTask;
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
    public async Task<IActionResult> Get(Guid userId, int take)
    {
      var tasks = await taskService.GetTasks(userId, take);
      return Ok(_mapper.Map<IEnumerable<ToDoTaskResult>>(tasks));

    }

    [HttpPost("add_task")]
    public async Task Post([FromBody]ToDoTaskAdd taskAdd)
    {
      var task = _mapper.Map<ToDoTask>(taskAdd);
      await taskService.Add(taskAdd.UserId, task);
      
    }

    [HttpPut("edit_task")]
    public async Task Put([FromBody] ToDoTaskEdit taskEdit)
    {
      try
      {
        var task = _mapper.Map<ToDoTask>(taskEdit);
        await taskService.Edit(task);
      }
      catch (Exception e)
      {
        _logger.LogError(e.Message, e);
        throw;
      }
    }

    [HttpDelete("delete_task/{taskId}")]
    public async Task<IActionResult> Delete([FromRoute] string taskId)
    {
      try
      {
        await taskService.Delete(taskId);
        return NoContent(); // Return 204 No Content upon successful deletion.
      }
      catch (Exception ex)
      {
        return BadRequest($"Failed to delete the task: {ex.Message}");
      }
    }
  }
}
