import { FC } from "react";
import { Button, Upload, type UploadProps, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import { useDispatch } from "react-redux";

import { type TopPopularQueryCSVResponse } from "../../api/queries/types";
import { QueryGroupService } from "../../services/QueryGroup/SearchQueryService";
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
        message.success(`${file.name} file uploaded successfully`);
      } else {
        throw new Error(`Cannot parse ${file.name} file`);
      }

      const queryGroup = QueryGroupService.fromSCVResponse(parsedData.data);

      dispatch(addQueryGroup(queryGroup));
    } catch (error) {
      const errorMessage = (error as Error).message;

      message.error(`${file.name} file upload failed`);
      console.error(`Upload and parse file: ${errorMessage}`);
    }

    return false;
  };

  const onChangeHandler: OnChangeHandler = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    }

    if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed`);
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
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export { UploadFiles };
