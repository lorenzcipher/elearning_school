
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK_COURSES, TRANSLATIONS } from '../constants';
import { Course } from '../types';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, enrollCourse, enrolledCourseIds } = useApp();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const foundCourse = MOCK_COURSES.find(c => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!course) return null;

  const isEnrolled = enrolledCourseIds.includes(course.id);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Banner */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title[language]} 
          className="w-full h-full object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 w-full text-center">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors font-bold uppercase tracking-widest text-xs">
              <i className="fas fa-arrow-left mr-2 rtl:ml-2 rtl:rotate-180"></i> Retour aux formations
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              {course.title[language]}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-slate-100">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
                <span className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-200">
                  {course.category}
                </span>
                <span className="text-slate-400 font-bold text-xs">
                  <i className="fas fa-users mr-1 rtl:ml-1"></i> {course.enrolledCount} Apprenants
                </span>
              </div>

              <h2 className="text-3xl font-black text-slate-800 mb-6">Description du programme</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-10 font-medium">
                {course.description[language]}
              </p>

              <div className="space-y-6">
                <h3 className="text-xl font-black text-slate-800">Ce que vous allez apprendre</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Maîtrise des fondamentaux du domaine",
                    "Projets pratiques en conditions réelles",
                    "Certificat reconnu par TAMKIN ACADEMY",
                    "Accès à vie aux ressources du cours",
                    "Support personnalisé des instructeurs",
                    "Réseautage avec des professionnels"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                      <div className="w-6 h-6 rounded-full bg-green-50 text-green-700 flex items-center justify-center shrink-0">
                        <i className="fas fa-check text-[10px]"></i>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
              <h3 className="text-2xl font-black text-slate-800 mb-8">Structure du Cursus</h3>
              <div className="space-y-4">
                {[
                  { title: "Introduction & Fondamentaux", duration: "2h 30min" },
                  { title: "Concepts Avancés et Architecture", duration: "4h 15min" },
                  { title: "Mise en pratique & Workshop", duration: "6h 00min" },
                  { title: "Examen Final & Certification", duration: "1h 30min" }
                ].map((module, idx) => (
                  <div key={idx} className="flex justify-between items-center p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400 group-hover:bg-[#bf953f] group-hover:text-white transition-all">
                        {idx + 1}
                      </div>
                      <span className="font-black text-slate-700">{module.title}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">{module.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden relative">
                <div className="absolute top-0 inset-x-0 h-2 bg-[#bf953f]"></div>
                <div className="text-center mb-8">
                  <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Investissement</div>
                  <div className="text-5xl font-black text-slate-900 tracking-tighter">
                    {course.price.toLocaleString()} <span className="text-sm font-bold text-[#bf953f]">{TRANSLATIONS.priceDA[language]}</span>
                  </div>
                </div>

                <button 
                  onClick={() => enrollCourse(course.id)}
                  disabled={isEnrolled}
                  className={`w-full py-6 rounded-2xl text-lg font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 ${
                    isEnrolled 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' 
                    : 'bg-green-700 text-white hover:bg-green-800 hover:-translate-y-1'
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      <i className="fas fa-check-circle"></i> Déjà Inscrit
                    </>
                  ) : (
                    <>
                      {TRANSLATIONS.enrollNow[language]}
                    </>
                  )}
                </button>

                <div className="mt-10 pt-10 border-t border-slate-100 space-y-4">
                  <div className="flex items-center justify-between text-sm font-bold text-slate-600">
                    <span>Durée totale</span>
                    <span className="text-slate-900">14 heures</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-slate-600">
                    <span>Langue</span>
                    <span className="text-slate-900">{language === 'ar' ? 'العربية' : 'Français'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-slate-600">
                    <span>Accès</span>
                    <span className="text-slate-900">Illimité</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                <h4 className="text-lg font-black mb-6 relative z-10">Instructeur Certifié</h4>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl font-black text-[#bf953f] border border-white/20">
                    T
                  </div>
                  <div>
                    <div className="font-black text-white">Expert Tamkin</div>
                    <div className="text-xs text-slate-400">Senior Professional Mentor</div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#bf953f]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
