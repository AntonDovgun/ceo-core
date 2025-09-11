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
        (_, groupId: GroupId) => groupId,
        getQueryGroups,
    ],
    (groupId, queryGroups) => queryGroups[groupId]
);

const getQueriesCount = createSelector(
    [
        (_, groupId: GroupId) => groupId,
        getQueryGroup,
    ],
    (_, queryGroup) => queryGroup.queries.length
);

const getGroupFilters = createSelector(
    [
        getFilters,
        (_, groupId: GroupId) => groupId,
    ],
    (filters, groupId) => filters[groupId],
);

const getFilteredQueries = createSelector(
    [
        (_, groupId: GroupId) => groupId,
        getQueryGroup,
        getGroupFilters,
    ],
    (_, queryGroup, groupFilters) => {
        const {
            contains: containsFilter,
            partial: partialFilter,
            count: countFilter
        } = groupFilters;


        const filteredQueriesByContains = queryGroup.queries.filter((query) => {
            for (let i = 0; i <= containsFilter.length - 1; i++) {
                const text = containsFilter[i];

                if (query.title.includes(text)) {
                    return false;
                }
            }

            return true;
        });

        const filteredQueriesByPartial = filteredQueriesByContains.filter((query) => {
            for (let i = 0; i <= partialFilter.length - 1; i++) {
                const text = partialFilter[i];
                const queryTitleArray = query.title.split(' ');

                if (queryTitleArray.includes(text)) {
                    return false;
                }

            }

            return true;
        });

        if (!countFilter) {
            return filteredQueriesByPartial;
        }

        const filteredQueriesByCount = filteredQueriesByPartial.filter((query) => {
            const count = Number(query.count);

            if (count >= Number(countFilter)) {
                return true;
            }

            return false;
        })

        return filteredQueriesByCount
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
    getFilteredQueriesCount,
    getQueriesCount
}