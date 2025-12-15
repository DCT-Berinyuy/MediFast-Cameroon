import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface Appointment {
  id: string;
  doctorName: string;
  hospitalName: string;
  date: string;
  time: string;
  status: string;
  queueNumber?: number;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  simpleMode: boolean;
  setSimpleMode: (mode: boolean) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    welcome: 'Welcome to MboaMed',
    slogan: 'Fast Care, Less Waiting',
    login: 'Login',
    register: 'Register',
    symptoms: 'Symptom Checker',
    hospitals: 'Find Hospitals',
    appointments: 'My Appointments',
    emergency: 'Emergency',
    profile: 'My Profile',
    about: 'About Us',
    book: 'Book Appointment',
    payment: 'Payment',
    logout: 'Logout',
    pharmacy: 'Pharmacies',
    doctors: 'Our Doctors',
  },
  fr: {
    welcome: 'Bienvenue sur MboaMed',
    slogan: 'Soins Rapides, Moins d\'Attente',
    login: 'Connexion',
    register: 'S\'inscrire',
    symptoms: 'Vérificateur de Symptômes',
    hospitals: 'Trouver Hôpitaux',
    appointments: 'Mes Rendez-vous',
    emergency: 'Urgence',
    profile: 'Mon Profil',
    about: 'À Propos',
    book: 'Prendre Rendez-vous',
    payment: 'Paiement',
    logout: 'Déconnexion',
    pharmacy: 'Pharmacies',
    doctors: 'Nos Médecins',
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState('welcome');
  const [simpleMode, setSimpleMode] = useState(false);

  const t = (key: string) => translations[language][key] || key;

  return (
    <AppContext.Provider value={{
      language, setLanguage, darkMode,
      toggleDarkMode: () => setDarkMode(!darkMode),
      user, setUser, isLoggedIn: !!user,
      appointments, setAppointments,
      currentPage, setCurrentPage,
      simpleMode, setSimpleMode, t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
