'use client';

import { Player, PlayerId, Vote as VoteType } from '@/types/types';
import { getPlayerColor } from '@/constants/theme';
import { useGameStore } from '@/lib/store';

interface CardListProps {
  players: Player[];
  storytellerCardId: string;
  votes: VoteType[];
  currentStep: 'storyteller' | 'voting' | 'storytellerCard';
  onCardClick: (cardOwnerId: PlayerId) => void;
}

export const CardList = ({
  players,
  storytellerCardId,
  votes,
  currentStep,
  onCardClick,
}: CardListProps) => {
  const { scoreConfig } = useGameStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
      {players.map((player, index) => (
        <button
          key={player.id}
          onClick={() => onCardClick(player.id)}
          className={`p-4 border-2 rounded-md transition-colors flex flex-col items-center justify-center min-h-[80px] ${
            storytellerCardId === player.id
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          <div className="text-sm font-medium text-gray-700 text-center">
            {storytellerCardId === player.id && (
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-orange-600 text-xs font-medium">
                  Storyteller
                </span>
              </div>
            )}
            Card {index + 1}
          </div>
          {/* 투표 결과 표시 */}
          {votes.length > 0 && (
            <div className="text-xs text-gray-500 mt-1 text-center">
              {votes
                .filter((vote) => vote.votedCardOwnerId === player.id)
                .map((vote) => {
                  const voter = players.find((p) => p.id === vote.voterId);
                  const voterColor = getPlayerColor(
                    players.findIndex((p) => p.id === vote.voterId)
                  );
                  const isCorrectGuess =
                    storytellerCardId &&
                    vote.votedCardOwnerId === storytellerCardId;
                  return (
                    <div
                      key={vote.voterId}
                      className="flex items-center justify-center gap-1 mb-1"
                    >
                      <span>{voter?.name}</span>
                      {isCorrectGuess && (
                        <span className="text-green-600 font-medium">
                          +{scoreConfig.correctGuessPoints}
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
