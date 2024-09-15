import { Status } from "@/enum/status.enum";
import { convertBirth } from "@/helper/common";
import { IParticipant } from "@/interfaces/IParticipant";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

interface IProps {
  tableData: IParticipant[];
}

export default function TablePaymentParticipant(props: IProps) {
  const { tableData } = props;

  function statusColor(data: string) {
    if (data === "active") {
      return "success";
    } else if (data === Status.PENDING) {
      return "warning";
    } else if (data === "cancel") {
      return "danger";
    }
  }
  function genderLabel(data: string) {
    if (data === "L") {
      return "Laki-Laki";
    } else if (data === "P") {
      return "Perempuan";
    }
  }
  return (
    <>
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
      >
        <TableHeader>
          <TableColumn
            align="center"
            scope="col"
            className="w-[40px] text-center"
          >
            No.
          </TableColumn>
          <TableColumn align="start" scope="col" className="text-center ">
            Nama
          </TableColumn>
          <TableColumn align="center" scope="col" className="w-36 text-center">
            Status
          </TableColumn>
          <TableColumn align="center" scope="col" className="w-36 text-center">
            Gender
          </TableColumn>
          <TableColumn align="center" scope="col" className="w-36 text-center">
            Tanggal Lahir
          </TableColumn>
        </TableHeader>
        <TableBody>
          {tableData.map((data, i) => (
            <TableRow key={i}>
              <TableCell data-label="No">{i + 1}</TableCell>
              <TableCell data-label="name" className="text-start">
                {data.name}
              </TableCell>
              <TableCell className="text-xs" data-label="status">
                <Chip
                  variant="flat"
                  size="sm"
                  color={statusColor(data.status)}
                  className={`${statusColor(
                    data.status
                  )} px-3 rounded-full font-black w-fit`}
                >
                  <p className="font-black text-xs">{data.status}</p>
                </Chip>
              </TableCell>
              <TableCell data-label="gender">
                {genderLabel(data.gender)}
              </TableCell>
              <TableCell data-label="birth">
                {convertBirth(data.birth)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
