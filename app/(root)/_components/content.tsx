'use client'

import { Computer } from "@prisma/client"
import Link from "next/link"

type ContentProps = {
    computer: Computer[]  
}


export const ContentComponent = ({computer}: ContentProps) => {
    return(
<div className="flex flex-col min-h-screen">
      <header
        className="bg-cover bg-center text-white text-center py-20"
        style={{ backgroundImage: 'url(/bg.jpg)' }}
      >
        <h1 className="text-4xl font-bold">Selamat Datang di Computer App Store</h1>
        <p className="text-lg mt-4 mb-6">Temukan produk komputer terbaik yang Anda cari</p>
        <div className="p-5">
          <Link
            href="/dashboard"
            className="bg-white text-black py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Mulai Mengelola Produk
          </Link>
        </div>
      </header>

      <section className="bg-gray-100 py-10">
        <h2 className="text-3xl font-semibold text-center mb-8">Fitur Unggulan Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-10">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🖥️</div>
            <h3 className="font-semibold">Katalog Produk Lengkap</h3>
            <p className="text-xl">Temukan berbagai produk komputer, dari desktop hingga laptop, dengan spesifikasi yang sesuai kebutuhan Anda.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="font-semibold">Stok Terkini</h3>
            <p className="text-xl">Selalu up-to-date dengan stok produk terbaru untuk memastikan Anda mendapatkan apa yang Anda butuhkan.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="font-semibold">Analisis Produk</h3>
            <p className="text-xl">Dapatkan wawasan mendalam tentang performa produk dan tren penjualan untuk strategi bisnis yang lebih baik.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-10">
        <h2 className="text-3xl font-semibold text-center mb-8">Daftar Produk</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
          {computer.map((product) => (
            <div key={product.id_produk} className="text-center p-4 bg-white rounded-lg shadow-lg">
              <img
                src={product.gambar_produk} 
                alt={product.nama_produk}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold">{product.nama_produk}</h3>
              <p className="text-gray-500">{product.kategori}</p>
              <p className="text-xl font-bold mt-2">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 2,
                }).format(product.harga)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="w-full bg-gray-800 p-4 mt-auto">
        <div className="text-center text-white">
          <p>10122234 | I Dewa Nyoman Bayu Satria Wibawa | IF-06.</p>
        </div>
      </footer>
    </div>
    )
}
