using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoList.Data
{

  public class TodolistContext : DbContext
  {
    public DbSet<User> Users { get; set; }
    public DbSet<ToDoTask> Tasks { get; set; }

    public string DbPath { get; }

    public TodolistContext()
    {
      DbPath = "users.db";
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlite($"Data Source={DbPath}");
    }
  }

  public class User
  {
    [Key] public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Salt { get; set; }
  }


  public class ToDoTask
  {
    [Key]
    public Guid? Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; }
    public DateTime DueDate { get; set; }
    public TaskStatus Status { get; set; }
    public int Priority { get; set; }
    public bool IsDeleted { get; set; }
    [ForeignKey(nameof(User))]
    public virtual Guid UserId { get; set; }
  }
}
