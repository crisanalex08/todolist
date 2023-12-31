using System.ComponentModel.DataAnnotations;

namespace TodoList.DTOs.Users
{
  public class UserResult
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Salt { get; set; }

    public bool IsAdmin { get; set; }
  }
}
