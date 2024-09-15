import AntInput from "@/components/input/AntInput";
import AntItemSelect from "@/components/input/AntItemSelect";
import { Checkbox, Form } from "antd";
import React, { ChangeEvent } from "react";
import TablePaymentParticipant from "./TablePaymentParticipant";
import { IPaymentData } from "../[slug]/usePayment";
import Button from "@/components/button/Button";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { IUsers } from "@/interfaces/IUsers";

interface IProps {
  userDataCheck?: IUsers;
  paymentDataCheck: IPaymentData;
  form: any;
  optionsStatus: any;
  isCheckBox: any;
  handleCheckBox: (e: CheckboxChangeEvent) => void;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleStatusChange: (e: any) => void;
  handleCheckPaymentId: () => void;
  handleCheckUserId: () => void;
  handleSubmitTransfer: () => void;
}
export default function TransferForm(props: IProps) {
  const {
    form,
    optionsStatus,
    paymentDataCheck,
    userDataCheck,
    isCheckBox,
    handleCheckBox,
    handleInputChange,
    handleStatusChange,
    handleCheckPaymentId,
    handleCheckUserId,
    handleSubmitTransfer,
  } = props;
  return (
    <div>
      <h2>Transfer Form</h2>
      <div className="grid md:grid-cols-3 gap-3 my-5">
        <div className="border rounded-lg p-2 flex md:pr-5 text-start w-full">
          <Form
            form={form}
            onFinish={handleSubmitTransfer}
            className="flex-wrap flex flex-col gap-3 w-full"
          >
            <AntItemSelect
              require
              name="status"
              onChange={handleStatusChange}
              labelName="Update Status"
              option={optionsStatus}
            />
            <div className="flex flex-col w-full gap-1">
              <Checkbox name="payment" onChange={handleCheckBox}>
                Transfer Invoice
              </Checkbox>
              {isCheckBox.payment && (
                <div className="flex w-full items-center gap-4">
                  <AntInput
                    // require
                    name="newPayment_id"
                    labelName="Tujuan Transfer (ID Transaksi)"
                    onChange={handleInputChange}
                  />
                  <span
                    onClick={handleCheckPaymentId}
                    className="cursor-pointer hover:bg-brand-dark duration-300 hover:text-white h-fit bg-brand px-3 py-1 rounded-lg"
                  >
                    Cek
                  </span>
                </div>
              )}
            </div>

            <div className="flex w-full flex-col gap-1">
              <Checkbox onChange={handleCheckBox} name="user">
                Transfer User
              </Checkbox>
              {isCheckBox.user && (
                <>
                  <div className="flex w-full items-center gap-4">
                    <AntInput
                      name="newUser_id"
                      labelName="User Tujuan (ID User)"
                      onChange={handleInputChange}
                    />
                    <span
                      onClick={handleCheckUserId}
                      className="cursor-pointer hover:bg-brand-dark duration-300 hover:text-white h-fit bg-brand px-3 py-1 rounded-lg"
                    >
                      Cek
                    </span>
                  </div>
                  {userDataCheck && (
                    <div className="border rounded-lg p-4">
                      <h2>
                        Id :{" "}
                        <span className="font-bold">{userDataCheck?.id}</span>
                      </h2>
                      <h2>
                        Nama :{" "}
                        <span className="font-bold">{userDataCheck?.name}</span>
                      </h2>
                      <h2>
                        Sekolah :{" "}
                        <span className="font-bold">
                          {userDataCheck?.school}
                        </span>
                      </h2>
                    </div>
                  )}
                </>
              )}
            </div>
            <Button className="mt-10">Transfer</Button>
          </Form>
          {/* <AntInput
              name="newSchool_id"
              labelName="Sekolah Tujuan (ID Sekolah)"
              onChange={handleInputChange}
            /> */}
        </div>

        <div className="w-full md:col-span-2 border rounded-lg p-2 overflow-x-scroll no-scrollbar">
          <div>
            <div className="flex gap-3 font-bold">
              <h2>Nama User : </h2>
              <p>{paymentDataCheck.name}</p>
            </div>
            <div className="flex gap-3 font-bold">
              <h2>Status : </h2>
              <p>{paymentDataCheck.status}</p>
            </div>
          </div>
          <TablePaymentParticipant tableData={paymentDataCheck.participants} />
        </div>
      </div>
    </div>
  );
}
