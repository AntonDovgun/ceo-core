type QueryId = string;

interface Query {
    queryId: QueryId;
    title: string;
    count: number;
    isExcluded?: boolean;
}

type GroupId = string;

interface QueryGroup {
    groupId: GroupId;
    title: string;
    queries: Query[];
}

interface GroupFilters {
    contains: string[];
    partial: string[];
    count: string | null;
}

interface QueriesState {
    queryGroups: Record<GroupId, QueryGroup>;
    filters: Record<GroupId, GroupFilters>;
    sorting: GroupId[];
}

export type {
    QueryId,
    GroupId,
    Query,
    QueryGroup,
    QueriesState,
    GroupFilters,
}