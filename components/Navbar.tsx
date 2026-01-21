
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';
import LanguageSwitcher from './LanguageSwitcher';
import { Role } from '../types';

const Navbar: React.FC = () => {
  const { language, auth, logout } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'welcome' },
    { to: '/courses', label: 'courses' },
    { to: '/news', label: 'latestNews' },
    { to: '/contact', label: 'contactUs' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* Logo mimic based on uploaded image */}
            <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-2 border-[#bf953f] bg-white overflow-hidden p-1 shadow-sm">
               <div className="bg-green-600 w-full h-full rounded-full flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-white text-xl"></i>
               </div>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-black tracking-tighter text-slate-800">
                TAMKIN <span className="text-[#bf953f]">ACADEMY</span>
              </span>
              <span className="text-[10px] font-bold text-green-700 tracking-widest uppercase">
                {language === 'ar' ? 'أكاديمية تمكين' : 'Former pour performer'}
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="text-sm font-bold text-slate-600 hover:text-green-700 transition-colors">
                {TRANSLATIONS[link.label][language]}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher />
            {auth.isAuthenticated ? (
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Link to="/dashboard" className="text-sm font-semibold bg-green-50 text-green-700 px-4 py-2 rounded-full hover:bg-green-100 transition-all border border-green-100">
                   {TRANSLATIONS.dashboard[language]}
                </Link>
                <button onClick={handleLogout} className="text-sm font-bold text-red-600 hover:underline">
                  {TRANSLATIONS.logout[language]}
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-green-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-green-200 hover:bg-green-800 transition-all">
                {TRANSLATIONS.login[language]}
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-6 space-y-4 shadow-xl">
          {navLinks.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              onClick={() => setIsOpen(false)}
              className="block text-lg font-bold text-slate-700 hover:text-green-700"
            >
              {TRANSLATIONS[link.label][language]}
            </Link>
          ))}
          <hr />
          {auth.isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block font-bold text-green-700">
                {TRANSLATIONS.dashboard[language]}
              </Link>
              <button onClick={handleLogout} className="block text-red-600 font-bold">
                {TRANSLATIONS.logout[language]}
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block bg-green-700 text-white px-4 py-2 rounded-lg text-center font-bold">
              {TRANSLATIONS.login[language]}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
