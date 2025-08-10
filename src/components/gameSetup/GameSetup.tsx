'use client';

import { useState } from 'react';
import { Play, Rabbit, Plus, Minus } from 'lucide-react';
import { getPlayerColor } from '@/constants/theme';
import { ScoreConfig } from '@/types/types';
import {
  INITIAL_PLAYER_COUNT,
  INITIAL_PLAYER_NAMES,
  INITIAL_VICTORY_TOTAL_POINTS,
  INITIAL_STORYTELLER_ALL_OR_NONE_GUESSED_POINTS,
  INITIAL_STORYTELLER_NORMAL_POINTS,
  INITIAL_CORRECT_GUESS_POINTS,
  INITIAL_RECEIVED_VOTE_POINTS,
} from '@/constants/constants';
import { NumberInput } from './NumberInput';

interface GameSetupProps {
  onGameStart: (
    playerNames: string[],
    victoryPoints: number,
    scoreConfig: ScoreConfig
  ) => void;
}

export const GameSetup = ({ onGameStart }: GameSetupProps) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGameStart(playerNames, victoryPoints, scoreConfig);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border-1 border-gray-600">
      <h2 className="font-light text-2xl text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
        Game Setup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 플레이어 수 조절 */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">Players</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePlayerCountChange('minus')}
              disabled={playerCount <= 3}
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-medium text-gray-800">
              {playerCount}
            </span>
            <button
              type="button"
              onClick={handlePlayerCountChange('plus')}
              disabled={playerCount >= 8}
              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* 플레이어 이름 입력 */}
        <div className="space-y-3">
          {playerNames.map((name, index) => (
            <div
              key={`player-${index}`}
              className="flex justify-between items-center gap-3"
            >
              <Rabbit
                size={30}
                color={getPlayerColor(index)}
                strokeWidth={1.5}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`플레이어 ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 my-4" />

        {/* 승리 점수 설정 */}
        <NumberInput
          label="Victory Points"
          value={victoryPoints}
          onChange={setVictoryPoints}
          min={3}
          max={100}
          placeholder="30"
        />

        <div className="border-t border-gray-300 my-4" />

        {/* 점수 설정 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Score Config
            </label>
          </div>

          <NumberInput
            label={`Storyteller\n(All/None Guessed)`}
            value={scoreConfig.storytellerAllOrNoneGuessedPoints}
            onChange={(value) =>
              setScoreConfig({
                ...scoreConfig,
                storytellerAllOrNoneGuessedPoints: value,
              })
            }
            min={0}
            max={20}
            placeholder="0"
            className="text-sm font-small text-gray-700 whitespace-pre-line"
          />

          <NumberInput
            label={`Storyteller\n(Normal)`}
            value={scoreConfig.storytellerNormalPoints}
            onChange={(value) =>
              setScoreConfig({
                ...scoreConfig,
                storytellerNormalPoints: value,
              })
            }
            min={0}
            max={20}
            placeholder="3"
            className="text-sm font-small text-gray-700 whitespace-pre-line"
          />

          <NumberInput
            label="Correct Guess"
            value={scoreConfig.correctGuessPoints}
            onChange={(value) =>
              setScoreConfig({
                ...scoreConfig,
                correctGuessPoints: value,
              })
            }
            min={0}
            max={20}
            placeholder="3"
          />

          <NumberInput
            label="Received Vote"
            value={scoreConfig.receivedVotePoints}
            onChange={(value) =>
              setScoreConfig({
                ...scoreConfig,
                receivedVotePoints: value,
              })
            }
            min={0}
            max={20}
            placeholder="1"
          />
        </div>

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
