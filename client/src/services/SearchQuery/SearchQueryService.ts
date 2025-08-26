import { v4 as uuid } from 'uuid';

import { type TopPopularQueriesCSVResponse } from "../../api/wordstat/types";
import { type Query, type SearchQuery } from "../../store/wordstat/types";
import { QueryService } from '../Query/QueryService';

class SearchQueryService {
    static fromSCVResponse(data: TopPopularQueriesCSVResponse): SearchQuery {
        const searchedPhrase = data[0][2].match(/«(.*?)»/);
        const phrase = searchedPhrase ? searchedPhrase[1] : '';

        const queries: Query[] = [];

        for (let i = 1; i < data.length; i++) {
            const [phrase, count] = data[i];

            queries.push(QueryService.create(phrase, count));
        }

        return {
            id: uuid(),
            phrase,
            queries
        }

    }
}

export {
    SearchQueryService
}