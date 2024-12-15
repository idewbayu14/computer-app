"use server";

import { db } from "@/lib/db";
import { FormUpdate } from "./_components/form-update";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface EditPageProps {
  params: Promise<{ id: string }>
}

const EditPage = async ({params} : EditPageProps) => {

  const {id} = await params;

  const computers = await db.computer.findFirst({
    where: {
      id_produk: id
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-gradient-to-r from-gray-800 to-gray-700 p-6">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <Link href="/dashboard">
            <h1 className="text-white text-xl font-bold">My Computer Store</h1>
          </Link>

          <div className="flex items-center ml-auto space-x-6">
            <Link
              href="/computer"
              className="text-white hover:text-gray-200 hover:bg-gray-900 rounded-lg px-4 py-2 transition-all duration-300"
            >
              Tabel Produk
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:text-gray-200 hover:bg-gray-900 rounded-lg px-4 py-2 transition-all duration-300"
            >
              Dashboard
            </Link>
            <Link
              href="/rekap"
              className="text-white hover:text-gray-200 hover:bg-gray-900 rounded-lg px-4 py-2 transition-all duration-300"
            >
              Laporan
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-screen-xl mx-auto mt-5 p-4">
        <FormUpdate data={computers}/>
      </main>

      <footer className="w-full bg-gray-800 p-4">
        <div className="text-center text-white">
          <p>10122234 | I Dewa Nyoman Bayu Satria Wibawa | IF-06.</p>
        </div>
      </footer>
    </div>

  )

}

export default EditPage