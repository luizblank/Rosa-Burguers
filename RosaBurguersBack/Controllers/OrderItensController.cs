using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;

namespace RosaBurguersBack.Controllers;

using DTO;
using RosaBurguersBack.Services;
using Trevisharp.Security.Jwt;

[ApiController]
[Route("orderItens")]
public class OrderItensController : ControllerBase
{
    [HttpPost("add")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Add(
        [FromBody]OrderItemData orderItem,
        [FromServices]IOrderItemService orderItemService,
        [FromServices]IUserService userService,
        [FromServices]IOrderService orderService,
        [FromServices]CryptoService crypto
    )
    {
        OrderController order = new OrderController();
        var value = crypto.Validate<JwtPayload>(orderItem.jwt);
        var getOrder = await orderService
            .GetOrderByUser(value.id);

        if (getOrder is null)
        {
            await order.Create(orderItem.jwt, userService, orderService, crypto);
            getOrder = await orderService
                .GetOrderByUser(value.id);
        }

        await orderItemService.Add(orderItem, getOrder.Id);
        return Ok();
    }
}