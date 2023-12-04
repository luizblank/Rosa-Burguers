using System.Collections.Generic;

namespace DTO;

public class GetOrderData {
    public int NumPedido { get; set; }

    public string NomeChamada { get; set; }

    public List<ProductData> ItensPedidos { get; set; } = new List<ProductData>();
}