import { FC } from "react";
import { Flex, Typography } from "antd";

import type { GroupId } from "../../store/queries/types";
import { TextFilter } from "./TextFilter/TextFilter";
import { CountFilter } from "./CountFilter/CountFilter";

const { Text } = Typography;

interface FiltersProps {
  groupId: GroupId;
}

const Filters: FC<FiltersProps> = ({ groupId }) => {
  return (
    <Flex vertical gap={10}>
      <Flex vertical>
        <Text>Contains:</Text>
        <TextFilter groupId={groupId} />
      </Flex>
      <Flex vertical>
        <Text>Partial:</Text>
        <TextFilter groupId={groupId} isPartial />
      </Flex>
      <Flex align="center" gap={10}>
        <Text>Count:</Text>
        <CountFilter groupId={groupId} />
      </Flex>
    </Flex>
  );
};

export { Filters };
