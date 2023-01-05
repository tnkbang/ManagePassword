using System;
using System.Collections.Generic;

namespace Data.Models;

public partial class TypePassword
{
    public string TypeCode { get; set; } = null!;

    public string TypeName { get; set; } = null!;

    public string? Description { get; set; }

    public string? Image { get; set; }

    public virtual ICollection<HasPassword> HasPasswords { get; } = new List<HasPassword>();
}
