'use client';

import { useState } from 'react';
import { Dices, Check } from 'lucide-react';
import {
  Player,
  RoundForm as RoundFormType,
  PlayerId,
  Vote as VoteType,
  VoteStep,
} from '@/types/types';

import { StorytellerSelector } from './StorytellerSelector';
import { StorytellerInfo } from './StorytellerInfo';
import { VotingStep } from './VotingStep';
import { StorytellerCardStep } from './StorytellerCardStep';
import { PlayerCardRevealStep } from './PlayerCardRevealStep';
import { RoundScoreboard } from './RoundScoreboard';
import { useGameStore } from '@/lib/store';
import { calculatePlayerScores } from '@/lib/score-calculator';

interface VoteRoundFormProps {
  players: Player[];
  currentRound: number;
  onSubmit: (form: RoundFormType) => void;
}

export const VoteRoundForm = ({
  players,
  currentRound,
  onSubmit,
}: VoteRoundFormProps) => {
  const { scoreConfig } = useGameStore();

  const [currentStep, setCurrentStep] = useState<VoteStep>('STORYTELLER');

  const [storytellerId, setStorytellerId] = useState<string>('');
  const [storytellerCardId, setStorytellerCardId] = useState<string>('');

  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [currentRevealerIndex, setCurrentRevealerIndex] = useState(0);

  // temp target 이용
  const [votes, setVotes] = useState<VoteType[]>([]);
  const [revealedCards, setRevealedCards] = useState<PlayerId[]>([]);
  const [cardOwners, setCardOwners] = useState<Record<PlayerId, PlayerId>>({});

  // 스토리텔러 제외 플레이어들
  const nonStorytellerPlayers = players.filter(
    (player) => player.id !== storytellerId
  );

  // 1. 스토리텔러 선택
  const handleStorytellerSelect = (value: string) => {
    setStorytellerId(value);
    setCurrentStep('VOTING');
  };

  // 2. 카드 투표
  const handleCardVote = (targetId: PlayerId) => {
    const currentVoter = nonStorytellerPlayers[currentVoterIndex];

    const newVote: VoteType = {
      voterId: currentVoter.id,
      votedTargetId: targetId,
    };

    setVotes((prev) => [...prev, newVote]);

    if (currentVoterIndex < nonStorytellerPlayers.length - 1) {
      setCurrentVoterIndex((prev) => prev + 1);
    } else {
      // 모든 플레이어 투표 완료
      setCurrentStep('STORYTELLER_CARD');
    }
  };

  // 3. 스토리텔러 카드 공개
  const handleStorytellerCardSelect = (targetId: PlayerId) => {
    setStorytellerCardId(targetId);
    setCurrentStep('PLAYER_CARD');
  };

  // 4. 플레이어 카드 공개
  const handlePlayerCardReveal = (targetId: PlayerId) => {
    const currentRevealer = nonStorytellerPlayers[currentRevealerIndex];

    // 카드 소유자 정보 업데이트
    setCardOwners((prev) => ({
      ...prev,
      [targetId]: currentRevealer.id,
    }));

    setRevealedCards((prev) => [...prev, targetId]);

    // 마지막에서 2번째 플레이어 카드 공개 후, 마지막 플레이어도 자동으로 남은 카드 선택
    if (currentRevealerIndex === nonStorytellerPlayers.length - 2) {
      const lastTarget = players.find(
        (player) =>
          player.id !== storytellerCardId &&
          !revealedCards.includes(player.id) &&
          player.id !== targetId
      );

      if (lastTarget) {
        const lastRevealer =
          nonStorytellerPlayers[nonStorytellerPlayers.length - 1];

        // 마지막 플레이어의 카드도 자동으로 설정
        setCardOwners((prev) => ({
          ...prev,
          [lastTarget.id]: lastRevealer.id,
        }));

        setRevealedCards((prev) => [...prev, lastTarget.id]);
        setCurrentRevealerIndex(nonStorytellerPlayers.length); // 마지막 플레이어까지 완료된 걸로 처리
      }
    } else if (currentRevealerIndex < nonStorytellerPlayers.length - 1) {
      setCurrentRevealerIndex((prev) => prev + 1);
    }
  };

  const handleCardClick = (targetId: PlayerId) => {
    if (currentStep === 'VOTING') {
      // (카드 투표)
      handleCardVote(targetId);
    } else if (currentStep === 'STORYTELLER_CARD') {
      // (스토리텔러 카드 공개)
      handleStorytellerCardSelect(targetId);
    } else if (currentStep === 'PLAYER_CARD') {
      // (플레이어 카드 공개)
      // 이미 공개된 카드나 스토리텔러 카드는 선택할 수 없음
      if (storytellerCardId === targetId || revealedCards.includes(targetId)) {
        return;
      }
      handlePlayerCardReveal(targetId);
    }
  };

  const handleRoundComplete = () => {
    const scores: Record<PlayerId, number> = {};

    players.forEach((player) => {
      const { correctGuessScore, receivedVoteScore } = calculatePlayerScores(
        player,
        votes,
        storytellerId,
        storytellerCardId,
        cardOwners,
        revealedCards,
        scoreConfig
      );

      scores[player.id] = correctGuessScore + receivedVoteScore;
    });

    onSubmit({
      storytellerId,
      scores,
    });

    // 상태 초기화
    setStorytellerId('');
    setCurrentStep('STORYTELLER');
    setVotes([]);
    setCurrentVoterIndex(0);
    setStorytellerCardId('');
    setRevealedCards([]);
    setCurrentRevealerIndex(0);
    setCardOwners({});
  };

  const isAllCardsRevealed =
    currentRevealerIndex >= nonStorytellerPlayers.length;

  return (
    <div className="bg-white border-1 border-gray-600 p-6">
      <h2 className="font-light text-lg text-gray-800 mb-4 flex items-center gap-2">
        <Dices size={20} strokeWidth={1.5} /> Round {currentRound}
      </h2>

      <div className="space-y-4">
        {/* 스토리텔러 선택 STEP */}
        {currentStep === 'STORYTELLER' && (
          <StorytellerSelector
            players={players}
            storytellerId={storytellerId}
            onStorytellerSelect={handleStorytellerSelect}
          />
        )}

        {currentStep !== 'STORYTELLER' && (
          <StorytellerInfo players={players} storytellerId={storytellerId} />
        )}

        {/* 카드 투표 STEP */}
        {currentStep === 'VOTING' && (
          <VotingStep
            players={players}
            currentVoter={nonStorytellerPlayers[currentVoterIndex]}
            votes={votes}
            storytellerCardId={storytellerCardId}
            currentStep={currentStep}
            onCardClick={handleCardClick}
          />
        )}

        {/* 스토리텔러 카드 선택 STEP */}
        {currentStep === 'STORYTELLER_CARD' && (
          <StorytellerCardStep
            players={players}
            storytellerCardId={storytellerCardId}
            votes={votes}
            currentStep={currentStep}
            onCardClick={handleCardClick}
          />
        )}

        {/* 플레이어 카드 공개 STEP */}
        {currentStep === 'PLAYER_CARD' && (
          <PlayerCardRevealStep
            players={players}
            nonStorytellerPlayers={nonStorytellerPlayers}
            currentRevealerIndex={currentRevealerIndex}
            votes={votes}
            revealedCards={revealedCards}
            storytellerCardId={storytellerCardId}
            currentStep={currentStep}
            onCardClick={handleCardClick}
            cardOwners={cardOwners}
          />
        )}

        {/* 라운드 스코어보드 */}
        {(currentStep === 'STORYTELLER_CARD' ||
          currentStep === 'PLAYER_CARD') && (
          <RoundScoreboard
            players={players}
            votes={votes}
            storytellerId={storytellerId}
            storytellerCardId={storytellerCardId}
            revealedCards={revealedCards}
            cardOwners={cardOwners}
            scoreConfig={scoreConfig}
          />
        )}

        {currentStep === 'PLAYER_CARD' && isAllCardsRevealed && (
          <button
            type="button"
            onClick={handleRoundComplete}
            className="w-full py-2 px-4 font-medium transition-colors flex items-center justify-center gap-2 bg-blue-400 hover:bg-blue-700 text-white"
          >
            <Check size={16} strokeWidth={1.5} />
            COMPLETE ROUND
          </button>
        )}
      </div>
    </div>
  );
};
