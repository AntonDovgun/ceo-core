import { FC } from "react";
import { Button, message, Upload, UploadProps } from "antd";
import { useDispatch } from "react-redux";

import { setState } from "../../../store/queries/slice";

type BeforeUploadHandler = UploadProps["beforeUpload"];

const ImportStoreButton: FC = () => {
  const dispatch = useDispatch();

  const beforeUploadHandler: BeforeUploadHandler = async (file) => {
    try {
      const text = await file.text();
      const importedState = JSON.parse(text);

      if (importedState && typeof importedState === "object") {
        dispatch(setState(importedState));
        message.success("Состояние успешно загружено!");
      } else {
        message.error("Неверный формат данных.");
      }
    } catch (error) {
      const errorMessage = (error as Error).message;

      message.error(
        `Ошибка при загрузке ${file.name} файла. Проверьте формат.`
      );
      console.error(`Ошибка загрузки файла: ${errorMessage}`);
    }
  };

  return (
    <Upload
      beforeUpload={beforeUploadHandler}
      accept=".json"
      showUploadList={false}
    >
      <Button type="text">Загрузить</Button>
    </Upload>
  );
};

export { ImportStoreButton };
