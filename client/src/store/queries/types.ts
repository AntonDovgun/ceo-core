type QueryId = string;

interface Query {
    queryId: QueryId;
    title: string;
    count: number;
}

type GroupId = string;

interface QueryGroup {
    groupId: GroupId;
    title: string;
    queries: Query[];
}

interface QueriesState {
    queryGroups: Record<GroupId, QueryGroup>;
    filters: Record<GroupId, string[]>;
    sorting: GroupId[];
}

export {
    type QueryId,
    type GroupId,
    type Query,
    type QueryGroup,
    type QueriesState,
}