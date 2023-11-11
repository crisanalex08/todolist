using System.ComponentModel.DataAnnotations;

namespace TodoList.DTOs.Users
{
  public class UserAdd
  {
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public bool IsAdmin { get; set; }

  }
}
