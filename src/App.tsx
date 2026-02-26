import { useState } from 'react';
import type { CategoryId } from './types';
import { LandingPage } from './components/LandingPage';
import { CategorySelect } from './components/CategorySelect';
import { GameBoard } from './components/GameBoard';
import { WinScreen } from './components/WinScreen';
import { useGame } from './hooks/useGame';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';

type Screen = 'landing' | 'category' | 'game' | 'win';

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const { game, detectedWords, startGame, toggleSquare, handleTranscript, resetGame } = useGame();
  const speech = useSpeechRecognition();

  const handleStart = () => setScreen('category');

  const handleCategorySelect = (categoryId: CategoryId) => {
    startGame(categoryId);
    setScreen('game');
  };

  const handleToggleListening = () => {
    if (speech.isListening) {
      speech.stopListening();
    } else {
      speech.startListening(handleTranscript);
    }
  };

  const handleNewCard = () => {
    speech.stopListening();
    speech.resetTranscript();
    if (game.category) {
      startGame(game.category);
    }
  };

  const handleBack = () => {
    speech.stopListening();
    speech.resetTranscript();
    setScreen('category');
  };

  const handlePlayAgain = () => {
    speech.resetTranscript();
    setScreen('category');
  };

  const handleHome = () => {
    speech.stopListening();
    speech.resetTranscript();
    resetGame();
    setScreen('landing');
  };

  // Auto-transition to win screen
  if (game.status === 'won' && screen === 'game') {
    setScreen('win');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {screen === 'landing' && <LandingPage onStart={handleStart} />}
      {screen === 'category' && (
        <CategorySelect onSelect={handleCategorySelect} onBack={handleHome} />
      )}
      {screen === 'game' && game.card && (
        <GameBoard
          game={game}
          winningLine={game.winningLine}
          transcript={speech.transcript}
          interimTranscript={speech.interimTranscript}
          detectedWords={detectedWords}
          isSpeechSupported={speech.isSupported}
          isListening={speech.isListening}
          onSquareClick={toggleSquare}
          onToggleListening={handleToggleListening}
          onNewCard={handleNewCard}
          onBack={handleBack}
        />
      )}
      {screen === 'win' && (
        <WinScreen game={game} onPlayAgain={handlePlayAgain} onHome={handleHome} />
      )}
    </div>
  );
}
