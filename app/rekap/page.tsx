import React from "react";
import { getRekapData } from "@/app/rekap/utils";
import { UserButton } from "@clerk/nextjs";

// Tentukan tipe data yang kita dapatkan dari getRekapData
type RekapData = {
  kategoriData: {
    [key: string]: {
      jumlahProduk: number;
      totalHarga: number;
    };
  };
  totalProduk: number;
  totalHarga: number;
};

const RekapPage = async () => {
  // Ambil data rekap dengan tipe data yang telah didefinisikan
  const { kategoriData, totalProduk, totalHarga }: RekapData = await getRekapData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full bg-gray-800 p-4">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <h1 className="text-white text-xl font-bold">My Computer Store</h1>
          <UserButton />
        </div>
      </header>

      {/* Content */}
      <main className="flex-grow p-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Rekap Produk</h1>
        <div className="mb-10">
          <h2 className="text-2xl font-semibold">Total Produk: {totalProduk}</h2>
          <h2 className="text-2xl font-semibold">
            Total Harga: Rp {totalHarga.toLocaleString("id-ID")}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-3 border border-gray-300">Kategori</th>
                <th className="px-6 py-3 border border-gray-300">Jumlah Produk</th>
                <th className="px-6 py-3 border border-gray-300">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(kategoriData).map(([kategori, data]) => (
                <tr key={kategori} className="text-center border-b border-gray-300">
                  <td className="px-6 py-4">{kategori}</td>
                  <td className="px-6 py-4">{data.jumlahProduk}</td>
                  <td className="px-6 py-4">
                    Rp {data.totalHarga.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 p-4 mt-10">
        <div className="text-center text-white">
          <p>10122234 | I Dewa Nyoman Bayu Satria Wibawa | IF-06.</p>
        </div>
      </footer>
    </div>
  );
};

export default RekapPage;
