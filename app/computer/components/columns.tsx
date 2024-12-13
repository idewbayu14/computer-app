"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DeleteModal } from "./delete-modal";

export type ComputerColumns = {
  id: string;
  nama_produk: string;
  kategori: string;
  harga: number;
  stok: number;
  tanggal_ditambahkan: string;
  gambar_produk: string;
};

export const columns: ColumnDef<ComputerColumns>[] = [
  {
    cell: ({ row }) => row.index + 1,
    header: "No",
  },
  {
    accessorKey: "nama_produk",
    header: "Nama Produk",
  },
  {
    accessorKey: "kategori",
    header: "Kategori",
  },
  {
    accessorKey: "harga",
    header: "Harga",
    cell: ({ row }) => {
      const harga = row.getValue("harga");

      const numericHarga = Number(harga);
      if (isNaN(numericHarga)) {
        return <span>-</span>; 
      }

      const formattedHarga = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(numericHarga);

      return <span>{formattedHarga}</span>;
    },
  },
  {
    accessorKey: "stok",
    header: "Stok",
  },
  {
    accessorKey: "tanggal_ditambahkan",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Dibuat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "gambar_produk",
    header: "Gambar",
    cell: ({ row }) => {
      const computer = row.original;
      return (
        <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
          <Image fill className={"object-cover"} alt={"Image"} src={`${computer.gambar_produk}`} />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const computer = row.original;
      return(
        <DeleteModal content={computer} />
      )
    },
  },
];
