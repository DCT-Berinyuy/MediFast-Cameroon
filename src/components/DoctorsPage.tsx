import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Calendar, Clock, Phone, Star, Stethoscope, Heart, Brain, Wind, Search, Filter, ChevronRight } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  specialtyIcon: React.ReactNode;
  hospital: string;
  consultationDays: string[];
  consultationDaysDisplay: { en: string; fr: string };
  fee: number;
  image: string;
  experience: string;
  rating: number;
  languages: string[];
}

const doctors: Doctor[] = [
  {
    id: 'pefura',
    name: 'Prof. Pefura Yone Eric Walter',
    title: 'Professeur',
    specialty: 'Pneumologie',
    specialtyIcon: <Wind size={18} />,
    hospital: 'Hôpital Jamot Yaoundé',
    consultationDays: ['Tuesday', 'Thursday'],
    consultationDaysDisplay: { en: 'Tuesday & Thursday', fr: 'Mardi & Jeudi' },
    fee: 2000,
    image: 'https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206177040_fc6db82d.png',
    experience: '20+ ans',
    rating: 4.9,
    languages: ['Français', 'English']
  },
  {
    id: 'poka',
    name: 'Dr. Poka Mayap Virginie',
    title: 'Docteur',
    specialty: 'Pneumologie',
    specialtyIcon: <Wind size={18} />,
    hospital: 'Hôpital Jamot Yaoundé',
    consultationDays: ['Monday', 'Tuesday', 'Thursday'],
    consultationDaysDisplay: { en: 'Monday, Tuesday & Thursday', fr: 'Lundi, Mardi & Jeudi' },
    fee: 2000,
    image: 'https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206163628_c88b7726.jpg',
    experience: '12+ ans',
    rating: 4.8,
    languages: ['Français', 'English']
  },
  {
    id: 'ekoua',
    name: 'Dr. Daniel Ekoua',
    title: 'Docteur',
    specialty: 'Cardiologie',
    specialtyIcon: <Heart size={18} />,
    hospital: 'Hôpital Jamot Yaoundé',
    consultationDays: ['Monday', 'Thursday'],
    consultationDaysDisplay: { en: 'Monday & Thursday', fr: 'Lundi & Jeudi' },
    fee: 2000,
    image: 'https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206169084_63a4d34d.png',
    experience: '15+ ans',
    rating: 4.9,
    languages: ['Français', 'English']
  },
  {
    id: 'tchokonte',
    name: 'Dr. Tchokonté Nana',
    title: 'Docteur',
    specialty: 'Neurologie',
    specialtyIcon: <Brain size={18} />,
    hospital: 'Hôpital Jamot Yaoundé',
    consultationDays: ['Monday', 'Wednesday', 'Friday'],
    consultationDaysDisplay: { en: 'Monday, Wednesday & Friday', fr: 'Lundi, Mercredi & Vendredi' },
    fee: 2000,
    image: 'https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206178236_5d3922a1.png',
    experience: '10+ ans',
    rating: 4.7,
    languages: ['Français', 'English']
  }
];

const specialties = [
  { id: 'all', name: { en: 'All Doctors', fr: 'Tous les Médecins' }, icon: <Stethoscope size={18} /> },
  { id: 'Pneumologie', name: { en: 'Pneumology', fr: 'Pneumologie' }, icon: <Wind size={18} /> },
  { id: 'Cardiologie', name: { en: 'Cardiology', fr: 'Cardiologie' }, icon: <Heart size={18} /> },
  { id: 'Neurologie', name: { en: 'Neurology', fr: 'Neurologie' }, icon: <Brain size={18} /> },
];

const DoctorsPage: React.FC = () => {
  const { darkMode, language, setCurrentPage } = useApp();
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const filteredDoctors = doctors.filter(doc => {
    const matchesSpecialty = selectedSpecialty === 'all' || doc.specialty === selectedSpecialty;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  const getSpecialtyColor = (specialty: string) => {
    switch (specialty) {
      case 'Pneumologie': return 'bg-blue-100 text-blue-700';
      case 'Cardiologie': return 'bg-red-100 text-red-700';
      case 'Neurologie': return 'bg-purple-100 text-purple-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  const getDayName = (day: string) => {
    const days: Record<string, { en: string; fr: string }> = {
      'Monday': { en: 'Mon', fr: 'Lun' },
      'Tuesday': { en: 'Tue', fr: 'Mar' },
      'Wednesday': { en: 'Wed', fr: 'Mer' },
      'Thursday': { en: 'Thu', fr: 'Jeu' },
      'Friday': { en: 'Fri', fr: 'Ven' },
    };
    return days[day]?.[language === 'fr' ? 'fr' : 'en'] || day;
  };

  return (
    <div className={`min-h-screen pt-20 pb-24 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {language === 'fr' ? 'Nos Médecins' : 'Our Doctors'}
        </h1>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {language === 'fr' ? 'Hôpital Jamot Yaoundé - Spécialistes qualifiés' : 'Hôpital Jamot Yaoundé - Qualified Specialists'}
        </p>
      </div>

      {/* Search Bar */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-3 mb-4 flex items-center gap-3 shadow-md`}>
        <Search className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} />
        <input
          type="text"
          placeholder={language === 'fr' ? 'Rechercher un médecin...' : 'Search for a doctor...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`flex-1 bg-transparent outline-none ${darkMode ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`}
        />
      </div>

      {/* Specialty Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {specialties.map(spec => (
          <button
            key={spec.id}
            onClick={() => setSelectedSpecialty(spec.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
              selectedSpecialty === spec.id
                ? 'bg-green-600 text-white'
                : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
            } shadow-md`}
          >
            {spec.icon}
            {spec.name[language === 'fr' ? 'fr' : 'en']}
          </button>
        ))}
      </div>

      {/* Pricing Info */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-green-50'} rounded-xl p-4 mb-4 border ${darkMode ? 'border-gray-700' : 'border-green-200'}`}>
        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {language === 'fr' ? 'Tarifs des Consultations' : 'Consultation Fees'}
        </h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {language === 'fr' ? 'Consultation générale:' : 'General consultation:'} <strong>600 FCFA</strong>
          </div>
          <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {language === 'fr' ? 'Spécialiste:' : 'Specialist:'} <strong>2 000 FCFA</strong>
          </div>
          <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            ExpressCare: <strong>5 000 FCFA</strong>
          </div>
          <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            {language === 'fr' ? 'Visite domicile:' : 'Home visit:'} <strong>10 000 FCFA</strong>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="space-y-4">
        {filteredDoctors.map(doctor => (
          <div
            key={doctor.id}
            onClick={() => setSelectedDoctor(doctor)}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition-shadow`}
          >
            <div className="flex gap-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {doctor.name}
                    </h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getSpecialtyColor(doctor.specialty)}`}>
                      {doctor.specialtyIcon}
                      {doctor.specialty}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{doctor.rating}</span>
                  </div>
                </div>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {doctor.hospital}
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {doctor.experience} • {doctor.languages.join(', ')}
                </p>
              </div>
            </div>
            
            <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'} flex items-center justify-between`}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-green-600" />
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {doctor.consultationDaysDisplay[language === 'fr' ? 'fr' : 'en']}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-green-600 font-bold">{doctor.fee.toLocaleString()} FCFA</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Stethoscope size={48} className="mx-auto mb-4 opacity-50" />
          <p>{language === 'fr' ? 'Aucun médecin trouvé' : 'No doctors found'}</p>
        </div>
      )}

      {/* Doctor Detail Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto`}>
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            
            <div className="flex gap-4 mb-4">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-24 h-24 rounded-2xl object-cover"
              />
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {selectedDoctor.name}
                </h2>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium mt-1 ${getSpecialtyColor(selectedDoctor.specialty)}`}>
                  {selectedDoctor.specialtyIcon}
                  {selectedDoctor.specialty}
                </span>
                <div className="flex items-center gap-1 mt-2 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedDoctor.rating}</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>• {selectedDoctor.experience}</span>
                </div>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 mb-4`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {language === 'fr' ? 'Jours de Consultation' : 'Consultation Days'}
              </h3>
              <div className="flex gap-2 flex-wrap">
                {selectedDoctor.consultationDays.map(day => (
                  <span key={day} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {getDayName(day)}
                  </span>
                ))}
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 mb-4`}>
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {language === 'fr' ? 'Informations' : 'Information'}
              </h3>
              <div className="space-y-2 text-sm">
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>{language === 'fr' ? 'Hôpital:' : 'Hospital:'}</strong> {selectedDoctor.hospital}
                </p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>{language === 'fr' ? 'Langues:' : 'Languages:'}</strong> {selectedDoctor.languages.join(', ')}
                </p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>{language === 'fr' ? 'Tarif:' : 'Fee:'}</strong> {selectedDoctor.fee.toLocaleString()} FCFA
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedDoctor(null)}
                className={`flex-1 py-3 rounded-xl font-semibold ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                {language === 'fr' ? 'Fermer' : 'Close'}
              </button>
              <button
                onClick={() => {
                  setSelectedDoctor(null);
                  setCurrentPage('book');
                }}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                {language === 'fr' ? 'Prendre RDV' : 'Book Now'}
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
