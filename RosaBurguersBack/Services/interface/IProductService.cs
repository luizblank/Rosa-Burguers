using System.Collections.Generic;
using System.Threading.Tasks;
using DTO;
using RosaBurguersBack.Model;

public interface IProductService
{
    Task Create(ProductData data);
    Task<List<Produto>> GetProductsByType(string type);
    Task<Produto> GetProductByID(int id);
    Task<Produto> GetProductByName(string name);
    ProductData ToProductData(Produto product);
}