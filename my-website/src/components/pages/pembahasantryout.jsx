import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import NavigasiSiswa from '../common/navigasisiswa';

const PembahasanTryout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // =========================================
  // SIMULASI BACKEND (GET REVIEW DATA)
  // =========================================
  useEffect(() => {
    // Backend harus mengirim data: Soal, Opsi, Jawaban User, Kunci Jawaban, dan Penjelasan
    const fetchPembahasan = () => {
      const mockData = Array.from({ length: 15 }, (_, i) => ({
        id_soal: `q-${i + 1}`,
        question_text: `Soal Nomor ${i + 1}: Urutan jalannya peredaran darah kecil yang benar adalah...`,
        
        // Data Kunci & Jawaban User (Simulasi)
        correct_answer: 'B',      
        user_answer: i === 0 ? 'A' : 'B', 
        
        options: [
          { key: 'A', value: 'Jantung → seluruh tubuh → jantung' },
          { key: 'B', value: 'Jantung → paru-paru → jantung' },
          { key: 'C', value: 'Paru-paru → jantung → seluruh tubuh' },
          { key: 'D', value: 'Seluruh tubuh → jantung → paru-paru' },
        ],
        
        // Data Pembahasan
        discussion: {
          text: "Jawaban yang benar adalah B. Jantung → paru-paru → jantung, karena urutan ini menggambarkan peredaran darah kecil (sirkulasi pulmonal). Darah dari bilik kanan dipompa ke paru-paru melalui arteri pulmonalis, melepaskan CO2 dan mengambil O2.",
          image_url: "https://example.com/diagram-jantung.png" 
        }
      }));

      setQuestions(mockData);
      setLoading(false);
    };

    fetchPembahasan();
  }, [id]);

  // Navigasi Next/Prev
  const handlePrev = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Pembahasan...</div>;

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-gray-800">
      <NavigasiSiswa />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-24">
        <h1 className="text-xl font-bold text-gray-500 mb-6 border-b pb-4">
          Pembahasan Tryout {id}
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4">
                 <div className="bg-white border border-gray-300 rounded px-4 py-2 text-sm font-bold text-gray-600 shadow-sm">
                    Status: Selesai
                 </div>
              </div>
              <div className="flex gap-2">
                <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="bg-white border border-[#74151e] rounded p-1 text-[#74151e] disabled:opacity-50 hover:bg-red-50">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1} className="bg-white border border-[#74151e] rounded p-1 text-[#74151e] disabled:opacity-50 hover:bg-red-50">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-sm">
              <h2 className="text-lg font-bold mb-4">Soal {currentQuestionIndex + 1}</h2>
              <p className="text-gray-600 text-base leading-relaxed">
                {currentQ.question_text}
              </p>
            </div>
            <div className="space-y-4">
              {currentQ.options.map((opt) => {
                const isCorrectAnswer = opt.key === currentQ.correct_answer;
                const isUserAnswer = opt.key === currentQ.user_answer;
                const isWrongUserAnswer = isUserAnswer && !isCorrectAnswer;

                let containerClass = "border-gray-300 bg-white";
                let icon = null;

                // Logika Styling
                if (isCorrectAnswer) {
                  // Kunci Jawaban (Selalu Hijau)
                  containerClass = "border-green-500 bg-green-50";
                  icon = <Check className="text-green-600" size={20} />;
                } else if (isWrongUserAnswer) {
                  // Jawaban Salah User (Merah)
                  containerClass = "border-red-500 bg-red-50";
                  icon = <X className="text-red-600" size={20} />;
                }

                return (
                  <div
                    key={opt.key}
                    className={`w-full text-left border rounded-lg p-4 flex items-center justify-between transition-all ${containerClass}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isCorrectAnswer ? 'border-green-600' : (isWrongUserAnswer ? 'border-red-600' : 'border-gray-300')
                      }`}>
                        {(isUserAnswer || isCorrectAnswer) && (
                          <div className={`w-3 h-3 rounded-full ${
                             isCorrectAnswer ? 'bg-green-600' : (isWrongUserAnswer ? 'bg-red-600' : 'bg-transparent')
                          }`} />
                        )}
                      </div>
                      <span className="text-gray-700 text-sm font-medium">
                        {opt.key}. {opt.value}
                      </span>
                    </div>
                    {icon}
                  </div>
                );
              })}
            </div>
            <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-sm mt-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Pembahasan :</h3>
              {currentQ.discussion.image_url && (
                <div className="mb-4">
                                    </div>
              )}
              <div className="text-sm text-gray-600 leading-relaxed space-y-2 text-justify">
                <p>{currentQ.discussion.text}</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Darah dari jantung bagian kanan dipompa ke paru-paru melalui arteri pulmonalis.</li>
                  <li>Di paru-paru terjadi pertukaran gas CO2 dan O2.</li>
                  <li>Darah kaya O2 kembali ke serambi kiri jantung.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-28"> 
              <div className="grid grid-cols-5 gap-2 mb-8">
                {questions.map((q, index) => {
                  
                  const isCorrect = q.user_answer === q.correct_answer;
                  const isActive = index === currentQuestionIndex;
                  
                  let gridClass = isCorrect 
                    ? "bg-white border-green-500 text-green-600" 
                    : "bg-white border-red-500 text-red-600";

                  if (isActive) gridClass += " ring-2 ring-gray-400";

                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`aspect-square border rounded flex items-center justify-center text-sm font-bold shadow-sm ${gridClass}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              <button disabled className="w-full bg-gray-400 text-white py-3 rounded-md font-bold text-sm cursor-not-allowed">
                Kirim Jawaban
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PembahasanTryout;