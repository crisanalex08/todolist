using System.ComponentModel.DataAnnotations;

namespace TodoList.DTOs.Users
{
  public class UserLogin
  {
    public string Email { get; set; }
    public string Password { get; set; }

  }
}
