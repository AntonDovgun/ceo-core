import { FC, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { DownloadList } from "./DownloadList";

const DownloadAction: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const downloadListRef = useRef(null);

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
        onOk={() => console.log(downloadListRef.current)}
        destroyOnHidden
      >
        <DownloadList ref={downloadListRef} />
      </Modal>
    </>
  );
};

export { DownloadAction };
