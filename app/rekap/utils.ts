import { db } from "@/lib/db";
import axios from "axios";

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
    const response = await axios.get(`/api/computer`);
    const data: Computer[] = response.data;

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
    console.error("Error fetching data:", error);
    return { kategoriData: {}, totalProduk: 0, totalHarga: 0 };
  }
};
