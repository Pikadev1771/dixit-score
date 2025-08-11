'use client';

import { useState } from 'react';
import { Mic, Check, Rabbit, Dices, Calculator } from 'lucide-react';
import { Player, RoundForm as RoundFormType, PlayerId } from '@/types/types';
import { getPlayerColor } from '@/constants/theme';
import { getMaxScorePerRound } from '@/lib/dixit';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface ScoreRoundFormProps {
  players: Player[];
  currentRound: number;
  onSubmit: (form: RoundFormType) => void;
}

export const ScoreRoundForm = ({
  players,
  currentRound,
  onSubmit,
}: ScoreRoundFormProps) => {
  const [storytellerId, setStorytellerId] = useState<string>('');
  const [scores, setScores] = useState<Record<PlayerId, number>>({});

  const handleScoreChange = (playerId: PlayerId, score: number) => {
    setScores((prev) => ({
      ...prev,
      [playerId]: score,
    }));
  };

  const handleRoundSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const completeScores: Record<PlayerId, number> = {};
    players.forEach((player) => {
      completeScores[player.id] = scores[player.id] || 0;
    });

    onSubmit({
      storytellerId,
      scores: completeScores,
    });
    setStorytellerId('');
    setScores({});
  };

  const getTotalScore = () => {
    return players.reduce((total, player) => {
      const score = scores[player.id] || 0;
      return total + score;
    }, 0);
  };

  const isDisabled =
    !storytellerId ||
    Object.values(scores).some((score) => isNaN(score)) ||
    getTotalScore() === 0;

  return (
    <div className="bg-white border-1 border-gray-600 p-6">
      <h2 className="font-light text-lg text-gray-800 mb-4 flex items-center gap-2">
        <Dices size={20} strokeWidth={1.5} /> Round {currentRound}
      </h2>

      <form onSubmit={handleRoundSubmit} className="space-y-4">
        {/* 스토리텔러 선택 */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Mic size={16} strokeWidth={1.5} />
            Storyteller
          </label>
          <Select
            key={`storyteller-${storytellerId}`}
            value={storytellerId || undefined}
            onValueChange={(value) => setStorytellerId(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Storyteller" />
            </SelectTrigger>
            <SelectContent>
              {players.map((player) => (
                <SelectItem key={player.id} value={player.id}>
                  {player.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 직접 점수 입력 */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calculator size={16} strokeWidth={1.5} />
            Score
          </label>
          <div className="space-y-3">
            {players.map((player, index) => {
              const playerColor = getPlayerColor(index);
              const isStoryteller = player.id === storytellerId;
              return (
                <div
                  key={player.id}
                  className="flex justify-between items-center space-x-3"
                >
                  <span
                    className={`flex items-center text-sm font-medium gap-1.5 min-w-[100px] ${
                      isStoryteller ? 'text-orange-600' : 'text-gray-700'
                    }`}
                  >
                    <Rabbit size={20} color={playerColor} strokeWidth={1.5} />
                    {player.name}
                    {isStoryteller && <Mic size={20} strokeWidth={1.5} />}
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={getMaxScorePerRound(players.length)}
                    value={scores[player.id] || ''}
                    onChange={(e) =>
                      handleScoreChange(
                        player.id,
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="flex-1 max-w-[100px] px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="0"
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full py-2 px-4 font-medium transition-colors flex items-center justify-center gap-2 ${
            isDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-400 hover:bg-blue-700 text-white'
          }`}
        >
          <Check size={16} strokeWidth={1.5} />
          COMPLETE ROUND
        </button>
      </form>
    </div>
  );
};
