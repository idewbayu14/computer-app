import { UserButton } from "@clerk/nextjs"
import { Create } from "./_components/modal"

const CreateProduct = async () => {
    return (
        <div className="flex flex-col min-h-screen">
      <header className="w-full bg-gradient-to-r from-gray-800 to-gray-700 p-6">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <a href="/dashboard">
            <h1 className="text-white text-xl font-bold">My Computer Store</h1>
          </a>

          <div className="flex items-center ml-auto space-x-6">
            <a
              href="/computer"
              className="text-white hover:text-gray-200 hover:bg-gray-900 rounded-lg px-4 py-2 transition-all duration-300"
            >
              Tabel Produk
            </a>
            <a
              href="/dashboard"
              className="text-white hover:text-gray-200 hover:bg-gray-900 rounded-lg px-4 py-2 transition-all duration-300"
            >
              Dashboard
            </a>
            <a
              href="/rekap"
              className="text-white hover:text-gray-200 hover:bg-gray-900 rounded-lg px-4 py-2 transition-all duration-300"
            >
              Laporan
            </a>
            <UserButton />
          </div>
        </div>
      </header>
  
        <main className="flex-grow max-w-screen-xl mx-auto mt-5 p-4">
          <Create/>
        </main>
  
        <footer className="w-full bg-gray-800 p-4">
          <div className="text-center text-white">
            <p>10122234 | I Dewa Nyoman Bayu Satria Wibawa | IF-06.</p>
          </div>
        </footer>
      </div>
    )
}

export default CreateProduct;