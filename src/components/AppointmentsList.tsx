import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Calendar, Clock, User, Edit, X, AlertTriangle, Users, AlertCircle, RefreshCw } from 'lucide-react';

interface Appointment {
  id: string;
  doctorName: string;
  hospital: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'expired' | 'cancelled';
  queueNumber: number;
  estimatedWait: string;
  patientName: string | null;
  patientRelation: string | null;
  fee: number;
  specialty: string;
}

const mockAppointments: Appointment[] = [
  { 
    id: '1', 
    doctorName: 'Prof. Pefura Yone Eric Walter', 
    hospital: 'Hôpital Jamot Yaoundé', 
    date: '2025-12-10', 
    time: '09:00', 
    status: 'confirmed', 
    queueNumber: 5, 
    estimatedWait: '25 min', 
    patientName: null, 
    patientRelation: null,
    fee: 2000,
    specialty: 'Pneumologie'
  },
  { 
    id: '2', 
    doctorName: 'Dr. Daniel Ekoua', 
    hospital: 'Hôpital Jamot Yaoundé', 
    date: '2025-12-12', 
    time: '14:00', 
    status: 'pending', 
    queueNumber: 12, 
    estimatedWait: '45 min', 
    patientName: 'Jean Kamga Jr', 
    patientRelation: 'child',
    fee: 2000,
    specialty: 'Cardiologie'
  },
  { 
    id: '3', 
    doctorName: 'Dr. Tchokonté Nana', 
    hospital: 'Hôpital Jamot Yaoundé', 
    date: '2025-12-05', 
    time: '10:00', 
    status: 'expired', 
    queueNumber: 3, 
    estimatedWait: '15 min', 
    patientName: null, 
    patientRelation: null,
    fee: 2000,
    specialty: 'Neurologie'
  },
];

const AppointmentsList: React.FC = () => {
  const { darkMode, language, setCurrentPage } = useApp();
  const [appointments, setAppointments] = useState(mockAppointments);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [showCancelWarning, setShowCancelWarning] = useState(false);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'expired'>('all');

  const canCancel = (date: string) => {
    const apptDate = new Date(date);
    const today = new Date();
    const diffTime = apptDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 1;
  };

  const isExpired = (date: string, time: string) => {
    const apptDateTime = new Date(`${date}T${time}`);
    return apptDateTime < new Date();
  };

  const cancelAppointment = (id: string) => {
    setAppointments(appointments.filter(a => a.id !== id));
    setSelectedAppt(null);
    setShowCancelWarning(false);
  };

  const handleCancelClick = () => {
    if (selectedAppt && canCancel(selectedAppt.date)) {
      setShowCancelWarning(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'expired': return 'bg-red-100 text-red-700';
      case 'cancelled': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { en: string; fr: string }> = {
      confirmed: { en: 'Confirmed', fr: 'Confirmé' },
      pending: { en: 'Pending', fr: 'En attente' },
      expired: { en: 'Expired', fr: 'Expiré' },
      cancelled: { en: 'Cancelled', fr: 'Annulé' },
    };
    return labels[status]?.[language === 'fr' ? 'fr' : 'en'] || status;
  };

  const getRelationLabel = (relation: string | null) => {
    if (!relation) return null;
    const labels: Record<string, { fr: string; en: string }> = {
      child: { fr: 'Enfant', en: 'Child' },
      parent: { fr: 'Parent', en: 'Parent' },
      spouse: { fr: 'Conjoint', en: 'Spouse' },
      sibling: { fr: 'Frère/Sœur', en: 'Sibling' },
      other: { fr: 'Autre', en: 'Other' },
    };
    return labels[relation]?.[language === 'fr' ? 'fr' : 'en'] || relation;
  };

  const filteredAppointments = appointments.filter(appt => {
    if (filter === 'upcoming') return appt.status !== 'expired' && appt.status !== 'cancelled';
    if (filter === 'expired') return appt.status === 'expired';
    return true;
  });

  return (
    <div className={`min-h-screen pt-20 pb-24 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {language === 'fr' ? 'Mes Rendez-vous' : 'My Appointments'}
        </h2>
        <button onClick={() => setCurrentPage('book')} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          + {language === 'fr' ? 'Nouveau' : 'New'}
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {(['all', 'upcoming', 'expired'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === f 
                ? 'bg-green-600 text-white' 
                : darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
            } shadow-md`}
          >
            {f === 'all' ? (language === 'fr' ? 'Tous' : 'All') :
             f === 'upcoming' ? (language === 'fr' ? 'À venir' : 'Upcoming') :
             (language === 'fr' ? 'Expirés' : 'Expired')}
          </button>
        ))}
      </div>

      {filteredAppointments.length === 0 ? (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 text-center shadow-lg`}>
          <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            {language === 'fr' ? 'Aucun rendez-vous' : 'No appointments yet'}
          </p>
          <button onClick={() => setCurrentPage('book')} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-medium">
            {language === 'fr' ? 'Prendre Rendez-vous' : 'Book Now'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map(appt => (
            <div key={appt.id} onClick={() => setSelectedAppt(appt)}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-4 cursor-pointer ${
                appt.status === 'expired' ? 'opacity-75' : ''
              }`}>
              
              {/* Expired Banner */}
              {appt.status === 'expired' && (
                <div className="bg-red-100 text-red-700 px-3 py-2 rounded-lg mb-3 flex items-center gap-2">
                  <AlertCircle size={16} />
                  <span className="text-sm font-medium">
                    {language === 'fr' 
                      ? 'Votre rendez-vous a expiré. Veuillez reprogrammer.' 
                      : 'Your appointment has expired. Please reschedule.'}
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{appt.doctorName}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{appt.hospital}</p>
                  <p className="text-xs text-green-600 font-medium mt-1">{appt.specialty}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appt.status)}`}>
                  {getStatusLabel(appt.status)}
                </span>
              </div>

              {appt.patientName && (
                <div className={`flex items-center gap-2 mb-2 p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <Users size={14} className="text-blue-600" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'fr' ? 'Pour' : 'For'}: <strong>{appt.patientName}</strong> ({getRelationLabel(appt.patientRelation)})
                  </span>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm">
                <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Calendar size={14} /> {new Date(appt.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
                </span>
                <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Clock size={14} /> {appt.time}
                </span>
              </div>

              {appt.status !== 'expired' && appt.status !== 'cancelled' && (
                <div className={`mt-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'fr' ? 'File' : 'Queue'}: <strong className="text-green-600">#{appt.queueNumber}</strong> • 
                    {language === 'fr' ? ' Attente estimée' : ' Est. wait'}: <strong>{appt.estimatedWait}</strong>
                  </p>
                </div>
              )}

              {appt.status === 'expired' && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setCurrentPage('book'); }}
                  className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <RefreshCw size={16} />
                  {language === 'fr' ? 'Reprogrammer' : 'Reschedule'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Options Modal */}
      {selectedAppt && !showCancelWarning && selectedAppt.status !== 'expired' && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={() => setSelectedAppt(null)}>
          <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-t-3xl p-6`} onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'fr' ? 'Options' : 'Options'}
            </h3>
            
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 mb-4`}>
              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedAppt.doctorName}</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{selectedAppt.hospital}</p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {selectedAppt.date} • {selectedAppt.time}
              </p>
              <p className="text-green-600 font-semibold mt-2">{selectedAppt.fee.toLocaleString()} FCFA</p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => setCurrentPage('book')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <Edit className="text-green-600" size={20} /> 
                <span className={darkMode ? 'text-white' : 'text-gray-800'}>{language === 'fr' ? 'Modifier le rendez-vous' : 'Reschedule appointment'}</span>
              </button>
              
              {canCancel(selectedAppt.date) ? (
                <button onClick={handleCancelClick} className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-600">
                  <X size={20} /> {language === 'fr' ? 'Annuler le rendez-vous' : 'Cancel appointment'}
                </button>
              ) : (
                <div className={`w-full p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-2 text-yellow-600 mb-2">
                    <AlertTriangle size={16} />
                    <span className="font-medium">{language === 'fr' ? 'Annulation impossible' : 'Cannot cancel'}</span>
                  </div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'fr' 
                      ? 'Les annulations ne sont possibles que 24h avant le rendez-vous. Passé ce délai, aucun remboursement n\'est possible.' 
                      : 'Cancellations are only possible 24h before the appointment. After that, no refund is available.'}
                  </p>
                </div>
              )}
              
              <button onClick={() => setSelectedAppt(null)} className={`w-full p-4 rounded-xl ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {language === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelWarning && selectedAppt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6`}>
            <AlertTriangle className="text-yellow-500 mx-auto mb-4" size={48} />
            <h3 className={`text-xl font-bold text-center mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {language === 'fr' ? 'Confirmer l\'annulation?' : 'Confirm cancellation?'}
            </h3>
            <p className={`text-center text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'fr' 
                ? 'Vous serez remboursé car l\'annulation est faite plus de 24h avant le rendez-vous.' 
                : 'You will be refunded as cancellation is more than 24h before the appointment.'}
            </p>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-3 mb-4 text-sm`}>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                {language === 'fr' ? 'Montant remboursé: ' : 'Refund amount: '}
                <strong className="text-green-600">{selectedAppt.fee.toLocaleString()} FCFA</strong>
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCancelWarning(false)} className={`flex-1 p-3 rounded-xl font-medium ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {language === 'fr' ? 'Non' : 'No'}
              </button>
              <button onClick={() => cancelAppointment(selectedAppt.id)} className="flex-1 p-3 rounded-xl bg-red-600 text-white font-medium">
                {language === 'fr' ? 'Oui, annuler' : 'Yes, cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
