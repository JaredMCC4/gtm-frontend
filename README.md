# Gestor de Tareas Moderno — Frontend (Next.js 16, App Router)

Esqueleto inicial alineado con las *historias*, *requerimientos* y *tecnologías* del backend (Spring Boot 3, JWT, MySQL). Arquitectura **feature-first**, separación de UI y contenedores, y tipos centralizados en `/types`.

## Stack y prácticas
- Next.js 16 (App Router) + TypeScript, Tailwind CSS v4.
- React Query para data fetching, React Hook Form + Zod para validaciones.
- UI ligera reutilizable en `src/shared/ui`; lógica por feature en `src/features`.
- Header con toggle de tema (claro/oscuro) y selector ES/EN persistentes.
- Env vars validadas con Zod en `src/lib/env.ts` (solo claves `NEXT_PUBLIC_*`).
- Tokens en `sessionStorage` como placeholder; mover a cookies HttpOnly en producción.

## Estructura principal
```
src
├─ app
│  ├─ (public)/           # Landing, login y registro
│  └─ (protected)/        # Dashboard, tareas, calendario, perfil, admin
├─ features/              # Feature-first (auth, tasks, labels, etc.)
│  └─ <feature>/
│     ├─ components/      # UI pura
│     └─ containers/      # Lógica y composición
├─ shared/                # Layout y UI reutilizable
├─ providers/             # Providers globales (auth, react-query)
├─ lib/                   # Helpers de API, env, tokens
└─ types/                 # Modelos y contratos TypeScript (Task, User, Auth...)
```

## Rutas iniciales
- Público: `/` (landing), `/auth/login`, `/auth/registro`.
- Protegido: `/dashboard`, `/tareas`, `/tareas/[id]`, `/calendario`, `/etiquetas`, `/perfil`, `/admin/health`.

## Configuración rápida
1) Copia `.env.example` a `.env.local` y ajusta:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:2828/api/v1
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<client-id-google>
NEXT_PUBLIC_GITHUB_CLIENT_ID=<client-id-github>
```
2) Instala dependencias y levanta el proyecto:
```
pnpm install
pnpm dev
```
3) El esqueleto usa datos mock. Conecta los contenedores (`features/*/containers`) a la API para traer datos reales (p. ej. `authService.login`, `GET /tareas`).

## todo
- Conectar `api-client` con endpoints reales y manejar refresh JWT.
- Reemplazar storage de tokens por cookies HttpOnly/`cookies()` en rutas protegidas.
- Añadir middleware de protección de rutas y manejo de roles.
- Integrar formularios de creación/edición (tareas, etiquetas, recordatorios, adjuntos).
- Añadir pruebas de componentes/servicios y hardening de seguridad (CSP, headers).

## OAuth Google/GitHub
- Configura en el backend los `redirect-uri` apuntando al frontend: `http://localhost:3000/auth/callback/google` y `/auth/callback/github` (presentes en `application-example.properties`).
- Coloca los client IDs públicos en `.env.local` (`NEXT_PUBLIC_GOOGLE_CLIENT_ID`, `NEXT_PUBLIC_GITHUB_CLIENT_ID`).
- El callback del frontend intercambia el `code` contra el backend en `/auth/oauth/login` y guarda el JWT en `sessionStorage`.
