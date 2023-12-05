using System.Threading.Tasks;
using DTO;
using RosaBurguersBack.Model;

public interface IProductService
{
    Task Create(ProductData data);
    Task<Produto> GetProductByID(int id);
    Task<Produto> GetProductByName(string name);
    ProductData ToProductData(Produto product);
}