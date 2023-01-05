using System;
using System.Collections.Generic;

namespace Data.Models;

public partial class HasPassword
{
    public string Uid { get; set; } = null!;

    public string TypeCode { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public DateTime Created { get; set; }

    public virtual TypePassword TypeCodeNavigation { get; set; } = null!;

    public virtual User UidNavigation { get; set; } = null!;
}
