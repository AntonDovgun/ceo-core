import React, { FC } from "react";
import { Table, TableColumnsType } from "antd";

import type { Query } from "../../../store/wordstat/types";

interface DataType {
  key: React.Key;
  phrase: string;
  count: number;
}

const COLUMNS: TableColumnsType<DataType> = [
  {
    title: "Phrase",
    key: "phrase",
    dataIndex: "phrase",
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

interface SearchQueryTable {
  data: Query[];
}

const SearchQueryTable: FC<SearchQueryTable> = ({ data }) => {
  const dataSource = data.map(({ phrase, count, id }) => {
    return {
      key: id,
      phrase,
      count,
    };
  });

  return (
    <Table
      columns={COLUMNS}
      dataSource={dataSource}
      size="small"
      pagination={false}
      scroll={{ y: 500 }}
    />
  );
};

export { SearchQueryTable };
