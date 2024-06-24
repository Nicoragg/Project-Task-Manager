import React, { useState } from 'react';
import { Projeto } from '../../../models/Projeto';

function CriarProjeto() {
  const [nome, setNome] = useState('');

  async function criar() {
    const projeto: Projeto = { nome };

    try {
      const response = await fetch('http://localhost:5028/api/projeto/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projeto),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar projeto');
      }

      const data = await response.json();
      console.log('Projeto criado:', data);
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
    }
  }

  return (
    <div>
      
      <h1>Criar Projeto</h1>
      <form onSubmit={criar}>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <br />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default CriarProjeto;
