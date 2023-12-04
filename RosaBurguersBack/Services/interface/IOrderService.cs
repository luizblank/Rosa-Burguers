using System.Collections.Generic;
using System.Threading.Tasks;
using DTO;
using RosaBurguersBack.Model;

public interface IOrderService
{
    Task Create(OrderData data);
    Task<Pedido> GetOrderByID(int id);
    Task<Pedido> GetOrderByUser(int id);
    Task<List<Pedido>> GetOrders();
}