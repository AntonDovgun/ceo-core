import { configureStore } from "@reduxjs/toolkit";
import { wordstatReducer } from "./wordstat/slice";

const store = configureStore({
    reducer: {
        wordstat: wordstatReducer
    },
})

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export {
    store,
    type RootState,
    type AppDispatch
}