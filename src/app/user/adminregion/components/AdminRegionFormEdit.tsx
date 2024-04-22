import Button from "@/components/button/Button";
import AntEmail from "@/components/input/AntEmail";
import AntInput from "@/components/input/AntInput";
import AntItemSelect from "@/components/input/AntItemSelect";
import AntPass from "@/components/input/AntPass";
import { Form } from "antd";
import React, { ChangeEvent } from "react";

interface IProps {
  form: any;
  options: any;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleRoleSelect: (e: any) => void;
  // handleSubmit?: () => void;
}

export default function AdminRegionFormEdit(props: IProps) {
  const { handleChange, handleRoleSelect, options, form } = props;

  return (
    <>
      <Form form={form}>
        <AntInput onChange={handleChange} name="name" labelName="Nama" />

        <AntInput
          onChange={handleChange}
          name="phone"
          labelName="Phone Number"
        />
        <AntEmail
          onChange={(e) => handleChange(e)}
          name="email"
          labelName="Email"
        />
        <AntPass
          onChange={(e) => handleChange(e)}
          name="password"
          labelName="Password"
        />
        <AntItemSelect
          onChange={(e) => handleRoleSelect(e)}
          labelName="Rayon"
          name="region"
          option={options}
        />
        {/* <div>
          <label className="text-sm">Region</label>
          <Form.Item name="region">
            <Select
              showSearch
              size="middle"
              style={{ width: "100%" }}
              placeholder="Pilih Rayon"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label as string)
                  .toLowerCase()
                  .localeCompare((optionB?.label as string).toLowerCase())
              }
              options={options || []}
              onChange={(e) => handleRoleSelect(e)}
            />
          </Form.Item>
        </div> */}
        <div className="flex justify-end gap-4">
          <Button className="text-sm bg-brand-dark">Simpan</Button>
        </div>
      </Form>
    </>
  );
}
