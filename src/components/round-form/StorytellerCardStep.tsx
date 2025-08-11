'use client';

import { Player, PlayerId, Vote as VoteType } from '@/types/types';
import { CardList } from './CardList';

interface StorytellerCardStepProps {
  players: Player[];
  storytellerCardId: string;
  votes: VoteType[];
  currentStep: 'storyteller' | 'voting' | 'storytellerCard';
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
          스토리텔러 카드 공개
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          스토리텔러는 정답 카드를 공개해 주세요
        </p>
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
