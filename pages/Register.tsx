
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';

const Register: React.FC = () => {
  const { register, auth, language } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Les mots de passe ne correspondent pas.');
      return;
    }

    const success = await register(name, email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Une erreur est survenue lors de l\'inscription.');
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#bf953f]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl max-w-lg w-full border border-slate-100 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center rounded-full border-4 border-[#bf953f] bg-white shadow-xl">
               <div className="bg-green-700 w-full h-full rounded-full flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-white text-4xl"></i>
               </div>
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">{TRANSLATIONS.register[language]}</h2>
            <p className="text-slate-500">Rejoignez la communauté TAMKIN ACADEMY</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{TRANSLATIONS.fullName[language]}</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-green-50 focus:border-green-700 outline-none"
                placeholder="Ex: Mohamed Amine"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">E-mail</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-green-50 focus:border-green-700 outline-none"
                placeholder="Ex: student@tamkin.dz"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Mot de passe</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-green-50 focus:border-green-700 outline-none"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{TRANSLATIONS.confirmPassword[language]}</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-green-50 focus:border-green-700 outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl font-medium border border-red-100">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={auth.isLoading}
              className="w-full bg-green-700 text-white py-5 rounded-2xl text-lg font-black shadow-xl shadow-green-100 hover:bg-green-800 transition-all flex items-center justify-center"
            >
              {auth.isLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : TRANSLATIONS.register[language]}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-bold">
              {TRANSLATIONS.alreadyHaveAccount[language]} <Link to="/login" className="text-green-700 font-bold hover:underline">{TRANSLATIONS.login[language]}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
