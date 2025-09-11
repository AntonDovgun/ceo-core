import { FC } from "react";
import { useSelector } from "react-redux";
import { Table, TableColumnsType, Typography } from "antd";

import { GroupId } from "../../../../store/queries/types";
import { getExcludedQueriesData } from "../../../../store/queries/selectors";

interface ExcludedDataType {
  key: React.Key;
  title: string;
  count: number;
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
  const excludedQueriesData = useSelector((state) =>
    getExcludedQueriesData(state, groupId)
  );

  return (
    <Table
      columns={COLUMNS}
      dataSource={excludedQueriesData}
      size="small"
      pagination={false}
      scroll={{ y: 500 }}
    />
  );
};

export { ExcludedTable, type ExcludedDataType };
