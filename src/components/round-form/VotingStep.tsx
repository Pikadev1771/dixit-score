'use client';

import { Player, PlayerId, VoteStep, Vote as VoteType } from '@/types/types';
import { CardList } from './CardList';

interface VotingStepProps {
  players: Player[];
  nonStorytellerPlayers: Player[];
  currentVoterIndex: number;
  votes: VoteType[];
  storytellerCardId: string;
  currentStep: VoteStep;
  onCardClick: (cardOwnerId: PlayerId) => void;
}

export const VotingStep = ({
  players,
  nonStorytellerPlayers,
  currentVoterIndex,
  votes,
  storytellerCardId,
  currentStep,
  onCardClick,
}: VotingStepProps) => {
  const currentVoter = nonStorytellerPlayers[currentVoterIndex];

  return (
    <>
      <div className="mb-4 text-gray-800">
        <h3 className="text-md font-medium mb-2">Voting</h3>
        <p className="text-sm mb-4">
          <span className="font-bold">{currentVoter?.name}</span> is voting.
        </p>
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
