import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CriarUsuario from './components/pages/usuario/criar-usuario';
import ListarUsuarios from './components/pages/usuario/listar-usuarios';
import AlterarUsuario from './components/pages/usuario/alterar-usuario';
import CriarProjeto from './components/pages/projeto/criar-projeto';
import ListarProjetos from './components/pages/projeto/listar-projetos';
import AlterarProjeto from './components/pages/projeto/alterar-projeto';
import CriarTarefa from './components/pages/tarefa/criar-tarefa';
import ListarTarefas from './components/pages/tarefa/listar-tarefas';
import AlterarTarefa from './components/pages/tarefa/alterar-tarefa';
import ListarTarefasPorPrioridade from './components/pages/tarefa/listar-tarefas-prioridade';
import ListarTarefasPorProjeto from './components/pages/tarefa/listar-tarefas-projeto';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import logo from './imagens/logo.jpg'; // Certifique-se de ajustar o caminho conforme necessário
import Home from './components/pages/home/home';

function App() {
  return (
// -CRUD TAREFAS
// -CRUD PROJETO
// -CRUD USUARIO
// -PRIORIDADE
// -Atribuir Usuário a Tarefa
// -Remover Usuário de Tarefa
// -Listar Tarefas por Projeto
// -Notificacao
    <BrowserRouter>
      <AppBar position="static">          
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/usuario/criar">Criar Usuário</Button>
          <Button color="inherit" component={Link} to="/usuario/listar">Listar Usuários</Button>
          <Button color="inherit" component={Link} to="/projeto/criar">Criar Projeto</Button>
          <Button color="inherit" component={Link} to="/projeto/listar">Listar Projetos</Button>
          <Button color="inherit" component={Link} to="/tarefa/criar">Criar Tarefa</Button>
          <Button color="inherit" component={Link} to="/tarefa/listar">Listar Tarefas</Button>
        </Toolbar>
      </AppBar>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/usuario/criar" element={<CriarUsuario />} />
          <Route path="/usuario/listar" element={<ListarUsuarios />} />
          <Route path="/usuario/alterar/:id" element={<AlterarUsuario />} />
          <Route path="/projeto/criar" element={<CriarProjeto />} />
          <Route path="/projeto/listar" element={<ListarProjetos />} />
          <Route path="/projeto/alterar/:id" element={<AlterarProjeto />} />
          <Route path="/tarefa/criar" element={<CriarTarefa />} />
          <Route path="/tarefa/listar" element={<ListarTarefas />} />
          <Route path="/tarefa/alterar/:id" element={<AlterarTarefa />} />
          <Route path="/tarefa/prioridade/:prioridade" element={<ListarTarefasPorPrioridade />} />
          <Route path="/projeto/:projetoId/tarefas" element={<ListarTarefasPorProjeto />} />
        </Routes>
      <footer style={{ marginTop: '20px', textAlign: 'center' }}>
        <h3>Desenvolvido por Nicolas e Laura &copy;</h3>
      </footer>
    </BrowserRouter>
  );
}

export default App;