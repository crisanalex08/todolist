using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

public class TaskContext : DbContext
{
  public DbSet<ToDoTask> Tasks { get; set; }
  public string DbPath { get; }

  public TaskContext()
  {
    DbPath = "task.db";
  }

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    optionsBuilder.UseSqlite($"Data Source={DbPath}");
  }
}

public class ToDoTask
{
  public int Id { get; set; }
  public string Title { get; set; }
  public string Description { get; set; }
  public DateTime CreatedDate { get; set; }
  public DateTime UpdatedDate { get; set; }
  public DateTime DueDate { get; set; }
  public TaskStatus Status { get; set; }
  public int Priority { get; set; }
  public bool IsDeleted { get; set; }
}
