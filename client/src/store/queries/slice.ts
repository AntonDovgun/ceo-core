import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./initialState";
import type { GroupFilters, GroupId, QueriesState, Query, QueryGroup, QueryId } from "./types";
import { DEFAULT_FILTERS } from "./constants";

const queriesSlice = createSlice({
    name: 'queries',
    initialState,
    reducers: {
        addQueryGroup: (state, { payload }: PayloadAction<QueryGroup>) => {
            state.queryGroups[payload.groupId] = payload;
            state.sorting.push(payload.groupId);
            state.filters[payload.groupId] = DEFAULT_FILTERS;
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
            filters: Partial<GroupFilters>;
        }>) => {
            state.filters[payload.groupId] = {
                ...state.filters[payload.groupId],
                ...payload.filters,
            };
        },
        setSorting: (state, { payload }: PayloadAction<GroupId[]>) => {
            state.sorting = payload;
        },
        updateQuery: (state, { payload }: PayloadAction<{
            groupId: GroupId;
            queryId: QueryId;
            query: Partial<Query>;
        }>) => {
            const { queries } = state.queryGroups[payload.groupId];

            const queryIndex = queries.findIndex(({ queryId }) => queryId === payload.queryId);

            queries[queryIndex] = {
                ...queries[queryIndex],
                ...payload.query
            };
        },
        setState: (_, { payload }: PayloadAction<QueriesState>) => {
            return { ...payload };
        }
    }
})

export const {
    addQueryGroup,
    removeQueryGroup,
    setFilters,
    changeQueryGroupTitle,
    setSorting,
    updateQuery,
    setState,
} = queriesSlice.actions;

export const queriesReducer = queriesSlice.reducer;