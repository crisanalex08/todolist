using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.EntityFrameworkCore;
using System.Security.Authentication;
using System.Security.Cryptography;
using System.Text;
using TodoList.Data;
using TodoList.DTOs.Users;

namespace TodoList.Services
{
  public class UserService : IUserService
  {
    private ILogger<IUserService> logger;
    public UserService(ILogger<IUserService> logger)
    {
      this.logger = logger;
    }

    public async Task<IEnumerable<User>> GetAll()
    {
      using var db = new TodolistContext();
      return await db.Users.ToListAsync();
    }

    public async Task AddUser(User user)
    {
      try
      {
        var db = new TodolistContext();
        var salt = GenerateSalt(10);
  

        user.Salt = salt;
        user.Id = Guid.NewGuid();
        user.Password = getHashedPass(salt + user.Password);
        await db.Users.AddAsync(user);
        await db.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        logger.LogError($"Error in {nameof(AddUser)}: {ex.ToString()}");
        throw;
      }
    }

    public Guid ValidateUser(UserLogin userToValid)
    {
      try
      {
        var db = new TodolistContext();

        User user = db.Users.FirstOrDefault(u => u.Email == userToValid.Email);

        if (user == null)
        {
          throw new InvalidCredentialException("Invalid email");
        }
        else
        {
          if (user.Password == getHashedPass( user.Salt + userToValid.Password))
          {
            return user.Id;
          }
          else
          {
            throw new InvalidCredentialException("Invalid email");

          }
        }
      }catch(Exception ex)
      {
        logger.LogError($"Error while validating user: {ex.Message}", ex);
        return Guid.Empty;
      }
    }

    public async Task<int> DeleteUser(Guid id)
    {
      using var db= new TodolistContext();

      var user = db.Users.FirstOrDefault(u => u.Id == id);
      if(user == null)
      {
        return StatusCodes.Status404NotFound;
      }
      db.Remove(user);
      db.SaveChangesAsync();
      return StatusCodes.Status200OK;
    }

    public Task UpdateUser(string username, string password)
    {
      throw new NotImplementedException();
    }

    private string GenerateSalt(int length)
    {
      string salt = string.Empty;

      Random random = new Random();
      string chars = "abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ0123456789";

      string str = new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());

      return str;
    }

    private string getHashedPass(string input)
    {
      SHA256 sha256 = SHA256.Create();

      byte[] bytes = sha256.ComputeHash(Encoding.Unicode.GetBytes(input));

      StringBuilder builder = new StringBuilder();

      for (int i = 0; i < bytes.Length; i++)
      {
        builder.Append(bytes[i]);
      }

      return builder.ToString();
    }
  }

  public interface IUserService
  {
    public Task<IEnumerable<User>> GetAll();
    public Task AddUser(User user);
    public Task<int> DeleteUser(Guid id);
    public Task UpdateUser(string username, string password);

    public Guid ValidateUser(UserLogin user);
  }
}
