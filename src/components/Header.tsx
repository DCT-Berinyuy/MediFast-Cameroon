import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Menu, Moon, Sun, Globe, X, Accessibility } from 'lucide-react';

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ menuOpen, setMenuOpen }) => {
  const { darkMode, toggleDarkMode, language, setLanguage, simpleMode, setSimpleMode } = useApp();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-green-700'}`}>MboaMed</h1>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>HealthTech Pioneers</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSimpleMode(!simpleMode)}
            className={`p-2 rounded-full ${simpleMode ? 'bg-green-600 text-white' : darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}
            title="Simple Mode"
          >
            <Accessibility size={20} />
          </button>
          <button
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            <Globe size={20} />
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
