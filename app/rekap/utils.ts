// utils.ts
import { db } from "@/lib/db";

// Tipe data untuk produk
type Computer = {
  id_produk: string;
  nama_produk: string;
  kategori: string;
  harga: number;
  stok: number;
};

// Tipe data untuk rekap kategori
type KategoriData = {
  [key: string]: {
    produk: Computer[];     // Menyimpan daftar produk per kategori
    jumlahProduk: number;   // Menyimpan jumlah produk per kategori
    totalHarga: number;     // Menyimpan total harga per kategori
  };
};

// Fungsi untuk mendapatkan rekap data
export const getRekapData = async () => {
  const data: Computer[] = await db.computer.findMany();

  const kategoriData: KategoriData = data.reduce((result, item) => {
    if (!result[item.kategori]) {
      result[item.kategori] = { produk: [], jumlahProduk: 0, totalHarga: 0 };
    }

    // Menambahkan produk ke dalam kategori terkait
    result[item.kategori].produk.push(item);
    result[item.kategori].jumlahProduk += 1;  // Menghitung jumlah produk per kategori
    result[item.kategori].totalHarga += item.harga * item.stok; // Menghitung total harga berdasarkan stok

    return result;
  }, {} as KategoriData);

  // Menghitung total produk dan total harga secara keseluruhan
  const totalProduk = data.length; // Total produk terdaftar
  const totalHarga = data.reduce((acc, item) => acc + item.harga * item.stok, 0); // Total harga berdasarkan stok

  return { kategoriData, totalProduk, totalHarga };
};
