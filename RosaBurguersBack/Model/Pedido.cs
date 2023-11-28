using System;
using System.Collections.Generic;

namespace RosaBurguersBack.Model;

public partial class Pedido
{
    public int Id { get; set; }

    public int? Usuario { get; set; }

    public int? Produto { get; set; }

    public string Codigo { get; set; } = null!;

    public TimeSpan Horario { get; set; }

    public virtual Produto? ProdutoNavigation { get; set; }

    public virtual Usuario? UsuarioNavigation { get; set; }
}
