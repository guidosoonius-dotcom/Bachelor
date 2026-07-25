# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## What this is

A mobile-first Next.js web app (PWA) for a Dutch bachelor party ("vrijgezellenfeest"). All UI copy and content is in Dutch — match that language and tone in any new copy. There is no user authentication; guests identify themselves with a name stored in `localStorage`, and Supabase (Postgres + Storage) is the only backend, queried directly from client components with the public anon key. RLS in the Supabase project (not present in this repo) is what actually protects the data.

## Commands

```bash
npm run dev     # start dev server (localhost:3000)
npm run build   # production build
npm run start   # run a production build
npm run lint    # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

There is no test suite/framework configured in this repo (no test script, no Jest/Vitest/Playwright dependency) — don't assume one exists.

## Architecture

**Routing**: Next.js App Router. Pages live under `app/<route>/page.tsx`: `/` (dashboard), `/timeline`, `/quiz`, `/opdrachten` (challenges/dares), `/fotowall` (photo wall), `/info`. Routes are hardcoded in `components/BottomNav.tsx`'s `ITEMS` array — add new nav entries there too. Almost every page/component is a client component (`"use client"`); there are no server components doing data fetching, no route handlers, and no server actions. All Supabase reads/writes happen directly from the browser.

**Data flow**: pages fetch from Supabase on mount and then poll every `POLL_INTERVAL_MS` (20s, defined per-page) via `setInterval` — there is no realtime subscription. Several write flows (quiz answers, dare votes) optimistically push a locally-constructed row (with `crypto.randomUUID()` as a temp id) into state before/without confirming the round-trip, then let the next poll reconcile.

**Guest identity** (`lib/guest.ts`): `useGuestName()` reads/writes a single `localStorage` key (`vjf_guest_name`) and broadcasts changes via a custom `window` event so multiple mounted components stay in sync. `components/NameGate.tsx` renders a full-screen blocking form in `app/layout.tsx` whenever no name is set yet — this is the only "auth" gate in the app. `components/NameEditButton.tsx`/`NameEditModal.tsx` let a guest change their stored name later; nearly every page header includes it.

**Content vs. data split**:
- `lib/content.ts` is hardcoded, hand-edited event content: bachelor's name, event date/timezone, the `TIMELINE` schedule (with per-stop travel times), `PRACTICAL_INFO`, and the photo goal. Update event details (new venue, new schedule stop) here, not in components. Note the explicit fixed-timezone (`+02:00`) date math used so times are correct regardless of server/browser timezone.
- `lib/types.ts` defines the Supabase row shapes (`quiz_questions`, `quiz_answers`, `dares`, `dare_votes`, `dare_completions`, `location_suggestions`, `photos`). These are hand-maintained TypeScript types, not generated — there are no migration files in this repo, so the Supabase project itself is the source of truth for the actual schema; keep these types in sync manually when the schema changes.

**Supabase client** (`lib/supabase/client.ts`): a single browser client built from `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`. `next.config.ts` bakes in fallback values for both so the app still works if those env vars aren't set on the deployment target — this is intentional (the anon key is publishable by design; RLS is the real gate), not a secret leak to "fix". `FOTOWALL_BUCKET` (`"fotowall"`) is the one Storage bucket, used both for the photo wall (root-level paths) and for dare-completion proof photos (under a `dares/` prefix).

**Image uploads**: `lib/compressImage.ts` downscales/re-encodes images client-side (max 1600px edge, JPEG quality 0.8) via `canvas`/`createImageBitmap` before upload. Both `components/PhotoUploadForm.tsx` and the dare-completion flow in `app/opdrachten/page.tsx` go through this before hitting Supabase Storage.

**Styling**: Tailwind v4 with CSS-first config (`@theme inline` block in `app/globals.css`) plus a large amount of hand-written, non-utility CSS in the same file, organized in commented sections per screen ("Scherm 1: Dashboard", etc.) — follow that organization when adding new component styles rather than inlining ad hoc Tailwind everywhere. Three `next/font/google` fonts are wired up in `app/layout.tsx` as CSS vars (`--font-sans`, `--font-display`, `--font-script` for the script/handwritten headings via `.heading-script`). `components/BodyThemeSync.tsx` toggles a `theme-dark-home` class on `<body>` based on the current path (dark hero look only on `/`).

**Path alias**: `@/*` maps to the repo root (see `tsconfig.json`), e.g. `@/lib/content`, `@/components/BottomNav`.
