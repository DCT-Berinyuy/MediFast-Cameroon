import React, { useState } from 'react';
import { AppProvider, useApp } from '../contexts/AppContext';
import Header from './Header';
import Navigation from './Navigation';
import BottomNav from './BottomNav';
import WelcomePage from './WelcomePage';
import SymptomChecker from './SymptomChecker';
import HospitalLocator from './HospitalLocator';
import BookAppointment from './BookAppointment';
import AppointmentsList from './AppointmentsList';
import EmergencyPage from './EmergencyPage';
import PaymentPage from './PaymentPage';
import ProfilePage from './ProfilePage';
import AboutPage from './AboutPage';
import PharmacyPage from './PharmacyPage';
import SimpleDashboard from './SimpleDashboard';
import DoctorsPage from './DoctorsPage';

const AppContent: React.FC = () => {
  const { currentPage, darkMode, simpleMode } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const renderPage = () => {
    if (simpleMode && currentPage === 'welcome') {
      return <SimpleDashboard />;
    }
    switch (currentPage) {
      case 'welcome': return <WelcomePage />;
      case 'symptoms': return <SymptomChecker />;
      case 'hospitals': return <HospitalLocator />;
      case 'book': return <BookAppointment />;
      case 'appointments': return <AppointmentsList />;
      case 'emergency': return <EmergencyPage />;
      case 'payment': return <PaymentPage />;
      case 'profile': return <ProfilePage />;
      case 'about': return <AboutPage />;
      case 'pharmacy': return <PharmacyPage />;
      case 'doctors': return <DoctorsPage />;
      default: return <WelcomePage />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Navigation isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="pb-20">
        {renderPage()}
      </main>
      <BottomNav />
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default AppLayout;
