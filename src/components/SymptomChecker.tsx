import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Search, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

const symptomDatabase = [
  { symptom: 'chest pain', department: 'Cardiology', severity: 'urgent' },
  { symptom: 'heart', department: 'Cardiology', severity: 'urgent' },
  { symptom: 'headache', department: 'Neurology', severity: 'mild' },
  { symptom: 'migraine', department: 'Neurology', severity: 'moderate' },
  { symptom: 'fever', department: 'General Medicine', severity: 'mild' },
  { symptom: 'cough', department: 'General Medicine', severity: 'mild' },
  { symptom: 'broken', department: 'Orthopedics', severity: 'urgent' },
  { symptom: 'fracture', department: 'Orthopedics', severity: 'urgent' },
  { symptom: 'child', department: 'Pediatrics', severity: 'moderate' },
  { symptom: 'baby', department: 'Pediatrics', severity: 'moderate' },
  { symptom: 'pregnant', department: 'Maternity', severity: 'moderate' },
  { symptom: 'skin', department: 'Dermatology', severity: 'mild' },
  { symptom: 'eye', department: 'Ophthalmology', severity: 'moderate' },
  { symptom: 'stomach', department: 'Gastroenterology', severity: 'moderate' },
  { symptom: 'breathing', department: 'Emergency', severity: 'urgent' },
  { symptom: 'accident', department: 'Trauma', severity: 'urgent' },
];

const SymptomChecker: React.FC = () => {
  const { darkMode, setCurrentPage, language } = useApp();
  const [symptoms, setSymptoms] = useState('');
  const [results, setResults] = useState<typeof symptomDatabase>([]);
  const [checked, setChecked] = useState(false);

  const checkSymptoms = () => {
    const input = symptoms.toLowerCase();
    const matches = symptomDatabase.filter(s => input.includes(s.symptom));
    const unique = matches.filter((v, i, a) => a.findIndex(t => t.department === v.department) === i);
    setResults(unique.length ? unique : [{ symptom: '', department: 'General Medicine', severity: 'mild' }]);
    setChecked(true);
  };

  const getSeverityColor = (sev: string) => {
    if (sev === 'urgent') return 'bg-red-100 text-red-700 border-red-300';
    if (sev === 'moderate') return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-green-100 text-green-700 border-green-300';
  };

  const getSeverityIcon = (sev: string) => {
    if (sev === 'urgent') return <AlertCircle className="text-red-500" />;
    if (sev === 'moderate') return <AlertTriangle className="text-yellow-500" />;
    return <CheckCircle className="text-green-500" />;
  };

  return (
    <div className={`min-h-screen pt-20 pb-24 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 mb-6`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {language === 'fr' ? 'Vérificateur de Symptômes' : 'Symptom Checker'}
        </h2>
        <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {language === 'fr' ? 'Décrivez vos symptômes' : 'Describe your symptoms'}
        </p>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder={language === 'fr' ? 'Ex: J\'ai mal à la tête et de la fièvre...' : 'Ex: I have headache and fever...'}
          className={`w-full p-4 border rounded-xl h-32 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
        />
        <button
          onClick={checkSymptoms}
          className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <Search size={20} /> {language === 'fr' ? 'Analyser' : 'Check Symptoms'}
        </button>
      </div>

      {checked && (
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'fr' ? 'Départements Recommandés' : 'Recommended Departments'}
          </h3>
          {results.map((r, i) => (
            <div key={i} className={`p-4 rounded-xl border ${getSeverityColor(r.severity)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getSeverityIcon(r.severity)}
                  <div>
                    <p className="font-semibold">{r.department}</p>
                    <p className="text-sm capitalize">{r.severity}</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentPage('hospitals')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  {language === 'fr' ? 'Trouver' : 'Find'}
                </button>
              </div>
            </div>
          ))}
          {results.some(r => r.severity === 'urgent') && (
            <button
              onClick={() => setCurrentPage('emergency')}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold"
            >
              {language === 'fr' ? 'Accès Urgence' : 'Emergency Access'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
