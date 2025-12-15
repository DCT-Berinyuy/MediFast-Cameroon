import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { supabase } from '../lib/supabase';
import { MapPin, Clock, Phone, Pill, ChevronRight, Search, Truck } from 'lucide-react';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  working_hours: string;
  is_24h: boolean;
  has_delivery: boolean;
}

const PharmacyPage: React.FC = () => {
  const { darkMode, language } = useApp();
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    const { data } = await supabase.from('pharmacies').select('*');
    if (data) setPharmacies(data);
  };

  const filtered = pharmacies.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase());
    const matchesCity = selectedCity === 'all' || p.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className={`min-h-screen pt-20 pb-24 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {language === 'fr' ? 'Pharmacies' : 'Pharmacies'}
      </h2>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {['all', 'Yaoundé', 'Douala'].map(city => (
          <button key={city} onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCity === city ? 'bg-green-600 text-white' : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'}`}>
            {city === 'all' ? (language === 'fr' ? 'Tous' : 'All') : city}
          </button>
        ))}
      </div>

      <div className={`flex items-center gap-2 mb-6 p-3 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <Search className="text-gray-400" size={20} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={language === 'fr' ? 'Rechercher...' : 'Search...'}
          className={`flex-1 bg-transparent outline-none ${darkMode ? 'text-white' : 'text-gray-800'}`} />
      </div>

      {selectedPharmacy ? (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-4`}>
          <button onClick={() => setSelectedPharmacy(null)} className="text-green-600 mb-2">← {language === 'fr' ? 'Retour' : 'Back'}</button>
          <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Pill className="text-green-600" size={32} />
          </div>
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedPharmacy.name}</h3>
          <p className={`flex items-center gap-2 mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}><MapPin size={16} /> {selectedPharmacy.address}, {selectedPharmacy.city}</p>
          <p className={`flex items-center gap-2 mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}><Clock size={16} /> {selectedPharmacy.working_hours}</p>
          <div className="flex gap-2 mt-3">
            {selectedPharmacy.is_24h && <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">24/7</span>}
            {selectedPharmacy.has_delivery && <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded flex items-center gap-1"><Truck size={12} /> {language === 'fr' ? 'Livraison' : 'Delivery'}</span>}
          </div>
          <a href={`tel:${selectedPharmacy.phone}`} className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
            <Phone size={20} /> {language === 'fr' ? 'Appeler' : 'Call'}
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(pharmacy => (
            <div key={pharmacy.id} onClick={() => setSelectedPharmacy(pharmacy)}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-4 flex gap-4 cursor-pointer`}>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Pill className="text-green-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{pharmacy.name}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pharmacy.city}</p>
                <div className="flex gap-2 mt-1">
                  {pharmacy.is_24h && <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">24/7</span>}
                  {pharmacy.has_delivery && <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded"><Truck size={10} /></span>}
                </div>
              </div>
              <ChevronRight className={darkMode ? 'text-gray-600' : 'text-gray-400'} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PharmacyPage;
