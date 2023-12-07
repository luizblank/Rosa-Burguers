using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace RosaBurguersBack.Controllers;

using System;
using System.Collections.Generic;
using DTO;
using Model;
using Services;
using Trevisharp.Security.Jwt;

[ApiController]
[Route("orders")]
public class OrderController : ControllerBase
{
    [HttpGet("")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> returnOrders(
        [FromServices]IOrderService orderService,
        [FromServices]IOrderItemService orderItemService,
        [FromServices]IProductService productService)
    {
        var orders = await orderService.GetOrders();
        if (orders.Count <= 0)
            return Ok(false);

        List<GetOrderData> getDataList = new List<GetOrderData>();
        
        foreach (var order in orders)
        {
            var getData = orderService.ToGetOrderData(order);
            var orderItem = orderItemService.GetItensByOrderID(order.Id).Result;
            foreach (var item in orderItem)
            {
                var product = productService.GetProductByID(item.Produto).Result;
                var productData = productService.ToProductData(product);
                getData.orders.Add(productData);
            }
            getDataList.Add(getData);
        }
        
        return Ok(getDataList);
    }

    [HttpPost("create")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Create(
        [FromBody]CreateOrderData createOrderData,
        [FromServices]IUserService userService,
        [FromServices]IOrderService orderService,
        [FromServices]ISecurityService securityService,
        [FromServices]CryptoService crypto
    )
    {
        OrderData order = new OrderData();
        var value = crypto.Validate<JwtPayload>(createOrderData.jwt);
        
        var user = await userService
            .GetUserByID(value.id);

        var code = await securityService.GenerateSalt();
        order.userid = user.Id;
        order.callname = createOrderData.name;
        order.code = code;

        await orderService.Create(order);
        var newOrder = await orderService
            .GetOrderByCode(code);
            
        return Ok(newOrder.Id);
    }

    [HttpPost("delete")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Delete(
        [FromBody]OrderData orderData,
        [FromServices]IOrderService orderService,
        [FromServices]IOrderItemService orderItemService
    )
    {
        var order = orderService.GetOrderByID(orderData.userid).Result;
        await orderItemService.DeleteByOrderID(order.Id);
        await orderService.Delete(order);
        return Ok();
    }
}