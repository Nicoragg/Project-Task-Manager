import React, { useEffect, useState } from 'react';
import { Usuario } from '../../../models/Usuario';
import { Link } from 'react-router-dom';

function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    try {
      const response = await fetch('http://localhost:5028/api/usuario/listar');
      if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  }

  async function Delete(id: string) {
    try {
      const response = await fetch(`http://localhost:5028/api/usuario/deletar/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar usuário');
      }
      carregarUsuarios();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }

  return (
    <div>
      <link rel="stylesheet" href="/public/style.css" />
      <h1>Listar Usuários</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Alterar</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody className='table'>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>
                <Link to={`/usuario/alterar/${usuario.id}`}>Alterar</Link>
              </td>
              <td>
                <button onClick={() => Delete(usuario.id!)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarUsuarios;
