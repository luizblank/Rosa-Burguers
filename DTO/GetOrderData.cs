using System.Collections.Generic;

namespace DTO;

public class GetOrderData {
    public int userid { get; set; }
    public int ordernum { get; set; }

    public string callname { get; set; }

    public List<ProductData> orders { get; set; } = new List<ProductData>();
}