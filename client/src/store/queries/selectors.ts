import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../store";
import type { GroupId, QueriesState } from "./types";

const getState = (rootState: RootState): QueriesState => rootState.queries;

const getQueryGroups = createSelector(
    getState,
    ({ queryGroups }) => queryGroups
);

const getFilters = createSelector(
    getState,
    ({ filters }) => filters
);

const getSorting = createSelector(
    getState,
    ({ sorting }) => sorting
);

const getSortedGroups = createSelector(
    getQueryGroups,
    getSorting,
    (queryGroups, sorting) => {
        return sorting.map((groupId) => ({
            id: groupId,
            content: queryGroups[groupId].title
        }))
    }
);

const getQueryGroup = createSelector(
    [
        getQueryGroups,
        (_, groupId: GroupId) => groupId,
    ],
    (queryGroups, groupId) => queryGroups[groupId]
);

const getGroupFilters = createSelector(
    [
        getFilters,
        (_, groupId: GroupId) => groupId,
    ],
    (filters, groupId) => filters[groupId] || [],
);

const getFilteredQueries = createSelector(
    [
        (_, groupId: GroupId) => groupId,
        getQueryGroup,
        getGroupFilters,
    ],
    (_, queryGroup, filters) => {
        const filteredQueries = queryGroup.queries.filter((query) => {
            for (let i = 0; i <= filters.length - 1; i++) {
                const tag = filters[i];

                if (query.title.includes(tag)) {
                    return false;
                }
            }

            return true;
        })

        return filteredQueries
    },
);

const getFilteredQueriesCount = createSelector(
    [
        (_, groupId: GroupId) => groupId,
        getFilteredQueries,
    ],
    (_, filteredQueries) => filteredQueries.length
)

export {
    getQueryGroups,
    getGroupFilters,
    getSorting,
    getSortedGroups,
    getFilteredQueries,
    getFilteredQueriesCount
}