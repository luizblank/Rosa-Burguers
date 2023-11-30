using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RosaBurguersBack.Controllers;

using DTO;
using Microsoft.Identity.Client;
using Model;
using Services;
using Trevisharp.Security.Jwt;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    [HttpGet("verify/{jwt}")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Verify(
        string jwt,
        [FromServices]CryptoService crypto)
    {
        var value = crypto.Validate<JwtPayload>(jwt);
        return Ok(new { value.isAdm });
    }

    [HttpPost("login")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Login(
        [FromBody]LoginData user,
        [FromServices]IUserService service,
        [FromServices]ISecurityService security,
        [FromServices]CryptoService crypto)
    {
        var loggedUser = await service
            .GetByEmail(user.email.ToLower());

        if (loggedUser == null)
            return Unauthorized("Usuário não existe.");
        
        var password = await security.HashPassword(
            user.password, loggedUser.Salt
        );
        var realPassword = loggedUser.Senha;
        if (password != realPassword)
            return Unauthorized("Senha incorreta.");
        
        var jwt = crypto.GetToken(new {
            id = loggedUser.Id,
            isAdm = loggedUser.Adm
        });

        var value = crypto.Validate<JwtPayload>(jwt);

        return Ok(new { jwt , loggedUser.Adm });
    }

    [HttpPost("register")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Create(
        [FromBody]UserData user,
        [FromServices]IUserService service)
    {   
        var errors = new List<string>();
        var date = DateTime.Today;
        try {
            date = DateTime.Parse(user.birthDate);
        }
        catch {
            errors.Add("Data de nascimento inválida!");
            return BadRequest(errors);
        }

        var getUser = await service
            .GetByEmail(user.email.ToLower());

        if (getUser is not null)
            errors.Add("Usuário já cadastrado!");
        if (user.email.Length < 7)
            errors.Add("Email inválido!");
        if (date < DateTime.MinValue || date > DateTime.MaxValue)
            errors.Add("Data de nascimento inválida!");
        if (date >= DateTime.Today)
            errors.Add("Data de nascimento inválida!");
        if (errors.Count > 0)
            return BadRequest(errors);

        await service.Create(user);
        return Ok(true);
    }

    [HttpDelete]
    [EnableCors("DefaultPolicy")]
    public IActionResult DeleteUser()
    {
        throw new NotImplementedException();
    }

    [HttpGet("image")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> GetImage(
        int photoId,
        [FromServices]ISecurityService security,
        [FromServices]RosaBurguersDbContext ctx)
    {
        var query =
            from image in ctx.Imagems
            where image.Id == photoId
            select image;
        
        var photo = await query.FirstOrDefaultAsync();
        if (photo is null)
            return NotFound();

        return File(photo.Foto, "image/jpeg");
    }
}