import { v4 as uuid } from 'uuid';

import { type TopPopularQueriesCSVResponse } from "../../api/queries/types";
import { GroupFilters, type Query, type QueryGroup } from "../../store/queries/types";
import { QueryService } from '../Query/QueryService';
import { ExcludedDataType } from '../../components/QueryGroups/QueryGroup/ExcludedTable/ExcludedTable';
import { FilteredDataType } from '../../components/QueryGroups/QueryGroup/FilteredTable/FilteredTable';

class QueryGroupService {
    static fromSCVResponse(data: TopPopularQueriesCSVResponse): QueryGroup {
        const searchedPhrase = data[0][2].match(/«(.*?)»/);
        const title = searchedPhrase ? searchedPhrase[1] : '';

        const queries: Query[] = [];

        for (let i = 1; i < data.length - 1; i++) {
            const [phrase, count] = data[i];

            queries.push(QueryService.create(phrase, count));
        }

        return {
            groupId: uuid(),
            title,
            queries
        }

    }

    static getFilteredQueriesData(queries: Query[], groupFilters: GroupFilters): FilteredDataType[] {
        const {
            contains: containsFilter,
            partial: partialFilter,
            count: countFilter
        } = groupFilters;

        const filteredQueriesByExcluded = queries.filter(({ isExcluded }) => !isExcluded);

        const filteredQueriesByContains = filteredQueriesByExcluded.filter((query) => {
            if (query.ignoreFilters) return true;

            for (let i = 0; i <= containsFilter.length - 1; i++) {
                const text = containsFilter[i];

                if (query.title.includes(text)) {
                    return false;
                }
            }

            return true;
        });

        const filteredQueriesByPartial = filteredQueriesByContains.filter((query) => {
            if (query.ignoreFilters) return true;

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
            return filteredQueriesByPartial.map((query) => ({
                ...query,
                key: query.queryId,
            }));
        }

        const filteredQueriesByCount = filteredQueriesByPartial.filter((query) => {
            if (query.ignoreFilters) return true;

            const count = Number(query.count);

            if (count >= Number(countFilter)) {
                return true;
            }

            return false;
        })

        return filteredQueriesByCount.map((query) => ({
            ...query,
            key: query.queryId,
        }))
    }

    static getExcludedQueriesData(queries: Query[], groupFilters: GroupFilters): ExcludedDataType[] {
        const {
            contains,
            partial,
            count: filteredCount
        } = groupFilters;

        const data: ExcludedDataType[] = [];

        // Filter by "contains"
        for (let i = 0; i <= contains.length - 1; i++) {
            const filteredText = contains[i];
            let total = 0;
            const children: ExcludedDataType[] = [];

            for (let i = 0; i <= queries.length - 1; i++) {
                const query = queries[i];

                if (query.title.includes(filteredText) && !query.ignoreFilters) {
                    children.push({
                        ...query,
                        key: `contains: ${query.queryId}`,
                    });
                    total++;
                }
            }

            const key = `contains: ${filteredText}`;

            data.push({
                key,
                queryId: key,
                title: filteredText,
                count: total,
                color: 'red',
                children
            })
        }

        // Filter by "partial"
        for (let i = 0; i <= partial.length - 1; i++) {
            const filteredText = partial[i];
            let total = 0;
            const children: ExcludedDataType[] = [];

            for (let i = 0; i <= queries.length - 1; i++) {
                const query = queries[i];

                const queryTitleArray = query.title.split(' ');

                if (queryTitleArray.includes(filteredText) && !query.ignoreFilters) {
                    children.push({
                        ...query,
                        key: `partial: ${query.queryId}`,
                    });
                    total++;
                }
            }

            const key = `partial: ${filteredText}`;

            data.push({
                key,
                queryId: key,
                title: filteredText,
                count: total,
                color: 'orange',
                children
            })
        }

        // Filter by "count"
        if (filteredCount) {
            let total = 0;
            const children: ExcludedDataType[] = [];

            for (let i = 0; i <= queries.length - 1; i++) {
                const query = queries[i];

                if (Number(query.count) < Number(filteredCount) && !query.ignoreFilters) {
                    children.push({
                        ...query,
                        key: `count: ${query.queryId}`,
                    });
                    total++;
                }
            }

            const key = "filter by count";

            if (total) {
               data.push({
                key,
                queryId: key,
                title: 'Фильтр по количеству',
                count: total,
                color: 'green',
                children
            })
            }
        }

        // Filter by "custom"
        let excludedCount = 0;
        const excludedChildren: ExcludedDataType[] = [];

        for (let i = 0; i <= queries.length - 1; i++) {
            const query = queries[i];

            if (query.isExcluded && !query.ignoreFilters) {
                excludedChildren.push({
                    ...query,
                    key: `excluded - ${query.queryId}`,
                });
                excludedCount++;
            }
        }

        const key = `filter by excluded`;

        if (excludedCount) {
           data.push({
                key,
                queryId: key,
                title: 'Исключенные',
                count: excludedCount,
                color: '#3765b0',
                children: excludedChildren
            })
        }

        return data;
    }
}

export {
    QueryGroupService
}