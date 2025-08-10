'use client';

import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { GameSetup } from '@/components/GameSetup';

const Home = () => {
  const [isGameSetup, setIsGameSetup] = useState(true);

  const handleGameStart = (playerNames: string[]) => {
    console.log('playerNames', playerNames);
    setIsGameSetup(false);
  };

  const handleResetGame = () => {
    setIsGameSetup(true);
  };

  if (isGameSetup) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="font-light text-2xl text-center mb-8 text-gray-800 flex items-center justify-center gap-2">
            Dixit Scoreboard
          </h1>
          <GameSetup onGameStart={handleGameStart} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex justify-between items-center gap-2 mb-8">
          <h1 className="text-2xl font-light text-gray-800 flex items-center gap-2">
            Dixit Scoreboard
          </h1>
          <button
            onClick={handleResetGame}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm transition-colors flex items-center"
          >
            <RotateCcw size={16} strokeWidth={1.5} />
            NEW GAME
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
