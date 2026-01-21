
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';

const Contact: React.FC = () => {
  const { language, addNotification } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      addNotification('Message envoyé avec succès!', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">{TRANSLATIONS.contactUs[language]}</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">Notre équipe académique est à votre écoute pour toute question relative à nos programmes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Nom Complet</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-green-700 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">E-mail</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-green-700 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Sujet</label>
              <input 
                type="text" 
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-green-700 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Message</label>
              <textarea 
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-green-700 outline-none resize-none"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-green-700 text-white py-6 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-green-800 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Envoyer le Message'}
            </button>
          </form>
        </div>

        <div className="space-y-12 flex flex-col justify-center">
          <div className="flex gap-6">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-700 text-2xl shrink-0">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Localisation</h3>
              <p className="text-slate-500">Boulevard du 11 Décembre 1960, El Biar, Alger, Algérie.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-700 text-2xl shrink-0">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Téléphone</h3>
              <p className="text-slate-500">+213 (0) 23 45 67 89</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 text-2xl shrink-0">
              <i className="fas fa-envelope"></i>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800 mb-2">E-mail</h3>
              <p className="text-slate-500">contact@tamkin.dz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
