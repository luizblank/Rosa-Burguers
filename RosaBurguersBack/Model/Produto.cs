using System;
using System.Collections.Generic;

namespace RosaBurguersBack.Model;

public partial class Produto
{
    public int Id { get; set; }

    public string Nome { get; set; }

    public string Descricao { get; set; }

    public string Tipo { get; set; }

    public double Preco { get; set; }

    public string Tamanho { get; set; }

    public virtual ICollection<ItensPedido> ItensPedidos { get; set; } = new List<ItensPedido>();
}
