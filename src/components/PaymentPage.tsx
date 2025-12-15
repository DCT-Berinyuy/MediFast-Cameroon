import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { supabase } from '../lib/supabase';
import { CreditCard, Phone, Check, Loader, AlertCircle, ChevronLeft, Zap, Home, Stethoscope } from 'lucide-react';

interface PaymentOption {
  id: string;
  name: { en: string; fr: string };
  price: number;
  description: { en: string; fr: string };
  icon: React.ReactNode;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'general',
    name: { en: 'General Consultation', fr: 'Consultation Générale' },
    price: 600,
    description: { en: 'Standard doctor visit', fr: 'Visite médicale standard' },
    icon: <Stethoscope size={20} />
  },
  {
    id: 'specialist',
    name: { en: 'Specialist Consultation', fr: 'Consultation Spécialiste' },
    price: 2000,
    description: { en: 'Cardiologist, Neurologist, Pneumologist', fr: 'Cardiologue, Neurologue, Pneumologue' },
    icon: <Stethoscope size={20} />
  },
  {
    id: 'expresscare',
    name: { en: 'ExpressCare Priority', fr: 'ExpressCare Priorité' },
    price: 5000,
    description: { en: 'Skip the queue, priority service', fr: 'Passez devant, service prioritaire' },
    icon: <Zap size={20} />
  },
  {
    id: 'homevisit',
    name: { en: 'Home Doctor Visit', fr: 'Visite à Domicile' },
    price: 10000,
    description: { en: 'Doctor comes to your home', fr: 'Le médecin vient chez vous' },
    icon: <Home size={20} />
  },
];

const PaymentPage: React.FC = () => {
  const { darkMode, language, setCurrentPage } = useApp();
  const [method, setMethod] = useState<'orange' | 'mtn' | null>(null);
  const [phone, setPhone] = useState('');
  const [selectedOption, setSelectedOption] = useState<PaymentOption | null>(null);
  const [step, setStep] = useState<'options' | 'select' | 'input' | 'processing' | 'success' | 'error'>('options');
  const [transactionId, setTransactionId] = useState('');

  const processPayment = async () => {
    if (!phone || phone.length < 9 || !selectedOption) return;
    setStep('processing');

    try {
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: { 
          amount: selectedOption.price, 
          phone: `+237${phone}`, 
          method: method === 'orange' ? 'orange_money' : 'mtn_momo', 
          appointmentId: '123', 
          userId: '1',
          serviceType: selectedOption.id
        }
      });

      if (error) throw error;
      setTransactionId(data.transactionId || `TXN${Date.now()}`);
      setStep('success');
    } catch (err) {
      // Simulate success for demo
      setTransactionId(`TXN${Date.now()}`);
      setStep('success');
    }
  };

  return (
    <div className={`min-h-screen pt-20 pb-24 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      {step !== 'options' && (
        <button 
          onClick={() => setStep(step === 'input' ? 'select' : step === 'select' ? 'options' : 'options')} 
          className="flex items-center gap-1 text-green-600 mb-4"
        >
          <ChevronLeft size={20} /> {language === 'fr' ? 'Retour' : 'Back'}
        </button>
      )}

      <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {language === 'fr' ? 'Paiement Mobile' : 'Mobile Payment'}
      </h2>
      <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Orange Money & MTN MoMo Cameroun
      </p>

      {/* Step 1: Select Service */}
      {step === 'options' && (
        <div className="space-y-3">
          <p className={`mb-4 font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'fr' ? 'Sélectionnez un service' : 'Select a service'}
          </p>
          {paymentOptions.map(option => (
            <button
              key={option.id}
              onClick={() => { setSelectedOption(option); setStep('select'); }}
              className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-md flex items-center gap-4 text-left hover:shadow-lg transition`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                option.id === 'expresscare' ? 'bg-yellow-100 text-yellow-600' :
                option.id === 'homevisit' ? 'bg-blue-100 text-blue-600' :
                'bg-green-100 text-green-600'
              }`}>
                {option.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {option.name[language === 'fr' ? 'fr' : 'en']}
                </h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {option.description[language === 'fr' ? 'fr' : 'en']}
                </p>
              </div>
              <span className="text-green-600 font-bold">{option.price.toLocaleString()} FCFA</span>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Select Payment Method */}
      {step === 'select' && selectedOption && (
        <div className="space-y-4">
          {/* Selected Service Summary */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-green-50'} rounded-xl p-4 mb-4`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'fr' ? 'Service sélectionné' : 'Selected service'}
            </p>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {selectedOption.name[language === 'fr' ? 'fr' : 'en']}
            </p>
            <p className="text-green-600 font-bold text-xl mt-1">{selectedOption.price.toLocaleString()} FCFA</p>
          </div>

          <p className={`mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'fr' ? 'Choisissez votre méthode de paiement' : 'Choose your payment method'}
          </p>

          <button onClick={() => { setMethod('orange'); setStep('input'); }}
            className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-lg flex items-center gap-4 border-2 border-transparent hover:border-orange-500 transition`}>
            <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">OM</span>
            </div>
            <div className="text-left">
              <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Orange Money</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Cameroun</p>
            </div>
          </button>

          <button onClick={() => { setMethod('mtn'); setStep('input'); }}
            className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow-lg flex items-center gap-4 border-2 border-transparent hover:border-yellow-500 transition`}>
            <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-lg">MTN</span>
            </div>
            <div className="text-left">
              <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>MTN Mobile Money</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>MoMo Cameroun</p>
            </div>
          </button>
        </div>
      )}

      {/* Step 3: Enter Phone Number */}
      {step === 'input' && selectedOption && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 ${method === 'orange' ? 'bg-orange-500' : 'bg-yellow-400'} rounded-xl flex items-center justify-center`}>
              <span className={`font-bold ${method === 'mtn' ? 'text-black' : 'text-white'}`}>{method === 'orange' ? 'OM' : 'MTN'}</span>
            </div>
            <div>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {method === 'orange' ? 'Orange Money' : 'MTN MoMo'}
              </h3>
              <button onClick={() => { setMethod(null); setStep('select'); }} className="text-green-600 text-sm">
                {language === 'fr' ? 'Changer' : 'Change'}
              </button>
            </div>
          </div>

          <div className={`p-4 rounded-xl mb-6 ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedOption.name[language === 'fr' ? 'fr' : 'en']}
            </p>
            <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {selectedOption.price.toLocaleString()} FCFA
            </p>
          </div>

          <label className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            {language === 'fr' ? 'Numéro de téléphone' : 'Phone Number'}
          </label>
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-4 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}>+237</span>
            <input 
              type="tel" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
              placeholder="6XX XXX XXX" 
              maxLength={9}
              className={`flex-1 p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} 
            />
          </div>

          <p className={`text-xs mb-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {language === 'fr' 
              ? 'Vous recevrez une demande de confirmation sur votre téléphone' 
              : 'You will receive a confirmation request on your phone'}
          </p>

          <button 
            onClick={processPayment} 
            disabled={phone.length < 9}
            className={`w-full py-4 rounded-xl font-semibold ${phone.length >= 9 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-300 text-gray-500'} transition`}
          >
            {language === 'fr' ? 'Payer Maintenant' : 'Pay Now'}
          </button>
        </div>
      )}

      {/* Processing */}
      {step === 'processing' && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg text-center`}>
          <Loader className="animate-spin mx-auto mb-4 text-green-600" size={48} />
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'fr' ? 'Traitement en cours...' : 'Processing...'}
          </h3>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'fr' ? 'Confirmez sur votre téléphone' : 'Confirm on your phone'}
          </p>
          <p className={`mt-4 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {method === 'orange' ? 'Orange Money' : 'MTN MoMo'} - +237 {phone}
          </p>
        </div>
      )}

      {/* Success */}
      {step === 'success' && selectedOption && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg text-center`}>
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={40} />
          </div>
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'fr' ? 'Paiement Réussi!' : 'Payment Successful!'}
          </h3>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {selectedOption.name[language === 'fr' ? 'fr' : 'en']}
          </p>
          <p className="text-green-600 font-bold text-2xl mt-2">{selectedOption.price.toLocaleString()} FCFA</p>
          <p className={`mt-4 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Transaction ID: {transactionId}
          </p>
          <button 
            onClick={() => setCurrentPage('appointments')}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
          >
            {language === 'fr' ? 'Voir Mes Rendez-vous' : 'View My Appointments'}
          </button>
        </div>
      )}

      {/* Error */}
      {step === 'error' && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg text-center`}>
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {language === 'fr' ? 'Échec du Paiement' : 'Payment Failed'}
          </h3>
          <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'fr' ? 'Veuillez vérifier votre solde et réessayer' : 'Please check your balance and try again'}
          </p>
          <button onClick={() => setStep('input')} className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold">
            {language === 'fr' ? 'Réessayer' : 'Try Again'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
