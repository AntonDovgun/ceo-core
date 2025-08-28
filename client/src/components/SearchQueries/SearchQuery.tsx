import { FC } from "react";
import { useSelector } from "react-redux";
import { Collapse, CollapseProps } from "antd";

import { getSearchQueries } from "../../store/wordstat/selectors";
import { SearchQueryTable } from "./SearchQueryTable/SearchQueryTable";

const SearchQueries: FC = () => {
  const searchQueries = useSelector(getSearchQueries);

  const items: CollapseProps["items"] = Object.values(searchQueries).map(
    (searchQuery) => {
      return {
        key: searchQuery.id,
        label: searchQuery.phrase,
        children: <SearchQueryTable data={searchQuery.queries} />,
      };
    }
  );

  if (items.length === 0) {
    return null;
  }

  return <Collapse items={items} />;
};

export { SearchQueries };
