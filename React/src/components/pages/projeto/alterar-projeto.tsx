import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Projeto } from '../../../models/Projeto';

function AlterarProjeto() {
  const { id } = useParams<{ id: string }>();
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id) {
      carregarProjeto(id);
    }
  }, [id]);

  async function carregarProjeto(id: string) {
    try {
      const response = await fetch(`http://localhost:5028/api/projeto/buscar/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar projeto');
      }
      const data = await response.json();
      setNome(data.nome);
    } catch (error) {
      console.error('Erro ao carregar projeto:', error);
    }
  }

  async function alterar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const projeto: Projeto = { nome };

    try {
      const response = await fetch(`http://localhost:5028/api/projeto/alterar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projeto),
      });

      if (!response.ok) {
        throw new Error('Erro ao alterar projeto');
      }

      const data = await response.json();
      console.log('Projeto alterado:', data);
    } catch (error) {
      console.error('Erro ao alterar projeto:', error);
    }
  }

  return (
    <div className='custom-body'>
      <h1>Alterar Projeto</h1>
      <form onSubmit={alterar}>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <br />
        <button type="submit">Alterar</button>
      </form>
    </div>
  );
}

export default AlterarProjeto;
