using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;

namespace RosaBurguersBack.Controllers;

using System.Runtime.CompilerServices;
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
        var getOrder = await orderService
            .GetOrderByID(orderItem.orderid);
    
        await orderItemService.Add(orderItem.productid, getOrder.Id);
        return Ok();
    }
}