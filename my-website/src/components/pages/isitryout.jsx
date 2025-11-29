import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import NavigasiSiswa from '../common/navigasisiswa';

const IsiTryout = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simulasi Fetch Data dengan Kunci Jawaban (correctAnswer)
    const fetchSoal = () => {
      const mockData = Array.from({ length: 15 }, (_, i) => ({
        id_soal: `q-${i + 1}`,
        question_text: `Soal Nomor ${i + 1}: Urutan jalannya peredaran darah kecil yang benar adalah...`,
        correctAnswer: i % 2 === 0 ? 'A' : 'C', // Simulasi Kunci Jawaban (Genap: A, Ganjil: C)
        options: [
          { key: 'A', value: 'Jantung → seluruh tubuh → jantung' },
          { key: 'B', value: 'Jantung → paru-paru → jantung' },
          { key: 'C', value: 'Paru-paru → jantung → seluruh tubuh' },
          { key: 'D', value: 'Seluruh tubuh → jantung → paru-paru' },
        ]
      }));

      setQuestions(mockData);
      setLoading(false);
    };

    fetchSoal();
  }, [id]);

  // --- Handlers ---
  const handleOptionClick = (key) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: key }));
  };

  const handleClearAnswer = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestionIndex];
    setAnswers(newAnswers);
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1);
  };

  // --- LOGIC HITUNG NILAI (BACKEND SIMULATION) ---
  const handleSubmitFinal = () => {
    setShowModal(false);

    let totalCorrect = 0;
    let totalWrong = 0;
    let totalEmpty = 0;

    questions.forEach((q, index) => {
      const userAnswer = answers[index];
      
      if (!userAnswer) {
        totalEmpty++;
      } else if (userAnswer === q.correctAnswer) {
        totalCorrect++;
      } else {
        totalWrong++;
      }
    });

    // Hitung Skor (Skala 0-100)
    const score = (totalCorrect / questions.length) * 100;

    // Redirect ke Halaman Hasil dengan membawa Data
    navigate('/hasil-tryout', {
      state: {
        totalCorrect,
        totalWrong,
        totalEmpty,
        score
      }
    });
  };

  const totalSoal = questions.length;
  const filledAnswers = Object.keys(answers).length;
  const emptyAnswers = totalSoal - filledAnswers;

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Soal...</div>;

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-gray-800 relative">
      <NavigasiSiswa />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-24">
        <h1 className="text-xl font-bold text-gray-500 mb-6 border-b pb-4">
          Tryout {id} Ilmu Pengetahuan Alam - Peredaran Darah
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
             <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-4 flex-wrap">
                <div className="bg-white border border-red-300 rounded-md px-4 py-2 text-center min-w-[100px] shadow-sm">
                  <p className="text-xs font-bold text-red-500">Waktu :</p>
                  <p className="text-sm font-bold text-red-600">00:30:00</p>
                </div>
                <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-center min-w-[100px] shadow-sm">
                  <p className="text-xs font-bold text-gray-600">Total Soal :</p>
                  <p className="text-sm font-bold text-gray-800">{totalSoal}</p>
                </div>
                <div className="bg-white border border-green-300 rounded-md px-4 py-2 text-center min-w-[100px] shadow-sm">
                  <p className="text-xs font-bold text-gray-600">Jawaban Terisi :</p>
                  <p className="text-sm font-bold text-green-600">{filledAnswers}</p>
                </div>
                <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-center min-w-[100px] shadow-sm">
                  <p className="text-xs font-bold text-gray-600">Jawaban Kosong :</p>
                  <p className="text-sm font-bold text-red-500">{emptyAnswers}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={handlePrev}
                  className="bg-white border border-[#74151e] rounded p-1 text-[#74151e] hover:bg-red-50 disabled:opacity-50"
                  disabled={currentQuestionIndex === 0}
                >
                  <ChevronLeft size={24} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={handleNext}
                  className="bg-white border border-[#74151e] rounded p-1 text-[#74151e] hover:bg-red-50 disabled:opacity-50"
                  disabled={currentQuestionIndex === totalSoal - 1}
                >
                  <ChevronRight size={24} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-8 shadow-sm min-h-[200px]">
              <h2 className="text-lg font-bold mb-4">Soal {currentQuestionIndex + 1}</h2>
              <p className="text-gray-600 text-base leading-relaxed">
                {questions[currentQuestionIndex].question_text}
              </p>
            </div>

            <div className="space-y-4">
              {questions[currentQuestionIndex].options.map((opt) => {
                const isSelected = answers[currentQuestionIndex] === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleOptionClick(opt.key)}
                    className={`w-full text-left bg-white border rounded-lg p-4 flex items-center gap-4 transition-all ${
                      isSelected ? 'border-[#74151e] bg-red-50/10' : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[#74151e]' : 'border-red-300'
                    }`}>
                      {isSelected && <div className="w-3 h-3 bg-[#74151e] rounded-full" />}
                    </div>
                    <span className="text-gray-700 text-sm font-medium">
                      {opt.key}. {opt.value}
                    </span>
                  </button>
                );
              })}
            </div>

            <div>
              <button 
                onClick={handleClearAnswer}
                className="px-6 py-2 border border-[#74151e] text-[#74151e] rounded-md font-bold text-sm hover:bg-red-50 transition-colors"
              >
                Hapus Jawaban
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28"> 
              <div className="grid grid-cols-5 gap-2 mb-8">
                {questions.map((_, index) => {
                  const isActive = index === currentQuestionIndex;
                  const isAnswered = answers[index] !== undefined;
                  
                  let buttonClass = "bg-white border border-red-200 text-gray-700 hover:bg-gray-50"; 
                  if (isActive) buttonClass = "bg-gray-300 border-gray-400 text-gray-800"; 
                  else if (isAnswered) buttonClass = "bg-[#74151e] border-[#74151e] text-white"; 

                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`aspect-square rounded flex items-center justify-center text-sm font-bold transition-colors shadow-sm ${buttonClass}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => setShowModal(true)}
                className="w-full bg-[#74151e] text-white py-3 rounded-md font-bold text-sm hover:bg-[#5a1017] transition-colors shadow-sm"
              >
                Kirim Jawaban
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 pb-0">
              <h3 className="text-lg font-bold text-gray-800">Konfirmasi Submit Jawaban</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 pt-4">
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Setelah Anda submit, jawaban yang sudah diisi tidak bisa diubah lagi.
                <br /><br />
                Apakah Anda ingin melanjutkan?
              </p>
              <div className="flex gap-4 justify-end">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 rounded-md border border-[#74151e] text-[#74151e] font-bold text-sm hover:bg-red-50 transition-colors w-full sm:w-auto"
                >
                  Batal
                </button>
                <button 
                  onClick={handleSubmitFinal}
                  className="px-6 py-2.5 rounded-md bg-[#74151e] text-white font-bold text-sm hover:bg-[#5a1017] transition-colors w-full sm:w-auto shadow-md"
                >
                  Kirim Jawaban
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IsiTryout;