using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace RosaBurguersBack.Services;

using System;
using DTO;
using Microsoft.EntityFrameworkCore.Query.Internal;
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

        usuario.Nome = data.name;
        usuario.DataNasc = DateTime.Parse(data.birthDate);
        usuario.Sexo = data.sex;
        usuario.Email = data.email;
        usuario.Senha = await security.HashPassword(
            data.password, salt
        );
        usuario.Salt = salt;
        usuario.Adm = false;

        this.ctx.Add(usuario);
        await this.ctx.SaveChangesAsync();
    }

    public async Task<Usuario> GetByEmail(string email)
    {
        var query =
            from user in this.ctx.Usuarios
            where user.Email == email
            select user;
        
        return await query.FirstOrDefaultAsync();
    }
}