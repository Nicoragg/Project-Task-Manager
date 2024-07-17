import React, { useEffect, useState } from 'react';
import { Tarefa } from '../../../models/Tarefa';
import { Usuario } from '../../../models/Usuario';
import { Link } from 'react-router-dom';

function ListarTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [prioridade, setPrioridade] = useState<string>('');
  const [idBusca, setIdBusca] = useState<string>('');
  const [usuarioId, setUsuarioId] = useState<{ [key: string]: string }>({});
  const [tarefaUsuario, setTarefaUsuario] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    carregarTarefas();
    carregarUsuarios();
  }, []);

  async function carregarTarefas() {
    try {
      const resposta = await fetch('http://localhost:5028/api/tarefa/listar');
      if (!resposta.ok) {
        throw new Error('Erro ao buscar tarefas');
      }
      const dados = await resposta.json();
      setTarefas(dados);
    } catch (erro) {
      console.error('Erro ao carregar tarefas:', erro);
    }
  }

  async function carregarUsuarios() {
    try {
      const resposta = await fetch('http://localhost:5028/api/usuario/listar');
      if (!resposta.ok) {
        throw new Error('Erro ao buscar usuários');
      }
      const dados = await resposta.json();
      setUsuarios(dados);
    } catch (erro) {
      console.error('Erro ao carregar usuários:', erro);
    }
  }

  async function carregarTarefasPorPrioridade(prioridade: string) {
    try {
      const resposta = await fetch(`http://localhost:5028/api/tarefa/listarporprioridade/${prioridade}`);
      if (!resposta.ok) {
        throw new Error('Erro ao buscar tarefas por prioridade');
      }
      const dados = await resposta.json();
      setTarefas(dados);
    } catch (erro) {
      console.error('Erro ao buscar tarefas por prioridade:', erro);
      setTarefas([]); // Limpa a lista de tarefas em caso de erro
    }
  }

  async function carregarTarefaPorId(id: string) {
    try {
      const resposta = await fetch(`http://localhost:5028/api/tarefa/buscar/${id}`);
      if (!resposta.ok) {
        throw new Error('Erro ao buscar tarefa');
      }
      const dados = await resposta.json();
      setTarefas([dados]);
    } catch (erro) {
      console.error('Erro ao buscar tarefa:', erro);
      setTarefas([]); // Limpa a lista de tarefas em caso de erro
    }
  }

  async function atribuirUsuario(tarefaId: string) {
    if (!usuarioId[tarefaId]) {
      console.error('Nenhum usuário selecionado para a tarefa:', tarefaId);
      return;
    }

    try {
      const resposta = await fetch(`http://localhost:5028/api/tarefa/${tarefaId}/atribuir/${usuarioId[tarefaId]}`, {
        method: 'POST',
      });

      if (!resposta.ok) {
        throw new Error('Erro ao atribuir usuário');
      }

      console.log(`Usuário ${usuarioId[tarefaId]} atribuído à tarefa ${tarefaId} com sucesso`);
      setTarefaUsuario({ ...tarefaUsuario, [tarefaId]: usuarioId[tarefaId] });
      carregarTarefas(); // Atualizar a lista de tarefas
    } catch (erro) {
      console.error('Erro ao atribuir usuário à tarefa:', erro);
    }
  }

  async function removerUsuario(tarefaId: string, usuarioId: string) {
    try {
      const resposta = await fetch(`http://localhost:5028/api/tarefa/${tarefaId}/remover/${usuarioId}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) {
        throw new Error('Erro ao remover usuário');
      }

      console.log(`Usuário ${usuarioId} removido da tarefa ${tarefaId} com sucesso`);
      const tarefaUsuarioAtualizado = { ...tarefaUsuario };
      delete tarefaUsuarioAtualizado[tarefaId];
      setTarefaUsuario(tarefaUsuarioAtualizado);
      carregarTarefas(); // Atualizar a lista de tarefas
    } catch (erro) {
      console.error('Erro ao remover usuário da tarefa:', erro);
    }
  }

  async function handleDelete(id: string) {
    try {
      const resposta = await fetch(`http://localhost:5028/api/tarefa/deletar/${id}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) {
        throw new Error('Erro ao deletar tarefa');
      }

      carregarTarefas();
    } catch (erro) {
      console.error('Erro ao deletar tarefa:', erro);
    }
  }

  async function handleBuscar() {
    if (idBusca !== '') {
      await carregarTarefaPorId(idBusca);
    } else if (prioridade !== '') {
      await carregarTarefasPorPrioridade(prioridade);
    } else {
      await carregarTarefas();
    }
  }

  return (
    <div className='custom-body'>
      <h1>Listar Tarefas</h1>
      <div>
        <label>Filtrar por Prioridade:</label>
        <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
          <option value="">Todas</option>
          <option value="Baixa">Baixa</option>
          <option value="Media">Média</option>
          <option value="Alta">Alta</option>
        </select>
      </div>
      <div>
        <label>Buscar por ID:</label>
        <input
          type="text"
          placeholder="ID da Tarefa"
          value={idBusca}
          onChange={(e) => setIdBusca(e.target.value)}
        />
        <button onClick={handleBuscar}>Buscar</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Prazo</th>
            <th>Prioridade</th>
            <th>ID do Projeto</th>
            <th>Atribuir Usuário</th>
            <th>Remover Usuário</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => {
            const prazo = new Date(tarefa.prazo);
            const prazoFormatado = prazo.toLocaleDateString('pt-BR'); // Formatação da data usando toLocaleDateString

            return (
              <tr key={tarefa.id}>
                <td>{tarefa.id}</td>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{prazoFormatado}</td>
                <td>{tarefa.prioridade}</td>
                <td>{tarefa.projetoId}</td>
                <td>
                  {tarefaUsuario[tarefa.id!] ? (
                    <span>{tarefaUsuario[tarefa.id!]}</span>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="ID do Usuário"
                        onChange={(e) => setUsuarioId({ ...usuarioId, [tarefa.id!]: e.target.value })}
                      />
                      <button onClick={() => atribuirUsuario(tarefa.id!)}>Atribuir</button>
                    </>
                  )}
                </td>
                <td>
                  {tarefaUsuario[tarefa.id!] && (
                    <button onClick={() => removerUsuario(tarefa.id!, tarefaUsuario[tarefa.id!])}>Remover</button>
                  )}
                </td>
                <td>
                  <Link to={`/tarefa/alterar/${tarefa.id}`}>Alterar</Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(tarefa.id!)}>Deletar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ListarTarefas;
