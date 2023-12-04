using System.Collections.Generic;
using System.Threading.Tasks;
using DTO;
using RosaBurguersBack.Model;

public interface IOrderItemService
{
    Task Add(OrderItemData data, int orderID);
    Task<List<ItensPedido>> GetItensByOrderID(int id);
}