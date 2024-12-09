import { ComputerColumns, columns} from "./components/columns"
import { UserButton } from "@clerk/nextjs"
import { DataTable } from "./components/data-table"
import { db } from "@/lib/db"
import { format } from "date-fns"


const Computer = async () => {
  const dataComputer = await db.computer.findMany()
  const formatedData: ComputerColumns[] = dataComputer.map((item)=>({
    id: item.id_produk,
    nama_produk: item.nama_produk,
    kategori: item.kategori,
    harga: item.harga,
    stok: item.stok,
    tanggal_ditambahkan: format(item.tanggal_ditambahkan, "MMMM dd, yyyy"),
    gambar_produk: item.gambar_produk
  }))
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full bg-gray-800 p-4">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <h1 className="text-white text-xl font-bold">My Computer Store</h1>
          <UserButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-screen-xl mx-auto mt-5 p-4">
        <DataTable columns={columns} data={formatedData}/>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 p-4">
        <div className="text-center text-white">
          <p>10122234 | I Dewa Nyoman Bayu Satria Wibawa | IF-06.</p>
        </div>
      </footer>
    </div>
  )
}

export default Computer