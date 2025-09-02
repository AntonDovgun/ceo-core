import { configureStore } from "@reduxjs/toolkit";

import { queriesReducer } from "./queries/slice";

const store = configureStore({
    reducer: {
        queries: queriesReducer
    },
})

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export {
    store,
    type RootState,
    type AppDispatch
}