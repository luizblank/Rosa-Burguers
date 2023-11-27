using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace RosaBurguersBack.Services;

using DTO;
using Model;

public class UserService : IUserService
{
    RosaBurguersDbContext ctx;
    ISecurityService security;
    public UserService(RosaBurguersDbContext ctx, ISecurityService security)
    {
        this.ctx = ctx;
        this.security = security;
    }

    public async Task Create(UserData data)
    {
        Usuario usuario = new Usuario();
        var salt = await security.GenerateSalt();

        usuario.Email = data.Email;
        usuario.Senha = await security.HashPassword(
            data.Password, salt
        );
        usuario.Salt = salt;

        this.ctx.Add(usuario);
        await this.ctx.SaveChangesAsync();
    }

    public async Task<Usuario> GetByLogin(string login)
    {
        var query =
            from user in this.ctx.Usuarios
            where user.Nome == login
            select user;
        
        return await query.FirstOrDefaultAsync();
    }
}