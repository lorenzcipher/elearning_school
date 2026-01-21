
import React from 'react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS } from '../constants';

const Footer: React.FC = () => {
  const { language } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-12 h-12 bg-white rounded-full border-2 border-[#bf953f] flex items-center justify-center p-1">
               <div className="w-full h-full bg-green-700 rounded-full flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-white text-lg"></i>
               </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white leading-none">TAMKIN ACADEMY</span>
              <span className="text-[10px] font-bold text-[#bf953f] tracking-widest mt-1">FORMER POUR PERFORMER</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            {TRANSLATIONS.heroSub[language]} Nous offrons des solutions d'apprentissage innovantes pour les professionnels et étudiants en Algérie.
          </p>
        </div>

        <div>
          <h4 className="text-white font-black mb-6 uppercase tracking-wider text-xs border-b border-green-800 pb-2 inline-block">Formations</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-green-400 transition-colors">Digital Technology</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Business & Management</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Language Proficiency</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Soft Skills Mastery</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black mb-6 uppercase tracking-wider text-xs border-b border-green-800 pb-2 inline-block">Academy</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-green-400 transition-colors">About Tamkin</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Our methodology</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Contact Support</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Official Certifications</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black mb-6 uppercase tracking-wider text-xs border-b border-green-800 pb-2 inline-block">Social Media</h4>
          <div className="flex space-x-4 rtl:space-x-reverse">
            <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-[#bf953f] transition-all text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-[#bf953f] transition-all text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-[#bf953f] transition-all text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="mt-6">
            <span className="text-xs font-bold text-slate-500 block mb-2 uppercase">Verified Member of</span>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center justify-center">
               <span className="text-[10px] font-black text-slate-300">ALGERIA EDTECH HUB</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-[10px] uppercase tracking-widest text-slate-500">
        <p>© {currentYear} TAMKIN ACADEMY - Algiers, Algeria. Registered Institution. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
