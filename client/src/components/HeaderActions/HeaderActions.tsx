import { FC } from "react";
import { Flex } from "antd";

import { SortAction } from "./SortAction/SortAction";

const HeaderActions: FC = () => {
  return (
    <Flex gap={10}>
      <SortAction />
    </Flex>
  );
};

export { HeaderActions };
