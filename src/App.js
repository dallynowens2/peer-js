import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connectPeer, initialize, sendMessageAll } from './store/peer-slice';
import { store } from './store';

function App() {
  const [peerId, setPeerId] = useState()
  const [message, setMessage] = useState('')

  const connections = useSelector(state => state.peer.connections);
  const messages = useSelector(state => state.peer.messages);
  const id = useSelector(state => state.peer.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialize())
  }, [])

  const messageChangeHandler = (e) => {
    setMessage(e.target.value)
  }

  const sendMessageHandler = () => {
    dispatch(sendMessageAll(message));
    setMessage('')
  }

  const onPeerIdChange = (e) => {
    setPeerId(e.target.value)
  }

  const onPeerSubmit = (e) => {
    e.preventDefault()
    dispatch(connectPeer(peerId));
    setPeerId('');
  }

  return (
    <div className="App">
      <h4>Your ID:</h4>
      <p>{id}</p>
      <form onSubmit={onPeerSubmit}>
        <label>Peer Id</label><br />
        <input type='text' onChange={onPeerIdChange}></input>
        <button type='submit'>Add Peer</button>
      </form>
      <div>
        <label>Enter Message</label><br />
        <input type='text' onChange={messageChangeHandler}></input>
        <button type='button' onClick={sendMessageHandler}>Send Message</button>
      </div>
      <div>
        <h2>Current Connections</h2>
        {connections.map(c => <p key={c}>{c}</p>)}
      </div>
      <div>
        <h2>Current Messages</h2>
        {messages.map(m => <p>{m}</p>)}
      </div>
    </div>
  );
}

export default App;
