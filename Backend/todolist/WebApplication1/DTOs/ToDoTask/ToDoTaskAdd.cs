using System.ComponentModel.DataAnnotations;

namespace TodoList.DTOs.ToDoTask
{
  public class ToDoTaskAdd
  {
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public int Priority { get; set; }
    [Required]
    public virtual Guid UserId { get; set; }
  }
}
