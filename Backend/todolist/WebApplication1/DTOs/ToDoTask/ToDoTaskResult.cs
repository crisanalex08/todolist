using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TodoList.Data;

namespace TodoList.DTOs.ToDoTask
{
  public class ToDoTaskResult
  {
    public Guid? Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public DateTime DueDate { get; set; }
    public TaskStatus Status { get; set; }
    public int Priority { get; set; }
    public bool IsDeleted { get; set; }

    [Required]
    public virtual Guid UserId { get; set; }
  }
}
