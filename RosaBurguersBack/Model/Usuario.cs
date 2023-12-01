using System;
using System.Collections.Generic;

namespace RosaBurguersBack.Model;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nome { get; set; }

    public DateTime DataNasc { get; set; }

    public string Sexo { get; set; }

    public string Email { get; set; }

    public string Senha { get; set; }

    public string Salt { get; set; }

    public bool Adm { get; set; }

    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
