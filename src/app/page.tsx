'use client';

import { useState } from 'react';
import { GameSetup } from '@/components/GameSetup';

const Home = () => {
  const [isGameSetup, setIsGameSetup] = useState(true);

  console.log('isGameSetup', isGameSetup);
  const handleGameStart = () => {
    console.log('start');
    setIsGameSetup(false);
  };

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
};

export default Home;
