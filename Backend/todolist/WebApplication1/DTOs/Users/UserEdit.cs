using System.ComponentModel.DataAnnotations;

namespace TodoList.DTOs.Users
{
  public class UserEdit
  {
    [Required(ErrorMessage = "The field {0} is required")]
    public Guid Id { get; set; }

    [Required(ErrorMessage = "The field {0} is required")]
    [StringLength(100, ErrorMessage = "The field must be between {2} and  {1} characters")]
    public string Name { get; set; }
    public string Email { get; set; }
  }
}
