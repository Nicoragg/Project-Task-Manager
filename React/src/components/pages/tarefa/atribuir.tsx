import React, { useEffect, useState } from 'react';
import { Tarefa } from '../../../models/Tarefa';
import { Link, useParams } from 'react-router-dom';

function Atribuir() {
  const { id } = useParams<{ id: string }>();  
  const [tarefa, setTarefa] = useState<Tarefa>();
  const [titulo, setTitulo] = useState(tarefa?.titulo);
  const [descricao, setDescricao] = useState(tarefa?.descricao);
  const [prazo, setPrazo] = useState(tarefa?.prazo);
  const [prioridade, setPrioridade] = useState(tarefa?.prioridade);
  const [projetoId, setProjetoId] = useState(tarefa?.projetoId);
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    if (id) {
      carregarTarefa(id);
    }

  }, [id]);

  async function carregarTarefa(id: string) {
    try {
      const response = await fetch(`http://localhost:5028/api/tarefa/buscar/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar tarefas');
      }
      const data = await response.json();
      setTarefa(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5028/api/${tarefa}/atribuir/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarefa),
      });

      if (!response.ok) {
        throw new Error('Erro ao alterar tarefa');
      }

      const data = await response.json();
      console.log('Tarefa alterada:', data);
    } catch (error) {
      console.error('Erro ao alterar tarefa:', error);
    }
  }

  return (
    <div className='custom-body'>
      
      <h1>Atribuir</h1>
      {tarefa?.titulo}
      <form onSubmit={handleSubmit}>
        <input type="text" value={id}/>
        <label>Usuário:</label>
        <input type="number" value={titulo} onChange={(e) => setUsuario(e.target.value)} required />
        <br />
        <button type="submit">Alterar</button>
      </form>
    </div>
  );
}

export default Atribuir;
