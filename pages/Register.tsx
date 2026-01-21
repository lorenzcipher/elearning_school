
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
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl max-w-lg w-full border border-slate-100 relative overflow-hidden">
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-emerald-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-emerald-200">
              M
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">{TRANSLATIONS.register[language]}</h2>
            <p className="text-slate-500">Rejoignez la communauté MAAMRA School</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">{TRANSLATIONS.fullName[language]}</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-600 transition-all outline-none"
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
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-600 transition-all outline-none"
                placeholder="Ex: student@maamra.dz"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Mot de passe</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-600 transition-all outline-none"
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
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-600 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl font-medium">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={auth.isLoading}
              className="w-full bg-emerald-600 text-white py-5 rounded-2xl text-lg font-black shadow-xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center justify-center"
            >
              {auth.isLoading ? <i className="fas fa-spinner fa-spin mr-2"></i> : TRANSLATIONS.register[language]}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              {TRANSLATIONS.alreadyHaveAccount[language]} <Link to="/login" className="text-emerald-600 font-bold hover:underline">{TRANSLATIONS.login[language]}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
