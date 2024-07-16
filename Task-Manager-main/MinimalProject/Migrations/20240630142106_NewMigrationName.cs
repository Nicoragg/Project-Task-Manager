using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MinimalProject.Migrations
{
    /// <inheritdoc />
    public partial class NewMigrationName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Atribuicoes",
                table: "Atribuicoes");

            migrationBuilder.DropIndex(
                name: "IX_Atribuicoes_UsuarioId",
                table: "Atribuicoes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Atribuicoes",
                table: "Atribuicoes",
                columns: new[] { "UsuarioId", "TarefaId" });

            migrationBuilder.CreateIndex(
                name: "IX_Atribuicoes_TarefaId",
                table: "Atribuicoes",
                column: "TarefaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Atribuicoes",
                table: "Atribuicoes");

            migrationBuilder.DropIndex(
                name: "IX_Atribuicoes_TarefaId",
                table: "Atribuicoes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Atribuicoes",
                table: "Atribuicoes",
                columns: new[] { "TarefaId", "UsuarioId" });

            migrationBuilder.CreateIndex(
                name: "IX_Atribuicoes_UsuarioId",
                table: "Atribuicoes",
                column: "UsuarioId");
        }
    }
}
