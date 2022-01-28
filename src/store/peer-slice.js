import { createSlice } from "@reduxjs/toolkit";
import Peer from "peerjs";
import PeerjsService from "../services/PeerjsService";

const peerSlice = createSlice({
    name: 'peer',
    initialState: {
        id: undefined,
        connections: [],
        messages: []
    },
    reducers: {
        initialize(state) {
            state.id = PeerjsService.initialize();
        },
        connectPeer(state, action) {
            state.connections.push(PeerjsService.connectPeer(action.payload))
        },
        sendMessageAll(state, action) {
            state.messages.push(action.payload);
            // PeerjsService.sendMessageAll(action.payload)
            state.connections.forEach(c => c.send(action.payload));
        },
        addMessage(state, action) {
            state.messages.push(action.payload);
        }
    }
})

export default peerSlice;
export const {
    initialize,
    connectPeer,
    sendMessageAll,
    addMessage
} = peerSlice.actions;