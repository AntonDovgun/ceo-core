import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./initialState";
import type { GroupId, QueryGroup } from "./types";

const queriesSlice = createSlice({
    name: 'queries',
    initialState,
    reducers: {
        addQueryGroup: (state, { payload }: PayloadAction<QueryGroup>) => {
            state.queryGroups[payload.groupId] = payload;
        },
        setFilters: (state, { payload }: PayloadAction<{
            groupId: GroupId;
            filters: string[];
        }>) => {
            state.filters[payload.groupId] = payload.filters;
        }
    }
})

export const {
    addQueryGroup,
    setFilters,
} = queriesSlice.actions;

export const queriesReducer = queriesSlice.reducer;