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

        const filteredQueriesByContains = queries.filter((query) => {
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
            return filteredQueriesByPartial.map(({queryId, title, count}) => ({
                key: queryId,
                title,
                count
            }));
        }

        const filteredQueriesByCount = filteredQueriesByPartial.filter((query) => {
            const count = Number(query.count);

            if (count >= Number(countFilter)) {
                return true;
            }

            return false;
        })

        return filteredQueriesByCount.map(({queryId, title, count}) => ({
            key: queryId,
            title,
            count
        }))
    }

    static getExcludedQueriesData(queries: Query[], groupFilters: GroupFilters): ExcludedDataType[] {
        const {
            contains,
            partial,
            count: filteredCount
        } = groupFilters;

        const data: ExcludedDataType[] = [];

        for (let i = 0; i <= contains.length - 1; i++) {
            const filteredText = contains[i];
            let total = 0;
            const children: ExcludedDataType[] = [];

            for (let i = 0; i <= queries.length - 1; i++) {
                const {
                    queryId,
                    title,
                    count
                } = queries[i];

                if (title.includes(filteredText)) {
                    children.push({
                        key: `contains: ${queryId}`,
                        title,
                        count
                    });
                    total++;
                }
            }

            data.push({
                key: `contains: ${filteredText}`,
                title: filteredText,
                count: total,
                color: 'red',
                children
            })
        }

        for (let i = 0; i <= partial.length - 1; i++) {
            const filteredText = partial[i];
            let total = 0;
            const children: ExcludedDataType[] = [];

            for (let i = 0; i <= queries.length - 1; i++) {
                const {
                    queryId,
                    title,
                    count
                } = queries[i];

                const queryTitleArray = title.split(' ');

                if (queryTitleArray.includes(filteredText)) {
                    children.push({
                        key: `partial: ${queryId}`,
                        title,
                        count
                    });
                    total++;
                }
            }

            data.push({
                key: `partial: ${filteredText}`,
                title: filteredText,
                count: total,
                color: 'orange',
                children
            })
        }

        if (filteredCount) {
            let total = 0;
            const children: ExcludedDataType[] = [];

            for (let i = 0; i <= queries.length - 1; i++) {
                const {
                    queryId,
                    title,
                    count
                } = queries[i];

                if (Number(count) < Number(filteredCount)) {
                    children.push({
                        key: `count: ${queryId}`,
                        title,
                        count
                    });
                    total++;
                }
            }

            data.push({
                key: `count - ${filteredCount}`,
                title: 'Фильтр по количеству',
                count: total,
                color: 'green',
                children
            })
        }

        return data;
    }
}

export {
    QueryGroupService
}