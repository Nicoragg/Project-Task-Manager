import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../../imagens/logo.jpg';
import task from './../../imagens/griltask.png';

function Home() {
  return (
    <div>

      <div className='home'>
        <img src={logo} alt="Task" width={700} />
      </div>
      <main>
        
        <section>
          <div className="column">            
            <p>
              <h1>Recursos</h1>
            </p>            
            <p>
              O Task Manager reúne as tarefas e projetos em um só lugar para você administrar com muito mais facilidade. Organize sua vida, organize suas tarefas!
            </p>        

            <ul>
              <li>Gerenciamento de Usuários</li>
              <li>Filtros de tarefas</li>
              <li>Tarefas atribuidas a usuários</li>
            </ul>
          </div>

          <div className="column">
            <img src={task} alt="Task" width={700} />
          </div>
        </section>
        <section className="contact">
          <h2>Contato</h2><br/>
          <p>Tem alguma dúvida? Entre em contato conosco!</p><br/>
          <form>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="message">Mensagem:</label>
            <textarea id="message" name="message" required></textarea>

            <button type="submit">Enviar</button>
          </form>
        </section>
      </main>

    </div>
  );
}

export default Home;
