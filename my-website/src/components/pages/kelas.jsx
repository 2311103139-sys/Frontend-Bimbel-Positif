import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavigasiSiswa from '../common/navigasisiswa';
import Footer from '../common/footer';
// import api from '../../api'; // 

const MaterialItem = ({ type, title, onClick, isDiscussionOpen, onDiscussionToggle }) => {
    let icon;
    let borderColor;
    let btnColor;
    let label;

    if (type === 'video') {
        icon = (
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
        );
        borderColor = "border-blue-100 hover:border-blue-300";
        btnColor = "bg-blue-600 hover:bg-blue-700 text-white";
        label = "Video Pembelajaran";
    } else if (type === 'pdf') {
        icon = (
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
        );
        borderColor = "border-red-100 hover:border-red-300";
        btnColor = "bg-red-600 hover:bg-red-700 text-white";
        label = "Materi Bacaan (PDF)";
    } else { 
        icon = (
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.772-1.154m-4.044-2.434C3.208 16.33 3 16.036 3 15.659V9a2 2 0 012-2h6a2 2 0 012 2v3.659c0 .376-.208.67-.816.753l.016.008a2.98 2.98 0 00.957 2.213l-.957.973" /></svg>
            </div>
        );
        borderColor = "border-green-100 hover:border-green-300";
        btnColor = "bg-green-600 hover:bg-green-700 text-white";
        label = "Forum Diskusi";
    }

    return (
        <div className={`border rounded-xl mb-4 overflow-hidden transition-all duration-300 ${borderColor} bg-white shadow-sm`}>
            <div className="flex items-center gap-4 p-5">
                {icon}
                <div className="flex-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                    <h5 className="font-bold text-lg text-gray-800">{title}</h5>
                </div>
                
                {type === 'diskusi' ? (
                    <button 
                        onClick={onDiscussionToggle}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-colors ${btnColor}`}
                    >
                        {isDiscussionOpen ? "Tutup Diskusi" : "Buka Diskusi"}
                    </button>
                ) : (
                    <button 
                        onClick={onClick}
                        className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-colors ${btnColor}`}
                    >
                        Buka
                    </button>
                )}
            </div>

            {type === 'diskusi' && isDiscussionOpen && (
                <div className="bg-gray-50 border-t border-gray-100 p-5 animate-fade-in-up">
                    <div className="space-y-4 mb-4 max-h-60 overflow-y-auto pr-2">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-200 flex-shrink-0"></div>
                            <div className="bg-white p-3 rounded-r-xl rounded-bl-xl shadow-sm border border-gray-200 text-sm">
                                <p className="font-bold text-gray-800 text-xs mb-1">Budi Santoso</p>
                                <p className="text-gray-600">Kak, untuk soal nomor 5 apakah pakai rumus ABC?</p>
                            </div>
                        </div>
                        <div className="flex gap-3 flex-row-reverse">
                            <div className="w-8 h-8 rounded-full bg-brand-light-bg flex-shrink-0 border border-brand-dark"></div>
                            <div className="bg-brand-dark text-white p-3 rounded-l-xl rounded-br-xl shadow-sm text-sm">
                                <p className="font-bold text-white/80 text-xs mb-1">Mentor</p>
                                <p>Betul Budi, tapi bisa juga difaktorkan biasa ya.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            placeholder="Tulis pertanyaan atau diskusi..." 
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-brand-dark focus:ring-1 focus:ring-brand-dark"
                        />
                        <button className="px-6 py-3 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-dark-accent transition-colors">
                            Kirim
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function Kelas() {
    
    // --- STATE ---
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openWeekId, setOpenWeekId] = useState(1); 
    const [openDiscussionId, setOpenDiscussionId] = useState(null);
    const { id } = useParams();

    const toggleWeek = (id) => {
        setOpenWeekId(prevId => (prevId === id ? null : id));
    };

    const toggleDiscussion = (materialId) => {
        setOpenDiscussionId(prev => (prev === materialId ? null : materialId));
    };

    // --- FETCH DATA ---
    useEffect(() => {
        setTimeout(() => {
            setCourse({
                id: 1,
                title: "Intensif UTBK: Matematika Saintek",
                mentor: "Kak Bimo",
                mentor_role: "Matematika Expert & Alumni ITB",
                description: `Kelas ini dirancang khusus untuk kamu yang ingin menaklukkan soal-soal Matematika Saintek di UTBK SNBT. Kita akan membedah tuntas materi dari dasar hingga soal-soal HOTS.`,
                image: "/assets/matematika.jpg",
                weeks: [
                    {
                        id: 1,
                        week: "Minggu 1",
                        title: "Konsep Dasar Aljabar & Eksponen",
                        desc: "Pondasi utama matematika saintek.",
                        contents: [
                            { id: 101, type: 'video', title: "Video: Sifat Eksponen & Akar" },
                            { id: 102, type: 'pdf', title: "Modul: Ringkasan Rumus Aljabar" },
                            { id: 103, type: 'diskusi', title: "Diskusi Minggu 1: Aljabar" }
                        ]
                    },
                    {
                        id: 2,
                        week: "Minggu 2",
                        title: "Fungsi Kuadrat & Grafik",
                        desc: "Memahami grafik parabola.",
                        contents: [
                            { id: 201, type: 'video', title: "Video: Analisis Grafik Fungsi" },
                            { id: 202, type: 'pdf', title: "Latihan Soal Fungsi Kuadrat" },
                            { id: 203, type: 'diskusi', title: "Tanya Jawab PR Minggu 2" }
                        ]
                    },
                    {
                        id: 3,
                        week: "Minggu 3",
                        title: "Trigonometri Lanjutan",
                        desc: "Memahami konsep sudut rangkap.",
                        contents: [
                            { id: 301, type: 'video', title: "Video: Trik Hafal Sudut" },
                            { id: 302, type: 'pdf', title: "Modul: Rumus Identitas" },
                            { id: 303, type: 'diskusi', title: "Diskusi Minggu 3" }
                        ]
                    }
                ]
            });
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F9FD]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-dark"></div>
            </div>
        );
    }

    if (!course) return <div className="text-center py-20">Kelas tidak ditemukan.</div>;

    return (
        <div className="bg-[#F8F9FD] min-h-screen font-sans">
            <NavigasiSiswa />

            <header className="relative pt-32 pb-40 bg-gray-900 overflow-hidden">
                <img src={course.image} alt={course.title} className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm transform scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FD] via-gray-900/70 to-gray-900/90"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-300 mb-6">
                            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                            <span>/</span>
                            <span className="text-white font-bold">Detail Kelas</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight drop-shadow-lg">{course.title}</h1>
                        <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full border border-white/20">
                            <div className="w-12 h-12 rounded-full bg-brand-light-bg flex items-center justify-center border-2 border-white shadow-md overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${course.mentor}&background=random`} alt={course.mentor} className="w-full h-full object-cover" />
                            </div>
                            <div className="text-left">
                                <p className="text-lg font-bold text-white">{course.mentor}</p>
                                <p className="text-sm text-gray-300 uppercase tracking-wide">{course.mentor_role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 -mt-24 relative z-20 pb-24">
                <div className="max-w-15xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-h-[600px]">
                        <div className="p-8 md:p-12 bg-gray-50/30">
                            <div className="space-y-6 animate-fade-in-up">

                                {course.weeks.map((week) => {
                                    const isOpen = openWeekId === week.id;
                                    return (
                                        <div key={week.id} className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${isOpen ? 'border-brand-dark ring-1 ring-brand-dark/20' : 'border-gray-100 hover:border-gray-300'}`}>
                                            <div onClick={() => toggleWeek(week.id)} className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                                                <div className="flex items-start gap-6">
                                                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-bold text-sm border ${isOpen ? 'bg-brand-dark text-white border-brand-dark' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                                        <span>MINGGU</span>
                                                        <span className="text-2xl">{week.id}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className={`text-2xl font-bold mb-2 transition-colors ${isOpen ? 'text-brand-dark' : 'text-gray-800'}`}>{week.title}</h3>
                                                        <p className="text-gray-500 text-base line-clamp-1 md:line-clamp-none">{week.desc}</p>
                                                    </div>
                                                </div>
                                                <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {isOpen && (
                                                <div className="px-6 md:px-8 pb-8 pt-4 border-t border-gray-100 bg-gray-50/30">
                                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 ml-1">Konten Pembelajaran</p>
                                                    
                                                    <div className="space-y-4">
                                                        {week.contents.map((content) => (
                                                            <MaterialItem 
                                                                key={content.id}
                                                                type={content.type}
                                                                title={content.title}
                                                                onClick={() => alert(`Membuka: ${content.title}`)}
                                                                isDiscussionOpen={openDiscussionId === content.id}
                                                                onDiscussionToggle={() => toggleDiscussion(content.id)}
                                                            />
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
                </div>
            </main>
              <Footer />
        </div>
    );
}   