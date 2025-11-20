export default function Hero() {
  return (
    <section
      id="home"
      className="pt-28 pb-16 px-6 flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto"
    >
      {/* Kiri */}
      <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-rose-700">
          Positive Belajar, Gemilang Prestasi!
        </h1>
        <p className="text-gray-700 leading-relaxed">
          Jadilah bagian dari Bimbel Positive — tempat belajar modern yang
          membangun semangat, disiplin, dan prestasi akademik terbaik untuk
          masa depanmu.
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <button className="px-5 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition">
            Daftar Sekarang
          </button>
          <button className="px-5 py-3 border border-rose-600 text-rose-600 rounded-lg hover:bg-rose-600 hover:text-white transition">
            Get Paket
          </button>
        </div>
      </div>

      {/* Kanan */}
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <img
          src="https://cdn-icons-png.flaticon.com/512/201/201818.png"
          alt="Belajar"
          className="w-80 md:w-96"
        />
      </div>
    </section>
  );
}
