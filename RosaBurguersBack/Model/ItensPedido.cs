using System;
using System.Collections.Generic;

namespace RosaBurguersBack.Model;

public partial class ItensPedido
{
    public int Id { get; set; }

    public int Produto { get; set; }

    public int Pedido { get; set; }

    public virtual Pedido PedidoNavigation { get; set; }

    public virtual Produto ProdutoNavigation { get; set; }
}
