import Peer from 'peerjs';

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

const id = randId();
const peer = new Peer()
const connections = []
const messages =[]

const initialize = () => {
    console.log(id)
    console.log(peer.id)
    peer.on('open', (id) => {
        console.log('id:' + id)
    })
    peer.on('connection', (conn) => {
        connections.push(conn)
        console.log('connected to:' + conn.peer)

    })
    peer.on('error', (err) => {
        console.log(err);
    })
}

const connectPeer = (peerId) =>{
    const conn = peer.connect(peerId);
    conn.on('open', ()=>{
        connections.push(conn);
        console.log(peerId)
    })
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