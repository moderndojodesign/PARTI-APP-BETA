# PARTI

> The Operating System for Civic Engagement.

PARTI is a hybrid social platform and civic operating system. It contextualizes legislation, governance, and political behavior for the informed citizen — without outrage, without spin, and without asking you to pick a side.

This repository contains the initial Next.js 15 web app: a foundation with the key flows wired end-to-end against mocked data and Claude-ready API stubs.

---

## What's in this build

- **Landing page** (`/`) — vision, positioning, feature pillars, featured legislation, athlete scoreboard, issue grid, trust infrastructure.
- **Onboarding** (`/onboarding`) — interest selection, ZIP anchor, civic scope picker, summary.
- **Daily Briefing** (`/briefing`) — personalized civic feed mixing bills, politician activity, issue updates, and geopolitical context. Every item answers "Why am I seeing this?"
- **Legislation** (`/bills`, `/bills/[id]`) — bill index plus a deep editorial detail view with:
  - **TL;DR** (Claude-ready endpoint at `POST /api/tldr`)
  - **Make This Relevant to Me** (Claude-ready endpoint at `POST /api/relevant`)
  - Plain English summary, problem framing, intended/unintended consequences
  - Economic and community impact, timeline, lobbying, coalitions, sentiment, constitutional notes
- **Political Athletes** (`/politicians`, `/politicians/[id]`) — scoreboard plus athlete profiles with promise tracker, scorecard, top donors, recent votes.
- **Issues** (`/issues`, `/issues/[slug]`) — issue lenses connecting bills and politicians.
- **Civic Profile** (`/profile`) — view, edit, and clear your personalization. Profile is stored in `localStorage` only; nothing transits a server in this preview.

## Tech

- Next.js 15 (App Router) + React 19
- TypeScript, Tailwind CSS 3
- Fonts via `next/font/google` (Inter + Fraunces)
- No external UI library — design system implemented as Tailwind components in `app/globals.css`

## Design language

Editorial, calm, premium. References: Apple News, Bloomberg, Stripe, Linear, Notion. The palette is parchment + ink with a single deep midnight blue anchor and warm amber accent. The serif (Fraunces) carries editorial moments; the sans (Inter) carries UI. Visual chaos and cable-news aesthetics are explicitly avoided.

## Wiring real Claude calls

The API routes at `/api/tldr` and `/api/relevant` are progressively enhanced. When `ANTHROPIC_API_KEY` is set, they call Claude Sonnet 4.6 directly via the Messages API (`lib/claude.ts`). When the key is absent, they fall back to deterministic canned responses. The same payload shape is returned either way, so the client never needs to care.

```bash
cp .env.example .env.local
# add your ANTHROPIC_API_KEY — no install required, we use fetch directly
```

For latency-sensitive paths, swap `DEFAULT_MODEL` in `lib/claude.ts` to `claude-haiku-4-5-20251001`.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build    # production build
npm run typecheck
```

## Roadmap (post-foundation)

- Auth + persistent user profiles
- Real legislative data ingestion (congress.gov, openstates.org)
- Politician scoring methodology v1 with public weights
- Social layer: comments, follows, contextualized sharing
- Media arm: video, district storytelling, paid civic communication
- Native iOS / Android via React Native, sharing this design system
