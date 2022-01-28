import { configureStore } from "@reduxjs/toolkit";
import peerSlice from "./peer-slice";

export const store = configureStore({
    reducer: { peer: peerSlice.reducer }
})