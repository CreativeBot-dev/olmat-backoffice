"use client";

import React, { ChangeEvent } from "react";
import useAuth from "./useAuth";
import Wave from "@/assets/wave";
import AppImage from "@/components/AppImage";
import { appSetting } from "@/constants/appSetting";
import { Form } from "antd";
import AntEmail from "@/components/input/AntEmail";
import AntPass from "@/components/input/AntPass";
import Button from "@/components/button/Button";

export default function Page() {
  const { form, handleChange, handleSubmit } = useAuth();
  return (
    <div className="relative overflow-hidden bg-gradient-to-b lg:bg-gradient-to-r from-brand to-brand-dark h-screen text-white">
      <Wave className="w-screen absolute opacity-10" fill="white" />
      <div className="lg:grid lg:grid-cols-2">
        <div className="lg:flex flex-col hidden  justify-center p-6 h-full lg:h-screen w-full md:items-center lg:bg-none ">
          <div className="grid place-items-center  mb-20 font-montserrat items-center">
            <AppImage
              src={appSetting.logoEvent}
              className="w-60 h-60 m-10"
              alt="olmat-logo"
            />
            <h1 className="text-3xl font-black">{appSetting.eventName}</h1>
          </div>
        </div>
        <div className="flex flex-col justify-center p-6 h-screen w-full md:items-center lg:bg-none ">
          <div className="grid place-items-center text-3xl mb-20 font-montserrat lg:hidden gap-2 font-black items-center">
            <AppImage
              src={appSetting.logoEvent}
              className="w-20 h-20"
              alt="olmat-logo"
            />
            <h1>OLMAT UINSA</h1>
          </div>
          <h1 className="text-2xl pb-4">Masuk Akun</h1>
          <Form
            form={form}
            onFinish={handleSubmit}
            className="text-lg flex flex-col max-w-[] lg:w-fit justify-center"
          >
            <div className="bg-slate-100/60 p-3 rounded-lg mb-5">
              <p className="uppercase font-bold text-center">Akun demo</p>
              <p>email : admin@admin.com</p>
              <div>password : qweqweqwe</div>
            </div>
            <AntEmail
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChange(e)}
              name="email"
              placeholder="Masukkan E-Mail"
              className="text-lg bg-white"
            />
            <AntPass
              onChange={(
                e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => handleChange(e)}
              name="password"
              placeholder="Masukkan Password"
              className="text-lg bg-white"
            />
            <div className="flex justify-center">
              <Button className="w-32 py-2 text-brand-dark">Masuk</Button>
            </div>
          </Form>
        </div>
      </div>
      <Wave
        className="w-screen absolute bottom-0 rotate-180 opacity-5"
        fill="white"
      />
    </div>
  );
}
