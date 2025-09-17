import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox, Flex, List, Typography } from "antd";

import { DownloadItem } from "./DownloadItem";
import { getSortedGroups } from "../../../store/queries/selectors";
import { GroupId } from "../../../store/queries/types";

const DownloadList = forwardRef<string[]>((_, ref) => {
  const sortedGroups = useSelector(getSortedGroups);

  const [checkedItems, setCheckedItems] = useState<string[]>(
    sortedGroups.map((item) => item.id)
  );
  const [selectAll, setSelectAll] = useState(true);

  const handleItemChange = (groupId: GroupId, checked: boolean): void => {
    if (checked) {
      setCheckedItems((prev) => [...prev, groupId]);
    } else {
      setCheckedItems((prev) => prev.filter((id) => id !== groupId));
    }
  };

  const handleSelectAllChange = (checked: boolean) => {
    setSelectAll(checked);

    if (checked) {
      setCheckedItems(sortedGroups.map((item) => item.id));
    } else {
      setCheckedItems([]);
    }
  };

  useEffect(() => {
    setSelectAll(checkedItems.length === sortedGroups.length);
  }, [checkedItems, sortedGroups.length]);

  useImperativeHandle(ref, () =>
    sortedGroups
      .map((item) => item.id)
      .filter((groupId) => checkedItems.includes(groupId))
  );

  return (
    <Flex vertical gap={10} style={{ padding: "10px 0" }}>
      {sortedGroups.length ? (
        <Checkbox
          checked={selectAll}
          onChange={(event) => handleSelectAllChange(event.target.checked)}
          indeterminate={
            checkedItems.length > 0 && checkedItems.length < sortedGroups.length
          }
          style={{ marginLeft: 26 }}
        >
          <Typography.Text>Выбрать все</Typography.Text>
        </Checkbox>
      ) : null}

      <List
        bordered
        dataSource={sortedGroups}
        renderItem={(item) => (
          <List.Item>
            <DownloadItem
              groupId={item.id}
              title={item.content}
              checked={checkedItems.includes(item.id)}
              onChange={handleItemChange}
            />
          </List.Item>
        )}
      />
    </Flex>
  );
});

export { DownloadList };
