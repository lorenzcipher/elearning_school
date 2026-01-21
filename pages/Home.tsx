
import React from 'react';
import { useApp } from '../context/AppContext';
import { TRANSLATIONS, MOCK_COURSES, MOCK_NEWS } from '../constants';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover brightness-[0.3]" 
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900 opacity-60"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in-up">
          <div className="mb-6 inline-block">
             <span className="bg-[#bf953f] text-slate-900 text-xs font-black uppercase tracking-[0.3em] px-6 py-2 rounded-full shadow-lg">
                Excellence Certifiée
             </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            {TRANSLATIONS.welcome[language]}
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            {TRANSLATIONS.heroSub[language]}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/courses" className="bg-green-700 text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl shadow-green-900/40 hover:bg-green-800 hover:scale-105 transition-all w-full sm:w-auto">
              {TRANSLATIONS.exploreCourses[language]}
            </Link>
            <Link to="/contact" className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all w-full sm:w-auto">
              {TRANSLATIONS.contactUs[language]}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 space-y-4 md:space-y-0 text-center md:text-left">
          <div>
            <span className="text-[#bf953f] font-black uppercase tracking-widest text-sm block mb-2">Nos Programmes d'Élite</span>
            <h2 className="text-4xl font-black text-slate-800">{TRANSLATIONS.courses[language]}</h2>
          </div>
          <Link to="/courses" className="text-green-700 font-bold hover:underline group flex items-center">
            Explorer le catalogue <i className="fas fa-arrow-right ml-2 rtl:mr-2 rtl:rotate-180 group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {MOCK_COURSES.map(course => (
            <div key={course.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src={course.image} alt={course.title[language]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black text-[#bf953f] shadow-md uppercase tracking-wider border border-[#bf953f]/20">
                  {course.category}
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-green-700 transition-colors leading-tight">{course.title[language]}</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed line-clamp-3">{course.description[language]}</p>
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">{course.price.toLocaleString()} <span className="text-xs text-slate-400 font-bold">{TRANSLATIONS.priceDA[language]}</span></span>
                  </div>
                  <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-green-700 transition-colors shadow-lg shadow-slate-200">
                    {TRANSLATIONS.enrollNow[language]}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section with Gold Branding */}
      <section className="bg-gradient-to-br from-green-800 to-green-900 py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white relative z-10">
          <div className="space-y-2">
            <div className="text-6xl font-black tracking-tighter text-[#bf953f]">5K+</div>
            <div className="text-green-100 font-bold uppercase tracking-[0.2em] text-[10px] opacity-70">Diplômés</div>
          </div>
          <div className="space-y-2">
            <div className="text-6xl font-black tracking-tighter text-[#bf953f]">50+</div>
            <div className="text-green-100 font-bold uppercase tracking-[0.2em] text-[10px] opacity-70">Experts Tamkin</div>
          </div>
          <div className="space-y-2">
            <div className="text-6xl font-black tracking-tighter text-[#bf953f]">120+</div>
            <div className="text-green-100 font-bold uppercase tracking-[0.2em] text-[10px] opacity-70">Modules Pro</div>
          </div>
          <div className="space-y-2">
            <div className="text-6xl font-black tracking-tighter text-[#bf953f]">100%</div>
            <div className="text-green-100 font-bold uppercase tracking-[0.2em] text-[10px] opacity-70">Succès Pro</div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-green-700 font-black uppercase tracking-[0.3em] text-xs">Actualité de l'Académie</span>
          <h2 className="text-4xl font-black text-slate-800 mt-4">{TRANSLATIONS.latestNews[language]}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {MOCK_NEWS.map(news => (
            <div key={news.id} className="group flex flex-col sm:flex-row bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-50">
              <div className="w-full sm:w-64 h-64 sm:h-auto overflow-hidden">
                <img src={news.image} alt={news.title[language]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#bf953f]"></span>
                  <span className="text-[#bf953f] text-[10px] font-black uppercase tracking-widest">{news.date}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-4 leading-tight">{news.title[language]}</h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{news.content[language]}</p>
                <button className="text-slate-900 font-black text-xs uppercase tracking-wider hover:text-green-700 transition-colors self-start flex items-center">
                   Lire le communiqué <i className="fas fa-chevron-right ml-2 rtl:mr-2 rtl:rotate-180 text-[10px]"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
