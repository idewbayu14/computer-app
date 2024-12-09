import { db } from "@/lib/db";



type Computer = {
  id_produk: string;
  nama_produk: string;
  kategori: string;
  harga: number;
  stok: number;
};

type KategoriData = {
  [key: string]: {
    jumlahProduk: number;
    totalHarga: number;
  };
};

export const getRekapData = async () => {
  const data: Computer[] = await db.computer.findMany();

  const kategoriData: KategoriData = data.reduce((result, item) => {
    if (!result[item.kategori]) {
      result[item.kategori] = { jumlahProduk: 0, totalHarga: 0 };
    }
    result[item.kategori].jumlahProduk += 1;
    result[item.kategori].totalHarga += item.harga;

    return result;
  }, {} as KategoriData);

  // Hitung total produk dan total harga secara keseluruhan
  const totalProduk = data.length;
  const totalHarga = data.reduce((acc, item) => acc + item.harga, 0);

  return { kategoriData, totalProduk, totalHarga };
};
