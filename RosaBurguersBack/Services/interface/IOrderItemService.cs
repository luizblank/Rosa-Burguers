using System.Collections.Generic;
using System.Threading.Tasks;
using DTO;
using RosaBurguersBack.Model;

public interface IOrderItemService
{
    Task Add(int data, int orderID);
    Task<List<ItensPedido>> GetItensByOrderID(int id);
    Task DeleteByOrderID(int id);
}