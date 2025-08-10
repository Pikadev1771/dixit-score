'use client';

import { useState } from 'react';
import { Play, Rabbit } from 'lucide-react';
import {
  DEFAULT_PLAYER_PLACEHOLDERS,
  INITIAL_PLAYER_NAMES,
} from '@/constants/constants';
import { getPlayerColor } from '@/constants/theme';

interface GameSetupProps {
  onGameStart: (playerNames: string[]) => void;
}

export const GameSetup = ({ onGameStart }: GameSetupProps) => {
  const [playerNames, setPlayerNames] = useState(INITIAL_PLAYER_NAMES);

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const Players = playerNames.map((name, index) =>
      name.trim() === '' ? DEFAULT_PLAYER_PLACEHOLDERS[index] : name.trim()
    );

    onGameStart(Players);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border-1 border-gray-600">
      <h2 className="font-light text-2xl text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
        Game Setup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Player Names
        </label>
        {playerNames.map((name, index) => (
          <div
            key={DEFAULT_PLAYER_PLACEHOLDERS[index]}
            className="flex justify-between items-center gap-3"
          >
            <Rabbit size={30} color={getPlayerColor(index)} strokeWidth={1.5} />
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder={DEFAULT_PLAYER_PLACEHOLDERS[index]}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Play size={16} />
          START
        </button>
      </form>
    </div>
  );
};
