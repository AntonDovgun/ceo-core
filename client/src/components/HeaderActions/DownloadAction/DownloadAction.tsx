import { FC, useState } from "react";
import { Button, Modal } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const DownloadAction: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        icon={<DownloadOutlined />}
        type="text"
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        title="Экспортировать"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <div>Download</div>
      </Modal>
    </>
  );
};

export { DownloadAction };
