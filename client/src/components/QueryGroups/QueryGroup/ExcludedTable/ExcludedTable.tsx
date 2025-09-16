import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableColumnsType, Typography } from "antd";

import { GroupId, Query } from "../../../../store/queries/types";
import { getExcludedQueriesData } from "../../../../store/queries/selectors";
import { updateQuery } from "../../../../store/queries/slice";

interface ExcludedDataType extends Query {
  key: React.Key;
  color?: string;
  children?: ExcludedDataType[];
}

const COLUMNS: TableColumnsType<ExcludedDataType> = [
  {
    title: "Запрос",
    key: "title",
    dataIndex: "title",
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirections: ["ascend", "descend"],
    render: (value, record) => {
      if (record.color) {
        return (
          <Typography.Text style={{ color: record.color }}>
            {value}
          </Typography.Text>
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
  },
];

interface ExcludedTableProps {
  groupId: GroupId;
}

const ExcludedTable: FC<ExcludedTableProps> = ({ groupId }) => {
  const dispatch = useDispatch();
  const excludedQueriesData = useSelector((state) =>
    getExcludedQueriesData(state, groupId)
  );

  const onRow = (record: ExcludedDataType) => {
    if (record.children) {
      return {};
    }

    return {
      onClick: (event: React.MouseEvent) => {
        event.stopPropagation();
        dispatch(
          updateQuery({
            groupId,
            queryId: record.queryId,
            query: { isExcluded: false },
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
      dataSource={excludedQueriesData}
      onRow={onRow}
      size="small"
      pagination={false}
      scroll={{ y: 500 }}
    />
  );
};

export { ExcludedTable, type ExcludedDataType };
