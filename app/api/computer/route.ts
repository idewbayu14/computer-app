import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try{

        const computer = await db.computer.findMany()

        return NextResponse.json(computer)
    }catch(error){
        return NextResponse.json({message: "something went wrong", status: 200})
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
        const computer = await db.computer.delete({
            where: { id_produk: id }, 
        });

        return NextResponse.json({ message: "Delete Success", status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete data", status: 500 });
    }
}