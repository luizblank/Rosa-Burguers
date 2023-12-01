using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using DTO;
using RosaBurguersBack.Model;

namespace RosaBurguersBack.Services;

public class OrderService : IOrderService
{
    RosaBurguersDbContext ctx;

    public OrderService(RosaBurguersDbContext ctx)
    {
        this.ctx = ctx;
    }

    public async Task Create(OrderData data)
    {
        Pedido pedido = new Pedido();

        pedido.Usuario = data.userID;
        pedido.NomeChamada = data.callName;

        this.ctx.Add(pedido);
        await this.ctx.SaveChangesAsync();
    }

    public async Task<Pedido> GetOrderByID(int id)
    {
        var query =
            from order in this.ctx.Pedidos
            where order.Id == id
            select order;

        return await query.FirstOrDefaultAsync();
    }

    public async Task<Pedido> GetOrderByUser(int id)
    {
        var query =
            from order in this.ctx.Pedidos
            where order.Usuario == id
            select order;

        return await query.FirstOrDefaultAsync();
    }
}