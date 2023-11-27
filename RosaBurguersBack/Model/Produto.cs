using System;
using System.Collections.Generic;

namespace RosaBurguersBack.Model;

public partial class Produto
{
    public int Id { get; set; }

    public int? ImagemId { get; set; }

    public string Nome { get; set; } = null!;

    public string Descricao { get; set; } = null!;

    public string Tipo { get; set; } = null!;

    public string? Tamanho { get; set; }

    public virtual Imagem? Imagem { get; set; }

    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
