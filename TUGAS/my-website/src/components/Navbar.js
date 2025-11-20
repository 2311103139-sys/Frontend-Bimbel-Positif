export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <div className="text-2xl font-bold text-rose-700">Bimbel Positive</div>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li><a href="#home" className="hover:text-rose-600">Home</a></li>
          <li><a href="#features" className="hover:text-rose-600">Fitur</a></li>
          <li><a href="#paket" className="hover:text-rose-600">Paket</a></li>
          <li><a href="#testimoni" className="hover:text-rose-600">Testimoni</a></li>
          <li><a href="#kontak" className="hover:text-rose-600">Kontak</a></li>
        </ul>

        {/* Tombol Aksi */}
        <div className="hidden md:flex space-x-3">
          <button className="px-4 py-2 border border-rose-600 rounded-lg text-rose-600 hover:bg-rose-600 hover:text-white transition">
            Masuk
          </button>
          <button className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition">
            Daftar
          </button>
        </div>

        {/* Menu Mobile */}
        <button className="md:hidden p-2 text-rose-700 border rounded-lg">
          ☰
        </button>
      </div>
    </nav>
  );
}
