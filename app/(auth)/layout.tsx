export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="flex items-center justify-center
        h-full bg-gradient-to-r from-gray-800 to-gray-700 p-6">
            {children}
        </div>
    )
  }