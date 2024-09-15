import api from "@/config/axiosConfig";
import { useLayout } from "@/hooks/zustand/layout";
import { IParticipant } from "@/interfaces/IParticipant";
import { IUsers } from "@/interfaces/IUsers";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useForm } from "antd/es/form/Form";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface ITransferPayload {
  newPayment_id?: number;
  newSchool_id?: number;
  newUser_id?: number;
  newStatus?: string;
}

export interface IPaymentData {
  idUser: number;
  name: string;
  invoice: string;
  code: string;
  paymentId: string;
  qrString: string;
  participantAmount: number;
  fee: number;
  amount: number;
  totalAmount: number;
  expiredDate: string;
  status: string;
  participants: IParticipant[];
  create_at: string;
}

const usePayment = () => {
  const params = useParams().slug.toString();
  const [form] = useForm();
  const { setError, setIsSuccess } = useLayout();

  const [isCheckBox, setIsCheckBox] = useState({
    payment: false,
    user: false,
  });
  const [isTransfer, setIsTransfer] = useState(false);
  const [transferPayload, setTransferPayload] = useState<ITransferPayload>({});
  const statusUpdate = [
    {
      label: "active",
      value: "active",
    },
    {
      label: "pending",
      value: "pending",
    },
  ];
  const [userDataCheck, setUserDataCheck] = useState<IUsers>();
  const [paymentDataCheck, setPaymentDataCheck] = useState<IPaymentData>({
    idUser: 0,
    name: "",
    invoice: "",
    code: "",
    paymentId: "",
    qrString: "",
    participantAmount: 0,
    fee: 0,
    amount: 0,
    totalAmount: 0,
    expiredDate: "",
    status: "",
    participants: [],
    create_at: "",
  });

  const [paymentData, setPaymentData] = useState<IPaymentData>({
    idUser: 0,
    name: "",
    invoice: "",
    code: "",
    paymentId: "",
    qrString: "",
    participantAmount: 0,
    fee: 0,
    amount: 0,
    totalAmount: 0,
    expiredDate: "",
    status: "",
    participants: [],
    create_at: "",
  });

  async function getPaymentById() {
    await api.get(`/backoffice/payment/${params}`).then((res) => {
      const resData: IPaymentData = {
        idUser: res.data.user.id,
        name: res.data.user.name,
        invoice: res.data.invoice,
        code: res.data.code,
        paymentId: res.data.action.id,
        qrString: res.data.action.qr_string,
        participantAmount: res.data.participant_amounts,
        fee: res.data.fee,
        amount: res.data.amount,
        totalAmount: res.data.total_amount,
        expiredDate: res.data.expired_at,
        status: res.data.status,
        participants: res.data.participants,
        create_at: res.data.audit_trail.created_at,
      };
      setPaymentData(resData);
    });
  }

  async function getUserCheck() {
    await api
      .get(`/backoffice/user/${transferPayload.newUser_id}`)
      .then((res) => {
        const user = {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          region: "",
          school: res.data.school.name,
        };
        setUserDataCheck(user);
      })
      .catch(() => {
        setError(true, "User tidak ditemukan");
      });
  }

  async function getPaymentCheck() {
    await api
      .get(`/backoffice/payment/${transferPayload.newPayment_id}`)
      .then((res) => {
        const resData: IPaymentData = {
          idUser: res.data.user.id,
          name: res.data.user.name,
          invoice: res.data.invoice,
          code: res.data.code,
          paymentId: res.data.action.id,
          qrString: res.data.action.qr_string,
          participantAmount: res.data.participant_amounts,
          fee: res.data.fee,
          amount: res.data.amount,
          totalAmount: res.data.total_amount,
          expiredDate: res.data.expired_at,
          status: res.data.status,
          participants: res.data.participants,
          create_at: res.data.audit_trail.created_at,
        };

        setPaymentDataCheck(resData);
      });
  }

  async function transferParticipant() {
    await api
      .put(`/backoffice/participant/payments/${params}`, transferPayload)
      .then(() => {
        setIsTransfer(false);
        getPaymentById();
        form.resetFields();
        setTransferPayload({});
        setIsSuccess(true, "Berhasil Update Transaksi");
      })
      .catch(() => {
        setError(true, "Gagal Update Transfer");
      });
  }

  /**
   * HANDLE CHANGE
   */
  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setTransferPayload({
      ...transferPayload,
      [e.target.name]: +e.target.value,
    });
  }

  function handleStatusSelect(e: any) {
    setTransferPayload({ ...transferPayload, newStatus: e });
  }

  /**
   * HANDLE SUBMIT ETC
   */

  function handleCheckBox(e: CheckboxChangeEvent) {
    const updatedPayload = { ...transferPayload };
    if (!e.target.checked) {
      if (e.target.name === "payment") {
        form.setFieldsValue({
          newPayment_id: null,
        });
        delete updatedPayload.newPayment_id;
      }
      if (e.target.name === "user") {
        form.setFieldsValue({
          nweUser_id: null,
        });
        delete updatedPayload.newUser_id;
      }
    }
    setTransferPayload(updatedPayload);
    setIsCheckBox((prev) => ({
      ...prev,
      [e.target.name as string]: e.target.checked,
    }));
  }

  function handleCheckPaymnentId() {
    if (transferPayload.newPayment_id) {
      getPaymentCheck();
    } else {
      setError(true, "Masukkan id Payment");
    }
  }

  function handleCheckUserId() {
    if (transferPayload.newUser_id) {
      getUserCheck();
    } else {
      setError(true, "Masukkan id User");
    }
  }

  function handleSubmitTransfer() {
    transferParticipant();
  }

  useEffect(() => {
    getPaymentById();
  }, []);

  return {
    form,
    paymentData,
    paymentDataCheck,
    userDataCheck,
    statusUpdate,
    isTransfer,
    isCheckBox,
    handleCheckBox,
    setIsTransfer,
    handleInputChange,
    handleCheckPaymnentId,
    handleCheckUserId,
    handleStatusSelect,
    handleSubmitTransfer,
  };
};
export default usePayment;
