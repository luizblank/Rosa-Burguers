using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using DTO;
using RosaBurguersBack.Model;
using System.Collections.Generic;

namespace RosaBurguersBack.Services;

public class OrderItemService : IOrderItemService
{
    RosaBurguersDbContext ctx;

    public OrderItemService(RosaBurguersDbContext ctx)
    {
        this.ctx = ctx;
    }

    public async Task Add(OrderItemData data, int orderID)
    {
        ItensPedido itens = new ItensPedido();

        itens.Produto = data.productID;
        itens.Pedido = orderID;

        this.ctx.Add(itens);
        await this.ctx.SaveChangesAsync();
    }

    public async Task<List<ItensPedido>> GetItensByID(int id)
    {
        var query =
            from item in this.ctx.ItensPedidos
            where item.Produto == id
            select item;
        
        return await query.ToListAsync();
    }
}