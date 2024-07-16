import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Projeto } from '../../../models/Projeto';
import logo from './../../imagens/logo.jpg';
import task from './../../imagens/griltask.png';
function Home() {
  return (
    <div>
      
      <div className='home'>
        <img src={logo} alt="Logo" width={700}/>
      </div>
      
      <section>
        <div className='collum'> 
          <p> <b>O Task Manager reúne as tarefas e projetos em um só <br/>
          lugar para você administrar com muito mais facilidade. <br/>
          Organize sua vida, organize suas tarefas!.</b></p>
        </div>

        <div className='collum'> 
        <img src={task} alt="Logo" width={400}/>
        </div>
      </section>

    </div>

  );
}

export default Home;
