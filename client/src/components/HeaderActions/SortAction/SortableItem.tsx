import { FC } from "react";
import { useSelector } from "react-redux";
import { Typography } from "antd";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { GroupId } from "../../../store/queries/types";
import { getFilteredQueriesCount } from "../../../store/queries/selectors";

interface SortableItemProps {
  groupId: GroupId;
  content: string;
}

const SortableItem: FC<SortableItemProps> = ({ groupId, content }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: groupId,
  });
  const filteredQueriesCount = useSelector((state) =>
    getFilteredQueriesCount(state, groupId)
  );

  const style = {
    transform: CSS.Transform.toString(transform),
    cursor: "move",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Typography.Text>{content}</Typography.Text>
      <Typography.Text
        type="secondary"
        style={{ fontSize: 12 }}
      >{` - ${filteredQueriesCount}`}</Typography.Text>
    </div>
  );
};

export { SortableItem };
