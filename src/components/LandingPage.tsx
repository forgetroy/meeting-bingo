interface Props {
  onStart: () => void;
}

export function LandingPage({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Meeting Bingo</h1>
        <p className="text-lg text-gray-600 mb-8">
          Turn your meetings into a game! Listen for buzzwords and fill your bingo card.
        </p>

        <button
          onClick={onStart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          New Game
        </button>

        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl mb-2">🎤</div>
            <h3 className="font-medium text-gray-800 text-sm">Listen</h3>
            <p className="text-xs text-gray-500 mt-1">Enable mic to auto-detect buzzwords</p>
          </div>
          <div>
            <div className="text-2xl mb-2">📋</div>
            <h3 className="font-medium text-gray-800 text-sm">Play</h3>
            <p className="text-xs text-gray-500 mt-1">Squares fill automatically or tap manually</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🏆</div>
            <h3 className="font-medium text-gray-800 text-sm">Win</h3>
            <p className="text-xs text-gray-500 mt-1">Get 5 in a row for BINGO!</p>
          </div>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          All audio is processed locally in your browser. Nothing is recorded or sent anywhere.
        </p>
      </div>
    </div>
  );
}
