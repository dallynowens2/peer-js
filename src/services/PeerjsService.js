import Peer from 'peerjs';
import { store } from '../store';
import { addMessage } from '../store/peer-slice';
const peer = new Peer()

const randId = () => {
    let roomLength = 6;
    let lowChar = "(".charCodeAt(0);
    let highChar = "Z".charCodeAt(0);
    let possibleChars = highChar - lowChar + 1;
    let randChar = () => {
        let r = Math.round(Math.random() * possibleChars) + lowChar;
        return String.fromCharCode(r);
    };
    return [...new Array(roomLength).keys()].map(randChar).join("");
}

const initialize = () => {
    peer.id = randId();
    console.log(peer.id)
    peer.on('open', (id) => {
        console.log('My id: ' + id)
    })
    peer.on('connection', (conn) => {
        connections.push(conn);
        console.log('Connected to peer:' + conn.peer);

    })
    peer.on('error', (err) => {
        console.log(err);
    })

    return peer.id;
}

const connectPeer = (peerId) =>{
    const conn = peer.connect(peerId);
    console.log("connecting to peer: " + peerId);
    
    conn.on('open', () => {
        conn.send('Hello');
        store.dispatch(addMessage('Hello'));
    });
    conn.on('data', (data)=>{
        console.log(data)
        store.dispatch(addMessage(data));
    })

    return conn;
}

const sendMessageAll =(message)=>{
    messages.push(message);
}


const PeerjsService = { sendMessageAll, initialize, connectPeer}
export default PeerjsService;