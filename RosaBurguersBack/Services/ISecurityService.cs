using System.Threading.Tasks;

namespace RosaBurguersBack.Services;

public interface ISecurityService
{
    Task<string> GenerateSalt();
    Task<string> HashPassword(string password, string salt);
    Task<string> GenerateJwt<T>(T obj);
    Task<T> ValidateJwt<T>(string jwt);
}