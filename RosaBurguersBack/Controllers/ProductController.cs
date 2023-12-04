using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;

namespace RosaBurguersBack.Controllers;

using DTO;

[ApiController]
[Route("product")]
public class ProductController : ControllerBase
{
    [HttpPost("create")]
    [EnableCors("DefaultPolicy")]
    public async Task<IActionResult> Create(
        [FromBody]ProductData product,
        [FromServices]IProductService service
    )
    {
        var errors = new List<string>();
        var getProduct = await service
            .GetProductByName(product.name.ToLower());

        if (getProduct is not null)
            errors.Add("Produto já cadastrado!");
        if (errors.Count > 0)
            return BadRequest(errors);

        await service.Create(product);
        return Ok(true);
    }
}