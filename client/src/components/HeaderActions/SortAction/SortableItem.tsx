import { FC } from "react";
import { useSelector } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { GroupId } from "../../../store/queries/types";
import { getFilteredQueriesCount } from "../../../store/queries/selectors";
import { Typography } from "antd";

interface SortableItemProps {
  id: GroupId;
  content: string;
}

const SortableItem: FC<SortableItemProps> = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });
  const filteredCount = useSelector((state) =>
    getFilteredQueriesCount(state, id)
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
      >{` - ${filteredCount}`}</Typography.Text>
    </div>
  );
};

export { SortableItem };
