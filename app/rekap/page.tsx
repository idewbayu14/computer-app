import { getRekapData } from "@/app/rekap/utils";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const RekapPage = async () => {
  const { kategoriData, totalProduk, totalHarga } = await getRekapData();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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

      <main className="flex-grow p-8">
        <h1 className="text-4xl font-semibold mb-8 text-center text-gray-800">Laporan Produk</h1>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700">Total Produk: {totalProduk}</h2>
          <h2 className="text-2xl font-semibold text-gray-700 mt-2">
            Total Harga: Rp {totalHarga.toLocaleString("id-ID")}
          </h2>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
          {Object.entries(kategoriData).map(([kategori, data]) => (
            <div key={kategori} className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Kategori: {kategori}</h3>
              <table className="min-w-full text-sm text-left text-gray-600 border">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-3 border border-gray-300">Nama Produk</th>
                    <th className="px-6 py-3 border border-gray-300">Harga Satuan</th>
                    <th className="px-6 py-3 border border-gray-300">Stok</th>
                    <th className="px-6 py-3 border border-gray-300">Total Harga</th>
                  </tr>
                </thead>
                <tbody>
                  {data.produk.map((produk) => (
                    <tr key={produk.id_produk} className="hover:bg-gray-100 transition-colors">
                      <td className="px-6 py-4 border border-gray-300">{produk.nama_produk}</td>
                      <td className="px-6 py-4 border border-gray-300">
                        Rp {produk.harga.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 border border-gray-300">{produk.stok}</td>
                      <td className="px-6 py-4 border border-gray-300">
                        Rp {(produk.harga * produk.stok).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-100">
                  <tr>
                    <td className="px-6 py-4 font-semibold border border-gray-300">Subtotal</td>
                    <td className="px-6 py-4 border border-gray-300"></td>
                    <td className="px-6 py-4 font-semibold border border-gray-300">{data.jumlahProduk}</td>
                    <td className="px-6 py-4 font-semibold border border-gray-300">
                      Rp {data.totalHarga.toLocaleString("id-ID")}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full bg-gray-800 p-4 mt-10 text-center text-white">
        <p>10122234 | I Dewa Nyoman Bayu Satria Wibawa | IF-06</p>
      </footer>
    </div>
  );
};

export default RekapPage;
