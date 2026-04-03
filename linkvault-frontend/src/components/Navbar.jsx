export default function Navbar({ onLogout }) {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">🔗 LinkVault</h1>
      <button
        onClick={onLogout}
        className="text-sm text-gray-500 hover:text-red-500 transition"
      >
        Logout
      </button>
    </nav>
  )
}