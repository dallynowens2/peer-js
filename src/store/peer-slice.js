import { createSlice } from "@reduxjs/toolkit";
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
            const id = PeerjsService.randId();
            state.id = id
            PeerjsService.initialize(id);
        },
        connectPeer(state, action) {
            const receiveMessage = (message) => {
                console.log("here", message);
                state.messages.push(message);
            };
            state.connections.push(PeerjsService.connectPeer(action.payload, receiveMessage));
            state.messages.push('hello');
        },
        sendMessageAll(state, action) {
            state.messages.push(action.payload);
            PeerjsService.sendMessageAll(action.payload)
        },
        sendMessage(state, action) {
            state.messages.push(action.payload.message);
            PeerjsService.sendMessage(action.payload.message, action.payload.peerId)
        }
    }
})

export default peerSlice;
export const {
    initialize,
    connectPeer,
    sendMessageAll,
    sendMessage
} = peerSlice.actions;