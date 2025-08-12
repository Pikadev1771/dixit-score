'use client';

import { Player, PlayerId, VoteStep, Vote as VoteType } from '@/types/types';
import { CardList } from './CardList';

interface PlayerCardRevealStepProps {
  players: Player[];
  nonStorytellerPlayers: Player[];
  currentRevealerIndex: number;
  votes: VoteType[];
  revealedCards: PlayerId[];
  storytellerCardId: string;
  currentStep: VoteStep;
  onCardClick: (targetId: PlayerId) => void;
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
  const isAllCardsRevealed =
    currentRevealerIndex >= nonStorytellerPlayers.length;

  return (
    <>
      {!isAllCardsRevealed && (
        <div className="mb-4">
          <h3 className="text-md font-medium text-gray-800 mb-2">
            Player Card Reveal
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-bold">
              {nonStorytellerPlayers[currentRevealerIndex]?.name}
            </span>{' '}
            is revealing the card.
          </p>
        </div>
      )}
      <CardList
        players={players}
        storytellerCardId={storytellerCardId}
        votes={votes}
        currentStep={currentStep}
        onCardClick={onCardClick}
        revealedCards={revealedCards}
        nonStorytellerPlayers={nonStorytellerPlayers}
        currentRevealerIndex={currentRevealerIndex}
        cardOwners={cardOwners}
      />
    </>
  );
};
