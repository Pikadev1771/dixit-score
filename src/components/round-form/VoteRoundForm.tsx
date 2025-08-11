'use client';

import { useState } from 'react';
import { Mic, Rabbit, Dices } from 'lucide-react';
import {
  Player,
  RoundScoreForm as RoundScoreFormType,
  PlayerId,
  Vote as VoteType,
} from '@/types/types';
import { getPlayerColor } from '@/constants/theme';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

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

  const handleNextStep = () => {
    if (currentStep === 'storyteller') {
      setCurrentStep('voting');
    }
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

  // 카드 렌더링 함수
  const renderCards = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        {players.map((player, index) => (
          <button
            key={player.id}
            onClick={() => {
              if (currentStep === 'voting') {
                handleCardVote(player.id);
              } else if (currentStep === 'storytellerCard') {
                handleStorytellerCardSelect(player.id);
              }
            }}
            className={`p-4 border-2 rounded-md transition-colors flex flex-col items-center justify-center min-h-[80px] ${
              storytellerCardId === player.id
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <div className="text-sm font-medium text-gray-700 text-center">
              {storytellerCardId === player.id && (
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-orange-600 text-xs font-medium">
                    Storyteller
                  </span>
                </div>
              )}
              Card {index + 1}
            </div>
            {/* 투표 결과 표시 */}
            {votes.length > 0 && (
              <div className="text-xs text-gray-500 mt-1 text-center">
                {votes
                  .filter((vote) => vote.votedCardOwnerId === player.id)
                  .map((vote) => {
                    const voter = players.find((p) => p.id === vote.voterId);
                    const voterColor = getPlayerColor(
                      players.findIndex((p) => p.id === vote.voterId)
                    );
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

  // 플레이어 목록 렌더링 함수
  const renderPlayers = () => {
    return (
      <div className="flex justify-center gap-2 mb-4">
        {nonStorytellerPlayers.map((player, index) => {
          const playerColor = getPlayerColor(
            players.findIndex((p) => p.id === player.id)
          );
          const isCurrentVoter =
            currentStep === 'voting' && index === currentVoterIndex;
          const hasVoted = votes.some((vote) => vote.voterId === player.id);

          return (
            <div
              key={player.id}
              className={`p-2 rounded-sm border-2 transition-colors ${
                isCurrentVoter
                  ? 'border-blue-400 bg-blue-50'
                  : hasVoted
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 bg-gray-50 opacity-50'
              }`}
            >
              <Rabbit size={16} color={playerColor} strokeWidth={2} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white border-1 border-gray-600 p-6">
      <h2 className="font-light text-lg text-gray-800 mb-4 flex items-center gap-2">
        <Dices size={20} strokeWidth={1.5} /> Round {currentRound} (Vote Mode)
      </h2>

      <div className="space-y-4">
        {/* 스토리텔러 선택 STEP */}
        {currentStep === 'storyteller' && (
          <>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mic size={16} strokeWidth={1.5} />
                Storyteller
              </label>
              <Select
                key={`storyteller-${storytellerId}`}
                value={storytellerId || undefined}
                onValueChange={handleStorytellerSelect}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Storyteller" />
                </SelectTrigger>
                <SelectContent>
                  {players.map((player) => (
                    <SelectItem key={player.id} value={player.id}>
                      {player.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {currentStep !== 'storyteller' && (
          <div className="flex justify-center items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full w-fit mx-auto text-center mb-3">
            <Mic size={16} strokeWidth={1.5} />
            <div className="inline-block">
              Storyteller: {players.find((p) => p.id === storytellerId)?.name}
            </div>
          </div>
        )}

        {/* 카드 투표 단계 */}
        {currentStep === 'voting' && (
          <>
            <div className="mb-4">
              <h3 className="text-md font-medium text-gray-800 mb-2">
                카드 투표
              </h3>

              <p className="text-sm text-gray-600 mb-2">
                <span className="font-bold">
                  {nonStorytellerPlayers[currentVoterIndex]?.name}
                </span>{' '}
                님이 투표할 차례입니다.
              </p>
            </div>
            {renderPlayers()}
            {renderCards()}
          </>
        )}

        {/* 스토리텔러 카드 선택 STEP */}
        {currentStep === 'storytellerCard' && (
          <>
            <div className="mb-4">
              <h3 className="text-md font-medium text-gray-800 mb-2">
                스토리텔러 카드 공개
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                스토리텔러는 정답 카드를 공개해 주세요
              </p>
            </div>

            {renderCards()}

            {storytellerCardId && <div>다음 단게</div>}
          </>
        )}
      </div>
    </div>
  );
};
