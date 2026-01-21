
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role, Language, AuthState } from '../types';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  auth: AuthState;
  language: Language;
  users: User[];
  enrolledCourseIds: string[];
  notifications: Notification[];
  setLanguage: (lang: Language) => void;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  updateUserRole: (userId: string, newRole: Role) => void;
  enrollCourse: (courseId: string) => void;
  logout: () => void;
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeNotification: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_USERS: User[] = [
  { id: 'admin-1', name: 'Administrateur Tamkin', email: 'admin@tamkin.dz', role: Role.ADMIN },
  { id: 'stud-1', name: 'Zinedine Zidane', email: 'student@tamkin.dz', role: Role.STUDENT },
  { id: 'inst-1', name: 'Lakhdar Belloumi', email: 'instructor@tamkin.dz', role: Role.INSTRUCTOR },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [users, setUsers] = useState<User[]>([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    const savedUsers = localStorage.getItem('school_users');
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    else setUsers(INITIAL_USERS);

    const savedEnrollments = localStorage.getItem('enrollments');
    if (savedEnrollments) setEnrolledCourseIds(JSON.parse(savedEnrollments));

    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang) setLanguage(savedLang);

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setAuth({ user: JSON.parse(savedUser), isAuthenticated: true, isLoading: false });
    } else {
      setAuth(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', language);
  }, [language]);

  useEffect(() => {
    if (users.length > 0) localStorage.setItem('school_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('enrollments', JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);

  const addNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeNotification(id), 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const login = async (email: string, pass: string) => {
    setAuth(prev => ({ ...prev, isLoading: true }));
    await new Promise(resolve => setTimeout(resolve, 800));
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setAuth({ user: foundUser, isAuthenticated: true, isLoading: false });
      localStorage.setItem('user', JSON.stringify(foundUser));
      addNotification(`Bienvenue, ${foundUser.name}!`, 'success');
      return true;
    }
    setAuth(prev => ({ ...prev, isLoading: false }));
    addNotification('Identifiants invalides.', 'error');
    return false;
  };

  const register = async (name: string, email: string, pass: string) => {
    setAuth(prev => ({ ...prev, isLoading: true }));
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = { id: `u-${Date.now()}`, name, email, role: Role.STUDENT };
    setUsers(prev => [...prev, newUser]);
    setAuth({ user: newUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem('user', JSON.stringify(newUser));
    addNotification('Compte créé avec succès!', 'success');
    return true;
  };

  const enrollCourse = (courseId: string) => {
    if (!auth.isAuthenticated) {
      addNotification('Veuillez vous connecter pour vous inscrire.', 'info');
      return;
    }
    if (enrolledCourseIds.includes(courseId)) {
      addNotification('Vous êtes déjà inscrit à ce cours.', 'info');
      return;
    }
    setEnrolledCourseIds(prev => [...prev, courseId]);
    addNotification('Inscription au cours réussie!', 'success');
  };

  const updateUserRole = (userId: string, newRole: Role) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    if (auth.user?.id === userId) {
      const updatedUser = { ...auth.user, role: newRole };
      setAuth(prev => ({ ...prev, user: updatedUser }));
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    addNotification('Rôle mis à jour avec succès.', 'success');
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false, isLoading: false });
    localStorage.removeItem('user');
    addNotification('Déconnecté avec succès.', 'info');
  };

  return (
    <AppContext.Provider value={{ 
      auth, language, users, enrolledCourseIds, notifications,
      setLanguage, login, register, logout, updateUserRole, enrollCourse, 
      addNotification, removeNotification 
    }}>
      {children}
      {/* Toast Notification UI */}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
        {notifications.map(n => (
          <div key={n.id} className={`px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 animate-fade-in-up transition-all ${
            n.type === 'success' ? 'bg-green-50 text-green-800 border-green-100' : 
            n.type === 'error' ? 'bg-red-50 text-red-800 border-red-100' : 
            'bg-blue-50 text-blue-800 border-blue-100'
          }`}>
            <i className={`fas ${n.type === 'success' ? 'fa-check-circle' : n.type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}`}></i>
            <span className="font-bold text-sm">{n.message}</span>
            <button onClick={() => removeNotification(n.id)} className="ml-2 text-current opacity-50 hover:opacity-100">
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
