import { FC } from "react";
import { useSelector } from "react-redux";
import { Table, TableColumnsType } from "antd";

import type { GroupId } from "../../../../store/queries/types";
import { getFilteredQueriesData } from "../../../../store/queries/selectors";

interface FilteredDataType {
  key: React.Key;
  title: string;
  count: number;
}

const COLUMNS: TableColumnsType<FilteredDataType> = [
  {
    title: "Запрос",
    key: "title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirections: ["ascend", "descend"],
  },
  {
    title: "Количество",
    key: "count",
    dataIndex: "count",
    width: "30%",
    sorter: (a, b) => a.count - b.count,
    sortDirections: ["ascend", "descend"],
    defaultSortOrder: "descend",
  },
];

interface FilteredTableProps {
  groupId: GroupId;
}

const FilteredTable: FC<FilteredTableProps> = ({ groupId }) => {
  const filteredQueriesData = useSelector((state) =>
    getFilteredQueriesData(state, groupId)
  );

  return (
    <Table
      columns={COLUMNS}
      dataSource={filteredQueriesData}
      size="small"
      pagination={false}
      scroll={{ y: 500 }}
    />
  );
};

export { FilteredTable, type FilteredDataType };
