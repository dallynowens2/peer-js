import Peer from 'peerjs';
// import { store } from '../store';
const peer = new Peer()
const connections = []

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

const initialize = (id) => {
    peer.on('open', () => {
        peer._id = id;
        console.log('My id: ' + peer._id)
    })
    peer.on('connection', (conn) => {
        console.log('Connected to peer:' + conn.peer);

    })
    peer.on('error', (err) => {
        console.log(err);
    })
}

const connectPeer = (peerId, receiveMessage) => {
    const conn = peer.connect(peerId);
    console.log("connecting to peer: " + peerId);
    connections.push(conn);

    conn.on('open', () => {
        conn.send('Hello');

        // store.dispatch(addMessage('Hello'));
    });
    conn.on('data', (data) => {
        console.log(data)
        console.log(peerId);
        receiveMessage(data);
        // receiveMessage(data);
        // store.dispatch(addMessage(data));
    })
    
    return conn.peer;
}

const sendMessage = (message, peerId) => {
    message.find(m => m.peer === peerId).send(message);
}

const sendMessageAll = (message) => {
    connections.forEach(c => c.send(message));
}


const PeerjsService = { sendMessageAll, initialize, connectPeer, sendMessage, randId }
export default PeerjsService;