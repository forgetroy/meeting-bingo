import type { GameState } from '../types';

export function generateShareText(game: GameState): string {
  if (!game.startedAt || !game.completedAt) return '';

  const duration = Math.round((game.completedAt - game.startedAt) / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  return [
    '🎯 Meeting Bingo!',
    `✅ ${game.filledCount}/25 squares filled`,
    `⏱️ Won in ${timeStr}`,
    `🏆 Winning word: "${game.winningWord}"`,
    '',
    'meetingbingo.vercel.app',
  ].join('\n');
}

export async function shareResults(game: GameState): Promise<boolean> {
  const text = generateShareText(game);

  if (navigator.share) {
    try {
      await navigator.share({ text });
      return true;
    } catch {
      // User cancelled or share failed, fall through to clipboard
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
