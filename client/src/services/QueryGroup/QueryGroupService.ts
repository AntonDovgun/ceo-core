import { v4 as uuid } from 'uuid';

import { type TopPopularQueriesCSVResponse } from "../../api/queries/types";
import { type Query, type QueryGroup } from "../../store/queries/types";
import { QueryService } from '../Query/QueryService';

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
}

export {
    QueryGroupService
}