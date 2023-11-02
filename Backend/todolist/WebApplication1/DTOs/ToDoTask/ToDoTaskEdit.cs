using System.ComponentModel.DataAnnotations;

namespace TodoList.DTOs.ToDoTask
{
  public class ToDoTaskEdit
  {
    [Required]
    public Guid? Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public DateTime DueDate { get; set; }
    public TaskStatus Status { get; set; }
    public int Priority { get; set; }
    public bool IsDeleted { get; set; }
  }
}
