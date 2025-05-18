import Button from "@/components/button/Button";
import AntInput from "@/components/input/AntInput";
import { useLayout } from "@/hooks/zustand/layout";
import { Form } from "antd";
import React from "react";

// interface IProps {
//   form?: any;
//   handleChange?: (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => void;
//   onFinish?: () => void;
// }

export default function ApiKey() {
  const { setIsSuccess } = useLayout();
  function postSetting() {
    setIsSuccess(true, "Berhasil memperbarui");
  }
  return (
    <>
      <div className="bg-white p-4 rounded-lg drop-shadow">
        <div className="flex justify-between">
          <label className="font-bold">Xendit</label>
          <p className="text-red-700 text-xs">
            Acces key tidak dapat dirubah selama demo
          </p>
          {/* <EditButton
            state={isEdit}
            onEdit={() => setIsEdit(true)}
            onCancel={() => setIsEdit(false)}
          /> */}
        </div>
        <div className="mt-5">
          <Form onFinish={postSetting}>
            <AntInput name="apiKey" require labelName="Api Key" />
            <AntInput require name="callbackToken" labelName="Callback Token" />
            <div className="w-full flex border-t-2 pt-5 justify-center">
              <Button>Simpan</Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
