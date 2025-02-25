interface Query {
    id: string;
    phrase: string;
    count: number;
}

interface SearchQuery {
    id: string;
    phrase: string;
    queries: Query[];
}


interface WordstatState {
     searchQueryCollection: Record<string, SearchQuery>;
}

export {
    type Query,
    type SearchQuery,
    type WordstatState,
}