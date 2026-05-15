using System;
using System.Collections.Generic;

namespace APIDBLojajv.Models;

public partial class Pedido
{
    public int IdPedido { get; set; }

    public string Descricao { get; set; } = null!;

    public decimal Valor { get; set; }

    public int? IdCliente { get; set; }

    public virtual Cliente? IdClienteNavigation { get; set; }
}
