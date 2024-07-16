using Microsoft.EntityFrameworkCore;

namespace MinimalApiProject.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<Tarefa> Tarefas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<AtribuicaoTarefaUsuario> Atribuicoes { get; set; }
        public DbSet<Projeto> Projetos { get; set; }
        public DbSet<Notificacao> Notificacoes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=app.db");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AtribuicaoTarefaUsuario>()
                .HasKey(atu => new { atu.UsuarioId, atu.TarefaId });

            modelBuilder.Entity<AtribuicaoTarefaUsuario>()
                .HasOne(atu => atu.Usuario)
                .WithMany(u => u.Atribuicoes)
                .HasForeignKey(atu => atu.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AtribuicaoTarefaUsuario>()
                .HasOne(atu => atu.Tarefa)
                .WithMany(t => t.Atribuicoes)
                .HasForeignKey(atu => atu.TarefaId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Tarefa>()
                .HasOne(t => t.Projeto)
                .WithMany(p => p.Tarefas)
                .HasForeignKey(t => t.ProjetoId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
