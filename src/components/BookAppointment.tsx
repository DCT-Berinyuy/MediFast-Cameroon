import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, User, Check, Users, ChevronLeft, Building2, Zap, Home, AlertCircle } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  consultationDays: string[];
  fee: number;
  image: string;
}

const hospitals = [
  { id: 'jamot', name: 'Hôpital Jamot Yaoundé', city: 'Yaoundé' },
  { id: 'central', name: 'Hôpital Central de Yaoundé', city: 'Yaoundé' },
  { id: 'general-yaounde', name: 'Hôpital Général de Yaoundé', city: 'Yaoundé' },
  { id: 'general-douala', name: 'Hôpital Général de Douala', city: 'Douala' },
  { id: 'laquintinie', name: 'Hôpital Laquintinie Douala', city: 'Douala' },
];

const doctorsByHospital: Record<string, Doctor[]> = {
  'jamot': [
    {
      id: 'pefura',
      name: 'Prof. Pefura Yone Eric Walter',
      specialty: 'Pneumologie',
      consultationDays: ['Tuesday', 'Thursday'],
      fee: 2000,
      image: 'https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206177040_fc6db82d.png',
    },
    {
      id: 'poka',
      name: 'Dr. Poka Mayap Virginie',
      specialty: 'Pneumologie',
      consultationDays: ['Monday', 'Tuesday', 'Thursday'],
      fee: 2000,
      image: 'https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206163628_c88b7726.jpg',
    },
    {
      id: 'ekoua',
      name: 'Dr. Daniel Ekoua',
      specialty: 'Cardiologie',
      consultationDays: ['Monday', 'Thursday'],
      fee: 2000,
      image: 'https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206169084_63a4d34d.png',
    },
    {
      id: 'tchokonte',
      name: 'Dr. Tchokonté Nana',
      specialty: 'Neurologie',
      consultationDays: ['Monday', 'Wednesday', 'Friday'],
      fee: 2000,
      image: 'https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206178236_5d3922a1.png',
    },
  ],
  'central': [
    {
      id: 'general-central',
      name: 'Dr. Médecin Généraliste',
      specialty: 'Médecine Générale',
      consultationDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      fee: 600,
      image: 'https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206177040_fc6db82d.png',
    },
  ],
  'general-yaounde': [
    {
      id: 'general-gy',
      name: 'Dr. Médecin Généraliste',
      specialty: 'Médecine Générale',
      consultationDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      fee: 600,
      image: 'https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206163628_c88b7726.jpg',
    },
  ],
  'general-douala': [
    {
      id: 'general-gd',
      name: 'Dr. Médecin Généraliste',
      specialty: 'Médecine Générale',
      consultationDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      fee: 600,
      image: 'https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206169084_63a4d34d.png',
    },
  ],
  'laquintinie': [
    {
      id: 'general-laq',
      name: 'Dr. Médecin Généraliste',
      specialty: 'Médecine Générale',
      consultationDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      fee: 600,
      image: 'https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206178236_5d3922a1.png',
    },
  ],
};

const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

const dayNames: Record<string, string> = {
  'Monday': 'Lundi',
  'Tuesday': 'Mardi',
  'Wednesday': 'Mercredi',
  'Thursday': 'Jeudi',
  'Friday': 'Vendredi',
  'Saturday': 'Samedi',
  'Sunday': 'Dimanche',
};

const BookAppointment: React.FC = () => {
  const { darkMode, language, setCurrentPage } = useApp();
  const [step, setStep] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState<typeof hospitals[0] | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingFor, setBookingFor] = useState<'self' | 'other'>('self');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientRelation, setPatientRelation] = useState('');
  const [expressCare, setExpressCare] = useState(false);
  const [booked, setBooked] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState<any>(null);

  const totalSteps = bookingFor === 'other' ? 5 : 4;

  const handleBook = async () => {
    const totalFee = (selectedDoctor?.fee || 0) + (expressCare ? 5000 : 0);
    const details = {
      hospital: selectedHospital?.name,
      doctor: selectedDoctor?.name,
      specialty: selectedDoctor?.specialty,
      date: selectedDate,
      time: selectedTime,
      patientName: bookingFor === 'other' ? patientName : 'Vous',
      patientRelation: bookingFor === 'other' ? patientRelation : null,
      fee: totalFee,
      expressCare,
      queueNumber: Math.floor(Math.random() * 10) + 1,
    };
    setAppointmentDetails(details);
    setBooked(true);
  };

  const getAvailableDays = () => {
    if (!selectedDoctor) return [];
    const days: { date: string; dayName: string; available: boolean }[] = [];
    
    for (let i = 1; i <= 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'long' });
      const isAvailable = selectedDoctor.consultationDays.includes(dayOfWeek);
      
      days.push({
        date: d.toISOString().split('T')[0],
        dayName: language === 'fr' ? dayNames[dayOfWeek] : dayOfWeek,
        available: isAvailable,
      });
    }
    return days;
  };

  const getDoctorsForHospital = () => {
    if (!selectedHospital) return [];
    return doctorsByHospital[selectedHospital.id] || [];
  };

  if (booked && appointmentDetails) {
    return (
      <div className={`min-h-screen pt-20 pb-24 px-4 flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 w-full max-w-md shadow-xl`}>
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={40} />
            </div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'fr' ? 'Rendez-vous Confirmé!' : 'Appointment Confirmed!'}
            </h2>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'fr' ? 'Vous recevrez un SMS/Email de rappel' : 'You will receive an SMS/Email reminder'}
            </p>
          </div>

          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 space-y-3 text-sm`}>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{language === 'fr' ? 'Hôpital' : 'Hospital'}</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{appointmentDetails.hospital}</span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{language === 'fr' ? 'Médecin' : 'Doctor'}</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{appointmentDetails.doctor}</span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{language === 'fr' ? 'Date' : 'Date'}</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{appointmentDetails.date}</span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{language === 'fr' ? 'Heure' : 'Time'}</span>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{appointmentDetails.time}</span>
            </div>
            {bookingFor === 'other' && (
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{language === 'fr' ? 'Patient' : 'Patient'}</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{appointmentDetails.patientName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{language === 'fr' ? 'File d\'attente' : 'Queue Number'}</span>
              <span className="font-bold text-green-600">#{appointmentDetails.queueNumber}</span>
            </div>
            <div className={`pt-3 border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'} flex justify-between`}>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{language === 'fr' ? 'Total' : 'Total'}</span>
              <span className="font-bold text-green-600">{appointmentDetails.fee.toLocaleString()} FCFA</span>
            </div>
          </div>

          <div className={`mt-4 p-3 rounded-xl ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50'} flex items-start gap-2`}>
            <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={16} />
            <p className={`text-xs ${darkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
              {language === 'fr' 
                ? 'Annulation gratuite jusqu\'à 24h avant le rendez-vous. Passé ce délai, aucun remboursement ne sera possible.' 
                : 'Free cancellation up to 24h before the appointment. After that, no refund will be possible.'}
            </p>
          </div>

          <div className="flex gap-3 mt-6">
            <button 
              onClick={() => setCurrentPage('payment')}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold"
            >
              {language === 'fr' ? 'Payer Maintenant' : 'Pay Now'}
            </button>
          </div>
          <button 
            onClick={() => setCurrentPage('appointments')}
            className={`w-full mt-3 py-3 rounded-xl font-semibold ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {language === 'fr' ? 'Voir Mes Rendez-vous' : 'View My Appointments'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 pb-24 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-6">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className={`flex-1 h-2 rounded-full ${step > i ? 'bg-green-600' : darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
        ))}
      </div>

      {/* Back Button */}
      {step > 1 && (
        <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-green-600 mb-4">
          <ChevronLeft size={20} /> {language === 'fr' ? 'Retour' : 'Back'}
        </button>
      )}

      {/* Step 1: Who is this for? */}
      {step === 1 && (
        <>
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'fr' ? 'Pour qui est ce rendez-vous?' : 'Who is this appointment for?'}
          </h2>
          <div className="space-y-3">
            <button onClick={() => { setBookingFor('self'); setStep(2); }}
              className={`w-full p-4 rounded-xl flex items-center gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="text-green-600" size={24} />
              </div>
              <div className="text-left">
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{language === 'fr' ? 'Pour moi-même' : 'For myself'}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{language === 'fr' ? 'Je prends rendez-vous pour moi' : 'I am booking for myself'}</p>
              </div>
            </button>
            <button onClick={() => { setBookingFor('other'); setStep(2); }}
              className={`w-full p-4 rounded-xl flex items-center gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
              <div className="text-left">
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{language === 'fr' ? 'Pour quelqu\'un d\'autre' : 'For someone else'}</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{language === 'fr' ? 'Enfant, parent, proche...' : 'Child, parent, relative...'}</p>
              </div>
            </button>
          </div>
        </>
      )}

      {/* Step 2: Patient Info (if booking for someone else) */}
      {step === 2 && bookingFor === 'other' && (
        <>
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'fr' ? 'Informations du patient' : 'Patient Information'}
          </h2>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-md space-y-4`}>
            <div>
              <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{language === 'fr' ? 'Nom complet' : 'Full name'}</label>
              <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)}
                className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`} placeholder="Ex: Jean Kamga" />
            </div>
            <div>
              <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{language === 'fr' ? 'Âge' : 'Age'}</label>
              <input type="number" value={patientAge} onChange={(e) => setPatientAge(e.target.value)}
                className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`} placeholder="Ex: 5" />
            </div>
            <div>
              <label className={`block text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{language === 'fr' ? 'Relation' : 'Relationship'}</label>
              <select value={patientRelation} onChange={(e) => setPatientRelation(e.target.value)}
                className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}>
                <option value="">{language === 'fr' ? 'Sélectionner...' : 'Select...'}</option>
                <option value="child">{language === 'fr' ? 'Mon enfant' : 'My child'}</option>
                <option value="parent">{language === 'fr' ? 'Mon parent' : 'My parent'}</option>
                <option value="spouse">{language === 'fr' ? 'Mon conjoint' : 'My spouse'}</option>
                <option value="sibling">{language === 'fr' ? 'Mon frère/sœur' : 'My sibling'}</option>
                <option value="other">{language === 'fr' ? 'Autre' : 'Other'}</option>
              </select>
            </div>
            <button onClick={() => setStep(3)} disabled={!patientName || !patientAge || !patientRelation}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50">
              {language === 'fr' ? 'Continuer' : 'Continue'}
            </button>
          </div>
        </>
      )}

      {/* Step 2/3: Select Hospital */}
      {((step === 2 && bookingFor === 'self') || (step === 3 && bookingFor === 'other')) && (
        <>
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'fr' ? 'Choisir un Hôpital' : 'Choose a Hospital'}
          </h2>
          <div className="space-y-3">
            {hospitals.map(hospital => (
              <button
                key={hospital.id}
                onClick={() => { setSelectedHospital(hospital); setStep(step + 1); }}
                className={`w-full p-4 rounded-xl flex items-center gap-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md text-left`}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Building2 className="text-green-600" size={24} />
                </div>
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{hospital.name}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{hospital.city}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step 3/4: Select Doctor */}
      {((step === 3 && bookingFor === 'self') || (step === 4 && bookingFor === 'other')) && selectedHospital && (
        <>
          <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'fr' ? 'Choisir un Médecin' : 'Choose a Doctor'}
          </h2>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedHospital.name}</p>
          
          {/* Pricing Info */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-green-50'} rounded-xl p-3 mb-4 text-sm`}>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              {language === 'fr' ? 'Consultation générale: ' : 'General consultation: '}<strong>600 FCFA</strong> | 
              {language === 'fr' ? ' Spécialiste: ' : ' Specialist: '}<strong>2 000 FCFA</strong>
            </p>
          </div>

          <div className="space-y-3">
            {getDoctorsForHospital().map(doc => (
              <div key={doc.id} onClick={() => { setSelectedDoctor(doc); setStep(step + 1); }}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 flex gap-4 cursor-pointer shadow-md`}>
                <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{doc.name}</h3>
                  <p className="text-green-600 text-sm">{doc.specialty}</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'fr' ? 'Consultations: ' : 'Consultations: '}
                    {doc.consultationDays.map(d => language === 'fr' ? dayNames[d] : d).join(', ')}
                  </p>
                  <p className={`text-sm font-semibold mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{doc.fee.toLocaleString()} FCFA</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Step 4/5: Select Date and Time */}
      {((step === 4 && bookingFor === 'self') || (step === 5 && bookingFor === 'other')) && selectedDoctor && (
        <>
          <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'fr' ? 'Choisir Date et Heure' : 'Choose Date and Time'}
          </h2>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {selectedDoctor.name} - {language === 'fr' ? 'Jours disponibles: ' : 'Available days: '}
            {selectedDoctor.consultationDays.map(d => language === 'fr' ? dayNames[d] : d).join(', ')}
          </p>

          {/* ExpressCare Option */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 mb-4 shadow-md`}>
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Zap className="text-yellow-600" size={20} />
                </div>
                <div>
                  <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>ExpressCare</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'fr' ? 'Service prioritaire (+5 000 FCFA)' : 'Priority service (+5,000 FCFA)'}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={expressCare}
                onChange={(e) => setExpressCare(e.target.checked)}
                className="w-5 h-5 text-green-600 rounded"
              />
            </label>
          </div>

          {/* Date Selection */}
          <p className={`mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{language === 'fr' ? 'Date:' : 'Date:'}</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {getAvailableDays().filter(d => d.available).slice(0, 6).map(day => (
              <button key={day.date} onClick={() => setSelectedDate(day.date)}
                className={`p-3 rounded-xl text-center ${selectedDate === day.date ? 'bg-green-600 text-white' : darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md`}>
                <Calendar className={`mx-auto mb-1 ${selectedDate === day.date ? 'text-white' : 'text-green-600'}`} size={18} />
                <p className="text-xs font-medium">{day.dayName}</p>
                <p className="text-xs">{new Date(day.date).getDate()}/{new Date(day.date).getMonth() + 1}</p>
              </button>
            ))}
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <>
              <p className={`mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{language === 'fr' ? 'Heure:' : 'Time:'}</p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {timeSlots.map(time => (
                  <button key={time} onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg text-sm font-medium ${selectedTime === time ? 'bg-green-600 text-white' : darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md`}>
                    {time}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Summary and Confirm */}
          {selectedTime && (
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 mb-4 shadow-md`}>
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {language === 'fr' ? 'Résumé' : 'Summary'}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{language === 'fr' ? 'Consultation' : 'Consultation'}</span>
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>{selectedDoctor.fee.toLocaleString()} FCFA</span>
                </div>
                {expressCare && (
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>ExpressCare</span>
                    <span className={darkMode ? 'text-white' : 'text-gray-800'}>5 000 FCFA</span>
                  </div>
                )}
                <div className={`pt-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between font-semibold`}>
                  <span className={darkMode ? 'text-white' : 'text-gray-800'}>Total</span>
                  <span className="text-green-600">{(selectedDoctor.fee + (expressCare ? 5000 : 0)).toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>
          )}

          {selectedTime && (
            <button onClick={handleBook} className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold">
              {language === 'fr' ? 'Confirmer Rendez-vous' : 'Confirm Appointment'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default BookAppointment;
