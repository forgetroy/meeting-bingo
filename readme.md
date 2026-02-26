# Meeting Bingo

Turn your meetings into a game! Listen for buzzwords and fill your bingo card automatically.

## Features

- **3 buzzword categories**: Agile & Scrum, Corporate Speak, Tech & Engineering
- **Speech recognition**: Auto-detects buzzwords via Web Speech API (Chrome)
- **Manual mode**: Tap squares to fill them in any browser
- **Win detection**: Rows, columns, and diagonals
- **Confetti celebration** on BINGO!
- **Share results** with your team

## Development

```bash
npm install
npm run dev        # Start dev server on port 3000
npm run build      # Production build
npm run typecheck  # Type check
npm run lint       # Lint
```

## Tech Stack

React 19 + TypeScript, Vite, Tailwind CSS, Web Speech API, canvas-confetti

## Deployment

Deployed on [Vercel](https://vercel.com). Run `vercel --prod` to deploy.
