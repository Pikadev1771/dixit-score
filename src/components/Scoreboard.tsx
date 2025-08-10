'use client';

import { Player, PlayerId } from '@/types/types';
import { Trophy, Award, Rabbit } from 'lucide-react';
import { getPlayerColor } from '@/constants/theme';

interface ScoreboardProps {
  players: Player[];
  currentRound: number;
  isGameEnded: boolean;
  winnerIds: PlayerId[];
}

export const Scoreboard = ({
  players,
  currentRound,
  isGameEnded,
  winnerIds,
}: ScoreboardProps) => {
  const sortedPlayers = [...players].sort(
    (a, b) => b.totalScore - a.totalScore
  );

  const getWinnerNames = () => {
    if (winnerIds.length === 0) return '';
    if (winnerIds.length === 1) {
      const winner = players.find((p) => p.id === winnerIds[0]);
      return `${winner?.name}님이\n승리했습니다!`;
    }
    const winnerNames = winnerIds
      .map((id) => players.find((p) => p.id === id)?.name)
      .filter(Boolean)
      .join(', ');
    return `${winnerNames}님이\n공동 승리했습니다!`;
  };

  const getPlayerRowStyle = (index: number, playerId: PlayerId) => {
    if (isGameEnded && winnerIds.includes(playerId)) {
      return 'bg-green-50 border-green-200';
    }
    if (index === 0 && !isGameEnded) {
      return 'bg-yellow-50 border-yellow-200';
    }
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="bg-white border-1 border-gray-600 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-light text-xl text-gray-800 flex items-center gap-2">
          <Trophy size={20} strokeWidth={1.5} />
          Scoreboard
        </h2>
        {currentRound !== 1 && (
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <Award size={16} strokeWidth={1.5} />
            Round {currentRound - 1}
          </span>
        )}
      </div>

      {isGameEnded && winnerIds.length > 0 && (
        <div className="mb-4 p-4 bg-green-100 border-1 border-green-400">
          <p className="text-green-800 font-medium text-center flex items-center justify-center gap-2 whitespace-pre-line">
            {getWinnerNames()} 🎉
          </p>
        </div>
      )}

      <div className="space-y-3">
        {sortedPlayers.map((player, index) => {
          const playerIndex = players.findIndex((p) => p.id === player.id);
          const playerColor = getPlayerColor(playerIndex);

          return (
            <div
              key={player.id}
              className={`flex justify-between items-center p-3 border-1 ${getPlayerRowStyle(
                index,
                player.id
              )}`}
            >
              <div className="flex items-center space-x-3">
                <span
                  className="w-6 h-6 flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: playerColor }}
                >
                  {index + 1}
                </span>
                <span className="font-medium text-gray-800 flex items-center gap-2">
                  <Rabbit size={30} color={playerColor} strokeWidth={1.5} />
                  {player.name}
                </span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {player.totalScore}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
