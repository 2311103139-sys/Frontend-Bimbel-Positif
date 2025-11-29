import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import api from '../../api'; // 

export default function Login() {
    const navigate = useNavigate();

    // 1. STATE MANAGEMENT
    const [loginData, setLoginData] = useState({
        emailOrUsername: '',
        password: ''
    });
    
    const [loading, setLoading] = useState(false); 
    const [errorMsg, setErrorMsg] = useState(''); 

    // 2. HANDLER INPUT
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
        setErrorMsg('');
    };

    // 3. HANDLER SUBMIT
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // A. SIMULASI LOGIN
        setTimeout(() => {
            if (loginData.emailOrUsername === "user@test.com" && loginData.password === "123456") {
                alert("Login Berhasil! Mengalihkan ke Dashboard...");
                localStorage.setItem('auth_token', 'dummy_token_123');
                navigate('/dashboard'); 
            } else {
                setLoading(false);
                setErrorMsg("Email atau Password salah.");
            }
        }, 1500);

        // B. KODE REAL BACKEND
        /*
        try {
            const response = await api.post('/auth/login', {
                email: loginData.emailOrUsername,
                password: loginData.password
            });
            const token = response.data.access_token;
            localStorage.setItem('auth_token', token);
            setLoading(false);
            navigate('/dashboard');
        } catch (error) {
            setLoading(false);
            setErrorMsg(error.response?.data?.message || "Email atau password salah.");
        }
        */
    };

    return (
        <div className="font-sans bg-white h-screen w-full overflow-hidden flex items-center justify-center">
            <div className="flex h-full w-full relative">
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white p-1.5 rounded-full shadow-xl flex space-x-1 border border-gray-100">
                    <span className="px-6 py-2 rounded-full text-sm font-bold bg-brand-dark text-white shadow-md cursor-default">
                        Masuk
                    </span>
                    <Link to="/register" className="px-6 py-2 rounded-full text-sm font-bold text-brand-dark hover:bg-gray-50 transition-colors">
                        Daftar
                    </Link>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 z-10 bg-white h-full overflow-y-auto">
                    <div className="w-full max-w-md mt-16 lg:mt-0"> 
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-brand-light-bg rounded-full p-3 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300">
                                <img src="/assets/logo.png" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-extrabold text-brand-dark mb-2">Selamat Datang Kembali!</h2>
                            <p className="text-sm text-gray-500">Silakan masuk untuk melanjutkan belajar.</p>
                        </div>

                        {errorMsg && (
                            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 border border-red-200 text-center animate-pulse">
                                {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleLoginSubmit} className="space-y-5">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="emailOrUsername"
                                    className="block w-full pl-11 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-dark/50 focus:border-brand-dark outline-none transition-all placeholder-gray-400"
                                    value={loginData.emailOrUsername}
                                    onChange={handleChange}
                                    placeholder="Email atau Username"
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2 px-1">
                                    <label className="block text-sm font-bold text-gray-700">Password</label>
                                    <Link to="/forgot-password" className="text-xs font-bold text-brand-dark hover:underline hover:text-brand-dark-accent transition-colors">
                                        Lupa Password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        className="block w-full pl-11 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-dark/50 focus:border-brand-dark outline-none transition-all placeholder-gray-400"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        placeholder="Masukkan password"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-brand-dark text-white py-3.5 rounded-xl font-bold text-base hover:bg-brand-dark-accent transition-all transform hover:-translate-y-1 shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Memproses...
                                    </span>
                                ) : "Masuk Sekarang"}
                            </button>
                        </form>
                        <div className="mt-8 text-center text-sm text-gray-600">
                            Belum punya akun? 
                            <Link to="/register" className="font-bold text-brand-dark hover:underline ml-1">
                                Daftar di sini
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-brand-dark">
                    <img 
                        src="/assets/loginregister.jpeg" 
                        alt="Suasana Belajar Bimbel Positif" 
                        className="absolute inset-0 w-full h-full object-cover opacity-90" 
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent"></div>
                    <div className="absolute bottom-16 left-12 right-12 text-white">
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
                            <p className="text-xl font-medium italic mb-6 leading-relaxed">
                                "Investasi terbaik adalah investasi leher ke atas. Belajar hari ini untuk memimpin masa depan."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-dark font-bold">BP</div>
                                <div>
                                    <p className="font-bold uppercase tracking-widest text-sm">Bimbel Positif Team</p>
                                    <p className="text-xs opacity-75">Motivasi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}