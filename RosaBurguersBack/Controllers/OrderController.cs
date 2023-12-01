using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RosaBurguersBack.Controllers;

using DTO;
using Model;
using Services;
using Trevisharp.Security.Jwt;

public class OrderController : ControllerBase
{
    public async Task Create(
        string jwt,
        [FromServices]IUserService userService,
        [FromServices]IOrderService orderService,
        [FromServices]CryptoService crypto
    )
    {
        OrderData order = new OrderData();
        var value = crypto.Validate<JwtPayload>(jwt);

        var user = await userService
            .GetUserByID(value.id);

        order.userID = user.Id;
        order.callName = user.Nome;

        await orderService.Create(order);
    }
}