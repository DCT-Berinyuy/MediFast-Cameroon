import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { supabase } from '../lib/supabase';
import { MapPin, Clock, Phone, ChevronRight, Building2 } from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  emergency_phone: string;
  working_hours: string;
  has_emergency: boolean;
  departments: string[];
  image_url: string;
}

const HospitalLocator: React.FC = () => {
  const { darkMode, language, setCurrentPage } = useApp();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    const { data } = await supabase.from('hospitals').select('*');
    if (data) setHospitals(data);
  };

  const filtered = selectedCity === 'all' ? hospitals : hospitals.filter(h => h.city === selectedCity);

  return (
    <div className={`min-h-screen pt-20 pb-24 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {language === 'fr' ? 'Hôpitaux à Proximité' : 'Nearby Hospitals'}
      </h2>

      <button onClick={handleLocateMe} className="mb-4 px-4 py-2 rounded-full bg-blue-600 text-white" >

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {['all', 'Yaoundé', 'Douala'].map(city => (
          <button key={city} onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCity === city ? 'bg-green-600 text-white' : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
            }`}>
            {city === 'all' ? (language === 'fr' ? 'Tous' : 'All') : city}
          </button>
        ))}
      </div>

      {selectedHospital ? (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden`}>
          <img src={selectedHospital.image_url} alt={selectedHospital.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <button onClick={() => setSelectedHospital(null)} className="text-green-600 mb-2">← Back</button>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedHospital.name}</h3>
            <p className={`flex items-center gap-2 mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <MapPin size={16} /> {selectedHospital.address}
            </p>
            <p className={`flex items-center gap-2 mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Clock size={16} /> {selectedHospital.working_hours}
            </p>
            <p className={`flex items-center gap-2 mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Phone size={16} /> {selectedHospital.phone}
            </p>
            <div className="mt-4">
              <p className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Departments:</p>
              <div className="flex flex-wrap gap-2">
                {selectedHospital.departments?.map((d, i) => (
                  <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{d}</span>
                ))}
              </div>
            </div>
            <button onClick={() => setCurrentPage('book')}
              className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-semibold">
              {language === 'fr' ? 'Prendre Rendez-vous' : 'Book Appointment'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(hospital => (
            <div key={hospital.id} onClick={() => setSelectedHospital(hospital)}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-4 flex gap-4 cursor-pointer`}>
              <img src={hospital.image_url} alt={hospital.name} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{hospital.name}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{hospital.city}</p>
                <div className="flex items-center gap-2 mt-1">
                  {hospital.has_emergency && <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">24/7</span>}
                  <span className="text-xs text-gray-500">{hospital.departments?.length} depts</span>
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

export default HospitalLocator;
