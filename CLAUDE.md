# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Meeting Bingo — a browser-based bingo game with live audio transcription via Web Speech API. Players select a buzzword category, get a randomized 5x5 bingo card, and squares auto-fill when buzzwords are spoken during meetings. Currently in pre-implementation phase (docs only, no source code yet).

## Tech Stack (Planned)

React 18 + TypeScript, Vite, Tailwind CSS, Web Speech API, canvas-confetti. Static SPA — no backend.

## Build & Development Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # tsc && vite build
npm run preview      # Preview production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint . --ext ts,tsx
```

## Environment Variables

Uses **varlock** (@env-spec) for env management with auto-generated TypeScript types.

- Schema: `.env.schema`
- Generated types: `env.d.ts` (auto-generated, do not edit)
- Load env: `varlock load`
- Run with env injected: `varlock run -- <command>`

### Required Variables

- `LINEAR_API_KEY` (sensitive) — Linear project management API key

## Architecture

### App Flow

Landing page → Category selection (Agile/Corporate/Tech) → Game board (5x5 grid) → Win screen with confetti

### Planned Project Structure

```
src/
├── components/      # React components (LandingPage, CategorySelect, GameBoard, BingoCard, BingoSquare, TranscriptPanel, WinScreen, GameControls)
├── hooks/           # useSpeechRecognition (Web Speech API wrapper), useGame (state management)
├── lib/             # cardGenerator (Fisher-Yates shuffle), bingoChecker (win detection), wordDetector (regex matching), shareUtils
├── data/            # categories.ts (3 categories, 40+ words each)
├── types/           # TypeScript interfaces (CategoryId, BingoSquare, BingoCard, GameState, etc.)
└── context/         # GameContext (global state via React Context)
```

### Key Design Decisions

- **State management**: React useState + Context (no external libraries)
- **Speech recognition**: Web Speech API with graceful fallback to manual-only mode for unsupported browsers
- **Persistence**: localStorage (no backend)
- **Screen routing**: State machine in App.tsx (`idle → setup → playing → won`), not a router

### Reference Docs

- `docs/research/meeting-bingo-prd.md` — Requirements, user stories, UI specs
- `docs/research/meeting-bingo-architecture.md` — Full tech design with component implementations and type definitions
- `docs/implementation/plan.md` — 5-phase implementation plan

## Deployment

- **Platform**: Vercel (static hosting, free tier)
- **Repo**: https://github.com/forgetroy/meeting-bingo
- Deploy: `vercel --prod`

## Tools

- **varlock** — Environment variable management
- **Vercel CLI** — `vercel` for deploys, `vercel env` for env vars
- **Linear CLI** — `linear` for issue/project management
