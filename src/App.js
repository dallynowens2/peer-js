import { useEffect, useState } from 'react';
import Peer from 'peerjs';

const randId = () => {
  let roomLength = 5;
  let lowChar = "A".charCodeAt(0);
  let highChar = "Z".charCodeAt(0);
  let possibleChars = highChar - lowChar + 1;
  let randChar = () => {
    let r = Math.round(Math.random() * possibleChars) + lowChar;
    return String.fromCharCode(r);
  };
  return [...new Array(roomLength).keys()].map(randChar).join("");
}

function App() {
  const [peerId, setPeerId] = useState('');
  const [message, setMessage] = useState('');
  const [recepients, setRecepients] = useState('');

  const [peer] = useState(new Peer(randId()))
  const [connections, setConnections] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    peer.on('open', (id) => {
      console.log('My id: ' + id)
    })
    peer.on('connection', (conn) => {
      setConnections(prev => [...prev, conn]);
      console.log('Connected to peer:' + conn.peer);
    })
  }, [peer])

  const addPeer = () => {
    const conn = peer.connect(peerId);

    conn.on('open', () => {
      conn.send('Hello');
      setMessages(prev => [...prev, `${peer.id}: Hello!`])
    });
    conn.on('data', (data) => {
      const m = `${conn.peer}: ${data}`;
      setMessages(prev => [...prev, m])
    })

    setConnections(prev => [...prev, conn]);
    setPeerId('');
  }

  const sendMessageHandler = () => {
    const m = `${peer.id}: ${message}`;
    if (recepients.trim().length > 0) {
      const rec = recepients.split(",");
      rec.forEach(r => connections[r - 1].send(m));
    }
    else {
      connections.forEach(c => c.send(message));
    }
    setMessages(prev => [...prev, m]);
    setMessage('')
  }

  const messageChangeHandler = (e) => {
    setMessage(e.target.value)
  }
  const onPeerIdChange = (e) => {
    setPeerId(e.target.value)
  }
  const onRecepientChange = (e) => {
    setRecepients(e.target.value);
  }

  return (
    <div className="App">
      <h2>My Id:</h2>
      <p>{peer.id}</p>
      <div>
        <label>Peer Id</label><br />
        <input type='text' value={peerId} onChange={onPeerIdChange} />
        <button type='button' onClick={addPeer}>Add Peer</button>
      </div>
      <div>
        <label>Enter Recepients</label><br />
        <input type='text' value={recepients} onChange={onRecepientChange} />
        <p>Message will be sent to: {recepients.trim().length > 0 ? recepients : "All"}</p>
      </div>
      <div>
        <label>Enter Message</label><br />
        <input type='text' value={message} onChange={messageChangeHandler} />
        <button type='button' onClick={sendMessageHandler}>Send Message</button>
      </div>
      <div>
        <h4>Connections</h4>
        {connections.map((c, i) => {
          return (
            <div>
              <p>{`${i + 1}) ${c.peer}`}</p>
            </div>
          )
        })}
      </div>
      <div>
        <h4>Messages</h4>
        {messages.map(m => <p>{m}</p>)}
      </div>
    </div>
  );
}

export default App;
