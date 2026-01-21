
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';

const Login: React.FC = () => {
  const { login, auth, language } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError(language === 'ar' ? 'بيانات الاعتماد غير صالحة' : 'Identifiants invalides pour Tamkin Academy. Vérifiez vos accès.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#bf953f]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl max-w-xl w-full border border-slate-100 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center rounded-full border-4 border-[#bf953f] bg-white shadow-xl">
               <div className="bg-green-700 w-full h-full rounded-full flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-white text-4xl"></i>
               </div>
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-4">{TRANSLATIONS.login[language]}</h2>
            <p className="text-slate-400 font-medium">Rejoignez votre plateforme de performance académique</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-2">Identifiant Institutionnel</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:ring-8 focus:ring-green-50 focus:border-green-700 transition-all outline-none font-bold text-slate-700"
                placeholder="Ex: expert@tamkin.dz"
              />
            </div>
            <div>
              <div className="flex justify-between mb-3 px-2">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Clé d'accès</label>
                <a href="#" className="text-xs font-black text-[#bf953f] hover:underline uppercase tracking-widest">Aide ?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:ring-8 focus:ring-green-50 focus:border-green-700 transition-all outline-none font-bold text-slate-700"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-5 bg-red-50 text-red-600 text-sm rounded-2xl font-bold border border-red-100 animate-shake">
                <i className="fas fa-exclamation-triangle mr-2"></i> {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={auth.isLoading}
              className="w-full bg-green-700 text-white py-6 rounded-[1.5rem] text-lg font-black uppercase tracking-widest shadow-2xl shadow-green-100 hover:bg-green-800 hover:-translate-y-1 transition-all flex items-center justify-center active:scale-95"
            >
              {auth.isLoading ? <i className="fas fa-circle-notch fa-spin mr-2"></i> : TRANSLATIONS.login[language]}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-400 font-bold">
              {TRANSLATIONS.noAccountYet[language]} <Link to="/register" className="text-green-700 font-black hover:underline">{TRANSLATIONS.register[language]}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
