import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
      const data = await db.computer.findMany();
  
      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json({ message: "Something went wrong", status: 500 });
    }
  }

export async function POST(req: Request) {
    try {
        const body = await req.json();
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

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        
        if (!id) {
            return NextResponse.json({ error: "ID is required", status: 400 });
        }

        const computer = await db.computer.delete({
            where: { id_produk: id },
        });

        return NextResponse.json({ message: "Delete Success", status: 200 });
    } catch (error) {
        console.error('Delete Error:', error);
        return NextResponse.json({ error: "Failed to delete data", status: 500 });
    }
}