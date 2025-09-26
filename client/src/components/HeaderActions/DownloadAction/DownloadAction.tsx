import { FC, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button, message, Modal, Tooltip } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { DownloadList } from "./DownloadList";
import { getGroupedFilteredQueriesCSV } from "../../../store/queries/selectors";
import { GroupId } from "../../../store/queries/types";
import { downloadCSV } from "../../../utils/downloadCSV";

const DownloadAction: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const downloadListRef = useRef<GroupId[]>(null);

  const groupedFilteredQueriesCSV = useSelector(getGroupedFilteredQueriesCSV);

  const handleDownloadCSV = () => {
    if (downloadListRef.current && downloadListRef.current.length) {
      const csv = downloadListRef.current
        .map((groupId) => groupedFilteredQueriesCSV[groupId])
        .join("\r\n\r\n");

      downloadCSV(csv, `queries for ${downloadListRef.current.length} group`);

      setIsModalOpen(false);
    } else {
      message.warning("Выберите группы для скачивания!");
    }
  };

  return (
    <>
      <Tooltip title="Скачать CSV">
        <Button
          icon={<DownloadOutlined />}
          type="text"
          onClick={() => setIsModalOpen(true)}
        />
      </Tooltip>
      <Modal
        title="Экспортировать"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleDownloadCSV}
        destroyOnHidden
      >
        <DownloadList ref={downloadListRef} />
      </Modal>
    </>
  );
};

export { DownloadAction };
