'use client'

import { UserButton } from "@clerk/nextjs"
import { Computer } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

type ContentProps = {
    computer: Computer[]  
}

export const ContentDashboard = ({computer}: ContentProps) => {
    return(
        <div className="flex flex-col min-h-screen">
    <header className="w-full bg-gradient-to-r from-gray-800 to-gray-700 p-6">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <Link href="/dashboard">
            <h1 className="text-white text-xl font-bold">My Computer Store</h1>
          </Link>

          <div className="flex items-center ml-auto space-x-6">
            <Link
              href="/computer"
              className="text-white hover:text-gray-200 hover:bg-gray-900 rounded-lg px-4 py-2 transition-all duration-300"
            >
              Tabel Produk
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:text-gray-200 hover:bg-gray-900 rounded-lg px-4 py-2 transition-all duration-300"
            >
              Dashboard
            </Link>
            <Link
              href="/rekap"
              className="text-white hover:text-gray-200 hover:bg-gray-900 rounded-lg px-4 py-2 transition-all duration-300"
            >
              Laporan
            </Link>
            <UserButton />
          </div>
        </div>
      </header>

    <header
      className="bg-cover bg-center text-white text-center py-20"
      style={{ backgroundImage: 'url(/bg.jpg)' }}
    >
      <h1 className="text-4xl font-bold">Selamat Datang di Dashboard</h1>
      <p className="text-lg mt-4 mb-6">Kelola dan monitor produk Anda dengan mudah di sini</p>
    </header>

    <section className="bg-gray-100 py-10">
      <h2 className="text-3xl font-semibold text-center mb-8">Solusi Komputer dan Aksesoris Terlengkap</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-10">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="text-4xl mb-4">🖥️</div>
          <h3 className="font-semibold">Komponen Komputer</h3>
          <p className="text-xl">Tersedia berbagai komponen untuk merakit dan memperbaiki komputer</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="text-4xl mb-4">🖱️</div>
          <h3 className="font-semibold">Aksesoris Komputer</h3>
          <p className="text-xl">Aksesoris terkini untuk meningkatkan pengalaman komputer</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="font-semibold">Kemudahan Mengelola Data</h3>
          <p className="text-xl">Solusi aplikasi manajemen data yang memudahkan pekerjaan</p>
        </div>
      </div>
    </section>


    <section className="bg-gray-200 py-10">
      <h2 className="text-3xl font-semibold text-center mb-8">Daftar Produk Anda</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
        {computer.map((product) => (
          <div key={product.id_produk} className="text-center p-4 bg-white rounded-lg shadow-lg">
            <Image
              src={product.gambar_produk} 
              alt={product.nama_produk}
              className="w-full h-48 object-cover rounded-lg mb-4"
              width={500} height={500}
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

    <section className="bg-gradient-to-r from-gray-500 to-gray-700 text-white py-10 mt-10">
      <h2 className="text-3xl font-semibold text-center mb-4">Kelola Produk Anda Sekarang!</h2>
      <p className="text-lg text-center mb-6">Tambah atau edit produk Anda di toko dengan mudah dan cepat.</p>
      <div className="text-center">
        <Link
          href="/computer"
          className="bg-white text-black py-2 px-6 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-200"
        >
          Tambah Produk Baru
        </Link>
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