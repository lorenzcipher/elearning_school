
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Role, Language, AuthState } from '../types';

interface AppContextType {
  auth: AuthState;
  language: Language;
  users: User[];
  setLanguage: (lang: Language) => void;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  updateUserRole: (userId: string, newRole: Role) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Mock Data for User Management Demo
const INITIAL_USERS: User[] = [
  { id: 'admin-1', name: 'Administrateur Maamra', email: 'admin@maamra.dz', role: Role.ADMIN },
  { id: 'stud-1', name: 'Zinedine Zidane', email: 'student@maamra.dz', role: Role.STUDENT },
  { id: 'inst-1', name: 'Lakhdar Belloumi', email: 'instructor@maamra.dz', role: Role.INSTRUCTOR },
  { id: 'stud-2', name: 'Riyad Mahrez', email: 'riyad@algeria.dz', role: Role.STUDENT },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [users, setUsers] = useState<User[]>([]);
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Load users from storage or default
    const savedUsers = localStorage.getItem('school_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers(INITIAL_USERS);
    }

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
    if (users.length > 0) {
      localStorage.setItem('school_users', JSON.stringify(users));
    }
  }, [users]);

  const login = async (email: string, pass: string) => {
    setAuth(prev => ({ ...prev, isLoading: true }));
    await new Promise(resolve => setTimeout(resolve, 800));

    const foundUser = users.find(u => u.email === email);
    // In this mock, we accept any pass if email is known for simplicity
    if (foundUser) {
      setAuth({ user: foundUser, isAuthenticated: true, isLoading: false });
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    
    setAuth(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const register = async (name: string, email: string, pass: string) => {
    setAuth(prev => ({ ...prev, isLoading: true }));
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      role: Role.STUDENT
    };

    setUsers(prev => [...prev, newUser]);
    setAuth({ user: newUser, isAuthenticated: true, isLoading: false });
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const updateUserRole = (userId: string, newRole: Role) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    
    // If updating current user, refresh auth state
    if (auth.user?.id === userId) {
      const updatedUser = { ...auth.user, role: newRole };
      setAuth(prev => ({ ...prev, user: updatedUser }));
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false, isLoading: false });
    localStorage.removeItem('user');
  };

  return (
    <AppContext.Provider value={{ auth, language, users, setLanguage, login, register, logout, updateUserRole }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
