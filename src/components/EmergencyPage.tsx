import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Phone, AlertTriangle, Home, Ambulance, MapPin, Clock, Headphones, User } from 'lucide-react';

const emergencyHospitals = [
  { name: 'Hôpital Jamot Yaoundé', phone: '+237 222 23 10 15', distance: '1.2 km', waitTime: '5 min', city: 'Yaoundé' },
  { name: 'Hôpital Central de Yaoundé', phone: '+237 222 23 40 20', distance: '2.5 km', waitTime: '10 min', city: 'Yaoundé' },
  { name: 'Hôpital Général de Yaoundé', phone: '+237 222 23 20 15', distance: '3.0 km', waitTime: '12 min', city: 'Yaoundé' },
  { name: 'Hôpital Général de Douala', phone: '+237 233 42 01 12', distance: '3.8 km', waitTime: '15 min', city: 'Douala' },
  { name: 'Hôpital Laquintinie Douala', phone: '+237 233 42 56 78', distance: '4.2 km', waitTime: '20 min', city: 'Douala' },
];

const EmergencyPage: React.FC = () => {
  const { darkMode, language } = useApp();
  const [showHomeVisit, setShowHomeVisit] = useState(false);
  const [homeVisitRequested, setHomeVisitRequested] = useState(false);
  const [selectedCity, setSelectedCity] = useState<'all' | 'Yaoundé' | 'Douala'>('all');

  const callEmergency = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const requestHomeVisit = () => {
    setHomeVisitRequested(true);
    setTimeout(() => {
      setShowHomeVisit(false);
      setHomeVisitRequested(false);
    }, 3000);
  };

  const filteredHospitals = emergencyHospitals.filter(h => 
    selectedCity === 'all' || h.city === selectedCity
  );

  return (
    <div className={`min-h-screen pt-20 pb-24 px-4 ${darkMode ? 'bg-gray-900' : 'bg-red-50'}`}>
      {/* Emergency Call Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-6 mb-6 text-center shadow-lg">
        <AlertTriangle size={48} className="mx-auto mb-3" />
        <h2 className="text-2xl font-bold mb-2">
          {language === 'fr' ? 'URGENCE' : 'EMERGENCY'}
        </h2>
        <p className="opacity-90 mb-4">
          {language === 'fr' ? 'Accès prioritaire aux soins médicaux' : 'Priority access to medical care'}
        </p>
        <button onClick={() => callEmergency('222')}
          className="w-full bg-white text-red-600 py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-3 shadow-md hover:bg-red-50 transition-colors">
          <Phone size={24} /> {language === 'fr' ? 'Appeler 222' : 'Call 222'}
        </button>
      </div>

      {/* Hospital Reception Contact - Mme Ekole */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 mb-6 shadow-lg border-2 border-green-500`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Headphones className="text-green-600" size={20} />
          </div>
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'fr' ? 'Accueil Hôpital Jamot' : 'Hôpital Jamot Reception'}
            </h3>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'fr' ? 'Contact pour orientation et urgences' : 'Contact for guidance & emergencies'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206141158_1e83655e.png" 
            alt="Mme Ekole"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>Mme Ekole Odile Félicité</p>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'fr' ? 'Major Accueil & Urgences' : 'Head of Reception & Emergency'}
            </p>
          </div>
          <button 
            onClick={() => callEmergency('+237650031484')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            <Phone size={16} />
            <span className="text-sm">650 031 484</span>
          </button>
        </div>
      </div>

      {/* City Filter */}
      <div className="flex gap-2 mb-4">
        {(['all', 'Yaoundé', 'Douala'] as const).map(city => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCity === city 
                ? 'bg-red-600 text-white' 
                : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
            } shadow-md`}
          >
            {city === 'all' ? (language === 'fr' ? 'Toutes' : 'All') : city}
          </button>
        ))}
      </div>

      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {language === 'fr' ? 'Hôpitaux d\'Urgence Proches' : 'Nearest Emergency Hospitals'}
      </h3>

      <div className="space-y-3 mb-6">
        {filteredHospitals.map((hospital, i) => (
          <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-md`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{hospital.name}</h4>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{hospital.city}</p>
                <div className="flex items-center gap-3 mt-2 text-sm">
                  <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <MapPin size={14} className="text-red-500" /> {hospital.distance}
                  </span>
                  <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Clock size={14} className="text-green-500" /> {hospital.waitTime}
                  </span>
                </div>
              </div>
              <button onClick={() => callEmergency(hospital.phone)}
                className="bg-red-100 text-red-600 p-3 rounded-full hover:bg-red-200 transition-colors">
                <Phone size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Home Visit Option */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Home className="text-green-600" size={24} />
          </div>
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'fr' ? 'Visite à Domicile' : 'Home Doctor Visit'}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'fr' ? 'Pour cas critiques uniquement' : 'For critical cases only'}
            </p>
          </div>
        </div>
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-xl p-3 mb-4`}>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {language === 'fr' ? 'Frais de visite: ' : 'Visit fee: '}
            <strong className="text-green-600">10 000 FCFA</strong>
          </p>
          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'fr' ? 'Un médecin se déplacera à votre domicile' : 'A doctor will come to your home'}
          </p>
        </div>
        <button onClick={() => setShowHomeVisit(true)}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
          {language === 'fr' ? 'Demander une Visite' : 'Request Home Visit'}
        </button>
      </div>

      {/* Home Visit Modal */}
      {showHomeVisit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 w-full max-w-md`}>
            {homeVisitRequested ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ambulance className="text-green-600" size={32} />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {language === 'fr' ? 'Demande Envoyée!' : 'Request Sent!'}
                </h3>
                <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'fr' ? 'Un médecin vous contactera sous peu' : 'A doctor will contact you shortly'}
                </p>
              </div>
            ) : (
              <>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {language === 'fr' ? 'Confirmer la Visite à Domicile' : 'Confirm Home Visit'}
                </h3>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 mb-4`}>
                  <div className="flex justify-between items-center">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {language === 'fr' ? 'Frais de visite' : 'Visit fee'}
                    </span>
                    <span className="text-green-600 font-bold text-lg">10 000 FCFA</span>
                  </div>
                </div>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'fr' 
                    ? 'Un médecin sera envoyé à votre adresse. Vous serez contacté pour confirmer les détails.' 
                    : 'A doctor will be sent to your address. You will be contacted to confirm details.'}
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setShowHomeVisit(false)}
                    className={`flex-1 py-3 rounded-xl font-medium ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {language === 'fr' ? 'Annuler' : 'Cancel'}
                  </button>
                  <button onClick={requestHomeVisit}
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold">
                    {language === 'fr' ? 'Confirmer' : 'Confirm'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyPage;
