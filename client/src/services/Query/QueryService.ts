import { v4 as uuid } from "uuid"

import { Query } from "../../store/queries/types"

class QueryService {
    static create(title: string, count: string): Query {
        let parsedCount = Number(count);

        if (isNaN(parsedCount)) {
            parsedCount = 0;
        }


        return {
            queryId: uuid(),
            title,
            count: parsedCount
        }
    }
}

export {
    QueryService
}