'use client';

import { Player, PlayerId, Vote as VoteType } from '@/types/types';
import { CardList } from './CardList';
import { PlayerList } from './PlayerList';

interface VotingStepProps {
  players: Player[];
  nonStorytellerPlayers: Player[];
  currentVoterIndex: number;
  votes: VoteType[];
  storytellerCardId: string;
  currentStep: 'storyteller' | 'voting' | 'storytellerCard';
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
  return (
    <>
      <div className="mb-4">
        <h3 className="text-md font-medium text-gray-800 mb-2">카드 투표</h3>

        <p className="text-sm text-gray-600 mb-2">
          <span className="font-bold">
            {nonStorytellerPlayers[currentVoterIndex]?.name}
          </span>{' '}
          님이 투표할 차례입니다.
        </p>
      </div>
      <PlayerList
        nonStorytellerPlayers={nonStorytellerPlayers}
        allPlayers={players}
        currentStep={currentStep}
        currentVoterIndex={currentVoterIndex}
        votes={votes}
      />
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
