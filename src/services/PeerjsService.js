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

const id = randId();
const peer = new Peer(id)
const connections = []
const messages = []

const initialize = () => {
    console.log(id)
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
}

const connectPeer = (peerId) =>{
    console.log("connecting to peer: " + peerId);
    const conn = peer.connect(peerId);
    conn.on('open', () => {
        conn.send('Hello');
        connections.push(conn);
    });
    conn.on('data', (data)=>{
        console.log(data)
        messages.push(data);
    })
}

const sendMessage =(message)=>{
    messages.push(message);
    connections.forEach(c => c.send(message));
}


const PeerjsService = {sendMessage, initialize, connectPeer}
export default PeerjsService;