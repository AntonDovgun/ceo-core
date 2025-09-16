import { createSelector } from "@reduxjs/toolkit";
import Papa from 'papaparse';
import { message } from "antd";

import type { RootState } from "../store";
import type { GroupId, QueriesState } from "./types";
import { QueryGroupService } from "../../services/QueryGroup/QueryGroupService";

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

const getFilteredQueriesData = createSelector(
    [
        (_, groupId: GroupId) => groupId,
        getQueryGroup,
        getGroupFilters,
    ],
    (_, queryGroup, groupFilters) => {
        return QueryGroupService.getFilteredQueriesData(queryGroup.queries, groupFilters)
    },
);

const getFilteredQueriesCSV = createSelector(
    [
        (_, groupId: GroupId) => groupId,
        getFilteredQueriesData,
    ],
    (_, filteredQueriesData) => {
        try {
            const csv = Papa.unparse(filteredQueriesData, { columns: ['title', 'count'], delimiter: ";", header: false});
            return csv;
        } catch {
            message.error('Failed to convert JSON to CSV');
            return '';
        }
    }
);

const getExcludedQueriesData = createSelector(
    [
      (_, groupId: GroupId) => groupId,
        getQueryGroup,
        getGroupFilters,
    ],
    (_, queryGroup, groupFilters) => {
        return QueryGroupService.getExcludedQueriesData(queryGroup.queries, groupFilters)
    }
);

const getFilteredQueriesCount = createSelector(
    [
        (_, groupId: GroupId) => groupId,
        getFilteredQueriesData,
    ],
    (_, filteredQueriesData) => filteredQueriesData.length
)

export {
    getQueryGroups,
    getGroupFilters,
    getSorting,
    getSortedGroups,
    getFilteredQueriesData,
    getExcludedQueriesData,
    getFilteredQueriesCount,
    getQueriesCount,
    getFilteredQueriesCSV
}