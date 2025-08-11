'use client';

import { Player, PlayerId, Vote as VoteType, ScoreConfig } from '@/types/types';
import { CardList } from './CardList';
import { RoundScoreboard } from './RoundScoreboard';

interface StorytellerCardStepProps {
  players: Player[];
  storytellerCardId: string;
  votes: VoteType[];
  currentStep:
    | 'storyteller'
    | 'voting'
    | 'storytellerCard'
    | 'playerCardReveal';
  onCardClick: (cardOwnerId: PlayerId) => void;
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

      {storytellerCardId && <div>다음 단계</div>}
    </>
  );
};
