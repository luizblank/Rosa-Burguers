using System.Collections.Generic;
using System.Threading.Tasks;
using DTO;
using RosaBurguersBack.Model;

public interface IOrderService
{
    Task Create(OrderData data);
    Task Delete(Pedido pedido);
    Task<Pedido> GetOrderByID(int id);
    Task<Pedido> GetOrderByUser(int id);
    Task<Pedido> GetOrderByCode(string code);
    Task<List<Pedido>> GetOrders();
    GetOrderData ToGetOrderData(Pedido order);
}