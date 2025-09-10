import React, { FC } from "react";
import { Flex, Table, TableColumnsType } from "antd";

import type { GroupId } from "../../../store/queries/types";
import { Filters } from "../../Filters/Filters";
import { useSelector } from "react-redux";
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

interface QueryGroupTable {
  groupId: GroupId;
}

const QueryGroupTable: FC<QueryGroupTable> = ({ groupId }) => {
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

export { QueryGroupTable };
