using System;
using System.Collections.Generic;

namespace Data.Models;

public partial class User
{
    public string Uid { get; set; } = null!;

    public string? FistName { get; set; }

    public string? LastName { get; set; }

    public DateTime? Birthday { get; set; }

    public int? Sex { get; set; }

    public string? Phone { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Image { get; set; }

    public bool Active { get; set; }

    public string? Description { get; set; }

    public DateTime Created { get; set; }

    public virtual ICollection<HasPassword> HasPasswords { get; } = new List<HasPassword>();

    public virtual HasVerified? HasVerified { get; set; }
}
