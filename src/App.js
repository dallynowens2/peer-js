import logo from './logo.svg';
import PeerjsService from './services/PeerjsService';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [peerId, setPeerId] = useState()
  const [message, setMessage] = useState('')

  useEffect(()=>{
    PeerjsService.initialize();
  },[])

  const messageChangeHandler =(e)=>{
    setMessage(e.target.value)
  }

  const sendMessageHandler =()=>{
    PeerjsService.sendMessage(message);
    setMessage('')
  }

  const onPeerIdChange = (e) =>{
    setPeerId(e.target.value)
  }

  const onPeerSubmit = (e) =>{
    e.preventDefault()
    PeerjsService.connectPeer(peerId);
    setPeerId('');
  }

  return (
    <div className="App">
        <form onSubmit={onPeerSubmit}>
            <label>Peer Id</label>
            <input type='text' onChange={onPeerIdChange}></input>
            <button type='submit'>Add Peer</button>
        </form>
        <div>
          <label>Enter Message</label>
          <input type='text' onChange={messageChangeHandler}></input>
          <button type='button' onClick={sendMessageHandler}>Send Message</button>
        </div>
        <div>
          
        </div>
    </div>
  );
}

export default App;
