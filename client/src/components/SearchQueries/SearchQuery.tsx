import { FC } from "react";
import { useSelector } from "react-redux";
import { Collapse, CollapseProps, Table } from "antd";

import { getSearchQueries } from "../../store/wordstat/selectors";

const SearchQueries: FC = () => {
  const searchQueries = useSelector(getSearchQueries);

  const columns = [
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
    },
  ];

  const items: CollapseProps["items"] = Object.values(searchQueries).map(
    (searchQuery) => {
      const dataSource = searchQuery.queries.map(({ phrase, count, id }) => {
        return {
          key: id,
          phrase,
          count,
        };
      });

      return {
        key: searchQuery.id,
        label: searchQuery.phrase,
        children: (
          <Table
            dataSource={dataSource}
            columns={columns}
            size="small"
            pagination={false}
            scroll={{ y: 500 }}
          />
        ),
      };
    }
  );

  if (items.length === 0) {
    return null;
  }

  return <Collapse items={items} />;
};

export { SearchQueries };
