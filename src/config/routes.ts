export const routes = {
  public: {
    home: "/",
    login: "/auth/login",
    register: "/auth/registro",
  },
  protected: {
    dashboard: "/dashboard",
    tasks: "/tareas",
    taskDetail: (id: string) => `/tareas/${id}`,
    labels: "/etiquetas",
    calendar: "/calendario",
    profile: "/perfil",
    adminHealth: "/admin/health",
  },
};

export const protectedNavLinks = [
  { label: "Panel", href: routes.protected.dashboard },
  { label: "Tareas", href: routes.protected.tasks },
  { label: "Calendario", href: routes.protected.calendar },
  { label: "Etiquetas", href: routes.protected.labels },
  { label: "Perfil", href: routes.protected.profile },
];

export const publicNavLinks = [
  { label: "Inicio", href: routes.public.home },
  { label: "Login", href: routes.public.login },
  { label: "Registro", href: routes.public.register },
];
