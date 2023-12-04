using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;

namespace RosaBurguersBack.Controllers;

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
        List<GetOrderData> getDataList = new List<GetOrderData>();
        GetOrderData getData = new GetOrderData();
        ProductData productData = new ProductData();
        var orders = await orderService.GetOrders();
        
        foreach (var order in orders)
        {
            getData.NumPedido = order.Id;
            getData.NomeChamada = order.NomeChamada;
            var orderItem = orderItemService.GetItensByOrderID(order.Id).Result;
            foreach (var item in orderItem)
            {
                var product = productService.GetProductByID(item.Produto).Result;
                productData.name = product.Nome;
                productData.description = product.Descricao;
                productData.type = product.Tipo;
                productData.price = product.Preco;
                getData.ItensPedidos.Add(productData);
            }
            getDataList.Add(getData);
        }
        
        return Ok(getDataList);
    }

    [HttpPost("create")]
    [EnableCors("DefaultPolicy")]
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