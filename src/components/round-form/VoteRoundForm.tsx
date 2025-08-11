'use client';

import { useState } from 'react';
import { Dices } from 'lucide-react';
import {
  Player,
  RoundScoreForm as RoundScoreFormType,
  PlayerId,
  Vote as VoteType,
} from '@/types/types';

import { StorytellerSelector } from './StorytellerSelector';
import { StorytellerInfo } from './StorytellerInfo';
import { VotingStep } from './VotingStep';
import { StorytellerCardStep } from './StorytellerCardStep';

interface VoteRoundFormProps {
  players: Player[];
  currentRound: number;
  onSubmit: (form: RoundScoreFormType) => void;
}

export const VoteRoundForm = ({
  players,
  currentRound,
  onSubmit,
}: VoteRoundFormProps) => {
  const [storytellerId, setStorytellerId] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<
    'storyteller' | 'voting' | 'storytellerCard'
  >('storyteller');
  const [votes, setVotes] = useState<VoteType[]>([]);
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [storytellerCardId, setStorytellerCardId] = useState<string>('');

  // 스토리텔러를 제외한 플레이어들
  const nonStorytellerPlayers = players.filter(
    (player) => player.id !== storytellerId
  );

  const handleStorytellerSelect = (value: string) => {
    setStorytellerId(value);
    setCurrentStep('voting');
  };

  const handleCardVote = (cardOwnerId: PlayerId) => {
    const currentVoter = nonStorytellerPlayers[currentVoterIndex];

    const newVote: VoteType = {
      voterId: currentVoter.id,
      votedCardOwnerId: cardOwnerId,
    };

    setVotes((prev) => [...prev, newVote]);

    if (currentVoterIndex < nonStorytellerPlayers.length - 1) {
      setCurrentVoterIndex((prev) => prev + 1);
    } else {
      // 모든 플레이어 투표 완료
      setCurrentStep('storytellerCard');
    }
  };

  const handleStorytellerCardSelect = (cardOwnerId: PlayerId) => {
    setStorytellerCardId(cardOwnerId);
  };

  const handleCardClick = (cardOwnerId: PlayerId) => {
    if (currentStep === 'voting') {
      handleCardVote(cardOwnerId);
    } else if (currentStep === 'storytellerCard') {
      handleStorytellerCardSelect(cardOwnerId);
    }
  };

  return (
    <div className="bg-white border-1 border-gray-600 p-6">
      <h2 className="font-light text-lg text-gray-800 mb-4 flex items-center gap-2">
        <Dices size={20} strokeWidth={1.5} /> Round {currentRound} (Vote Mode)
      </h2>

      <div className="space-y-4">
        {/* 스토리텔러 선택 STEP */}
        {currentStep === 'storyteller' && (
          <StorytellerSelector
            players={players}
            storytellerId={storytellerId}
            onStorytellerSelect={handleStorytellerSelect}
          />
        )}

        {currentStep !== 'storyteller' && (
          <StorytellerInfo
            players={players}
            storytellerId={storytellerId}
            storytellerCardId={storytellerCardId}
            votes={votes}
            nonStorytellerPlayers={nonStorytellerPlayers}
          />
        )}

        {/* 카드 투표 STEP */}
        {currentStep === 'voting' && (
          <VotingStep
            players={players}
            nonStorytellerPlayers={nonStorytellerPlayers}
            currentVoterIndex={currentVoterIndex}
            votes={votes}
            storytellerCardId={storytellerCardId}
            currentStep={currentStep}
            onCardClick={handleCardClick}
          />
        )}

        {/* 스토리텔러 카드 선택 STEP */}
        {currentStep === 'storytellerCard' && (
          <StorytellerCardStep
            players={players}
            storytellerCardId={storytellerCardId}
            votes={votes}
            currentStep={currentStep}
            onCardClick={handleCardClick}
          />
        )}
      </div>
    </div>
  );
};
