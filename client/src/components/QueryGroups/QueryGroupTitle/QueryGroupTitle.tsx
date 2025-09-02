import { FC } from "react";
import { Flex, Typography } from "antd";

import type { GroupId } from "../../../store/queries/types";

const { Text } = Typography;

interface QueryGroupTitle {
  groupId: GroupId;
  title: string;
}

const QueryGroupTitle: FC<QueryGroupTitle> = ({ title }) => {
  return (
    <Flex justify="space-between">
      <Text>{title}</Text>
      <Text type="secondary">100</Text>
    </Flex>
  );
};

export { QueryGroupTitle };
