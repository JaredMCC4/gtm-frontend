"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Language = "es" | "en";

type Messages = Record<string, string>;

const translations: Record<Language, Messages> = {
  es: {
    // Header & Nav
    brand: "GTM",
    home: "Inicio",
    features: "Características",
    pricing: "Precios",
    contact: "Contacto",
    support: "Soporte",
    dashboard: "Panel",
    tasks: "Tareas",
    calendar: "Calendario",
    labels: "Etiquetas",
    profile: "Perfil",
    adminHealth: "Salud",
    login: "Login",
    register: "Registro",
    themeLight: "Claro",
    themeDark: "Oscuro",
    language: "Idioma",
    
    // Footer
    footerTitle: "Gestor de Tareas Moderno",
    footerDesc: "Aplicación web para organizar tareas, subtareas, etiquetas y recordatorios.",
    
    // Hero Section
    heroTitle: "Organiza tus estudios, entregas y exámenes en un solo lugar.",
    heroDescription: "GTM es un gestor de tareas gratuito pensado para universitarios y estudiantes. Crea tareas, agrega recordatorios, organiza por materias y nunca más olvides una fecha de entrega.",
    heroCtaPrimary: "Crear cuenta gratis",
    heroCtaSecondary: "Ya tengo cuenta",
    statQuickRegister: "Registro rápido",
    statPrice: "Precio",
    statPriceValue: "Gratis",
    statFor: "Para",
    statForValue: "Estudiantes",
    
    // Hero Card
    heroCardTitle: "Mi semana",
    heroCardDay: "Miércoles, 10:30",
    heroCardToday: "Hoy",
    heroTask1: "Entregar ensayo de Historia",
    heroTask1Tag: "Urgente",
    heroTask2: "Estudiar para parcial de Cálculo",
    heroTask2Tag: "Examen",
    heroTask3: "Revisar proyecto de Programación",
    heroTask3Tag: "Proyecto",
    heroWeekLabel: "Esta semana",
    heroWeekTitle: "Semana de parciales",
    heroPending: "4 pendientes",
    
    // Features Section
    featuresLabel: "Todo lo que necesitas",
    featuresTitle: "Herramientas simples para organizar tu vida académica.",
    featuresDescription: "GTM te ayuda a tener claridad sobre tus pendientes, planificar tu semestre y reducir el estrés de olvidar entregas. Todo en una interfaz limpia que funciona de día y de noche.",
    
    // Feature Cards
    feature1Title: "Tareas y subtareas claras",
    feature1Desc: "Divide tus proyectos en pasos manejables. Ve qué sigue sin perder tiempo adivinando.",
    feature2Title: "Recordatorios que ayudan",
    feature2Desc: "Recibe alertas antes de tus entregas y exámenes. Nunca más olvides una fecha importante.",
    feature3Title: "Calendario visual",
    feature3Desc: "Vista semanal y mensual para planificar tu semestre. Ve todo de un vistazo.",
    feature4Title: "Etiquetas por materia",
    feature4Desc: "Organiza por curso, prioridad o tipo de tarea. Encuentra todo en segundos.",
    feature5Title: "Adjunta tus archivos",
    feature5Desc: "Guarda PDFs, apuntes y recursos junto a cada tarea. Todo en un solo lugar.",
    feature6Title: "Tus datos seguros",
    feature6Desc: "Sesiones protegidas y tu información a salvo mientras estudias.",
    
    // Why GTM Section
    whyLabel: "¿Por qué GTM?",
    whyTitle: "Estudia mejor, no más duro.",
    whyDescription: "Cuando sabes exactamente qué tienes que hacer y cuándo, puedes enfocarte en lo importante: aprender y aprobar. GTM te da esa claridad.",
    
    // Reason Cards
    reason1Title: "Menos estrés, más control",
    reason1Subtitle: "Sabe exactamente qué hacer día con día.",
    reason1Point1: "Vista diaria con tus prioridades claras.",
    reason1Point2: "Calendario con fechas de entrega visibles.",
    reason1Point3: "Indicadores de lo que vence pronto.",
    reason2Title: "Organiza tu semestre",
    reason2Subtitle: "Planifica trabajos, exámenes y proyectos.",
    reason2Point1: "Etiquetas por materia o curso.",
    reason2Point2: "Recordatorios antes de cada entrega.",
    reason2Point3: "Notas y archivos en cada tarea.",
    reason3Title: "Simple y confiable",
    reason3Subtitle: "Sin complicaciones, solo lo que necesitas.",
    reason3Point1: "Interfaz limpia y fácil de usar.",
    reason3Point2: "Funciona en light y dark mode.",
    reason3Point3: "Soporte disponible si tienes dudas.",
    
    // Pricing Section
    pricingLabel: "Planes",
    pricingTitle: "Gratis para siempre. Mejoras opcionales.",
    pricingDescription: "GTM es y será gratuito para todos los estudiantes. Si quieres apoyar el proyecto y obtener funciones extras, puedes hacerlo con un pago único.",
    
    // Student Plan
    planStudentName: "Estudiante",
    planStudentBadge: "Gratis para siempre",
    planStudentPrice: "$0",
    planStudentDesc: "Todo lo que necesitas para organizar tu vida académica sin pagar nada.",
    planStudentFeature1: "Tareas y subtareas ilimitadas",
    planStudentFeature2: "Etiquetas por materia y prioridad",
    planStudentFeature3: "Calendario semanal y mensual",
    planStudentFeature4: "Recordatorios básicos",
    planStudentFeature5: "Adjuntos básicos",
    planStudentCta: "Empezar gratis",
    
    // Contributor Plan
    planContributorName: "Contribuidor",
    planContributorBadge: "Pago único",
    planContributorPrice: "$4",
    planContributorPriceSuffix: "una sola vez",
    planContributorDesc: "Apoya el desarrollo de GTM y desbloquea funciones adicionales para siempre.",
    planContributorFeature1: "Todo lo del plan Estudiante",
    planContributorFeature2: "Recordatorios ilimitados por tarea",
    planContributorFeature3: "Adjuntos ampliados",
    planContributorFeature4Coming: "Próximamente:",
    planContributorFeature4: "Integración con IA",
    planContributorCta: "Contribuir con $4",
    planContributorNote: "Tu apoyo ayuda a mantener GTM gratuito para todos.",
    
    // Contact Section
    contactLabel: "¿Tienes dudas?",
    contactTitle: "Escríbenos cuando quieras",
    contactDescription: "Si tienes preguntas sobre cómo usar GTM o quieres sugerir mejoras, estamos aquí para ayudarte. Respuesta rápida y sin complicaciones.",
    contactCtaEmail: "Enviar correo",
    contactCtaGithub: "Ver repositorio",
    contactInfoTitle: "Contacto",
    contactInfoEmail: "Correo: jaredjosue888@gmail.com",
    contactInfoGithub: "GitHub: github.com/JaredMCC4",
    contactInfoResponse: "Respondo en menos de 24 horas.",
    
    // Final CTA Section
    ctaTitle: "Empieza a organizar tus estudios hoy",
    ctaDescription: "Crea tu cuenta en menos de 2 minutos, agrega tus materias como etiquetas y deja que GTM te ayude a no olvidar ninguna entrega.",
    ctaButton: "Empezar ahora",
  },
  en: {
    // Header & Nav
    brand: "GTM",
    home: "Home",
    features: "Features",
    pricing: "Pricing",
    contact: "Contact",
    support: "Support",
    dashboard: "Dashboard",
    tasks: "Tasks",
    calendar: "Calendar",
    labels: "Labels",
    profile: "Profile",
    adminHealth: "Health",
    login: "Login",
    register: "Sign Up",
    themeLight: "Light",
    themeDark: "Dark",
    language: "Language",
    
    // Footer
    footerTitle: "Modern Task Manager",
    footerDesc: "Web app to manage tasks, subtasks, labels and reminders.",
    
    // Hero Section
    heroTitle: "Organize your studies, assignments and exams in one place.",
    heroDescription: "GTM is a free task manager designed for college and university students. Create tasks, add reminders, organize by subjects and never miss a deadline again.",
    heroCtaPrimary: "Create free account",
    heroCtaSecondary: "I have an account",
    statQuickRegister: "Quick signup",
    statPrice: "Price",
    statPriceValue: "Free",
    statFor: "For",
    statForValue: "Students",
    
    // Hero Card
    heroCardTitle: "My week",
    heroCardDay: "Wednesday, 10:30",
    heroCardToday: "Today",
    heroTask1: "Submit History essay",
    heroTask1Tag: "Urgent",
    heroTask2: "Study for Calculus exam",
    heroTask2Tag: "Exam",
    heroTask3: "Review Programming project",
    heroTask3Tag: "Project",
    heroWeekLabel: "This week",
    heroWeekTitle: "Midterms week",
    heroPending: "4 pending",
    
    // Features Section
    featuresLabel: "Everything you need",
    featuresTitle: "Simple tools to organize your academic life.",
    featuresDescription: "GTM helps you have clarity on your pending tasks, plan your semester and reduce the stress of forgetting deadlines. All in a clean interface that works day and night.",
    
    // Feature Cards
    feature1Title: "Clear tasks and subtasks",
    feature1Desc: "Break down your projects into manageable steps. See what's next without guessing.",
    feature2Title: "Helpful reminders",
    feature2Desc: "Get alerts before your deadlines and exams. Never forget an important date again.",
    feature3Title: "Visual calendar",
    feature3Desc: "Weekly and monthly view to plan your semester. See everything at a glance.",
    feature4Title: "Labels by subject",
    feature4Desc: "Organize by course, priority or task type. Find everything in seconds.",
    feature5Title: "Attach your files",
    feature5Desc: "Save PDFs, notes and resources with each task. Everything in one place.",
    feature6Title: "Your data is safe",
    feature6Desc: "Protected sessions and your information safe while you study.",
    
    // Why GTM Section
    whyLabel: "Why GTM?",
    whyTitle: "Study smarter, not harder.",
    whyDescription: "When you know exactly what you have to do and when, you can focus on what matters: learning and passing. GTM gives you that clarity.",
    
    // Reason Cards
    reason1Title: "Less stress, more control",
    reason1Subtitle: "Know exactly what to do each day.",
    reason1Point1: "Daily view with your priorities clear.",
    reason1Point2: "Calendar with visible due dates.",
    reason1Point3: "Indicators of what's due soon.",
    reason2Title: "Organize your semester",
    reason2Subtitle: "Plan assignments, exams and projects.",
    reason2Point1: "Labels by subject or course.",
    reason2Point2: "Reminders before each deadline.",
    reason2Point3: "Notes and files in each task.",
    reason3Title: "Simple and reliable",
    reason3Subtitle: "No complications, just what you need.",
    reason3Point1: "Clean and easy-to-use interface.",
    reason3Point2: "Works in light and dark mode.",
    reason3Point3: "Support available if you have questions.",
    
    // Pricing Section
    pricingLabel: "Plans",
    pricingTitle: "Free forever. Optional upgrades.",
    pricingDescription: "GTM is and will be free for all students. If you want to support the project and get extra features, you can do so with a one-time payment.",
    
    // Student Plan
    planStudentName: "Student",
    planStudentBadge: "Free forever",
    planStudentPrice: "$0",
    planStudentDesc: "Everything you need to organize your academic life without paying anything.",
    planStudentFeature1: "Unlimited tasks and subtasks",
    planStudentFeature2: "Labels by subject and priority",
    planStudentFeature3: "Weekly and monthly calendar",
    planStudentFeature4: "Basic reminders",
    planStudentFeature5: "Basic attachments",
    planStudentCta: "Start free",
    
    // Contributor Plan
    planContributorName: "Contributor",
    planContributorBadge: "One-time payment",
    planContributorPrice: "$4",
    planContributorPriceSuffix: "once",
    planContributorDesc: "Support GTM development and unlock additional features forever.",
    planContributorFeature1: "Everything in Student plan",
    planContributorFeature2: "Unlimited reminders per task",
    planContributorFeature3: "Extended attachments",
    planContributorFeature4Coming: "Coming soon:",
    planContributorFeature4: "AI Integration",
    planContributorCta: "Contribute $4",
    planContributorNote: "Your support helps keep GTM free for everyone.",
    
    // Contact Section
    contactLabel: "Have questions?",
    contactTitle: "Write to us anytime",
    contactDescription: "If you have questions about how to use GTM or want to suggest improvements, we're here to help. Fast response and no hassle.",
    contactCtaEmail: "Send email",
    contactCtaGithub: "View repository",
    contactInfoTitle: "Contact",
    contactInfoEmail: "Email: jaredjosue888@gmail.com",
    contactInfoGithub: "GitHub: github.com/JaredMCC4",
    contactInfoResponse: "I respond within 24 hours.",
    
    // Final CTA Section
    ctaTitle: "Start organizing your studies today",
    ctaDescription: "Create your account in less than 2 minutes, add your subjects as labels and let GTM help you never miss a deadline.",
    ctaButton: "Start now",
  },
};

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const STORAGE_KEY = "gtm_lang";
const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("es");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === "es" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  const setLang = (next: Language) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = (key: string) => translations[lang][key] || key;

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t,
    }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  }
  return ctx;
}
