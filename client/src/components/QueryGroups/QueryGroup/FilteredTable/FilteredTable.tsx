import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableColumnsType } from "antd";

import type { GroupId, Query } from "../../../../store/queries/types";
import { getFilteredQueriesData } from "../../../../store/queries/selectors";
import { excludedQuery } from "../../../../store/queries/slice";

interface FilteredDataType extends Query {
  key: React.Key;
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
  const dispatch = useDispatch();
  const filteredQueriesData = useSelector((state) =>
    getFilteredQueriesData(state, groupId)
  );

  const onRow = ({ queryId }: FilteredDataType) => {
    return {
      onClick: () => {
        dispatch(
          excludedQuery({
            groupId,
            queryId,
          })
        );
      },
      style: {
        cursor: "pointer",
      },
    };
  };

  return (
    <Table
      columns={COLUMNS}
      dataSource={filteredQueriesData}
      onRow={onRow}
      size="small"
      pagination={false}
      scroll={{ y: 500 }}
    />
  );
};

export { FilteredTable, type FilteredDataType };
