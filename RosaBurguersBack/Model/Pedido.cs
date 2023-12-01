using System;
using System.Collections.Generic;

namespace RosaBurguersBack.Model;

public partial class Pedido
{
    public int Id { get; set; }

    public int Usuario { get; set; }

    public string NomeChamada { get; set; }

    public TimeSpan? Horario { get; set; }

    public virtual ICollection<ItensPedido> ItensPedidos { get; set; } = new List<ItensPedido>();

    public virtual Usuario UsuarioNavigation { get; set; }
}
