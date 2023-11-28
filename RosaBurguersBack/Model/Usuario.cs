using System;
using System.Collections.Generic;

namespace RosaBurguersBack.Model;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nome { get; set; } = null!;

    public DateTime DataNasc { get; set; }

    public string Sexo { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Senha { get; set; } = null!;

    public string Salt { get; set; } = null!;

    public bool Adm { get; set; }

    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
