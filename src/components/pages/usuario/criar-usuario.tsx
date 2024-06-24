import React, { useState } from 'react';
import { Usuario } from '../../../models/Usuario';

function CriarUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  async function criar() {
    const usuario: Usuario = { nome, email };

    try {
      const response = await fetch('http://localhost:5028/api/usuario/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar usuário');
      }

      const data = await response.json();
      console.log('Usuário criado:', data);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  }

  return (
    <div>
      <h1>Criar Usuário</h1>
      <form className='' onSubmit={criar}>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <br />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default CriarUsuario;
