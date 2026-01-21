
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';
import { geminiService } from '../services/geminiService';
import { TRANSLATIONS, MOCK_COURSES } from '../constants';

const Dashboard: React.FC = () => {
  const { auth, language, users, enrolledCourseIds, updateUserRole, addNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'main' | 'users' | 'my-courses' | 'messages' | 'profile'>('main');
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  if (!auth.isAuthenticated || !auth.user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center p-12 bg-white rounded-3xl shadow-xl max-w-md w-full border border-slate-100">
          <i className="fas fa-lock text-6xl text-slate-200 mb-6"></i>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Accès restreint</h2>
          <p className="text-slate-500 mb-8">Veuillez vous connecter pour accéder à votre espace Tamkin Academy.</p>
          <a href="#/login" className="inline-block bg-green-700 text-white px-10 py-3 rounded-full font-bold">Connexion</a>
        </div>
      </div>
    );
  }

  const handleAiAsk = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    setAiResponse('');
    const result = await geminiService.getTutorAdvice(aiInput, language);
    setAiResponse(result);
    setIsAiLoading(false);
  };

  const renderEnrolledCourses = () => {
    const enrolled = MOCK_COURSES.filter(c => enrolledCourseIds.includes(c.id));
    return (
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 animate-fade-in">
        <h3 className="text-2xl font-black text-slate-800 mb-8">Mes Formations</h3>
        {enrolled.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 mb-6">Vous n'êtes inscrit à aucune formation pour le moment.</p>
            <a href="#/" className="text-green-700 font-bold hover:underline">Explorer le catalogue</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolled.map(course => (
              <div key={course.id} className="flex gap-4 p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                <img src={course.image} className="w-24 h-24 object-cover rounded-xl" alt="" />
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-slate-800">{course.title[language]}</h4>
                  <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-widest">{course.category}</p>
                  <button onClick={() => addNotification('Accès au contenu bientôt disponible!', 'info')} className="mt-3 text-green-700 font-bold text-xs uppercase tracking-widest hover:underline">Reprendre →</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderUserManagement = () => (
    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-black text-slate-800">{TRANSLATIONS.manageUsers[language]}</h3>
        <button 
          onClick={() => setActiveTab('main')}
          className="text-slate-500 hover:text-green-700 font-bold flex items-center transition-colors"
        >
          <i className="fas fa-arrow-left mr-2 rtl:ml-2 rtl:rotate-180"></i> Retour
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left rtl:text-right">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400">
              <th className="pb-4 font-black text-[10px] uppercase tracking-[0.2em]">Membre</th>
              <th className="pb-4 font-black text-[10px] uppercase tracking-[0.2em]">E-mail</th>
              <th className="pb-4 font-black text-[10px] uppercase tracking-[0.2em]">Statut</th>
              <th className="pb-4 font-black text-[10px] uppercase tracking-[0.2em] text-center">Gestion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-6 flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-black text-slate-500 text-lg group-hover:bg-green-100 group-hover:text-green-700 transition-colors">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-bold text-slate-800">{user.name}</span>
                </td>
                <td className="py-6 text-sm text-slate-500">{user.email}</td>
                <td className="py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    user.role === Role.ADMIN ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                    user.role === Role.INSTRUCTOR ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                    'bg-green-100 text-green-700 border border-green-200'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-6 text-center">
                  <select 
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value as Role)}
                    className="text-xs bg-slate-100 border-none rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-200 font-bold text-slate-600"
                  >
                    {Object.values(Role).filter(r => r !== Role.GUEST).map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMainDashboard = () => (
    <>
      <div className="bg-slate-900 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-block px-4 py-1 rounded-full bg-[#bf953f] text-slate-900 text-[10px] font-black uppercase tracking-widest mb-4">
             Espace Apprenant Tamkin
          </div>
          <h2 className="text-4xl font-black mb-4">Content de vous revoir, {auth.user?.name.split(' ')[0]} !</h2>
          <p className="text-slate-400 max-w-lg leading-relaxed">
            Poursuivez votre formation aujourd'hui. L'excellence n'est pas une destination mais un voyage continu.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#bf953f]/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center space-x-6 rtl:space-x-reverse">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 text-2xl">
            <i className="fas fa-graduation-cap"></i>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Modules actifs</div>
            <div className="text-4xl font-black text-slate-900 tracking-tighter">{enrolledCourseIds.length.toString().padStart(2, '0')}</div>
          </div>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center space-x-6 rtl:space-x-reverse">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 text-2xl">
            <i className="fas fa-certificate"></i>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Certificats Tamkin</div>
            <div className="text-4xl font-black text-slate-900 tracking-tighter">01</div>
          </div>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center space-x-6 rtl:space-x-reverse">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 text-2xl">
            <i className="fas fa-clock"></i>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Heures validées</div>
            <div className="text-4xl font-black text-slate-900 tracking-tighter">42h</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 relative overflow-hidden group">
        <div className="relative z-10 flex items-center space-x-6 rtl:space-x-reverse mb-10">
          <div className="w-16 h-16 bg-green-700 rounded-[1.5rem] flex items-center justify-center text-white text-3xl shadow-xl shadow-green-200">
            <i className="fas fa-bolt"></i>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">Smart Tamkin Assistant</h3>
          </div>
        </div>
        <div className="space-y-6 relative z-10">
          <div className="relative">
            <textarea 
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ex: Quelle est la méthodologie pédagogique de Tamkin ?"
              className="w-full p-8 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:ring-8 focus:ring-green-50 focus:border-green-700 outline-none min-h-[150px] font-medium text-slate-700"
            />
            <button 
              onClick={handleAiAsk}
              disabled={isAiLoading}
              className="absolute bottom-6 right-6 bg-slate-900 text-white p-6 rounded-2xl hover:bg-green-700 transition-all disabled:opacity-50"
            >
              {isAiLoading ? <i className="fas fa-sync fa-spin"></i> : <i className="fas fa-location-arrow"></i>}
            </button>
          </div>
          {aiResponse && (
            <div className="p-10 bg-green-50 border border-green-100 rounded-[2.5rem] text-green-900 animate-fade-in shadow-sm">
              <p className="text-lg font-medium">{aiResponse}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-center relative overflow-hidden group">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-700 via-[#bf953f] to-green-700"></div>
            <div className="w-28 h-28 bg-green-50 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-slate-50 shadow-inner">
              <span className="text-4xl font-black text-green-700">{auth.user?.name.charAt(0)}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{auth.user?.name}</h3>
            <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black mt-4 uppercase tracking-[0.2em] shadow-sm border ${
              auth.user?.role === Role.ADMIN ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-400 border-slate-100'
            }`}>
              {auth.user?.role}
            </span>
          </div>

          <div className="bg-white p-3 rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
            <button 
              onClick={() => setActiveTab('main')}
              className={`w-full text-left px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center ${activeTab === 'main' ? 'bg-green-700 text-white shadow-xl shadow-green-100' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <i className="fas fa-tachometer-alt mr-4 rtl:ml-4"></i> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('my-courses')}
              className={`w-full text-left px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center ${activeTab === 'my-courses' ? 'bg-green-700 text-white shadow-xl shadow-green-100' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <i className="fas fa-book-open mr-4 rtl:ml-4"></i> Mes Cursus
            </button>
            <button 
              onClick={() => { setActiveTab('messages'); addNotification('Service de messagerie bientôt activé!', 'info'); }}
              className={`w-full text-left px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center ${activeTab === 'messages' ? 'bg-green-700 text-white shadow-xl shadow-green-100' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <i className="fas fa-comments mr-4 rtl:ml-4"></i> Messagerie
            </button>
            <button 
              onClick={() => { setActiveTab('profile'); addNotification('Édition du profil bientôt disponible!', 'info'); }}
              className={`w-full text-left px-8 py-5 rounded-2xl font-black text-sm uppercase tracking-wider transition-all flex items-center ${activeTab === 'profile' ? 'bg-green-700 text-white shadow-xl shadow-green-100' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <i className="fas fa-id-card mr-4 rtl:ml-4"></i> Profil
            </button>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-12">
          {activeTab === 'main' && renderMainDashboard()}
          {activeTab === 'users' && renderUserManagement()}
          {activeTab === 'my-courses' && renderEnrolledCourses()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
