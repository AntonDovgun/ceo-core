import { v4 as uuid } from "uuid"

import { Query } from "../../store/wordstat/types"

class QueryService {
    static create(phrase: string, count: string): Query {
        let parsedCount = Number(count);

        if (isNaN(parsedCount)) {
            parsedCount = 0;
        }


        return {
            id: uuid(),
            phrase,
            count: parsedCount
        }
    }
}

export {
    QueryService
}