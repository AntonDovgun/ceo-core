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
        removeQueryGroup: (state, { payload }: PayloadAction<GroupId>) => {
            delete state.queryGroups[payload];
            delete state.filters[payload];
        },
        changeQueryGroupTitle: (state, { payload }: PayloadAction<{
            groupId: GroupId;
            title: string;
        }>) => {
            state.queryGroups[payload.groupId].title = payload.title;
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
    removeQueryGroup,
    setFilters,
    changeQueryGroupTitle,
} = queriesSlice.actions;

export const queriesReducer = queriesSlice.reducer;