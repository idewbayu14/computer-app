import { NextResponse } from "next/server";
import { db } from "@/lib/db";  

type Computer = {
  id_produk: string;
  nama_produk: string;
  kategori: string;
  harga: number;
  stok: number;
};

type KategoriData = {
  produk: Computer[];
  jumlahProduk: number;
  totalHarga: number;
};

export async function GET() {
  try {
    const kategoriData = {
        Laptop: {
          produk: [{ id_produk: "1", nama_produk: "Laptop A", harga: 10000000, stok: 10 }],
          jumlahProduk: 10,
          totalHarga: 100000000 
        }
      };
  
      const totalProduk = 10;  // Pastikan totalProduk ada
      const totalHarga = 100000000;  // Pastikan totalHarga ada
  
      console.log("Kategori Data:", kategoriData);
      console.log("Total Produk:", totalProduk);
      console.log("Total Harga:", totalHarga);
  
  } catch (error) {
    console.error("Error fetching data: ", error);
    return NextResponse.json({ message: "Terjadi kesalahan saat mengambil data." }, { status: 500 });
  }
}
