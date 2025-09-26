import { FC, useState } from "react";
import { SortAscendingOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";

import { SortableList } from "./SortableList";

const SortAction: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Tooltip title="Сортировка">
        <Button
          icon={<SortAscendingOutlined />}
          type="text"
          onClick={() => setIsModalOpen(true)}
        />
      </Tooltip>
      <Modal
        title="Сортировка групп"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <SortableList />
      </Modal>
    </>
  );
};

export { SortAction };
