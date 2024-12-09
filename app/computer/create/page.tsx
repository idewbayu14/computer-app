import { UserButton } from "@clerk/nextjs"
import { Create } from "./_components/modal"

const CreateProduct = async () => {
    return (
        <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full bg-gray-800 p-4">
          <div className="flex justify-between items-center max-w-screen-xl mx-auto">
            <h1 className="text-white text-xl font-bold">My Computer Store</h1>
            <UserButton />
          </div>
        </header>
  
        {/* Main Content */}
        <main className="flex-grow max-w-screen-xl mx-auto mt-5 p-4">
          <Create/>
        </main>
  
        {/* Footer */}
        <footer className="w-full bg-gray-800 p-4">
          <div className="text-center text-white">
            <p>10122234 | I Dewa Nyoman Bayu Satria Wibawa | IF-06.</p>
          </div>
        </footer>
      </div>
    )
}

export default CreateProduct;