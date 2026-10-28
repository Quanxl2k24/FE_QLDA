<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AI Agent Guidelines — Next.js Feature-Driven Architecture

You are a Senior Frontend Engineer specializing in **Next.js (App Router), TypeScript, Tailwind CSS, and Feature-Driven Architecture**. When writing code, refactoring, or building new features in this repository, you **MUST** strictly adhere to the directory structure and architectural rules defined below.

---

## 1. Standard Project Structure

```text
my-next-app/
├── .env.example
├── .env.local
├── next.config.mjs
├── package.json
├── tsconfig.json
├── public/                     # Static assets (fonts, static icons, images)
│   └── images/
└── src/
    ├── app/                    # Next.js App Router (ONLY for Routing & Layouts)
    │   ├── (auth)/             # Route groups (do not affect URL path)
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   └── register/
    │   │       └── page.tsx
    │   ├── (dashboard)/
    │   │   ├── layout.tsx
    │   │   └── dashboard/
    │   │       └── page.tsx
    │   ├── api/                # Route Handlers (BFF / Internal API endpoints)
    │   │   └── webhooks/
    │   ├── global-error.tsx
    │   ├── layout.tsx          # Root layout
    │   ├── not-found.tsx
    │   └── page.tsx            # Landing page
    │
    ├── components/             # System-wide reusable UI components
    │   ├── ui/                 # Atomic UI primitives (Button, Input, Modal, Badge...)
    │   │   ├── button.tsx
    │   │   └── input.tsx
    │   ├── feedback/           # Toast, Spinner, Skeleton, EmptyState
    │   └── navigation/         # Header, Footer, Sidebar, Breadcrumb
    │
    ├── config/                 # Global static configurations
    │   ├── env.ts              # Environment variables validation using Zod/Valibot
    │   └── site.ts             # Static metadata, SEO defaults, constants
    │
    ├── features/               # FEATURE-DRIVEN CORE (Domain/Business modules)
    │   ├── auth/
    │   │   ├── api/            # Feature-specific Server Actions, React Query hooks, fetchers
    │   │   ├── components/     # Feature-specific UI components (LoginForm, OAuthButton)
    │   │   ├── hooks/          # Feature-specific custom hooks
    │   │   ├── types/          # Feature-specific TypeScript types/interfaces
    │   │   ├── schemas/        # Zod validation schemas (LoginSchema, RegisterSchema)
    │   │   └── index.ts        # Public API (Barrel export) — expose only what external modules need
    │   └── billing/
    │       ├── api/
    │       ├── components/
    │       ├── hooks/
    │       └── index.ts
    │
    ├── hooks/                  # Global hooks (useMediaQuery, useDebounce, useLocalStorage...)
    │
    ├── lib/                    # Third-party library configurations and wrappers
    │   ├── fetcher.ts          # Axios or custom Fetch API instance
    │   ├── query-client.ts     # TanStack Query configuration
    │   ├── supabase.ts         # Supabase / Firebase / Prisma client
    │   └── utils.ts            # clsx / tailwind-merge helper (cn function)
    │
    ├── providers/              # React Context / State Providers wrapping the app
    │   ├── query-provider.tsx
    │   ├── theme-provider.tsx
    │   └── index.tsx           # Combined providers to keep root layout clean
    │
    ├── stores/                 # Global client state management (Zustand, Jotai, Redux)
    │   └── user-store.ts
    │
    ├── styles/                 # Global CSS, Tailwind base styles
    │   └── globals.css
    │
    └── types/                  # Global TypeScript types (App-wide interfaces, Common DTOs)
        ├── api.ts
        └── index.ts
```

---

## 2. Core Architectural Rules

### 2.1. "Thin Router, Fat Feature" Principle
* **The `src/app/` directory** MUST ONLY contain logic related to:
  * Routing, nested layouts (`layout.tsx`), error boundaries (`error.tsx`), and loading states (`loading.tsx`).
  * Metadata and SEO declarations (`generateMetadata`).
  * Top-level Server Component data fetching to pass down into Feature Components.
* **DO NOT** define complex forms, client state, custom hooks, or scattered business logic directly inside `page.tsx`. Encapsulate them inside `src/features/[feature-name]/components/` and import them into `page.tsx`.

### 2.2. Feature Encapsulation & Strict Boundaries
* Every business domain (e.g., `auth`, `billing`, `products`, `checkout`) must live in its own dedicated folder under `src/features/`.
* **Barrel Exports (`index.ts`):** Every feature folder in `src/features/[feature-name]/` must have an `index.ts` file at its root. External consumers (such as `src/app/` or other features) **MUST ONLY** import via this barrel file.
  * ✅ DO: `import { LoginForm, useAuth } from "@/features/auth";`
  * ❌ DON'T: `import { LoginForm } from "@/features/auth/components/login-form";`
* **Unidirectional Dependency Flow (No Upward or Cross-Feature Imports):**
  * Shared layers (`src/components/`, `src/hooks/`, `src/lib/`, `src/types/`) **MUST NEVER** import anything from `src/features/` or `src/app/`.
  * Avoid direct imports between different features (`feature A` importing from `feature B`). If two features need to share logic or UI, extract it down to `src/components/`, `src/hooks/`, or `src/stores/`, or compose them together at the `src/app/` (Page) level.

### 2.3. Shared Components vs. Feature Components
* **`src/components/ui/`**: Contains atomic, stateless UI primitives (or pure UI-state components like modals/dropdowns). They must be completely agnostic of business logic or API schemas.
* **`src/features/[feature]/components/`**: Contains smart/container or domain-specific presentational components bound to the data, validation schemas, and workflows of that specific feature.

---

## 3. Coding Conventions & Best Practices

### 3.1. Server vs. Client Component Boundaries (RSC vs. RCC)
* By default, all components in `app/` and `features/` are **React Server Components (RSC)**.
* Only add the `'use client'` directive at the top of a file when the component explicitly requires:
  * React Hooks (`useState`, `useEffect`, `useContext`, TanStack Query hooks, etc.).
  * Browser APIs (`window`, `localStorage`, DOM event listeners like `onClick`, `onChange`, etc.).
* Push `'use client'` boundaries down to the lowest possible **Leaf Components** to minimize client JavaScript bundle size and preserve SSR benefits for parent layouts/containers.

### 3.2. Data Fetching, APIs, and Validation
* **Schemas (`schemas/`):** All external inputs (forms, Server Action payloads, URL search params, API responses) must be validated using **Zod** schemas located in `src/features/[feature]/schemas/`.
* **API & Fetching (`api/`):**
  * Base HTTP requests must use the shared instance from `src/lib/fetcher.ts`.
  * Feature-specific React Query hooks (`useQuery`, `useMutation`) and Next.js Server Actions must reside in `src/features/[feature]/api/`.
* **Environment Variables (`src/config/env.ts`):**
  * **NEVER** access `process.env.NEXT_PUBLIC_...` directly across components or feature files.
  * Always import type-safe, Zod-validated environment variables from `@/config/env`.

### 3.3. Naming Conventions & Path Aliases
* **Files & Directories:** Use `kebab-case` for all file and folder names (e.g., `login-form.tsx`, `use-user-profile.ts`, `query-provider.tsx`).
* **Components & Types:** Use `PascalCase` for exported React components, TypeScript interfaces, and types (e.g., `LoginForm`, `UserProfileDTO`).
* **Hooks & Functions:** Use `camelCase` for functions, variables, and custom hooks (e.g., `useLoginMutation`, `formatCurrency`).
* **Imports:** Always use TypeScript path aliases (`@/components/...`, `@/features/...`, `@/lib/...`) instead of deep relative paths (`../../../`).

---

## 4. Step-by-Step Workflow for Adding a New Feature

When asked to implement a new domain feature (e.g., `mooncakes`), follow this exact sequence:

1. **Define Types & Schemas:** Create `src/features/mooncakes/types/` and `src/features/mooncakes/schemas/` for data models and Zod validation.
2. **Setup API Layer:** Create `src/features/mooncakes/api/` for Server Actions, fetchers, or React Query hooks.
3. **Build Feature Hooks & Components:** Create custom hooks in `hooks/` and UI views in `components/` inside `src/features/mooncakes/`.
4. **Expose Public API:** Export only the necessary top-level components/hooks in `src/features/mooncakes/index.ts`.
5. **Connect to App Router:** Create or update the route in `src/app/.../page.tsx` and render the exported feature component.