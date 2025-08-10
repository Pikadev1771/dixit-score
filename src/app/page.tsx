'use client';

import { GameSetup } from '@/components/GameSetup';

export default function Home() {
  const handleGameStart = (playerNames: string[]) => {
    console.log('playerNames', playerNames);
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
}
