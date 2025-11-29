import React, { useState, useEffect, useRef } from 'react';
import { Camera, User, Mail, Phone } from 'lucide-react';
import NavigasiSiswa from '../common/navigasisiswa';

const ProfileSiswa = () => {
  // =========================================
  // 1. STATE MANAGEMENT
  // =========================================
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Mode Edit Toggle
  
  // State Data User
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    avatarUrl: ''
  });

  // Ref untuk input file gambar
  const fileInputRef = useRef(null);

  // =========================================
  // 2. SIMULASI BACKEND (GET PROFILE)
  // =========================================
  useEffect(() => {
    // Backend Task: GET /api/student/profile
    const fetchProfile = () => {
      const mockData = {
        name: 'Monkey D Luffy',
        username: 'Monkey D Luffy',
        email: 'monkeydluffy123@gmail.com',
        phone: '+62345899028',
        avatarUrl: '/assets/guru.png' // Placeholder Image
      };
      
      setFormData(mockData);
      setLoading(false);
    };

    setTimeout(fetchProfile, 800);
  }, []);

  // =========================================
  // 3. HANDLERS (UPDATE LOGIC)
  // =========================================
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Backend Task: POST/PUT /api/student/profile/update
    // Payload: formData
    console.log("Sending data to backend:", formData);
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      alert("Profil berhasil diperbarui!");
    }, 1000);
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Backend Task: Upload file logic here
      const objectUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatarUrl: objectUrl }));
    }
  };

  if (loading && !formData.name) return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-gray-800">
      <NavigasiSiswa />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-24">
    
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Pengaturan Profil</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group cursor-pointer" onClick={handleImageClick}>
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img 
                  src={formData.avatarUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {isEditing && (
                <div className="absolute bottom-0 right-0 bg-gray-800 p-1.5 rounded-full text-white shadow-sm border-2 border-white">
                  <Camera size={16} />
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
            </div>

            <div className="text-center md:text-left space-y-1">
              <h2 className="text-xl font-bold text-gray-800">{formData.name}</h2>
              <p className="text-sm text-gray-500 font-medium">{formData.phone}</p>
              <p className="text-sm text-gray-400">{formData.email}</p>
            </div>
          </div>

          <div>
            {!isEditing && (
              <button 
                onClick={handleEditClick}
                className="px-6 py-2 rounded-md border border-[#74151e] text-[#74151e] font-semibold text-sm hover:bg-red-50 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Informasi Pribadi</h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500 ml-1">Username</label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border ${isEditing ? 'border-gray-400 bg-white' : 'border-gray-200 bg-gray-50 text-gray-500'} focus:outline-none focus:border-[#74151e] transition-colors`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500 ml-1">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border ${isEditing ? 'border-gray-400 bg-white' : 'border-gray-200 bg-gray-50 text-gray-500'} focus:outline-none focus:border-[#74151e] transition-colors`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-500 ml-1">Nomor Telepon</label>
              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border ${isEditing ? 'border-gray-400 bg-white' : 'border-gray-200 bg-gray-50 text-gray-500'} focus:outline-none focus:border-[#74151e] transition-colors`}
                />
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="px-8 py-3 rounded-md bg-[#74151e] text-white font-bold text-sm hover:bg-[#5a1017] transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProfileSiswa;