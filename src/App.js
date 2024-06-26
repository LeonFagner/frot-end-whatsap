import { useEffect, useState } from 'react';
import './App.css';
import Image from './assets/profissao.jpg'
import SendMensageIcon from './assets/send.png';
import socket from 'socket.io-client';

const io = socket('http://localhost:4000');

function App() {
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    io.on("users", (users) => setUsers(users))
  }, [])


  const handleJoin = () => {
    if (name) {
      io.emit("join", name)
      setJoined(true);
     

    }
  }

  if (!joined) {
    return (
      <div>
        <span>Digite seu nome</span>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={() => handleJoin()}> Entrar</button>
      </div>
    )
  }





  return (
    <div className='container'>
      <div className='back-ground'></div>
      <div className='chat-container'>

        <div className='chat-contacts'>
          <div className='chat-options'></div>
          <div className='chat-item'>
            <img src={Image} className='image-profile' alt='' />
            <div className='title-chat-container'>
              <span className='title-message'>Networking Profissão Programdor </span>
              <span className='last-message'>Leon Bom dia !</span>
            </div>
          </div>
        </div>

        <div className='chat-message'>
          <div className='chat-options'>
            <div className='chat-item'>
              <img src={Image} className='image-profile' alt='' />
              <div className='title-chat-container'>
                <span className='title-message'>Networking Profissão Programdor </span>
                <span className='last-message'>
                  {users.map((user, index) => (
                    <span>{user.name}{index + 1 < users.length? ', ' : ''}</span>
                  ))}
               
                            
                </span>
              </div>
            </div>
          </div>

          <div className='chat-message-area'>

          </div>

          <div className='chat-input-area'>
            <input className='chat-input' placeholder='Mensagem' />
            <img src={SendMensageIcon} alt='' className='send-message-icon' />
          </div>


        </div>

      </div>
    </div>
  );
}

export default App;
