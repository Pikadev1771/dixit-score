'use client';

import { Rabbit, Plus, Minus } from 'lucide-react';
import { getPlayerColor } from '@/constants/theme';

interface PlayerSetupProps {
  playerCount: number;
  playerNames: string[];
  onPlayerCountChange: (type: 'plus' | 'minus') => () => void;
  onNameChange: (index: number, name: string) => void;
}

export const PlayerSetup = ({
  playerCount,
  playerNames,
  onPlayerCountChange,
  onNameChange,
}: PlayerSetupProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-md font-medium text-gray-700">Players</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPlayerCountChange('minus')}
            disabled={playerCount <= 3}
            className="p-2.5 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-medium text-gray-800">
            {playerCount}
          </span>
          <button
            type="button"
            onClick={onPlayerCountChange('plus')}
            disabled={playerCount >= 8}
            className="p-2.5 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {playerNames.map((name, index) => (
          <div
            key={`player-${index}`}
            className="flex justify-between items-center gap-3"
          >
            <Rabbit size={30} color={getPlayerColor(index)} strokeWidth={1.5} />
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={`플레이어 ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
