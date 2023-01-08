using System;
using System.Collections.Generic;

namespace Data.Models;

public partial class HasVerified
{
    public string Uid { get; set; } = null!;

    public string Email { get; set; } = null!;

    public bool State { get; set; }

    public virtual User UidNavigation { get; set; } = null!;
}
