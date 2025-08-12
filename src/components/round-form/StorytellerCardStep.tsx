'use client';

import { Player, PlayerId, VoteStep, Vote as VoteType } from '@/types/types';
import { CardList } from './CardList';

interface StorytellerCardStepProps {
  players: Player[];
  storytellerCardId: string;
  votes: VoteType[];
  currentStep: VoteStep;
  onCardClick: (targetId: PlayerId) => void;
}

export const StorytellerCardStep = ({
  players,
  storytellerCardId,
  votes,
  currentStep,
  onCardClick,
}: StorytellerCardStepProps) => {
  return (
    <>
      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-800 mb-2">
          Storyteller Card Reveal
        </h3>
      </div>

      <CardList
        players={players}
        storytellerCardId={storytellerCardId}
        votes={votes}
        currentStep={currentStep}
        onCardClick={onCardClick}
      />
    </>
  );
};
