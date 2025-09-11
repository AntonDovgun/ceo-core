import { InputNumber } from "antd";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { GroupId } from "../../../store/queries/types";
import { getGroupFilters } from "../../../store/queries/selectors";
import { setFilters } from "../../../store/queries/slice";

interface CountFilterProps {
  groupId: GroupId;
}

const CountFilter: FC<CountFilterProps> = ({ groupId }) => {
  const dispatch = useDispatch();
  const groupFilters = useSelector((state) => getGroupFilters(state, groupId));

  const onChange = (value: string | null) => {
    dispatch(
      setFilters({
        groupId,
        filters: {
          count: value,
        },
      })
    );
  };

  return (
    <InputNumber
      size="small"
      style={{ width: 70 }}
      value={groupFilters.count}
      onChange={onChange}
    />
  );
};

export { CountFilter };
