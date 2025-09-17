import { useDispatch, useSelector } from "react-redux";
import { Flex, List } from "antd";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";
import { getSortedGroups, getSorting } from "../../../store/queries/selectors";
import { setSorting } from "../../../store/queries/slice";

const SortableList = () => {
  const dispatch = useDispatch();
  const sorting = useSelector(getSorting);
  const sortedGroups = useSelector(getSortedGroups);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = sorting.findIndex((groupId) => groupId === active.id);
      const newIndex = sorting.findIndex((groupId) => groupId === over?.id);

      dispatch(setSorting(arrayMove(sorting, oldIndex, newIndex)));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={sortedGroups.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <Flex vertical style={{ padding: "10px 0" }}>
          <List
            bordered
            dataSource={sortedGroups}
            renderItem={(item) => (
              <List.Item>
                <SortableItem groupId={item.id} content={item.content} />
              </List.Item>
            )}
          />
        </Flex>
      </SortableContext>
    </DndContext>
  );
};

export { SortableList };
