'use client';

import { Player, PlayerId, Vote as VoteType, ScoreConfig } from '@/types/types';
import { useGameStore } from '@/lib/store';
import { Mic } from 'lucide-react';

interface RoundScoreboardProps {
  players: Player[];
  votes: VoteType[];
  storytellerId: string;
  storytellerCardId: string;
  revealedCards: PlayerId[];
  cardOwners: Record<PlayerId, PlayerId>;
  scoreConfig: ScoreConfig;
  isMini?: boolean;
}

export const RoundScoreboard = ({
  players,
  votes,
  storytellerId,
  storytellerCardId,
  revealedCards,
  cardOwners,
  scoreConfig,
  isMini = false,
}: RoundScoreboardProps) => {
  const calculatePlayerScores = (player: Player) => {
    let correctGuessScore = 0;
    let receivedVoteScore = 0;

    // 스토리텔러인 경우
    if (player.id === storytellerId && storytellerCardId) {
      const correctGuessCount = votes.filter(
        (vote) => vote.votedCardOwnerId === storytellerCardId
      ).length;
      const totalVoters = players.length - 1; // 스토리텔러 제외

      if (correctGuessCount === 0 || correctGuessCount === totalVoters) {
        correctGuessScore += scoreConfig.storytellerAllOrNoneGuessedPoints;
      } else {
        correctGuessScore += scoreConfig.storytellerNormalPoints;
      }
    }

    // 정답을 맞춘 경우 (스토리텔러가 아닌 플레이어)
    if (player.id !== storytellerId && storytellerCardId) {
      const hasCorrectGuess = votes.some(
        (vote) =>
          vote.voterId === player.id &&
          vote.votedCardOwnerId === storytellerCardId
      );
      if (hasCorrectGuess) {
        correctGuessScore += scoreConfig.correctGuessPoints;
      }
    }

    // 받은 투표 점수 (카드가 공개된 플레이어만)
    const playerCardId = Object.keys(cardOwners).find(
      (cardId) => cardOwners[cardId] === player.id
    );
    if (playerCardId && revealedCards.includes(playerCardId)) {
      const receivedVotes = votes.filter(
        (vote) => vote.votedCardOwnerId === playerCardId
      ).length;
      receivedVoteScore += receivedVotes * scoreConfig.receivedVotePoints;
    }

    return { correctGuessScore, receivedVoteScore };
  };

  if (isMini) {
    return (
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
        <h4 className="text-sm font-medium text-gray-800 mb-2">라운드 점수</h4>
        <div className="grid grid-cols-1 gap-1">
          {players.map((player) => {
            const { correctGuessScore, receivedVoteScore } =
              calculatePlayerScores(player);
            const isStoryteller = player.id === storytellerId;

            return (
              <div
                key={player.id}
                className="flex items-center justify-between p-2 bg-white rounded border text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-800">
                    {player.name}
                  </span>
                  {isStoryteller && (
                    <Mic size={12} className="text-orange-600" />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {correctGuessScore > 0 && (
                    <span className="text-blue-600 font-bold">
                      +{correctGuessScore}
                    </span>
                  )}
                  {receivedVoteScore > 0 && (
                    <span className="text-green-600 font-bold">
                      +{receivedVoteScore}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-medium text-gray-800 mb-3">라운드 점수</h3>
      <div className="space-y-2">
        {players.map((player) => {
          const { correctGuessScore, receivedVoteScore } =
            calculatePlayerScores(player);
          const isStoryteller = player.id === storytellerId;

          return (
            <div
              key={player.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-800">{player.name}</span>
                {isStoryteller && <Mic size={16} className="text-orange-600" />}
              </div>
              <div className="flex items-center gap-2">
                {correctGuessScore > 0 && (
                  <span className="text-blue-600 font-bold">
                    +{correctGuessScore}
                  </span>
                )}
                {receivedVoteScore > 0 && (
                  <span className="text-green-600 font-bold">
                    +{receivedVoteScore}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
