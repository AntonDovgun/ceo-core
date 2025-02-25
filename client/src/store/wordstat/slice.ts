import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./initialState";
import { SearchQuery } from "./types";

const wordstatSlice = createSlice({
    name: 'wordstat',
    initialState,
    reducers: {
        addSearchQuery: (state, { payload }: PayloadAction<SearchQuery>) => {
            state.searchQueryCollection[payload.id] = payload;
        }
    }
})

export const {
    addSearchQuery
} = wordstatSlice.actions;

export const wordstatReducer = wordstatSlice.reducer;