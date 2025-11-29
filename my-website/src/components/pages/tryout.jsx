import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, ChevronUp, CheckCircle, XCircle, User, Calendar, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import NavigasiSiswa from '../common/navigasisiswa';

const Tryout = () => {
  
  const navigate = useNavigate(); 

  // =========================================
  // 1. STATE MANAGEMENT
  // =========================================
  const [activeTab, setActiveTab] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMateri, setSelectedMateri] = useState('Pilihan Materi');
  const [selectedTopik, setSelectedTopik] = useState('Pilihan Topik');

  const [isMateriOpen, setIsMateriOpen] = useState(false);
  const [isTopikOpen, setIsTopikOpen] = useState(false);
  
  const materiRef = useRef(null);
  const topikRef = useRef(null);

  // =========================================
  // 2. DUMMY DATA (SIMULASI DB)
  // =========================================
  const allTryouts = [
    {
      id: 1,
      title: 'Tryout 1 Matematika Dasar',
      materi: 'Matematika', 
      topic: 'Aljabar',     
      status: 'active',     
      correct: 0, wrong: 0, score: 0,
      author: 'Paramitha',
      duration: '10 Okt - 17 Okt 2025',
      questions: 60
    },
    {
      id: 2,
      title: 'Tryout Bahasa Indonesia - Ejaan',
      materi: 'Bahasa Indonesia',
      topic: 'Ejaan',
      status: 'upcoming',   
      correct: 0, wrong: 0, score: 0,
      author: 'Budi Santoso',
      duration: '20 Okt - 25 Okt 2025',
      questions: 50
    },
    {
      id: 3,
      title: 'Evaluasi Geografi - Peta',
      materi: 'Geografi',
      topic: 'Peta',
      status: 'finished',   
      correct: 40, wrong: 10, score: 80,
      author: 'Dr. Geofisika',
      duration: '01 Okt - 05 Okt 2025',
      questions: 50
    },
    {
      id: 4,
      title: 'Latihan Paragraf Bahasa Indonesia',
      materi: 'Bahasa Indonesia',
      topic: 'Paragraf',
      status: 'active',
      correct: 0, wrong: 0, score: 0,
      author: 'Siti Aminah',
      duration: '12 Okt - 19 Okt 2025',
      questions: 45
    },
    {
      id: 5,
      title: 'Structure & Written Expression',
      materi: 'Bahasa Inggris',
      topic: 'Grammar',
      status: 'finished',
      correct: 10, wrong: 50, score: 20,
      author: 'Mr. John',
      duration: '05 Sep - 10 Sep 2025',
      questions: 60
    },
  ];

  const materiOptions = ['Bahasa Indonesia', 'Bahasa Inggris', 'Geografi', 'Matematika'];
  const topikOptions = ['Ejaan', 'Paragraf', 'Kalimat Sempurna', 'Peta', 'Aljabar', 'Grammar'];
  const tabs = ['Semua', 'Sedang Berlangsung', 'Akan Berlangsung', 'Selesai'];

  // =========================================
  // 3. LOGIC FILTERING
  // =========================================
  const filteredTryouts = allTryouts.filter((item) => {
    let statusMatch = true;
    if (activeTab === 'Sedang Berlangsung') statusMatch = item.status === 'active';
    else if (activeTab === 'Akan Berlangsung') statusMatch = item.status === 'upcoming';
    else if (activeTab === 'Selesai') statusMatch = item.status === 'finished';

    const materiMatch = selectedMateri === 'Pilihan Materi' || item.materi === selectedMateri;
    const topikMatch = selectedTopik === 'Pilihan Topik' || item.topic === selectedTopik;
    const searchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

    return statusMatch && materiMatch && topikMatch && searchMatch;
  });

  // =========================================
  // 4. EVENT HANDLERS
  // =========================================
  
  // Navigate ke Halaman Mengerjakan Soal
  const handleKerjakanSoal = (id) => {
    navigate(`/isi-tryout/${id}`);
  };

  // Navigate ke Halaman Pembahasan
  const handleLihatPembahasan = (id) => {
    navigate(`/pembahasan-tryout/${id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log("Searching for:", e.target.value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (materiRef.current && !materiRef.current.contains(event.target)) setIsMateriOpen(false);
      if (topikRef.current && !topikRef.current.contains(event.target)) setIsTopikOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // =========================================
  // 5. RENDER UI
  // =========================================
  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-gray-800">
      <NavigasiSiswa />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-24">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 z-20 relative">
          <div className="flex flex-wrap gap-4 items-center">
            
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Materi :</span>
              <div className="relative" ref={materiRef}>
                <button 
                  onClick={() => setIsMateriOpen(!isMateriOpen)}
                  className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm flex items-center gap-8 min-w-[180px] justify-between shadow-sm hover:bg-gray-50"
                >
                  <span className="truncate">{selectedMateri}</span>
                  {isMateriOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {isMateriOpen && (
                  <div className="absolute z-30 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg font-medium max-h-60 overflow-y-auto">
                    <button 
                      onClick={() => { setSelectedMateri('Pilihan Materi'); setIsMateriOpen(false); }}
                      className="block w-full text-left px-4 py-2.5 text-gray-500 hover:bg-gray-100"
                    >
                      Semua Materi
                    </button>
                    {materiOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => { setSelectedMateri(option); setIsMateriOpen(false); }}
                        className="block w-full text-left px-4 py-2.5 hover:bg-gray-100"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">Topik :</span>
              <div className="relative" ref={topikRef}>
                <button 
                  onClick={() => setIsTopikOpen(!isTopikOpen)}
                  className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm flex items-center gap-8 min-w-[180px] justify-between shadow-sm hover:bg-gray-50"
                >
                  <span className="truncate">{selectedTopik}</span>
                  {isTopikOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {isTopikOpen && (
                  <div className="absolute z-30 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg font-medium max-h-60 overflow-y-auto">
                    <button 
                      onClick={() => { setSelectedTopik('Pilihan Topik'); setIsTopikOpen(false); }}
                      className="block w-full text-left px-4 py-2.5 text-gray-500 hover:bg-gray-100"
                    >
                      Semua Topik
                    </button>
                    {topikOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => { setSelectedTopik(option); setIsTopikOpen(false); }}
                        className="block w-full text-left px-4 py-2.5 hover:bg-gray-100"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative w-full lg:w-auto flex items-center z-10">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari tryout lalu tekan Enter..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#74151e] shadow-sm transition-all"
              />
              <button className="absolute right-1 top-1 bottom-1 px-4 bg-[#74151e] text-white text-xs font-semibold rounded hover:bg-[#5a1017] transition-colors">
                Cari
              </button>
            </div>
          </div>
        </div>

        {/* --- TABS --- */}
        <div className="bg-gray-200/50 p-1 rounded-lg inline-flex w-full mb-8 border border-gray-300 relative z-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                activeTab === tab
                  ? 'bg-[#E6E6FA] text-gray-800 shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredTryouts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-0">
            {filteredTryouts.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold uppercase tracking-wide">
                    {item.materi}
                  </span>
                </div>
                
                <hr className="border-gray-200 mb-4" />

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2 border border-gray-200 rounded px-3 py-1.5 text-xs">
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="font-medium">Benar : {item.correct}</span>
                  </div>
                  <div className="flex items-center gap-2 border border-gray-200 rounded px-3 py-1.5 text-xs">
                    <XCircle size={16} className="text-red-500" />
                    <span className="font-medium">Salah : {item.wrong}</span>
                  </div>
                  <div className="flex items-center gap-2 border border-gray-200 rounded px-3 py-1.5 text-xs">
                    <span className="font-medium">Skor : {item.score}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-gray-400" />
                    <span className="font-semibold min-w-[60px]">Penulis</span>
                    <span>: {item.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-gray-400" />
                    <span className="font-semibold min-w-[60px]">Durasi</span>
                    <span>: {item.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-gray-400" />
                    <span className="font-semibold min-w-[60px]">Jumlah</span>
                    <span>: {item.questions} Soal</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {item.status === 'active' || item.status === 'upcoming' ? (
                    <>
                      <button className="py-2.5 px-4 rounded-md border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50">
                        Lihat Pembahasan
                      </button>
                      <button 
                        disabled={item.status === 'upcoming'}
                        onClick={() => handleKerjakanSoal(item.id)} 
                        className={`py-2.5 px-4 rounded-md text-white text-sm font-semibold transition-colors ${
                          item.status === 'upcoming' 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-[#74151e] hover:bg-[#5a1017]'
                        }`}
                      >
                        {item.status === 'upcoming' ? 'Belum Mulai' : 'Kerjakan Soal'}
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => handleLihatPembahasan(item.id)}
                        className="py-2.5 px-4 rounded-md border border-[#74151e] text-[#74151e] text-sm font-semibold hover:bg-red-50"
                      >
                        Lihat Pembahasan
                      </button>
                      <button className="py-2.5 px-4 rounded-md bg-gray-300 text-white text-sm font-semibold cursor-not-allowed">
                        Selesai
                      </button>
                    </>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
  
          <div className="flex flex-col items-center justify-center py-20">
            <img 
              src="/hourglass.png" 
              alt="Empty State" 
              className="w-48 h-48 object-contain mb-6 opacity-80"
            />
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              Oops Tidak Ada Tryout Saat Ini.
            </h3>
            <p className="text-gray-400 text-sm text-center max-w-md leading-relaxed">
              Tidak ada tryout yang aktif atau terbuka saat ini.
              <br />
              Harap tunggu jadwal selanjutnya.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Tryout;