import { FC, useState } from "react";
import { SortAscendingOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

import { SortableList } from "./SortableList";

const SortAction: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        icon={<SortAscendingOutlined />}
        type="text"
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        title="Сортировка групп"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <SortableList />
      </Modal>
    </>
  );
};

export { SortAction };
