using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TodoList.Configuration;
using TodoList.Data;
using TodoList.DTOs.Users;
using TodoList.Services;

namespace TodoList.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class UsersController : ControllerBase
  {
    private readonly ILogger<IUserService> _logger;
    private IUserService _userService;
    private readonly IMapper _mapper;

    public UsersController(IUserService userService,
      ILogger<IUserService> logger,
      IMapper mapper)
    {
      _userService = userService;
      _logger = logger;
      _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
      var users = await _userService.GetAll();
      return Ok(_mapper.Map<IEnumerable<UserResult>>(users));
    }

    [HttpPost("/register")]
    public async Task<IActionResult> RegisterUser([FromBody]UserAdd userDto)
    {
      try
      {
        var userlogin = _mapper.Map<UserLogin>(userDto);
        var user = _mapper.Map<User>(userDto);
        await _userService.AddUser(user);
        return Ok(_userService.ValidateUser(userlogin));
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error in {nameof(RegisterUser)}: {ex.Message}");
        return Ok(Guid.Empty);
      }
    }

    [HttpGet("/validate")]
    public Guid ValidateUser([FromQuery]UserLogin user)
    {
      try
      {
        return _userService.ValidateUser(user);
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error in {nameof(RegisterUser)}: {ex.Message}");
        return Guid.Empty;
      }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
      var code = await _userService.DeleteUser(id);
      if(code == StatusCodes.Status200OK)
      {
        return Ok(code);
      }
      else
      {
        return BadRequest();
      }
    }

  }
}
