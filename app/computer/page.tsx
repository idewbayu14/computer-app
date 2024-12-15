'use client'

import { useEffect, useState } from "react";
import { ComputerColumns, columns } from "./components/columns";
import { UserButton } from "@clerk/nextjs";
import { DataTable } from "./components/data-table";
import axios from "axios";
import { format } from "date-fns";
import Link from "next/link";

interface ComputerData {
  id_produk: string;
  nama_produk: string;
  kategori: string;
  harga: number;
  stok: number;
  tanggal_ditambahkan: string;  
  gambar_produk: string;
}

const Computer = () => {
  const [dataComputer, setDataComputer] = useState<ComputerColumns[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComputers = async () => {
      try {
        const response = await axios.get(`/api/computer`);
        const formatedData: ComputerColumns[] = response.data.map((item: ComputerData) => ({
          id: item.id_produk,
          nama_produk: item.nama_produk,
          kategori: item.kategori,
          harga: item.harga,
          stok: item.stok,
          tanggal_ditambahkan: format(new Date(item.tanggal_ditambahkan), "MMMM dd, yyyy"),
          gambar_produk: item.gambar_produk,
        }));
        setDataComputer(formatedData);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchComputers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            <UserButton />
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-screen-xl mx-auto mt-5 p-4">
        <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Tabel Data Produk</h2>
        <DataTable columns={columns} data={dataComputer} />
      </main>

      <footer className="w-full bg-gray-800 p-4">
        <div className="text-center text-white">
          <p>10122234 | I Dewa Nyoman Bayu Satria Wibawa | IF-06.</p>
        </div>
      </footer>
    </div>
  );
};

export default Computer;
