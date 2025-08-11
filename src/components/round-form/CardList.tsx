'use client';

import { Player, PlayerId, Vote as VoteType } from '@/types/types';

interface CardListProps {
  players: Player[];
  storytellerCardId: string;
  votes: VoteType[];
  currentStep:
    | 'storyteller'
    | 'voting'
    | 'storytellerCard'
    | 'playerCardReveal';
  onCardClick: (cardOwnerId: PlayerId) => void;
  revealedCards?: PlayerId[];
  nonStorytellerPlayers?: Player[];
  currentRevealerIndex?: number;
  cardOwners?: Record<PlayerId, PlayerId>;
}

export const CardList = ({
  players,
  storytellerCardId,
  votes,
  currentStep,
  onCardClick,
  revealedCards = [],
  nonStorytellerPlayers = [],
  currentRevealerIndex = 0,
  cardOwners = {},
}: CardListProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
      {players.map((player, index) => (
        <button
          key={player.id}
          onClick={() => {
            console.log('Card clicked', {
              playerId: player.id,
              playerName: player.name,
              currentStep,
              storytellerCardId,
              revealedCards,
              currentRevealerIndex,
              currentRevealer: nonStorytellerPlayers?.[currentRevealerIndex],
            });
            onCardClick(player.id);
          }}
          disabled={
            currentStep === 'playerCardReveal' &&
            (storytellerCardId === player.id ||
              revealedCards.includes(player.id))
          }
          className={`p-4 border-1 rounded-md transition-colors flex flex-col items-center justify-center min-h-[80px] ${
            storytellerCardId === player.id
              ? 'border-orange-400 bg-orange-50 text-orange-700'
              : revealedCards.includes(player.id) &&
                  currentStep === 'playerCardReveal' &&
                  currentRevealerIndex < nonStorytellerPlayers.length - 1
                ? 'border-gray-300 bg-gray-50 opacity-50 cursor-not-allowed'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="text-sm text-gray-700 text-center">
            {storytellerCardId === player.id && (
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-orange-600 text-xs font-medium">
                  Storyteller
                </span>
              </div>
            )}
            {currentStep === 'playerCardReveal' &&
              revealedCards.includes(player.id) && (
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-blue-600 text-xs font-medium">
                    {(() => {
                      const cardOwnerId = cardOwners[player.id];
                      const cardOwner = players.find(
                        (p) => p.id === cardOwnerId
                      );
                      return cardOwner?.name || player.name;
                    })()}
                  </span>
                </div>
              )}
            Card {index + 1}
          </div>
          {/* 투표자 표시 */}
          {votes.length > 0 && (
            <div className="text-xs text-gray-500 mt-1 text-center">
              {votes
                .filter((vote) => vote.votedCardOwnerId === player.id)
                .map((vote) => {
                  const voter = players.find((p) => p.id === vote.voterId);
                  return (
                    <div
                      key={vote.voterId}
                      className="flex items-center justify-center gap-1 mb-1"
                    >
                      <span>{voter?.name}</span>
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
