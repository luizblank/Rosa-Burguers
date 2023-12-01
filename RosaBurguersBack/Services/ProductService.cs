using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using DTO;
using RosaBurguersBack.Model;

namespace RosaBurguersBack.Services;

public class ProductService : IProductService
{
    RosaBurguersDbContext ctx;

    public ProductService(RosaBurguersDbContext ctx)
    {
        this.ctx = ctx;
    }

    public async Task Create(ProductData data)
    {
        Produto produto = new Produto();

        produto.Nome = data.name.ToLower();
        produto.Descricao = data.description.ToLower();
        produto.Tipo = data.type.ToLower();
        produto.Preco = data.price;

        this.ctx.Add(produto);
        await this.ctx.SaveChangesAsync();
    }

    public async Task<Produto> GetProductByID(int id)
    {
        var query =
            from product in this.ctx.Produtos
            where product.Id == id
            select product;

        return await query.FirstOrDefaultAsync();
    }

    public async Task<Produto> GetProductByName(string name)
    {
        var query =
            from product in this.ctx.Produtos
            where product.Nome == name
            select product;

        return await query.FirstOrDefaultAsync();
    }
}