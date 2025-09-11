import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Input, InputRef, Tag, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { getGroupFilters } from "../../../store/queries/selectors";
import { setFilters } from "../../../store/queries/slice";
import type { GroupId } from "../../../store/queries/types";

const tagInputStyle: React.CSSProperties = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

interface TextFilterProps {
  groupId: GroupId;
  isPartial?: boolean;
}

const TextFilter: FC<TextFilterProps> = ({ groupId, isPartial }) => {
  const dispatch = useDispatch();

  const groupFilters = useSelector((state) => getGroupFilters(state, groupId));
  const filters = isPartial ? groupFilters.partial : groupFilters.contains;

  const FILTER_PROPERTY = isPartial ? "partial" : "contains";

  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag: string) => {
    const newFilters = filters.filter((tag) => tag !== removedTag);
    dispatch(
      setFilters({
        groupId,
        filters: {
          [FILTER_PROPERTY]: newFilters,
        },
      })
    );
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !filters.includes(inputValue)) {
      dispatch(
        setFilters({
          groupId,
          filters: {
            [FILTER_PROPERTY]: [...filters, inputValue],
          },
        })
      );
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newFilters = [...filters];
    newFilters[editInputIndex] = editInputValue;
    setFilters({
      groupId,
      filters: {
        [FILTER_PROPERTY]: newFilters,
      },
    });
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const tagPlusStyle: React.CSSProperties = {
    height: 22,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <Flex gap="10px 0" wrap>
      {filters.map<React.ReactNode>((tag, index) => {
        return editInputIndex === index ? (
          <Input
            ref={editInputRef}
            key={tag}
            size="small"
            style={tagInputStyle}
            value={editInputValue}
            onChange={handleEditInputChange}
            onBlur={handleEditInputConfirm}
            onPressEnter={handleEditInputConfirm}
          />
        ) : (
          <Tag
            key={tag}
            closable={true}
            color={isPartial ? "warning" : "error"}
            style={{ userSelect: "none" }}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(tag);
                  e.preventDefault();
                }
              }}
            >
              {tag}
            </span>
          </Tag>
        );
      })}
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={tagPlusStyle} icon={<PlusOutlined />} onClick={showInput}>
          New Filter
        </Tag>
      )}
    </Flex>
  );
};

export { TextFilter };
