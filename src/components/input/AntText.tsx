import { Form, Input } from "antd";
import React, { ChangeEvent } from "react";

interface IAntInput {
  name?: string;
  labelName?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  require?: NodeRequire;
}

const { TextArea } = Input;

export default function AntText(props: IAntInput) {
  const {
    name,
    labelName,
    value,
    defaultValue,
    onChange,
    placeholder,
    className,
    require,
  } = props;

  return (
    <div>
      <label className="text-sm">{labelName}</label>
      <Form.Item
        name={name}
        rules={[
          {
            required: require !== undefined,
            message: `Please input ${labelName}!`,
          },
        ]}
      >
        <TextArea
          value={value}
          size="middle"
          name={name}
          defaultValue={defaultValue}
          placeholder={labelName ? `masukkan ${labelName}` : placeholder}
          onChange={onChange}
          bordered={false}
          className={`${className} text-sm bg-gray-100 rounded-lg p2`}
        />
      </Form.Item>
    </div>
  );
}
