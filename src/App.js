import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { connectPeer, initialize, sendMessageAll } from './store/peer-slice';

function App() {
  const [peerId, setPeerId] = useState()
  const [message, setMessage] = useState('')

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(initialize())
  },[])

  const messageChangeHandler =(e)=>{
    setMessage(e.target.value)
  }

  const sendMessageHandler =()=>{
    dispatch(sendMessageAll(message));
    setMessage('')
  }

  const onPeerIdChange = (e) =>{
    setPeerId(e.target.value)
  }

  const onPeerSubmit = (e) =>{
    e.preventDefault()
    dispatch(connectPeer(peerId));
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
