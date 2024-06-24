import React, { useState } from 'react';
import { Tarefa } from '../../../models/Tarefa';

function CriarTarefa() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prazo, setPrazo] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [projetoId, setProjetoId] = useState('');
  const [atribuicoes, setAtribuicoes] = useState('');

  async function criar() {
    const tarefa: Tarefa = { titulo, descricao, prazo, prioridade, projetoId, atribuicoes };

    try {
      const response = await fetch('http://localhost:5028/api/tarefa/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarefa),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar tarefa');
      }

      const data = await response.json();
      console.log('Tarefa criada:', data);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  }

  return (
    <div>
      <h1>Criar Tarefa</h1>
      <form onSubmit={criar}>
        <label>Título:</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        <br />
        <label>Descrição:</label>
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        <br />
        <label>Prazo:</label>
        <input type="datetime-local" value={prazo} onChange={(e) => setPrazo(e.target.value)} required />
        <br />
        <label>Prioridade:</label>
        <input type="text" value={prioridade} onChange={(e) => setPrioridade(e.target.value)} required />
        <br />
        <label>ID do Projeto:</label>
        <input type="text" value={projetoId} onChange={(e) => setProjetoId(e.target.value)} required />
        <br />
        <label>Atribuições:</label>
        <input type="text" value={atribuicoes} onChange={(e) => setAtribuicoes(e.target.value)} required />
        <br />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default CriarTarefa;
