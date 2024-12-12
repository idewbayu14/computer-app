import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { id: string} } 
) {
    try {
        const { id } = params;
        const body = await req.json();
        const { nama_produk, kategori, harga, stok, gambar_produk } = body;
        
        if (!id) {
            return NextResponse.json({ error: "ID produk tidak boleh kosong" }, { status: 400 })
        } 
        if (!nama_produk) {
            return NextResponse.json({ error: "Nama Produk tidak boleh kosong" }, { status: 400 })
        } 
        if (!kategori) {
            return NextResponse.json({ error: "Kategori tidak boleh kosong" }, { status: 400 })
        } 
        if (!harga) {
            return NextResponse.json({ error: "Harga tidak boleh kosong" }, { status: 400 })
        } 
        if (!stok) {
            return NextResponse.json({ error: "Stok tidak boleh kosong" }, { status: 400 })
        } 
        if (!gambar_produk) {
            return NextResponse.json({ error: "Gambar harus diupload" }, { status: 400 })
        } 

        const computerById = await db.computer.findFirst({
            where: {
                id_produk: id
            }
        });

        if (!computerById) {
            return NextResponse.json({ error: "Produk tidak ditemukan" }, { status:400})
        }

        const computer = await db.computer.update({
            where: {
                id_produk: id
            }, 
            data: {
                nama_produk,
                kategori,
                harga,
                stok,
                gambar_produk,
            }
        })
        return NextResponse.json(computer, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 404 })
    }
}

