'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { ScoreConfig, Mode } from '@/types/types';
import {
  INITIAL_PLAYER_COUNT,
  INITIAL_PLAYER_NAMES,
  INITIAL_VICTORY_TOTAL_POINTS,
  INITIAL_STORYTELLER_ALL_OR_NONE_GUESSED_POINTS,
  INITIAL_STORYTELLER_NORMAL_POINTS,
  INITIAL_CORRECT_GUESS_POINTS,
  INITIAL_RECEIVED_VOTE_POINTS,
} from '@/constants/constants';
import { PlayerSetup } from './PlayerSetup';
import { VictoryPointsSetup } from './VictoryPointsSetup';
import { ScoreConfigSetup } from './ScoreConfigSetup';
import { SelectMode } from './SelectMode';

interface GameSetupProps {
  onGameStart: (
    playerNames: string[],
    victoryPoints: number,
    scoreConfig: ScoreConfig,
    mode: Mode
  ) => void;
}

export const GameSetup = ({ onGameStart }: GameSetupProps) => {
  const [mode, setMode] = useState<Mode>('SCORE');
  const [playerCount, setPlayerCount] = useState(INITIAL_PLAYER_COUNT);
  const [playerNames, setPlayerNames] = useState(INITIAL_PLAYER_NAMES);
  const [victoryPoints, setVictoryPoints] = useState(
    INITIAL_VICTORY_TOTAL_POINTS
  );
  const [scoreConfig, setScoreConfig] = useState<ScoreConfig>({
    storytellerAllOrNoneGuessedPoints:
      INITIAL_STORYTELLER_ALL_OR_NONE_GUESSED_POINTS,
    storytellerNormalPoints: INITIAL_STORYTELLER_NORMAL_POINTS,
    correctGuessPoints: INITIAL_CORRECT_GUESS_POINTS,
    receivedVotePoints: INITIAL_RECEIVED_VOTE_POINTS,
  });

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handlePlayerCountChange = (type: 'plus' | 'minus') => () => {
    const newCount = type === 'plus' ? playerCount + 1 : playerCount - 1;
    setPlayerCount(newCount);

    const newNames = [...playerNames];
    if (type === 'plus') {
      newNames.push('');
    } else {
      newNames.splice(newCount);
    }
    setPlayerNames(newNames);
  };

  const handleModeChange = (mode: Mode) => () => {
    setMode(mode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGameStart(playerNames, victoryPoints, scoreConfig, mode);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border-1 border-gray-600">
      <h2 className="font-light text-2xl text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
        Game Setup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <SelectMode mode={mode} onModeChange={handleModeChange} />

        <div className="border-t border-gray-200 my-6" />

        <PlayerSetup
          playerCount={playerCount}
          playerNames={playerNames}
          onPlayerCountChange={handlePlayerCountChange}
          onNameChange={handleNameChange}
        />

        <div className="border-t border-gray-300 my-6" />

        <VictoryPointsSetup
          victoryPoints={victoryPoints}
          onVictoryPointsChange={setVictoryPoints}
        />

        <div className="border-t border-gray-300 my-6" />

        <ScoreConfigSetup
          scoreConfig={scoreConfig}
          onScoreConfigChange={setScoreConfig}
        />

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
