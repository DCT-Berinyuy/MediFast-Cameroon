import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Home, Stethoscope, Calendar, AlertTriangle, UserCheck } from 'lucide-react';

const BottomNav: React.FC = () => {
  const { darkMode, currentPage, setCurrentPage, language } = useApp();

  const navItems = [
    { id: 'welcome', icon: Home, label: language === 'fr' ? 'Accueil' : 'Home' },
    { id: 'doctors', icon: UserCheck, label: language === 'fr' ? 'Médecins' : 'Doctors' },
    { id: 'appointments', icon: Calendar, label: language === 'fr' ? 'RDV' : 'Appts' },
    { id: 'emergency', icon: AlertTriangle, label: language === 'fr' ? 'Urgence' : 'Emergency' },
    { id: 'book', icon: Stethoscope, label: language === 'fr' ? 'Réserver' : 'Book' },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t z-40 safe-area-bottom`}>
      <div className="max-w-lg mx-auto flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const isEmergency = item.id === 'emergency';
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-all ${
                isActive
                  ? isEmergency
                    ? 'text-red-600'
                    : 'text-green-600'
                  : darkMode
                  ? 'text-gray-500'
                  : 'text-gray-400'
              }`}
            >
              <div className={`p-2 rounded-full ${
                isActive 
                  ? isEmergency 
                    ? 'bg-red-100' 
                    : 'bg-green-100'
                  : ''
              }`}>
                <item.icon size={20} />
              </div>
              <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
