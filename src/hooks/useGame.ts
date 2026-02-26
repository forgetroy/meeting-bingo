import { useState, useCallback, useRef } from 'react';
import type { GameState, CategoryId, WinningLine } from '../types';
import { generateCard } from '../lib/cardGenerator';
import { checkForBingo, countFilled } from '../lib/bingoChecker';
import { detectWordsWithAliases } from '../lib/wordDetector';

const INITIAL_STATE: GameState = {
  status: 'idle',
  category: null,
  card: null,
  isListening: false,
  startedAt: null,
  completedAt: null,
  winningLine: null,
  winningWord: null,
  filledCount: 0,
};

export function useGame() {
  const [game, setGame] = useState<GameState>(INITIAL_STATE);
  const [detectedWords, setDetectedWords] = useState<string[]>([]);
  const filledWordsRef = useRef<Set<string>>(new Set());

  const startGame = useCallback((categoryId: CategoryId) => {
    const card = generateCard(categoryId);
    filledWordsRef.current = new Set();
    setDetectedWords([]);
    setGame({
      status: 'playing',
      category: categoryId,
      card,
      isListening: false,
      startedAt: Date.now(),
      completedAt: null,
      winningLine: null,
      winningWord: null,
      filledCount: 1, // Free space
    });
  }, []);

  const toggleSquare = useCallback((row: number, col: number) => {
    setGame(prev => {
      if (!prev.card || prev.status !== 'playing') return prev;
      const square = prev.card.squares[row][col];
      if (square.isFreeSpace) return prev;

      const newSquares = prev.card.squares.map(r => r.map(s => ({ ...s })));
      const target = newSquares[row][col];
      target.isFilled = !target.isFilled;
      target.filledAt = target.isFilled ? Date.now() : null;

      if (target.isFilled) {
        filledWordsRef.current.add(target.word.toLowerCase());
      } else {
        filledWordsRef.current.delete(target.word.toLowerCase());
      }

      const newCard = { ...prev.card, squares: newSquares };
      const win = checkForBingo(newCard);

      if (win) {
        return {
          ...prev,
          card: newCard,
          status: 'won',
          completedAt: Date.now(),
          winningLine: win,
          winningWord: target.word,
          filledCount: countFilled(newCard),
        };
      }

      return {
        ...prev,
        card: newCard,
        filledCount: countFilled(newCard),
      };
    });
  }, []);

  const handleTranscript = useCallback((transcript: string) => {
    setGame(prev => {
      if (!prev.card || prev.status !== 'playing') return prev;

      const words = detectWordsWithAliases(
        transcript,
        prev.card.words,
        filledWordsRef.current,
      );

      if (words.length === 0) return prev;

      const newSquares = prev.card.squares.map(r => r.map(s => ({ ...s })));
      let lastFilledWord = '';

      for (const word of words) {
        for (const row of newSquares) {
          for (const sq of row) {
            if (sq.word.toLowerCase() === word.toLowerCase() && !sq.isFilled) {
              sq.isFilled = true;
              sq.isAutoFilled = true;
              sq.filledAt = Date.now();
              filledWordsRef.current.add(word.toLowerCase());
              lastFilledWord = word;
            }
          }
        }
      }

      setDetectedWords(prev => [...prev, ...words]);

      const newCard = { ...prev.card, squares: newSquares };
      const win = checkForBingo(newCard);

      if (win) {
        return {
          ...prev,
          card: newCard,
          status: 'won',
          completedAt: Date.now(),
          winningLine: win,
          winningWord: lastFilledWord,
          filledCount: countFilled(newCard),
        };
      }

      return {
        ...prev,
        card: newCard,
        filledCount: countFilled(newCard),
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    filledWordsRef.current = new Set();
    setDetectedWords([]);
    setGame(INITIAL_STATE);
  }, []);

  const getWinningLine = (): WinningLine | null => {
    return game.winningLine;
  };

  return {
    game,
    detectedWords,
    startGame,
    toggleSquare,
    handleTranscript,
    resetGame,
    getWinningLine,
  };
}
