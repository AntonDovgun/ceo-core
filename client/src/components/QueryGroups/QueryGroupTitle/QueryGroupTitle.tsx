import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Modal, Typography } from "antd";
import { DeleteFilled } from "@ant-design/icons";

import type { GroupId } from "../../../store/queries/types";
import { getFilteredQueriesCount } from "../../../store/queries/selectors";
import {
  changeQueryGroupTitle,
  removeQueryGroup,
} from "../../../store/queries/slice";

import className from "./QueryGroupTitle.module.css";

const { Text } = Typography;

interface QueryGroupTitle {
  groupId: GroupId;
  title: string;
}

const QueryGroupTitle: FC<QueryGroupTitle> = ({ title, groupId }) => {
  const dispatch = useDispatch();
  const count = useSelector((state) => getFilteredQueriesCount(state, groupId));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOk = (event: React.MouseEvent) => {
    event.stopPropagation();

    dispatch(removeQueryGroup(groupId));
  };

  const handleModalCancel = (event: React.MouseEvent) => {
    event.stopPropagation();

    setIsModalOpen(false);
  };

  const changeGroupTitle = (title: string) => {
    dispatch(
      changeQueryGroupTitle({
        title,
        groupId,
      })
    );
  };

  const onDeleteGroup = (event: React.MouseEvent) => {
    event.stopPropagation();

    setIsModalOpen(true);
  };

  return (
    <>
      <Flex justify="space-between">
        <Flex justify="center" align="center" gap={5}>
          <Text
            editable={{
              onChange: changeGroupTitle,
            }}
          >
            {title}
          </Text>
          <Text type="secondary">{`- ${count}`}</Text>
        </Flex>
        <Flex>
          <DeleteFilled
            className={className.deleteIcon}
            onClick={onDeleteGroup}
          />
        </Flex>
      </Flex>
      <Modal
        title={`Do you want to delete:`}
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Text>{title}</Text>
      </Modal>
    </>
  );
};

export { QueryGroupTitle };
