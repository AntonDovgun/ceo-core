import { FC } from "react";
import { Button } from "antd";
import { useSelector } from "react-redux";

import { RootState } from "../../../store/store";

const ExportStoreButton: FC = () => {
  const state = useSelector((state: RootState) => state.queries);

  const handleExport = () => {
    const jsonState = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonState], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "state.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Button type="text" onClick={handleExport}>
      Сохранить
    </Button>
  );
};

export { ExportStoreButton };
