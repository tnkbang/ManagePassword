using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Data.Models;

public partial class PasswordManagerContext : DbContext
{
    public PasswordManagerContext()
    {
    }

    public PasswordManagerContext(DbContextOptions<PasswordManagerContext> options)
        : base(options)
    {
    }

    public virtual DbSet<HasPassword> HasPasswords { get; set; }

    public virtual DbSet<HasVerified> HasVerifieds { get; set; }

    public virtual DbSet<TypePassword> TypePasswords { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<HasPassword>(entity =>
        {
            entity.HasKey(e => new { e.Uid, e.TypeCode, e.Username }).HasName("PK__HasPassw__FD48841E10D45EA2");

            entity.ToTable("HasPassword");

            entity.Property(e => e.Uid)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("uid");
            entity.Property(e => e.TypeCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("type_code");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("username");
            entity.Property(e => e.Created)
                .HasColumnType("datetime")
                .HasColumnName("created");
            entity.Property(e => e.Password)
                .HasMaxLength(256)
                .IsUnicode(false)
                .HasColumnName("password");

            entity.HasOne(d => d.TypeCodeNavigation).WithMany(p => p.HasPasswords)
                .HasForeignKey(d => d.TypeCode)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__HasPasswo__type___2E1BDC42");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.HasPasswords)
                .HasForeignKey(d => d.Uid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__HasPassword__uid__2D27B809");
        });

        modelBuilder.Entity<HasVerified>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PK__HasVerif__DD70126419E31B47");

            entity.ToTable("HasVerified");

            entity.HasIndex(e => e.Email, "UQ__HasVerif__AB6E61648F3E09E6").IsUnique();

            entity.Property(e => e.Uid)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("uid");
            entity.Property(e => e.Email)
                .HasMaxLength(75)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.State).HasColumnName("state");

            entity.HasOne(d => d.UidNavigation).WithOne(p => p.HasVerified)
                .HasForeignKey<HasVerified>(d => d.Uid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__HasVerified__uid__286302EC");
        });

        modelBuilder.Entity<TypePassword>(entity =>
        {
            entity.HasKey(e => e.TypeCode).HasName("PK__TypePass__2CB4DBF4AA620F2C");

            entity.ToTable("TypePassword");

            entity.Property(e => e.TypeCode)
                .HasMaxLength(5)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("type_code");
            entity.Property(e => e.Description)
                .HasMaxLength(10)
                .HasColumnName("description");
            entity.Property(e => e.Image)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("image");
            entity.Property(e => e.TypeName)
                .HasMaxLength(20)
                .HasColumnName("type_name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PK__Users__DD7012642E622ECD");

            entity.HasIndex(e => e.Username, "UQ__Users__F3DBC57266F7EB5B").IsUnique();

            entity.Property(e => e.Uid)
                .HasMaxLength(10)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("uid");
            entity.Property(e => e.Active).HasColumnName("active");
            entity.Property(e => e.Birthday)
                .HasColumnType("datetime")
                .HasColumnName("birthday");
            entity.Property(e => e.Created)
                .HasColumnType("datetime")
                .HasColumnName("created");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .HasColumnName("description");
            entity.Property(e => e.FirstName)
                .HasMaxLength(20)
                .HasColumnName("first_name");
            entity.Property(e => e.Image)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("image");
            entity.Property(e => e.LastName)
                .HasMaxLength(7)
                .HasColumnName("last_name");
            entity.Property(e => e.Password)
                .HasMaxLength(32)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(11)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.Sex).HasColumnName("sex");
            entity.Property(e => e.Username)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
