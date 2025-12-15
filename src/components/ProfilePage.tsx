import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { User, Heart, FileText, Bell, Settings, ChevronRight, Plus } from 'lucide-react';

const mockHistory = [
  { date: '2025-11-15', hospital: 'Hôpital Central', doctor: 'Dr. Nkeng', diagnosis: 'Hypertension', prescription: 'Amlodipine 5mg' },
  { date: '2025-10-20', hospital: 'Clinique Fouda', doctor: 'Dr. Mbarga', diagnosis: 'Flu', prescription: 'Paracetamol, Rest' },
];

const ProfilePage: React.FC = () => {
  const { darkMode, language, user } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'settings'>('profile');
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.fullName || 'Jean Kamga',
    phone: '+237 6XX XXX XXX',
    email: user?.email || 'jean@email.com',
    bloodType: 'O+',
    allergies: ['Penicillin'],
    conditions: ['Hypertension']
  });

  const tabs = [
    { id: 'profile', icon: User, label: language === 'fr' ? 'Profil' : 'Profile' },
    { id: 'history', icon: FileText, label: language === 'fr' ? 'Historique' : 'History' },
    { id: 'settings', icon: Settings, label: language === 'fr' ? 'Paramètres' : 'Settings' },
  ];

  return (
    <div className={`min-h-screen pt-20 pb-24 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-6 shadow-lg`}>
        <div className="flex items-center gap-4">
          <img src="https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1764608418372_3598bb25.webp"
            alt="Profile" className="w-20 h-20 rounded-full object-cover" />
          <div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{profile.name}</h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{profile.email}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{profile.phone}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium ${
              activeTab === tab.id ? 'bg-green-600 text-white' : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
            }`}>
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'fr' ? 'Informations Médicales' : 'Medical Info'}
            </h3>
            <button onClick={() => setEditMode(!editMode)} className="text-green-600 text-sm">
              {editMode ? (language === 'fr' ? 'Sauvegarder' : 'Save') : (language === 'fr' ? 'Modifier' : 'Edit')}
            </button>
          </div>
          <div className="space-y-4">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'fr' ? 'Groupe Sanguin' : 'Blood Type'}</p>
              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{profile.bloodType}</p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'fr' ? 'Allergies' : 'Allergies'}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.allergies.map((a, i) => (
                  <span key={i} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">{a}</span>
                ))}
                {editMode && <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm flex items-center gap-1"><Plus size={14} /> Add</button>}
              </div>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'fr' ? 'Conditions Chroniques' : 'Chronic Conditions'}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.conditions.map((c, i) => (
                  <span key={i} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          {mockHistory.map((h, i) => (
            <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-md`}>
              <div className="flex justify-between items-start mb-2">
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{h.diagnosis}</h4>
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{h.date}</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{h.hospital} • {h.doctor}</p>
              <p className={`text-sm mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Rx: {h.prescription}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}>
          {[{ icon: Bell, label: language === 'fr' ? 'Notifications' : 'Notifications' },
            { icon: Heart, label: language === 'fr' ? 'Pharmacies' : 'Pharmacies' }].map((item, i) => (
            <button key={i} className={`w-full flex items-center justify-between p-4 ${i > 0 ? 'border-t' : ''} ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <item.icon className="text-green-600" size={20} />
                <span className={darkMode ? 'text-white' : 'text-gray-800'}>{item.label}</span>
              </div>
              <ChevronRight className={darkMode ? 'text-gray-600' : 'text-gray-400'} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
