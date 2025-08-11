'use client';

import { Player, PlayerId, Vote as VoteType } from '@/types/types';
import { CardList } from './CardList';
import { useGameStore } from '@/lib/store';

interface PlayerCardRevealStepProps {
  players: Player[];
  nonStorytellerPlayers: Player[];
  currentRevealerIndex: number;
  votes: VoteType[];
  revealedCards: PlayerId[];
  storytellerCardId: string;
  currentStep:
    | 'storyteller'
    | 'voting'
    | 'storytellerCard'
    | 'playerCardReveal';
  onCardClick: (cardOwnerId: PlayerId) => void;
  cardOwners?: Record<PlayerId, PlayerId>;
}

export const PlayerCardRevealStep = ({
  players,
  nonStorytellerPlayers,
  currentRevealerIndex,
  votes,
  revealedCards,
  storytellerCardId,
  currentStep,
  onCardClick,
  cardOwners = {},
}: PlayerCardRevealStepProps) => {
  const { scoreConfig } = useGameStore();

  return (
    <>
      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-800 mb-2">
          플레이어 카드 공개
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-bold">
            {nonStorytellerPlayers[currentRevealerIndex]?.name}
          </span>{' '}
          님이 자신의 카드를 공개할 차례입니다.
        </p>
      </div>
      <CardList
        players={players}
        storytellerCardId={storytellerCardId}
        votes={votes}
        currentStep={currentStep}
        onCardClick={onCardClick}
        revealedCards={revealedCards}
        scoreConfig={scoreConfig}
        nonStorytellerPlayers={nonStorytellerPlayers}
        currentRevealerIndex={currentRevealerIndex}
        cardOwners={cardOwners}
      />
    </>
  );
};
