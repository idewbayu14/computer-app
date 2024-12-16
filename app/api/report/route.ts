// app/api/report/route.ts
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
    const data = await db.computer.findMany();

    const kategoriData = data.reduce<{ [key: string]: KategoriData }>((result, item) => {
      if (!result[item.kategori]) {
        result[item.kategori] = { produk: [], jumlahProduk: 0, totalHarga: 0 };
      }

      result[item.kategori].produk.push(item);
      result[item.kategori].jumlahProduk += 1;
      result[item.kategori].totalHarga += item.harga * item.stok;

      return result;
    }, {});

    const totalProduk = data.length;
    const totalHarga = data.reduce((acc, item) => acc + item.harga * item.stok, 0);

    return NextResponse.json({ produk: data, kategoriData, totalProduk, totalHarga });
  } catch (error) {
    console.error("Error fetching data: ", error);
    return NextResponse.json({ message: "Terjadi kesalahan saat mengambil data." }, { status: 500 });
  }
}
