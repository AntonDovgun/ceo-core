import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./initialState";
import type { GroupId, QueryGroup } from "./types";

const queriesSlice = createSlice({
    name: 'queries',
    initialState,
    reducers: {
        addQueryGroup: (state, { payload }: PayloadAction<QueryGroup>) => {
            state.queryGroups[payload.groupId] = payload;
            state.sorting.push(payload.groupId);
        },
        removeQueryGroup: (state, { payload }: PayloadAction<GroupId>) => {
            delete state.queryGroups[payload];
            delete state.filters[payload];
            state.sorting = state.sorting.filter((groupId) => groupId !== payload);
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
        },
        setSorting: (state, { payload }: PayloadAction<GroupId[]>) => {
            state.sorting = payload;
        }
    }
})

export const {
    addQueryGroup,
    removeQueryGroup,
    setFilters,
    changeQueryGroupTitle,
    setSorting
} = queriesSlice.actions;

export const queriesReducer = queriesSlice.reducer;