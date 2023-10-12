using System.Security.Authentication;
using System.Security.Cryptography;
using System.Text;
using WebApplication1.Data;

namespace WebApplication1.Services
{
  public class UserService : IUserService
  {
    private ILogger<IUserService> logger;
    public UserService(ILogger<IUserService> logger)
    {
      this.logger = logger;
    }

    public async Task addUser(string name, string email, string password)
    {

      var db = new TodolistContext();
      var salt = GenerateSalt(10);
      var secret = getHashedPass(salt + password);

      User user = new User()
      {
        Id = Guid.NewGuid(),
        Email = email,
        Password = secret,
        Salt = salt,
        Name = name,
      };

      try
      {
        db.Add(user);
        await db.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        logger.LogError($"Error in {nameof(addUser)}: {ex.ToString()}");
        throw;
      }
    }

    public Guid validateUser(string email, string password)
    {
      var db = new TodolistContext();

      User user = db.Users.FirstOrDefault(u => u.Email == email);

      if (user == null)
      {
        throw new InvalidCredentialException("Invalid email");
      }
      else
      {
        if (user.Password == getHashedPass(user.Salt + password))
        {
          return user.Id;
        }
        else
        {
          throw new InvalidCredentialException("Invalid email");

        }
      }
    }

    public Task removeUser(string username)
    {
      throw new NotImplementedException();
    }

    public Task updateUser(string username, string password)
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
    public Task addUser(string name, string email, string password);
    public Task removeUser(string username);
    public Task updateUser(string username, string password);

    public Guid validateUser(string email, string password);
  }
}
