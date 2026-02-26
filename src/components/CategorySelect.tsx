import type { CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';

interface Props {
  onSelect: (categoryId: CategoryId) => void;
  onBack: () => void;
}

export function CategorySelect({ onSelect, onBack }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Category</h2>
      <p className="text-gray-500 mb-8">Pick your buzzword theme</p>

      <div className="grid gap-4 w-full max-w-md">
        {CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className="bg-white border-2 border-gray-200 hover:border-blue-400 rounded-xl p-5 text-left transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">{category.description}</p>
            <div className="flex flex-wrap gap-1">
              {category.words.slice(0, 5).map(word => (
                <span
                  key={word}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                >
                  {word}
                </span>
              ))}
              <span className="text-xs text-gray-400 px-1 py-0.5">
                +{category.words.length - 5} more
              </span>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="mt-6 text-gray-500 hover:text-gray-700 text-sm"
      >
        ← Back
      </button>
    </div>
  );
}
