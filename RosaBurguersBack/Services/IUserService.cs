using System.Threading.Tasks;

namespace RosaBurguersBack.Services;

using DTO;
using Model;

public interface IUserService
{
    Task Create(UserData data);
    Task<Usuario> GetByEmail(string login);
}