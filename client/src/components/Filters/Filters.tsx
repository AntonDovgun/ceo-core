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
      <Flex vertical gap={5}>
        <Text>Символьное совпадение:</Text>
        <TextFilter groupId={groupId} />
      </Flex>
      <Flex vertical gap={5}>
        <Text>Совпадение по слову:</Text>
        <TextFilter groupId={groupId} isPartial />
      </Flex>
      <Flex align="center" gap={10}>
        <Text>Количество:</Text>
        <CountFilter groupId={groupId} />
      </Flex>
    </Flex>
  );
};

export { Filters };
