import { FC } from "react";
import { useSelector } from "react-redux";
import { Collapse, CollapseProps } from "antd";

import { getQueryGroups, getSorting } from "../../store/queries/selectors";
import { QueryGroupTable } from "./QueryGroupTable/QueryGroupTable";
import { QueryGroupTitle } from "./QueryGroupTitle/QueryGroupTitle";

const QueryGroups: FC = () => {
  const queryGroups = useSelector(getQueryGroups);
  const sorting = useSelector(getSorting);

  const items: CollapseProps["items"] = Object.values(queryGroups)
    .sort((groupA, groupB) => {
      return sorting.indexOf(groupA.groupId) - sorting.indexOf(groupB.groupId);
    })
    .map(({ groupId, title }) => {
      return {
        key: groupId,
        label: <QueryGroupTitle groupId={groupId} title={title} />,
        children: <QueryGroupTable groupId={groupId} />,
      };
    });

  if (items.length === 0) {
    return null;
  }

  return <Collapse items={items} />;
};

export { QueryGroups };
