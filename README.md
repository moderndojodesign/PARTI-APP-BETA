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

## Tech

- Next.js 15 (App Router) + React 19
- TypeScript, Tailwind CSS 3
- Fonts via `next/font/google` (Inter + Fraunces)
- No external UI library — design system implemented as Tailwind components in `app/globals.css`

## Design language

Editorial, calm, premium. References: Apple News, Bloomberg, Stripe, Linear, Notion. The palette is parchment + ink with a single deep midnight blue anchor and warm amber accent. The serif (Fraunces) carries editorial moments; the sans (Inter) carries UI. Visual chaos and cable-news aesthetics are explicitly avoided.

## Wiring real Claude calls

API routes in `app/api/tldr/route.ts` and `app/api/relevant/route.ts` ship with deterministic, well-written canned responses. To swap in live Claude calls:

```bash
cp .env.example .env.local
# add your ANTHROPIC_API_KEY
npm install @anthropic-ai/sdk
```

Then in each route, replace the `CANNED` lookup with an Anthropic Messages API call. Use Claude Sonnet 4.6 (`claude-sonnet-4-6`) or Haiku 4.5 (`claude-haiku-4-5-20251001`) for latency-sensitive paths.

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
