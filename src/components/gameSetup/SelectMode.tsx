import { Mode } from '@/types/types';
import { Calculator, Vote } from 'lucide-react';

interface SelectModeProps {
  mode: Mode;
  onModeChange: (mode: Mode) => () => void;
}

export const SelectMode = ({ mode, onModeChange }: SelectModeProps) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 block">
        Mode
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onModeChange('SCORE')}
          className={`p-3 border-1 transition-colors flex items-center justify-center gap-2 text-sm ${
            mode === 'SCORE'
              ? 'border-blue-400 bg-blue-50 text-blue-700'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Calculator size={16} strokeWidth={1.5} />
          SCORE
        </button>
        <button
          type="button"
          onClick={onModeChange('VOTE')}
          className={`p-3 border-1 transition-colors flex items-center justify-center gap-2 text-sm ${
            mode === 'VOTE'
              ? 'border-blue-400 bg-blue-50 text-blue-700'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Vote size={16} strokeWidth={1.5} />
          VOTE
        </button>
      </div>
    </div>
  );
};
