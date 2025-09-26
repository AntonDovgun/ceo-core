import { FC } from "react";
import { Button, Upload, type UploadProps, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import { useDispatch } from "react-redux";

import { type TopPopularQueryCSVResponse } from "../../api/queries/types";
import { QueryGroupService } from "../../services/QueryGroup/QueryGroupService";
import { addQueryGroup } from "../../store/queries/slice";

type BeforeUploadHandler = UploadProps["beforeUpload"];
type OnChangeHandler = UploadProps["onChange"];

const UploadFiles: FC = () => {
  const dispatch = useDispatch();

  const beforeUploadHandler: BeforeUploadHandler = async (file) => {
    try {
      const text = await file.text();

      const parsedData = Papa.parse<TopPopularQueryCSVResponse>(text);

      if (parsedData.errors.length === 0) {
        message.success(`${file.name} файл успешно загружен`);
      } else {
        throw new Error(`Не могу распарсить ${file.name} файл`);
      }

      const queryGroup = QueryGroupService.fromSCVResponse(parsedData.data);

      dispatch(addQueryGroup(queryGroup));
    } catch (error) {
      const errorMessage = (error as Error).message;

      message.error(`Ошибка загрузки ${file.name} файла`);
      console.error(`Ошибка загрузки и парсинга: ${errorMessage}`);
    }

    return false;
  };

  const onChangeHandler: OnChangeHandler = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} файл успешно загружен`);
    }

    if (info.file.status === "error") {
      message.error(`Ошибка загрузки ${info.file.name} файла`);
    }
  };

  return (
    <Upload
      beforeUpload={beforeUploadHandler}
      onChange={onChangeHandler}
      multiple
      accept=".csv"
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />}>Загрузить CSV</Button>
    </Upload>
  );
};

export { UploadFiles };
