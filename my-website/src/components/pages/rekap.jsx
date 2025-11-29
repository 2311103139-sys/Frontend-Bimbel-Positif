import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { ChevronDown, ChevronUp } from 'lucide-react';
import NavigasiSiswa from '../common/navigasisiswa';

const Rekap = () => {
  // =========================================
  // 1. STATE MANAGEMENT
  // =========================================
  const [loading, setLoading] = useState(true);
  const [expandedSubject, setExpandedSubject] = useState(1); // ID subject yg terbuka default
  
  // State untuk menampung data dari Backend
  const [chartData, setChartData] = useState({ pie: [], line: [] });
  const [subjectDetails, setSubjectDetails] = useState([]);

  // =========================================
  // 2. SIMULASI FETCH DATA (BACKEND INTEGRATION)
  // =========================================
  useEffect(() => {
    // Tugas Backend: Buat API endpoint (misal: GET /api/student/rekap)
    // yang mengembalikan JSON dengan struktur persis seperti 'mockResponse' di bawah ini.
    
    const fetchData = () => {
      const mockResponse = {
        // Data untuk Grafik Atas
        charts: {
          pie: [
            { name: 'Matematika', value: 30, color: '#4A1015' }, 
            { name: 'Bahasa Indonesia', value: 25, color: '#8B5E3C' },
            { name: 'Biologi', value: 20, color: '#C0564C' },
            { name: 'Fisika', value: 15, color: '#E6DCC3' }, 
            { name: 'Bahasa Inggris', value: 10, color: '#D9D9D9' },
          ],
          line: [
            { name: 'Matematika', hadir: 9, tidakHadir: 1 },
            { name: 'B. Indo', hadir: 10, tidakHadir: 0 }, 
            { name: 'B. Ing', hadir: 9, tidakHadir: 1 },
            { name: 'Biologi', hadir: 8, tidakHadir: 2 },
            { name: 'Fisika', hadir: 6, tidakHadir: 4 },
          ]
        },
        // Data untuk Accordion Detail Bawah
        details: [
          {
            id: 1,
            subject_name: 'Matematika',
            attendance_ratio: '9/10',
            average_score: '95.00',
            history: [
              { week: 'Minggu Ke 1', topic: 'Persamaan Linier', status: 'Hadir', score: '90.00/100' },
              { week: 'Minggu Ke 2', topic: 'Rasional Integral', status: 'Hadir', score: '65.75/100' },
              { week: 'Minggu Ke 3', topic: 'Bangun Datar dan Ruang', status: 'Tidak Hadir', score: '80.50/100' },
              { week: 'Minggu Ke 4', topic: 'Konversi Matrix', status: 'Hadir', score: '100/100' },
            ]
          },
          {
            id: 2,
            subject_name: 'Bahasa Indonesia',
            attendance_ratio: '10/10',
            average_score: '85.00',
            history: [
              { week: 'Minggu Ke 1', topic: 'Puisi Lama', status: 'Hadir', score: '85.00/100' },
              { week: 'Minggu Ke 2', topic: 'Teks Eksposisi', status: 'Hadir', score: '85.00/100' },
            ]
          },
          {
            id: 3,
            subject_name: 'Bahasa Inggris',
            attendance_ratio: '10/10',
            average_score: '85.00',
            history: [
              { week: 'Minggu Ke 1', topic: 'Tenses', status: 'Hadir', score: '88.00/100' },
              { week: 'Minggu Ke 2', topic: 'Narrative Text', status: 'Hadir', score: '82.00/100' },
            ]
          },
        ]
      };

      // Set data ke state
      setChartData(mockResponse.charts);
      setSubjectDetails(mockResponse.details);
      setLoading(false);
    };

    // Simulasi delay network
    setTimeout(fetchData, 1000); 
  }, []);

  const toggleAccordion = (id) => {
    setExpandedSubject(expandedSubject === id ? null : id);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Memuat Data Rekap...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-gray-800">
      <NavigasiSiswa />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#4A1015] px-6 py-3">
              <h3 className="text-white font-semibold text-sm">Rata-rata Keseluruhan Mapel</h3>
            </div>
            <div className="p-6 flex flex-col sm:flex-row items-center justify-center gap-8">
              <div className="w-48 h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.pie}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.pie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-2">
                {chartData.pie.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs font-medium text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#4A1015] px-6 py-3">
              <h3 className="text-white font-semibold text-sm">Grafik Rekap Keseluruhan Absensi</h3>
            </div>
            <div className="p-6">
              <div className="h-48 w-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData.line} margin={{ top: 5, right: 20, bottom: 5, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}
                      itemStyle={{ fontSize: '12px' }}
                    />
                    <Legend 
                      verticalAlign="middle" 
                      align="right" 
                      layout="vertical"
                      iconType="plainline"
                      wrapperStyle={{ paddingLeft: '20px' }}
                    />
                    <Line type="monotone" dataKey="hadir" name="Hadir" stroke="#74151e" strokeWidth={2} dot={{ r: 4, fill: '#74151e' }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="tidakHadir" name="Tidak Hadir" stroke="#C0564C" strokeWidth={2} dot={{ r: 4, fill: '#C0564C' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>

        <div className="bg-[#4A1015] w-full h-12 rounded-sm mb-6"></div>

        <div className="space-y-6">
          {subjectDetails.map((subject) => {
            const isOpen = expandedSubject === subject.id;

            return (
              <div key={subject.id} className="bg-white rounded-lg border border-red-100 shadow-sm overflow-hidden transition-all duration-300">
                
                <button 
                  onClick={() => toggleAccordion(subject.id)}
                  className="w-full flex justify-between items-start sm:items-center p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-[#74151e]">{subject.subject_name}</h3>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-8 text-xs font-semibold text-gray-700">
                      <span>Total Kehadiran <span className="ml-2">: {subject.attendance_ratio}</span></span>
                      <span>Rata-rata Nilai <span className="ml-2">: {subject.average_score}</span></span>
                    </div>
                  </div>
                  <div className="text-gray-500">
                    {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                    <hr className="border-gray-100 mb-6" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs font-bold text-gray-800 mb-4 px-2">
                      <div className="sm:col-span-4">Minggu Ke -</div>
                      <div className="sm:col-span-4 text-left sm:text-center">Absensi</div>
                      <div className="sm:col-span-4 text-left sm:text-right">Nilai Tryout</div>
                    </div>

                    <div className="space-y-4">
                      {subject.history.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs text-gray-600 border-b border-gray-100 pb-3 last:border-0 items-center px-2">
                          
                          <div className="sm:col-span-4">
                            <span className="font-semibold text-gray-800">{item.week}</span> 
                            <span className="mx-1">-</span> 
                            {item.topic}
                          </div>

                          <div className="sm:col-span-4 flex justify-start sm:justify-center">
                            <span className={`px-6 py-1 rounded-full text-[10px] font-bold ${
                              item.status === 'Hadir' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-red-100 text-red-600'
                            }`}>
                              {item.status}
                            </span>
                          </div>

                          <div className="sm:col-span-4 text-left sm:text-right font-semibold text-gray-800">
                            {item.score}
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Rekap;