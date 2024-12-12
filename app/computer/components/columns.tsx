"use client"
import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Delete } from "./delete"
import { useRouter } from "next/navigation"
import Image from "next/image"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ComputerColumns = {
  id: string
  nama_produk: string
  kategori: string
  harga: number
  stok: number
  tanggal_ditambahkan: string
  gambar_produk: string
}

const ActionCell = ({ computer }: { computer: ComputerColumns }) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleDeleteSuccess = () => {
    // Logika untuk update state atau refetch data setelah delete
  }

  const handleUpdateClick = () => {
    router.push(`/edit/${computer.id}`)
  }

  return (
    <div>
      <Delete
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        id={computer.id} // Kirimkan ID produk
        onDeleteSuccess={handleDeleteSuccess}
      />
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(computer.id)}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setIsOpen(true)}
              style={{ cursor: "pointer" }}
            >
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleUpdateClick}
              style={{ cursor: "pointer" }}
            >
              Update
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

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
      const harga = row.getValue("harga")

      const numericHarga = Number(harga)

      if (isNaN(numericHarga)) {
        return <span>-</span>
      }

      const formattedHarga = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(numericHarga)

      return <span>{formattedHarga}</span>
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
      )
    },
  },
  {
    accessorKey: "gambar_produk",
    header: "Gambar",
    cell: ({ row }) => {
      const computer = row.original
      return (
        <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
          <Image
            fill
            className={"object-cover"}
            alt={"Image"}
            src={`${computer.gambar_produk}`}
          />
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const computer = row.original
      return <ActionCell computer={computer} />
    },
  },
]
