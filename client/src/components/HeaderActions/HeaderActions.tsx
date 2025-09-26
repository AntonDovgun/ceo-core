import { FC } from "react";
import { Flex } from "antd";

import { SortAction } from "./SortAction/SortAction";
import { DownloadAction } from "./DownloadAction/DownloadAction";
import { ExportStoreButton } from "./ExportStoreButton/ExportStoreButton";
import { ImportStoreButton } from "./ImportStoreButton/ImportStoreButton";

const HeaderActions: FC = () => {
  return (
    <Flex>
      <ExportStoreButton />
      <ImportStoreButton />
      <SortAction />
      <DownloadAction />
    </Flex>
  );
};

export { HeaderActions };
