import { FC } from "react";
import { Flex, Splitter, Typography } from "antd";

import type { GroupId } from "../../../store/queries/types";
import { Filters } from "../../Filters/Filters";
import { FilteredTable } from "./FilteredTable/FilteredTable";
import { ExcludedTable } from "./ExcludedTable/ExcludedTable";
interface QueryGroup {
  groupId: GroupId;
}

const QueryGroup: FC<QueryGroup> = ({ groupId }) => {
  return (
    <Flex vertical gap={20}>
      <Filters groupId={groupId} />
      <Splitter style={{ maxHeight: 600 }}>
        <Splitter.Panel collapsible style={{ marginRight: 15 }}>
          <Flex vertical gap={5}>
            <Typography.Title level={5}>
              Отфильтрованные запросы:
            </Typography.Title>
            <FilteredTable groupId={groupId} />
          </Flex>
        </Splitter.Panel>
        <Splitter.Panel collapsible style={{ marginLeft: 15 }}>
          <Flex vertical gap={5}>
            <Typography.Title level={5}>Исключенные запросы:</Typography.Title>
            <ExcludedTable groupId={groupId} />
          </Flex>
        </Splitter.Panel>
      </Splitter>
    </Flex>
  );
};

export { QueryGroup };
