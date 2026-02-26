# Meeting Bingo — Implementation Plan

## Context

The Meeting Bingo project has thorough planning docs (PRD, UXR, Architecture) but zero source code. The repo contains only documentation, environment config, and Vercel project linkage. This plan implements the full MVP: a React + TypeScript web app that generates bingo cards from buzzword categories and auto-fills squares via Web Speech API during meetings.

**Key docs:**
- `docs/research/meeting-bingo-prd.md` — Requirements, user stories, UI specs
- `docs/research/meeting-bingo-architecture.md` — Tech stack, type definitions, component implementations, buzzword data

## Tech Stack

React 18 + TypeScript, Vite, Tailwind CSS, Web Speech API, canvas-confetti, Vercel deployment

---

## Phase 1: Project Scaffolding

1. **Initialize Vite project** with React + TypeScript template (in-place, since repo already exists)
2. **Install dependencies**: react, react-dom, canvas-confetti + dev deps (tailwindcss, postcss, autoprefixer, @types/*)
3. **Configure tooling**:
   - `vite.config.ts` — React plugin, port 3000
   - `tailwind.config.js` — Content paths, custom animations (bounce-in, pulse-fast)
   - `postcss.config.js` — Tailwind + autoprefixer
   - `tsconfig.json` — Strict mode, JSX
   - `index.html` — Entry point with root div
4. **Create project structure**: `src/`, `src/components/`, `src/hooks/`, `src/lib/`, `src/data/`, `src/types/`, `public/`
5. **Set up entry files**: `src/main.tsx`, `src/index.css` (Tailwind directives)
6. **Update `.gitignore`** — Add node_modules, dist, .env, etc.

**Files created/modified:** `package.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/index.css`, `.gitignore`

---

## Phase 2: Types, Data & Core Logic

1. **Type definitions** (`src/types/index.ts`) — CategoryId, Category, BingoSquare, BingoCard, GameState, WinningLine, SpeechRecognitionState, Toast (per architecture doc)
2. **Buzzword data** (`src/data/categories.ts`) — 3 categories (Agile, Corporate, Tech) with 40+ words each
3. **Card generator** (`src/lib/cardGenerator.ts`) — Fisher-Yates shuffle, 24 random words + center free space
4. **Bingo checker** (`src/lib/bingoChecker.ts`) — Check rows, columns, diagonals; count filled; closest-to-win helper
5. **Word detector** (`src/lib/wordDetector.ts`) — Regex word-boundary matching, multi-word phrase support, alias detection
6. **Share utils** (`src/lib/shareUtils.ts`) — Clipboard/native share API for results
7. **cn utility** (`src/lib/utils.ts`) — Class name merge helper for conditional Tailwind classes

**Files created:** 7 files under `src/types/`, `src/data/`, `src/lib/`

---

## Phase 3: Components & Game UI

1. **App shell** (`src/App.tsx`) — Screen state machine (landing -> category -> game -> win), game state management
2. **LandingPage** (`src/components/LandingPage.tsx`) — Hero, "New Game" CTA, how-it-works section, privacy note
3. **CategorySelect** (`src/components/CategorySelect.tsx`) — 3 category cards with icons, descriptions, sample words
4. **BingoCard** (`src/components/BingoCard.tsx`) — 5x5 CSS grid rendering squares
5. **BingoSquare** (`src/components/BingoSquare.tsx`) — Individual square with states: default, filled, auto-filled, free space, winning
6. **GameBoard** (`src/components/GameBoard.tsx`) — Main game container: header with progress counter, BingoCard, TranscriptPanel, GameControls
7. **GameControls** (`src/components/GameControls.tsx`) — Listen toggle, new card, back buttons
8. **TranscriptPanel** (`src/components/TranscriptPanel.tsx`) — Live transcript display, detected words chips, listening indicator
9. **WinScreen** (`src/components/WinScreen.tsx`) — Confetti animation, winning card with highlighted line, stats (time, winning word, squares filled), share + play again buttons

**Files created:** 8 component files under `src/components/`

---

## Phase 4: Speech Recognition & Game Hooks

1. **useSpeechRecognition hook** (`src/hooks/useSpeechRecognition.ts`) — Web Speech API wrapper with feature detection, continuous mode, auto-restart on end, interim results
2. **useGame hook** (`src/hooks/useGame.ts`) — Game state management: square toggle, auto-fill from speech, bingo detection trigger
3. **Wire speech -> game** — Connect transcript callback to word detector, detected words to auto-fill, auto-fill to bingo check
4. **Handle edge cases** — Microphone permission denied, unsupported browsers (graceful fallback to manual-only mode), tab visibility changes

**Files created:** 2 hook files under `src/hooks/`

---

## Phase 5: Polish & Deploy

1. **Confetti integration** — canvas-confetti on win detection
2. **Responsive design** — Mobile-first grid sizing, touch-friendly squares
3. **Animations** — Square fill transitions, auto-fill pulse, winning line highlight
4. **Favicon** — Simple SVG bingo icon in `public/favicon.svg`
5. **Build & deploy** — `npm run build`, deploy to Vercel via CLI
6. **Update README.md** with project description

**Files modified:** Various component files, `public/favicon.svg`, `README.md`

---

## Verification

1. `npm run dev` — App starts on localhost:3000
2. `npm run build` — Builds without errors
3. `npm run typecheck` — No TypeScript errors
4. Manual walkthrough: Landing -> Select "Agile" -> Card renders with 24 unique words + free center -> Click squares to fill -> Get 5 in a row -> Win screen with confetti
5. Speech test (Chrome): Enable mic -> Speak buzzwords -> Squares auto-fill -> Transcript panel shows detected words
6. Mobile responsive check at 375px width
7. `vercel --prod` — Deploys successfully
