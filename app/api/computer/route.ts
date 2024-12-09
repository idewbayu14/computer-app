import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { z } from 'zod';

const productSchema = z.object({
  nama_produk: z.string().min(1, "Nama produk tidak boleh kosong"),
  kategori: z.string().min(1, "Kategori tidak boleh kosong"),
  harga: z.number().min(1000, "Harga harus lebih dari 1000"),
  stok: z.number().min(0, "Stok tidak boleh kurang dari 0"),
  gambar_produk: z.string()
});

// Fungsi untuk menangani create (POST)
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = productSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: parsed.error.errors[0].message, status: 400 });
        }
        const computer = await db.computer.create({
            data: {
                nama_produk: body.nama_produk,
                kategori: body.kategori,
                harga: body.harga,
                stok: body.stok,
                gambar_produk: body.gambar_produk
            },
        });

        return NextResponse.json({message: "Create Success", status: 200})

    } catch (error) {
        return NextResponse.json({error: "Internal error", status : 500 });
    }

}

// Fungsi untuk menangani delete (DELETE)
export async function DELETE(req: Request) {
    try {
        const { id } = await req.json(); // Dapatkan id dari body request
        const computer = await db.computer.delete({
            where: { id_produk: id }, // Hapus data berdasarkan id
        });

        return NextResponse.json({ message: "Delete Success", status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete data", status: 500 });
    }
}