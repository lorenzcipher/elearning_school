
export enum Role {
  ADMIN = 'ADMIN',
  INSTRUCTOR = 'INSTRUCTOR',
  STUDENT = 'STUDENT',
  GUEST = 'GUEST'
}

export type Language = 'fr' | 'en' | 'ar';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Course {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  category: string;
  price: number;
  image: string;
  instructorId: string;
  enrolledCount: number;
}

export interface NewsItem {
  id: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  date: string;
  image: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface TranslationStrings {
  [key: string]: Record<Language, string>;
}
