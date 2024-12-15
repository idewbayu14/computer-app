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
    produk: Computer[];
    jumlahProduk: number;
    totalHarga: number;
  };
};

export const getRekapData = async () => {
  try {
    const data: Computer[] = await db.computer.findMany();

    const kategoriData: KategoriData = data.reduce((result, item) => {
      if (!result[item.kategori]) {
        result[item.kategori] = { produk: [], jumlahProduk: 0, totalHarga: 0 };
      }

      result[item.kategori].produk.push(item);
      result[item.kategori].jumlahProduk += 1;  
      result[item.kategori].totalHarga += item.harga * item.stok;

      return result;
    }, {} as KategoriData);

    const totalProduk = data.length;
    const totalHarga = data.reduce((acc, item) => acc + item.harga * item.stok, 0);

    return { kategoriData, totalProduk, totalHarga };

  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data:", error);
    return { kategoriData: {}, totalProduk: 0, totalHarga: 0 };
  }
};
