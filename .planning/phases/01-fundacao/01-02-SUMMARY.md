---
phase: 01-fundacao
plan: 02
subsystem: ui
tags: [nuxt4, tailwind-v4, whatsapp, app-config, composable, ssr, lucide]

# Dependency graph
requires:
  - phase: 01-fundacao-01
    provides: nuxt.config.ts with Tailwind v4, SSR preset, fonts, and modules configured
provides:
  - app.config.ts with centralized business data (whatsapp, phone, address, instagram, hours)
  - app/composables/useWhatsApp.ts generating encoded wa.me URLs per service key
  - app/app.vue root component with NuxtLayout + NuxtPage
  - app/layouts/default.vue with dark theme classes
  - app/pages/index.vue placeholder validating SSR, theme, fonts, icons, and WhatsApp
affects: [02-homepage, 03-service-pages, 04-seo-analytics]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "app.config.ts as single source of truth for all business data"
    - "useWhatsApp composable generates typed encoded wa.me URLs per service key"
    - "Nuxt 4 app/ directory: all pages, layouts, composables, assets live under app/"
    - "~/assets resolves to app/assets in Nuxt 4 (not project root)"

key-files:
  created:
    - app.config.ts
    - app/composables/useWhatsApp.ts
    - app/layouts/default.vue
    - app/pages/index.vue
    - app/assets/css/main.css
  modified:
    - app/app.vue
    - nuxt.config.ts

key-decisions:
  - "Nuxt 4 uses app/ directory convention — ~/assets resolves to app/assets not project root"
  - "ogImage.zeroRuntime: true prevents interactive TTY prompt from nuxt-og-image in CI/non-terminal"
  - "useWhatsApp composable always receives ServiceKey type — prevents hardcoding phone or messages"

patterns-established:
  - "Pattern: Business data centralized in app.config.ts, accessed via useAppConfig() — no hardcoding in components"
  - "Pattern: useWhatsApp(service) called in pages, component receives whatsappUrl as prop"
  - "Pattern: All source files live under app/ (Nuxt 4 convention)"

requirements-completed: [SETUP-04, WA-01]

# Metrics
duration: 8min
completed: 2026-04-06
---

# Phase 01 Plan 02: Business Data Layer and SSR Validation Summary

**app.config.ts + useWhatsApp composable + Nuxt 4 placeholder page with dark theme, Lucide icons, and encoded wa.me URLs verified via production build**

## Performance

- **Duration:** 8 min
- **Started:** 2026-04-06T11:43:22Z
- **Completed:** 2026-04-06T11:51:40Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments

- Business data centralized in app.config.ts with typed placeholders (whatsapp, phone, address, instagram, hours)
- useWhatsApp composable generates encoded wa.me URLs per service key (assistencia, acessorios, aparelhos, geral)
- Placeholder index page validates all Phase 1 requirements: SSR, dark theme, Poppins/Inter fonts, Lucide Phone icon, WhatsApp link
- Production build completes successfully with Vercel SSR preset

## Task Commits

1. **Task 1: Create app.config.ts and useWhatsApp composable** - `ab5fa6b` (feat)
2. **Task 2: Create app.vue, default layout, and placeholder index page** - `a3c0fbe` (feat)
3. **Task 3: Verify SSR + auto-fix Nuxt 4 asset path and ogImage TTY** - `ddeea25` (feat)

**Plan metadata:** (docs commit — see final_commit step)

## Files Created/Modified

- `app.config.ts` - Single source of truth: whatsapp, phone, address, instagram, hours
- `app/composables/useWhatsApp.ts` - Typed wa.me URL generator with encodeURIComponent
- `app/app.vue` - Root component with NuxtLayout + NuxtPage (replaced NuxtWelcome)
- `app/layouts/default.vue` - Default layout with bg-background dark theme wrapper
- `app/pages/index.vue` - Phase 1 placeholder: displays all config values + WhatsApp link + Phone icon
- `app/assets/css/main.css` - Moved from assets/css/ to app/assets/css/ (Nuxt 4 convention)
- `nuxt.config.ts` - Added ogImage.zeroRuntime: true to prevent TTY prompt

## Decisions Made

- **Nuxt 4 app/ directory**: The project uses Nuxt 4 which places all source under `app/`. The `~` alias resolves to `app/` not the project root. Original `assets/css/main.css` was at project root — moved to `app/assets/css/main.css` for correct resolution.
- **ogImage.zeroRuntime: true**: `nuxt-og-image` (included in `@nuxtjs/seo`) tries to prompt for renderer selection on first run. In non-TTY environments (CI, automated builds, background processes) this crashes. Setting `zeroRuntime: true` disables dynamic OG image generation — acceptable for Phase 1, can be revisited in Phase 4 if OG images are needed.
- **useWhatsApp pattern**: Composable called in pages only, not in section components. Section components receive `whatsappUrl` as a prop. This enforces single responsibility and makes components testable without mocking AppConfig.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Moved main.css to app/assets/css/ for Nuxt 4 compatibility**
- **Found during:** Task 3 (SSR verification build)
- **Issue:** Build failed with `ENOENT: no such file or directory, open '/home/fagner/kapaki/app//assets/css/main.css'`. In Nuxt 4, `~/assets` resolves to `app/assets`, not project root. The CSS was at `assets/css/main.css` (root) from Plan 01 which did not anticipate Nuxt 4 directory convention.
- **Fix:** Created `app/assets/css/main.css` with same content, removed old `assets/css/main.css`
- **Files modified:** app/assets/css/main.css (new), assets/css/main.css (deleted)
- **Verification:** Build completed successfully after fix
- **Committed in:** ddeea25

**2. [Rule 2 - Missing Critical] Added ogImage.zeroRuntime to prevent dev server crash in non-TTY**
- **Found during:** Task 3 (SSR dev server test)
- **Issue:** `nuxt-og-image` module attempts interactive TTY prompt for renderer selection. In non-terminal environments (CI, background processes), this raises `TTY initialization failed: uv_tty_init returned EINVAL` and crashes the dev server before it can serve pages.
- **Fix:** Added `ogImage: { zeroRuntime: true }` to nuxt.config.ts
- **Files modified:** nuxt.config.ts
- **Verification:** Build succeeds with no TTY error; production build confirmed working
- **Committed in:** ddeea25

---

**Total deviations:** 2 auto-fixed (1 blocking, 1 missing critical)
**Impact on plan:** Both fixes necessary for correct operation. No scope creep. The Nuxt 4 asset path issue is a structural fix that all future plans benefit from.

## Issues Encountered

- `nuxt-og-image` interactive prompt prevents `npm run dev` from completing in non-TTY environments. Production build via `nuxt build` works correctly. SSR verification was confirmed via production build output rather than dev server curl test.

## User Setup Required

None — no external service configuration required for this plan. Business data placeholders (phone number, address) will be replaced with real values before launch.

## Next Phase Readiness

- All Phase 1 infrastructure complete: Nuxt 4, Tailwind v4, SSR, dark theme, fonts, icons, business config, WhatsApp composable
- Phase 2 (homepage) can immediately use `useWhatsApp(service)` in pages and `useAppConfig()` for business data
- Replace PLACEHOLDER values in `app.config.ts` with real data when client provides them
- Potential concern: `ogImage.zeroRuntime: true` disables OG image generation — Phase 4 SEO work may need to revisit this if OG images for WhatsApp link previews are desired

---
*Phase: 01-fundacao*
*Completed: 2026-04-06*
