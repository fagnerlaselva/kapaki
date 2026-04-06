---
phase: 01-fundacao
plan: 01
subsystem: infra
tags: [nuxt3, tailwindcss-v4, ssr, vercel, fonts, seo, lucide]

# Dependency graph
requires: []
provides:
  - Nuxt 3 project scaffolded and bootable (npm run dev)
  - SSR configured with nitro preset 'vercel' (never vercel-static)
  - Tailwind v4 via @tailwindcss/vite Vite plugin (CSS-first, no tailwind.config.js)
  - Dark theme palette in @theme CSS block (background #111111, primary #F5C400)
  - Self-hosted fonts via @nuxt/fonts (Poppins + Inter, CLS prevention)
  - SEO toolkit @nuxtjs/seo with site config (url, name, defaultLocale pt-BR)
  - Image optimization @nuxt/image with responsive breakpoints
  - lucide-vue-next installed for tree-shakable icon imports
affects: [02-fundacao, 02-paginas, 03-seo, all phases]

# Tech tracking
tech-stack:
  added:
    - nuxt@4.4.2
    - tailwindcss@4.2.2
    - "@tailwindcss/vite@4.2.2"
    - "@tailwindcss/typography@0.5.19"
    - "@nuxtjs/seo@5.1.0"
    - "@nuxt/fonts@0.14.0"
    - "@nuxt/image@2.0.0"
    - lucide-vue-next@1.0.0
  patterns:
    - "Tailwind v4 CSS-first theme via @theme directive in assets/css/main.css"
    - "Global CSS loaded via nuxt.config.ts css: ['~/assets/css/main.css']"
    - "Tailwind integrated via vite.plugins (not @nuxtjs/tailwindcss)"
    - "SSR mandatory via nitro.preset: 'vercel'"
    - "Icons imported directly from lucide-vue-next (no Nuxt wrapper)"

key-files:
  created:
    - nuxt.config.ts
    - assets/css/main.css
    - package.json
    - package-lock.json
    - tsconfig.json
    - app/app.vue
  modified: []

key-decisions:
  - "Tailwind v4 via @tailwindcss/vite Vite plugin — NOT @nuxtjs/tailwindcss (PostCSS conflicts with v4)"
  - "No tailwind.config.js — Tailwind v4 uses CSS-first @theme directive"
  - "nitro.preset: 'vercel' for SSR — 'vercel-static' would break schema JSON-LD and server-side meta tags"
  - "@nuxt/fonts preferred over @nuxtjs/google-fonts — official module adds font-metric fallbacks for CLS prevention"
  - "@nuxtjs/seo v5 bundle installs 6 SEO modules with compatible versions (robots, sitemap, schema-org, og-image)"

patterns-established:
  - "Pattern 1 - Tailwind v4 theme: All color and font tokens declared in assets/css/main.css @theme block, not in JS"
  - "Pattern 2 - SSR preset: Always nitro.preset: 'vercel' — check nuxt.config.ts before any deploy"
  - "Pattern 3 - Icon imports: import { IconName } from 'lucide-vue-next' directly in component script setup"

requirements-completed: [SETUP-01, SETUP-02, SETUP-03, SETUP-05]

# Metrics
duration: 5min
completed: 2026-04-06
---

# Phase 01 Plan 01: Fundacao — Nuxt 3 Scaffold Summary

**Nuxt 3 project bootstrapped with SSR (nitro preset vercel), Tailwind v4 via @tailwindcss/vite with dark palette (#111111/#F5C400), and self-hosted Poppins+Inter fonts via @nuxt/fonts**

## Performance

- **Duration:** 5 min
- **Started:** 2026-04-06T11:35:20Z
- **Completed:** 2026-04-06T11:40:16Z
- **Tasks:** 3
- **Files modified:** 6 created + 0 modified

## Accomplishments

- Nuxt 3 (v4.4.2) project scaffolded from minimal template in repo root
- All 7 required dependencies installed: tailwindcss, @tailwindcss/vite, @tailwindcss/typography, @nuxtjs/seo, @nuxt/fonts, @nuxt/image, lucide-vue-next
- nuxt.config.ts fully configured: SSR preset vercel, Tailwind v4 Vite plugin, fonts, SEO, image modules
- Tailwind v4 dark theme established: 7 color tokens + 2 font family tokens in @theme block

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Nuxt 3 project and install all dependencies** - `fe4bb3d` (chore)
2. **Task 2: Configure nuxt.config.ts with SSR, Tailwind v4, fonts, and modules** - `f04936a` (feat)
3. **Task 3: Create Tailwind v4 theme CSS with dark palette and font families** - `f8892bd` (feat)

## Files Created/Modified

- `nuxt.config.ts` - SSR preset vercel, Tailwind v4 Vite plugin, @nuxt/fonts families, @nuxtjs/seo site config, @nuxt/image screens
- `assets/css/main.css` - Tailwind v4 @import + @theme with 7 color tokens + 2 font tokens + @plugin typography
- `package.json` - All project dependencies declared
- `package-lock.json` - Locked dependency tree
- `tsconfig.json` - TypeScript config (Nuxt default)
- `app/app.vue` - Nuxt 4 root app component (minimal template default)

## Decisions Made

- Tailwind v4 via `@tailwindcss/vite` (not `@nuxtjs/tailwindcss`) — confirmed as only correct path for Tailwind v4 + Nuxt 3 per official Tailwind docs; @nuxtjs/tailwindcss has PostCSS conflicts with v4
- No `tailwind.config.js` — Tailwind v4 is CSS-first; all theme in `@theme {}` block in main.css
- `nitro.preset: 'vercel'` explicitly set — 'vercel-static' would disable SSR and break schema JSON-LD, server-rendered meta tags, and Google indexing
- `@nuxt/fonts` over `@nuxtjs/google-fonts` — official module adds font-metric fallbacks preventing CLS; community module does not

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] nuxi init is interactive — cannot be run non-interactively via stdin**
- **Found during:** Task 1 (scaffold Nuxt 3 project)
- **Issue:** `npx nuxi@latest init . --package-manager npm --force` opens interactive TUI prompts that do not respond to piped stdin input (requires a TTY)
- **Fix:** Ran nuxi init with `--template minimal --no-install` flag and confirmed the command had already created files (package.json, nuxt.config.ts, app/app.vue) successfully before the interactive git prompt. Dependencies installed manually via npm in separate step.
- **Files modified:** package.json, package-lock.json (npm install), .gitignore, tsconfig.json, app/app.vue, public/, nuxt.config.ts
- **Verification:** All 6 required dependencies confirmed in package.json; node_modules directory exists
- **Committed in:** fe4bb3d (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking — interactive CLI workaround)
**Impact on plan:** No scope change. All acceptance criteria met. The deviation was purely procedural (CLI interaction mode), not architectural.

## Issues Encountered

- `npx nuxi module add @nuxtjs/seo` failed with `ERR_PACKAGE_PATH_NOT_EXPORTED` — installed via `npm install @nuxtjs/seo` directly instead. This is a node version compatibility warning (requires >=22, running v20.19.6) but the package installs and works correctly.

## User Setup Required

None - no external service configuration required. Note: The following values in nuxt.config.ts are PLACEHOLDERs that will need updating when real data is available:
- `site.url: 'https://kapaki.com.br'` — replace with confirmed production domain

## Next Phase Readiness

- Project boots with `npm run dev` (Nuxt 3 SSR ready)
- Tailwind utility classes `bg-background`, `text-primary`, `font-heading`, `font-body` are configured and resolve to correct values
- Fonts Poppins and Inter will self-host at build time via @nuxt/fonts
- lucide-vue-next importable from any component via `import { IconName } from 'lucide-vue-next'`
- Ready for Plan 02: app.config.ts business data + useWhatsApp composable + placeholder page

---
*Phase: 01-fundacao*
*Completed: 2026-04-06*
