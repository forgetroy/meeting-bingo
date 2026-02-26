import type { GameState, WinningLine } from '../types';
import { BingoCard } from './BingoCard';
import { GameControls } from './GameControls';
import { TranscriptPanel } from './TranscriptPanel';
import { countFilled, getClosestToWin } from '../lib/bingoChecker';

interface Props {
  game: GameState;
  winningLine: WinningLine | null;
  transcript: string;
  interimTranscript: string;
  detectedWords: string[];
  isSpeechSupported: boolean;
  isListening: boolean;
  onSquareClick: (row: number, col: number) => void;
  onToggleListening: () => void;
  onNewCard: () => void;
  onBack: () => void;
}

export function GameBoard({
  game,
  winningLine,
  transcript,
  interimTranscript,
  detectedWords,
  isSpeechSupported,
  isListening,
  onSquareClick,
  onToggleListening,
  onNewCard,
  onBack,
}: Props) {
  if (!game.card) return null;

  const filled = countFilled(game.card);
  const closest = getClosestToWin(game.card);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Meeting Bingo</h2>
          <p className="text-sm text-gray-500">
            {filled}/25 squares filled
            {closest && ` · ${closest.needed} away from ${closest.line}`}
          </p>
        </div>

        <BingoCard
          card={game.card}
          winningLine={winningLine}
          onSquareClick={onSquareClick}
        />

        <GameControls
          isListening={isListening}
          isSpeechSupported={isSpeechSupported}
          onToggleListening={onToggleListening}
          onNewCard={onNewCard}
          onBack={onBack}
        />

        {isSpeechSupported && (
          <TranscriptPanel
            transcript={transcript}
            interimTranscript={interimTranscript}
            detectedWords={detectedWords}
            isListening={isListening}
          />
        )}
      </div>
    </div>
  );
}
