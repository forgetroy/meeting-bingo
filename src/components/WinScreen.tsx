import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { GameState } from '../types';
import { shareResults } from '../lib/shareUtils';

interface Props {
  game: GameState;
  onPlayAgain: () => void;
  onHome: () => void;
}

export function WinScreen({ game, onPlayAgain, onHome }: Props) {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const duration = game.startedAt && game.completedAt
    ? Math.round((game.completedAt - game.startedAt) / 1000)
    : 0;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const timeStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  const handleShare = async () => {
    await shareResults(game);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-green-50 to-white">
      <div className="text-center max-w-md animate-bounce-in">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">BINGO!</h1>
        <p className="text-lg text-gray-600 mb-8">You won!</p>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-500">{game.filledCount}</p>
              <p className="text-xs text-gray-500">Squares filled</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">{timeStr}</p>
              <p className="text-xs text-gray-500">Time</p>
            </div>
            <div>
              <p className="text-lg font-bold text-purple-500 truncate">
                {game.winningWord || '—'}
              </p>
              <p className="text-xs text-gray-500">Winning word</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleShare}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            📤 Share Results
          </button>
          <button
            onClick={onPlayAgain}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            🔄 Play Again
          </button>
          <button
            onClick={onHome}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
