using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RosaBurguersBack.Model;

public partial class RosaBurguersDbContext : DbContext
{
    public RosaBurguersDbContext()
    {
    }

    public RosaBurguersDbContext(DbContextOptions<RosaBurguersDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Imagem> Imagems { get; set; }

    public virtual DbSet<ItensPedido> ItensPedidos { get; set; }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    public virtual DbSet<Produto> Produtos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-DNG3UO0;Initial Catalog=RosaBurguersDB;Integrated Security=True;Trust Server Certificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Imagem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Imagem__3214EC27A0567E66");

            entity.ToTable("Imagem");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Foto).IsRequired();
        });

        modelBuilder.Entity<ItensPedido>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ItensPed__3214EC27EAE3F544");

            entity.ToTable("ItensPedido");

            entity.Property(e => e.Id).HasColumnName("ID");

            entity.HasOne(d => d.PedidoNavigation).WithMany(p => p.ItensPedidos)
                .HasForeignKey(d => d.Pedido)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ItensPedi__Pedid__412EB0B6");

            entity.HasOne(d => d.ProdutoNavigation).WithMany(p => p.ItensPedidos)
                .HasForeignKey(d => d.Produto)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ItensPedi__Produ__403A8C7D");
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Pedido__3214EC27CE07B214");

            entity.ToTable("Pedido");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.NomeChamada)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.UsuarioNavigation).WithMany(p => p.Pedidos)
                .HasForeignKey(d => d.Usuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Pedido__Usuario__3D5E1FD2");
        });

        modelBuilder.Entity<Produto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Produto__3214EC27000D4CC6");

            entity.ToTable("Produto");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Descricao)
                .IsRequired()
                .IsUnicode(false);
            entity.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Tipo)
                .IsRequired()
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario__3214EC27A1441645");

            entity.ToTable("Usuario");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.DataNasc).HasColumnType("datetime");
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Salt)
                .IsRequired()
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Senha)
                .IsRequired()
                .IsUnicode(false);
            entity.Property(e => e.Sexo)
                .IsRequired()
                .HasMaxLength(15)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
