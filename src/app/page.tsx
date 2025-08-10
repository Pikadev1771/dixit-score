'use client';

import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { GameSetup } from '@/components/GameSetup';
import { Scoreboard } from '@/components/Scoreboard';

import { useGameStore } from '@/lib/store';
import { RoundScoreForm } from '@/types/types';

const Home = () => {
  const [isGameSetup, setIsGameSetup] = useState(true);
  const {
    players,
    rounds,
    isGameEnded,
    winnerIds,
    initializeGame,
    finishRound,
    resetGame,
  } = useGameStore();

  const handleGameStart = (playerNames: string[]) => {
    initializeGame(playerNames);
    setIsGameSetup(false);
  };

  const handleRoundSubmit = (form: RoundScoreForm) => {
    finishRound(form);
  };

  const handleResetGame = () => {
    resetGame();
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Scoreboard
            players={players}
            currentRound={rounds.length + 1}
            isGameEnded={isGameEnded}
            winnerIds={winnerIds}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
