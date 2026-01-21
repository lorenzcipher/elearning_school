
import React from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useApp();

  return (
    <div className="flex space-x-2 rtl:space-x-reverse bg-slate-100 rounded-full p-1 border border-slate-200">
      {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${
            language === lang 
            ? 'bg-emerald-600 text-white shadow-sm' 
            : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
