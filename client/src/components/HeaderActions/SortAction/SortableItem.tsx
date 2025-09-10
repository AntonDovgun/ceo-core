import { FC } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { GroupId } from "../../../store/queries/types";

interface SortableItemProps {
  id: GroupId;
  content: string;
}

const SortableItem: FC<SortableItemProps> = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    cursor: "move",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {content}
    </div>
  );
};

export { SortableItem };
