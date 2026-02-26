import { cn } from '../lib/utils';

interface Props {
  isListening: boolean;
  isSpeechSupported: boolean;
  onToggleListening: () => void;
  onNewCard: () => void;
  onBack: () => void;
}

export function GameControls({
  isListening,
  isSpeechSupported,
  onToggleListening,
  onNewCard,
  onBack,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      {isSpeechSupported && (
        <button
          onClick={onToggleListening}
          className={cn(
            'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
            isListening
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white',
          )}
        >
          {isListening ? '⏹ Stop Listening' : '🎤 Start Listening'}
        </button>
      )}
      <button
        onClick={onNewCard}
        className="px-4 py-2 rounded-lg font-medium text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all duration-200"
      >
        🔄 New Card
      </button>
      <button
        onClick={onBack}
        className="px-4 py-2 rounded-lg font-medium text-sm text-gray-500 hover:text-gray-700 transition-all duration-200"
      >
        ← Back
      </button>
    </div>
  );
}
