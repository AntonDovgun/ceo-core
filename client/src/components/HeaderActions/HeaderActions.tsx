import { FC } from "react";
import { Flex } from "antd";

import { SortAction } from "./SortAction/SortAction";
import { DownloadAction } from "./DownloadAction/DownloadAction";

const HeaderActions: FC = () => {
  return (
    <Flex>
      <SortAction />
      <DownloadAction />
    </Flex>
  );
};

export { HeaderActions };
