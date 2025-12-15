import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Calendar, MapPin, AlertTriangle, Phone, User, Stethoscope, UserCheck, Headphones } from 'lucide-react';

const SimpleDashboard: React.FC = () => {
  const { darkMode, language, setCurrentPage, user } = useApp();

  const quickActions = [
    { id: 'doctors', icon: UserCheck, label: language === 'fr' ? 'Médecins' : 'Doctors', color: 'bg-blue-500' },
    { id: 'book', icon: Stethoscope, label: language === 'fr' ? 'Réserver' : 'Book', color: 'bg-green-500' },
    { id: 'appointments', icon: Calendar, label: language === 'fr' ? 'Mes RDV' : 'My Appts', color: 'bg-purple-500' },
    { id: 'emergency', icon: AlertTriangle, label: language === 'fr' ? 'Urgence' : 'Emergency', color: 'bg-red-500' },
  ];

  return (
    <div className={`min-h-screen pt-20 pb-24 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Welcome Card */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-6 shadow-lg`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <User className="text-green-600" size={32} />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'fr' ? 'Bonjour' : 'Hello'}, {user?.fullName || 'Patient'}
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'fr' ? 'Comment allez-vous?' : 'How are you feeling?'}
            </p>
          </div>
        </div>
      </div>

      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {language === 'fr' ? 'Actions Rapides' : 'Quick Actions'}
      </h3>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => setCurrentPage(action.id)}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg flex flex-col items-center gap-3 active:scale-95 transition-transform`}
          >
            <div className={`w-14 h-14 ${action.color} rounded-full flex items-center justify-center`}>
              <action.icon className="text-white" size={28} />
            </div>
            <span className={`font-medium text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Hospital Reception Contact */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 mb-4 shadow-lg border-2 border-green-500`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Headphones className="text-green-600" size={24} />
          </div>
          <div className="flex-1">
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'fr' ? 'Accueil Hôpital' : 'Hospital Reception'}
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Mme Ekole - Hôpital Jamot
            </p>
          </div>
          <a 
            href="tel:+237650031484"
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            <Phone size={16} />
          </a>
        </div>
      </div>

      {/* Emergency Card */}
      <div className={`${darkMode ? 'bg-red-900/30' : 'bg-red-50'} rounded-2xl p-6`}>
        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-red-800'}`}>
          {language === 'fr' ? 'Urgence?' : 'Emergency?'}
        </h3>
        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-red-700'}`}>
          {language === 'fr' ? 'Appelez le numéro d\'urgence' : 'Call emergency number'}
        </p>
        <a href="tel:222" className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-3">
          <Phone size={24} /> 222
        </a>
      </div>
    </div>
  );
};

export default SimpleDashboard;
