'use client';

import { Player, PlayerId, VoteStep, Vote as VoteType } from '@/types/types';

interface CardListProps {
  players: Player[];
  storytellerCardId: string;
  votes: VoteType[];
  currentStep: VoteStep;
  onCardClick: (targetId: PlayerId) => void;
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
  const getCardClassName = (cardId: PlayerId) => {
    const baseClasses =
      'p-4 border-1 rounded-md transition-colors flex flex-col items-center justify-center min-h-[80px]';

    // 스토리텔러 카드
    if (storytellerCardId === cardId) {
      return `${baseClasses} border-orange-400 bg-orange-50 text-orange-700`;
    }

    // (플레이어 카드 공개 스텝에서) 이미 공개된 카드
    if (
      revealedCards.includes(cardId) &&
      currentStep === 'PLAYER_CARD' &&
      currentRevealerIndex < nonStorytellerPlayers.length - 1
    ) {
      return `${baseClasses} border-gray-300 bg-gray-50 opacity-50 cursor-not-allowed`;
    }

    // 기본 상태
    return `${baseClasses} border-gray-300 bg-white text-gray-700 hover:bg-gray-50`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
      {players.map((card, index) => (
        <button
          key={card.id}
          onClick={() => {
            onCardClick(card.id);
          }}
          disabled={
            // 플레이어 카드 공개 스텝 :  스토리텔러 카드나 이미 공개된 카드는 선택할 수 없음
            currentStep === 'PLAYER_CARD' &&
            (storytellerCardId === card.id || revealedCards.includes(card.id))
          }
          className={getCardClassName(card.id)}
        >
          {/* 카드 소유자 표시 */}
          <div className="text-sm text-gray-700 text-center">
            {storytellerCardId === card.id && (
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-orange-600 text-xs font-medium">
                  Storyteller
                </span>
              </div>
            )}
            {currentStep === 'PLAYER_CARD' &&
              revealedCards.includes(card.id) && (
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-blue-600 text-xs font-medium">
                    {(() => {
                      const cardOwnerId = cardOwners[card.id];
                      const cardOwner = players.find(
                        (p) => p.id === cardOwnerId
                      );
                      return cardOwner?.name || card.name;
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
                .filter((vote) => vote.votedTargetId === card.id)
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
