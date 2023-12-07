using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using DTO;
using RosaBurguersBack.Model;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System.Collections.Generic;
using System;

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

        pedido.Usuario = data.userid;
        pedido.NomeChamada = data.callname;
        pedido.Codigo = data.code;

        var newOrder = this.ctx.Add(pedido);
        await this.ctx.SaveChangesAsync();
    }

    public async Task Delete(Pedido pedido)
    {
        this.ctx.Remove(pedido);
        await this.ctx.SaveChangesAsync();
    }

    public async Task<Pedido> GetOrderByCode(string code)
    {
        var query =
            from order in this.ctx.Pedidos
            where order.Codigo == code
            select order;

        return await query.FirstOrDefaultAsync();
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

    public async Task<List<Pedido>> GetOrders()
    {
        return await this.ctx.Pedidos
            .ToListAsync();
    }

    public GetOrderData ToGetOrderData(Pedido order)
    {
        GetOrderData orderData = new GetOrderData();
        orderData.ordernum = order.Id;
        orderData.userid = order.Usuario;
        orderData.callname = order.NomeChamada;
        return orderData;
    }
}