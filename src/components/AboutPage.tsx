import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Heart, Users, Target, Mail, Phone, MapPin, Headphones, Shield, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { darkMode, language } = useApp();

  const team = [
    { name: 'Tchamba Djeukeu Mitterand Vanelli', role: language === 'fr' ? 'Chef de Projet' : 'Project Lead' },
    { name: 'Ngweth Yogo Manuella', role: language === 'fr' ? 'Développeuse Full-Stack' : 'Full-Stack Developer' },
    { name: 'Nzeko Kemegne Princess', role: language === 'fr' ? 'Designer UI/UX' : 'UI/UX Designer' },
    { name: 'Nwatsok Bryan Dimitry', role: language === 'fr' ? 'Développeur Backend' : 'Backend Developer' },
    { name: 'Mbekem Ndjock Pierre', role: language === 'fr' ? 'Analyste de Données' : 'Data Analyst' },
    { name: 'Nduku Ekam Steve', role: language === 'fr' ? 'Développeur Mobile' : 'Mobile Developer' },
    { name: 'Ombang Matong Bikouel', role: language === 'fr' ? 'Ingénieur DevOps' : 'DevOps Engineer' },
    { name: 'Tiomela Tatsabong Britney', role: language === 'fr' ? 'Testeur QA' : 'QA Tester' },
    { name: 'Tambu Daisy Tekum', role: language === 'fr' ? 'Marketing Digital' : 'Digital Marketing' },
    { name: 'Nkemtakeh Shanas', role: language === 'fr' ? 'Support Client' : 'Customer Support' },
  ];

  const stats = [
    { value: '50+', label: language === 'fr' ? 'Hôpitaux' : 'Hospitals' },
    { value: '10K+', label: language === 'fr' ? 'Utilisateurs' : 'Users' },
    { value: '25K+', label: language === 'fr' ? 'Rendez-vous' : 'Appointments' },
  ];

  const values = [
    { icon: <Heart className="text-red-500" size={24} />, title: language === 'fr' ? 'Compassion' : 'Compassion', desc: language === 'fr' ? 'Nous mettons les patients au cœur de tout' : 'We put patients at the heart of everything' },
    { icon: <Shield className="text-blue-500" size={24} />, title: language === 'fr' ? 'Confiance' : 'Trust', desc: language === 'fr' ? 'Sécurité et confidentialité garanties' : 'Security and privacy guaranteed' },
    { icon: <Award className="text-yellow-500" size={24} />, title: language === 'fr' ? 'Excellence' : 'Excellence', desc: language === 'fr' ? 'Qualité de service exceptionnelle' : 'Exceptional service quality' },
  ];

  return (
    <div className={`min-h-screen pt-20 pb-24 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-white font-bold text-3xl">M</span>
        </div>
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>MboaMed</h1>
        <p className="text-green-600 font-medium mt-1">{language === 'fr' ? 'Soins Rapides, Moins d\'Attente' : 'Fast Care, Less Waiting'}</p>
        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{language === 'fr' ? 'Par HealthTech Pioneers' : 'By HealthTech Pioneers'}</p>
      </div>

      {/* Mission */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-6 shadow-lg`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Target className="text-green-600" size={20} />
          </div>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{language === 'fr' ? 'Notre Mission' : 'Our Mission'}</h2>
        </div>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
          {language === 'fr' 
            ? 'Réduire les temps d\'attente dans les hôpitaux au Cameroun grâce à un système de réservation innovant. Nous voulons rendre les soins de santé accessibles, efficaces et dignes pour tous les Camerounais.' 
            : 'Reduce waiting times in hospitals across Cameroon through an innovative booking system. We want to make healthcare accessible, efficient, and dignified for all Cameroonians.'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div key={i} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 text-center shadow-md`}>
            <p className="text-2xl font-bold text-green-600">{stat.value}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-6 shadow-lg`}>
        <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {language === 'fr' ? 'Nos Valeurs' : 'Our Values'}
        </h2>
        <div className="space-y-4">
          {values.map((value, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {value.icon}
              </div>
              <div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{value.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{value.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hospital Reception - Mme Ekole */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-6 shadow-lg border-2 border-green-500`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Headphones className="text-green-600" size={20} />
          </div>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'fr' ? 'Accueil Hôpital' : 'Hospital Reception'}
          </h2>
        </div>
        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {language === 'fr' ? 'Contact pour orientation et urgences' : 'Contact for guidance & emergencies'}
        </p>
        
        <div className="flex items-start gap-4">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/692db78c383879166ccc73e9_1765206141158_1e83655e.png" 
            alt="Mme Ekole Odile Félicité"
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div>
            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Mme Ekole Odile Félicité
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              (Epouse Nduku)
            </p>
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {language === 'fr' ? 'Infirmière supérieure diplômée d\'État' : 'State Certified Senior Nurse'}
            </p>
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {language === 'fr' ? 'Major du service d\'Accueil et Urgences' : 'Head of Reception & Emergency Services'}
            </p>
          </div>
        </div>
        
        <a 
          href="tel:+237650031484"
          className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <Phone size={18} />
          650 031 484
        </a>
      </div>

      {/* Team */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 mb-6 shadow-lg`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Users className="text-green-600" size={20} />
          </div>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'fr' ? 'Notre Équipe' : 'Our Team'}
          </h2>
        </div>
        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          HealthTech Pioneers
        </p>
        <div className="space-y-3">
          {team.map((member, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>{member.name}</p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
        <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
        </h2>
        <div className="space-y-3">
          <a href="mailto:contact@mboamed.cm" className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
            <Mail className="text-green-600" size={20} /> 
            contact@mboamed.cm
          </a>
          <a href="tel:+237222000000" className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
            <Phone className="text-green-600" size={20} /> 
            +237 222 000 000
          </a>
          <div className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
            <MapPin className="text-green-600" size={20} /> 
            Yaoundé, Cameroun
          </div>
        </div>
      </div>
      
      <p className={`text-center mt-6 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        © 2025 MboaMed by HealthTech Pioneers
      </p>
    </div>
  );
};

export default AboutPage;
