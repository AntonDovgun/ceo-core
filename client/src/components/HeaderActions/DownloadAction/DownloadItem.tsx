import { FC } from "react";
import { useSelector } from "react-redux";
import { Checkbox, Typography } from "antd";

import { GroupId } from "../../../store/queries/types";
import { getFilteredQueriesCount } from "../../../store/queries/selectors";

interface DownloadItemProps {
  groupId: GroupId;
  title: string;
  checked: boolean;
  onChange: (groupId: GroupId, checked: boolean) => void;
}

const DownloadItem: FC<DownloadItemProps> = ({
  groupId,
  title,
  checked,
  onChange,
}) => {
  const filteredQueriesCount = useSelector((state) =>
    getFilteredQueriesCount(state, groupId)
  );

  return (
    <Checkbox
      checked={checked}
      onChange={(event) => onChange(groupId, event.target.checked)}
    >
      <Typography.Text>
        {title}
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          {` - ${filteredQueriesCount}`}
        </Typography.Text>
      </Typography.Text>
    </Checkbox>
  );
};

export { DownloadItem };
