using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
  [ApiController]
  [Route("user")]
  public class UserController : ControllerBase
  {
    private ILogger<IUserService> _logger;
    private IUserService _userService;

    public UserController(IUserService userService, ILogger<IUserService> logger)
    {
      _userService = userService;
      _logger = logger;
    }

    [HttpGet("user/register{name}, {email}, {pass}")]
    public Guid RegisterUser(string name, string email, string pass)
    {
      try
      {
        _userService.addUser(name, email, pass);
        return _userService.validateUser(email, pass);
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error in {nameof(RegisterUser)}: {ex.Message}");
        return Guid.Empty;
      }
    }

    [HttpGet("user/validate{email}, {pass}")]
    public Guid ValidateUser(string name, string email, string pass)
    {
      try
      {
        return _userService.validateUser(email, pass);
      }
      catch (Exception ex)
      {
        _logger.LogError($"Error in {nameof(RegisterUser)}: {ex.Message}");
        return Guid.Empty;
      }
    }

  }
}
