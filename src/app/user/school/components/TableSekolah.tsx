"use client";

import { ROUTES } from "@/prefix/route.constant";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Search from "antd/es/input/Search";
import Link from "next/link";
import React from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import useSchool from "../useSchool";
import { useLayout } from "@/hooks/zustand/layout";
import { PERMISSIONS } from "@/enum/permission.enum";

export default function TableSekolah() {
  const { permissions } = useLayout();
  const { schoolData } = useSchool();

  return (
    <div className="bg-white p-3 rounded-md">
      <div className="flex justify-between">
        <Search placeholder="cari" style={{ width: 200 }} className="" />
        {permissions.includes(PERMISSIONS.SCHOOL_ACCEPT) && (
          <Link
            className="py-1 px-3 bg-brand-dark w-fit rounded-lg text-white flex items-center gap-2 font-bold"
            href={ROUTES.SCHOOL_WAITING}
          >
            Menunggu Persetujuan
          </Link>
        )}
      </div>
      <div className="overflow-x-scroll no-scrollbar mt-3">
        <Table
          aria-label="Peserta Terdaftar"
          isStriped
          isCompact
          removeWrapper
          className=" text-nowrap w-full min-w-[700px] rounded-lg overflow-hidden"
        >
          <TableHeader className=" h-10 text-white text-center">
            <TableColumn align="center" scope="col" className="w-[80px]">
              No.
            </TableColumn>
            <TableColumn align="center" scope="col">
              Nama Sekolah
            </TableColumn>
            <TableColumn align="center" scope="col">
              Jenjang
            </TableColumn>
            <TableColumn align="center" scope="col">
              Rayon
            </TableColumn>
            <TableColumn align="center" className="" scope="col">
              Email
            </TableColumn>
            <TableColumn align="center" scope="col">
              Telepon
            </TableColumn>
            <TableColumn align="center" scope="col">
              WhatsApp
            </TableColumn>
            <TableColumn align="center" scope="col">
              Status
            </TableColumn>
            <TableColumn align="center" className="" scope="col">
              Provinsi
            </TableColumn>
            <TableColumn align="center" scope="col">
              Kab/Kota
            </TableColumn>
            <TableColumn align="center" scope="col">
              Kecamatan
            </TableColumn>
            <TableColumn
              align="center"
              scope="col"
              className={`${
                !permissions.includes(PERMISSIONS.SCHOOL_EDIT) && "hidden"
              } w-14`}
            >
              Action
            </TableColumn>
          </TableHeader>
          <TableBody className="text-sm">
            {schoolData?.map((data, i) => (
              <TableRow key={i}>
                <TableCell data-label="No" className="text-xs">
                  {i + 1}
                </TableCell>
                <TableCell className="text-start text-xs" data-label="name">
                  {data.name}
                </TableCell>
                <TableCell className="text-xs" data-label="degree_id">
                  {data.degree}
                </TableCell>
                <TableCell className="text-xs" data-label="region">
                  {data.region}
                </TableCell>
                <TableCell className="text-xs" data-label="email">
                  {data.email}
                </TableCell>
                <TableCell className="text-xs" data-label="phone">
                  {data.phone}
                </TableCell>
                <TableCell className="text-xs" data-label="whatsapp">
                  {data.whatsapp}
                </TableCell>
                <TableCell className="text-xs" data-label="status">
                  {data.status}
                </TableCell>
                <TableCell className="text-xs" data-label="province">
                  {data.province}
                </TableCell>
                <TableCell className="text-xs" data-label="city">
                  {data.city}
                </TableCell>
                <TableCell className="text-xs" data-label="city">
                  {data.subdistrict}
                </TableCell>
                <TableCell
                  data-label="Actions"
                  className={`${
                    !permissions.includes(PERMISSIONS.SCHOOL_EDIT) && "hidden"
                  } w-14`}
                >
                  <Link
                    href={ROUTES.SCHOOL_EDIT + `/${data.id}`}
                    type="button"
                    className="p-2 border-1 rounded-full mb-2 mr-2 w-fit flex items-center gap-2 text-sm font-bold text-center hover:text-white hover:bg-brand duration-500  focus:outline-none focus:ring-red-300 "
                  >
                    <AiTwotoneEdit />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {schoolData.length < 1 && (
          <h2 className="text-center text-sm text-gray-400 font-bold pb-5">
            Tidak ada data
          </h2>
        )}
      </div>
    </div>
  );
}
