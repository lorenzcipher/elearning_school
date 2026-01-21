
import { TranslationStrings } from './types';

export const APP_NAME = "TAMKIN ACADEMY";

export const TRANSLATIONS: TranslationStrings = {
  welcome: {
    fr: "Bienvenue à TAMKIN ACADEMY",
    en: "Welcome to TAMKIN ACADEMY",
    ar: "مرحباً بكم في أكاديمية تمكين"
  },
  heroSub: {
    fr: "Former pour performer : L'excellence éducative au service de votre avenir.",
    en: "Train to perform: Educational excellence for your future.",
    ar: "نُكوّن لنُطوّر: التميز التعليمي في خدمة مستقبلك."
  },
  exploreCourses: {
    fr: "Explorer les formations",
    en: "Explore Courses",
    ar: "استكشف الدورات"
  },
  latestNews: {
    fr: "Dernières actualités",
    en: "Latest News",
    ar: "آخر الأخبار"
  },
  contactUs: {
    fr: "Contactez-nous",
    en: "Contact Us",
    ar: "اتصل بنا"
  },
  dashboard: {
    fr: "Tableau de bord",
    en: "Dashboard",
    ar: "لوحة التحكم"
  },
  login: {
    fr: "Connexion",
    en: "Login",
    ar: "تسجيل الدخول"
  },
  register: {
    fr: "S'inscrire",
    en: "Register",
    ar: "إنشاء حساب"
  },
  logout: {
    fr: "Déconnexion",
    en: "Logout",
    ar: "تسجيل الخروج"
  },
  adminSpace: {
    fr: "Espace Admin",
    en: "Admin Space",
    ar: "فضاء المدير"
  },
  courses: {
    fr: "Formations",
    en: "Courses",
    ar: "الدورات التكوينية"
  },
  profile: {
    fr: "Profil",
    en: "Profile",
    ar: "الملف الشخصي"
  },
  priceDA: {
    fr: "DA",
    en: "DA",
    ar: "د.ج"
  },
  enrollNow: {
    fr: "S'inscrire maintenant",
    en: "Enroll Now",
    ar: "سجل الآن"
  },
  fullName: {
    fr: "Nom complet",
    en: "Full Name",
    ar: "الاسم الكامل"
  },
  confirmPassword: {
    fr: "Confirmer le mot de passe",
    en: "Confirm Password",
    ar: "تأكيد كلمة المرور"
  },
  alreadyHaveAccount: {
    fr: "Vous avez déjà un compte ?",
    en: "Already have an account?",
    ar: "لديك حساب بالفعل؟"
  },
  noAccountYet: {
    fr: "Pas encore de compte ?",
    en: "No account yet?",
    ar: "ليس لديك حساب بعد؟"
  },
  manageUsers: {
    fr: "Gérer les utilisateurs",
    en: "Manage Users",
    ar: "إدارة المستخدمين"
  },
  userRole: {
    fr: "Rôle de l'utilisateur",
    en: "User Role",
    ar: "دور المستخدم"
  },
  actions: {
    fr: "Actions",
    en: "Actions",
    ar: "إجراءات"
  },
  save: {
    fr: "Enregistrer",
    en: "Save",
    ar: "حفظ"
  }
};

export const MOCK_COURSES = [
  {
    id: "1",
    title: { fr: "Développement Web Fullstack", en: "Fullstack Web Development", ar: "تطوير الويب الشامل" },
    description: { fr: "Maîtrisez React, Node.js et MongoDB avec les experts de Tamkin.", en: "Master React, Node.js and MongoDB with Tamkin experts.", ar: "أتقن React و Node.js و MongoDB مع خبراء تمكين." },
    category: "IT",
    price: 45000,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    instructorId: "inst1",
    enrolledCount: 120
  },
  {
    id: "2",
    title: { fr: "Anglais Professionnel", en: "Professional English", ar: "الإنجليزية المهنية" },
    description: { fr: "Améliorez votre communication avec notre méthode intensive.", en: "Improve your communication with our intensive method.", ar: "حسن مهارات التواصل لديك بمنهجيتنا المكثفة." },
    category: "Languages",
    price: 15000,
    image: "https://images.unsplash.com/photo-1543167664-40d1ae00b3e6?auto=format&fit=crop&w=800&q=80",
    instructorId: "inst2",
    enrolledCount: 85
  },
  {
    id: "3",
    title: { fr: "Leadership & Management", en: "Leadership & Management", ar: "القيادة والإدارة" },
    description: { fr: "Devenez le leader de demain chez Tamkin Academy.", en: "Become tomorrow's leader at Tamkin Academy.", ar: "كن قائد الغد في أكاديمية تمكين." },
    category: "Business",
    price: 25000,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    instructorId: "inst1",
    enrolledCount: 64
  }
];

export const MOCK_NEWS = [
  {
    id: "n1",
    title: { fr: "Inscriptions Ouvertes 2024", en: "Registration Open 2024", ar: "فتح التسجيلات لعام 2024" },
    content: { fr: "Rejoignez la promotion 2024 de Tamkin Academy...", en: "Join the 2024 class of Tamkin Academy...", ar: "انضم إلى دفعة 2024 في أكاديمية تمكين..." },
    date: "2024-05-15",
    image: "https://images.unsplash.com/photo-1523050335191-51ff1867144e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "n2",
    title: { fr: "Partenariat avec Google Cloud", en: "Partnership with Google Cloud", ar: "شراكة مع Google Cloud" },
    content: { fr: "Nos étudiants auront désormais accès à...", en: "Our students will now have access to...", ar: "سيتمكن طلابنا الآن من الوصول إلى..." },
    date: "2024-04-10",
    image: "https://images.unsplash.com/photo-1573166364524-d9dbfd8bbf83?auto=format&fit=crop&w=400&q=80"
  }
];
