import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Flex, Table, TableColumnsType } from "antd";

import type { GroupId } from "../../../store/queries/types";
import { Filters } from "../../Filters/Filters";
import { getFilteredQueries } from "../../../store/queries/selectors";

interface DataType {
  key: React.Key;
  title: string;
  count: number;
}

const COLUMNS: TableColumnsType<DataType> = [
  {
    title: "Title",
    key: "title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Count",
    key: "count",
    dataIndex: "count",
    width: 200,
    sorter: (a, b) => a.count - b.count,
    sortDirections: ["ascend", "descend"],
    defaultSortOrder: "descend",
  },
];

interface QueryGroup {
  groupId: GroupId;
}

const QueryGroup: FC<QueryGroup> = ({ groupId }) => {
  const filteredQueries = useSelector((state) =>
    getFilteredQueries(state, groupId)
  );

  const dataSource = filteredQueries.map(({ title, count, queryId }) => {
    return {
      key: queryId,
      title,
      count,
    };
  });

  return (
    <Flex vertical gap={20}>
      <Filters groupId={groupId} />
      <Table
        columns={COLUMNS}
        dataSource={dataSource}
        size="small"
        pagination={false}
        scroll={{ y: 500 }}
      />
    </Flex>
  );
};

export { QueryGroup };
