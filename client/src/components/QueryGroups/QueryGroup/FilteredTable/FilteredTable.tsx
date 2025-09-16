import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Table, TableColumnsType, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import type { GroupId, Query } from "../../../../store/queries/types";
import { getFilteredQueriesData } from "../../../../store/queries/selectors";
import { updateQuery } from "../../../../store/queries/slice";

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
    render: (value, record) => {
      if (record.ignoreFilters) {
        return (
          <Flex gap={10}>
            <Typography.Text>{value}</Typography.Text>
            <ExclamationCircleOutlined style={{ color: "red" }} />
          </Flex>
        );
      }

      return value;
    },
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

  const onRow = (query: FilteredDataType) => {
    return {
      onClick: () => {
        dispatch(
          updateQuery({
            groupId,
            queryId: query.queryId,
            query: {
              ignoreFilters: false,
              isExcluded: query.ignoreFilters ? false : true,
            },
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
