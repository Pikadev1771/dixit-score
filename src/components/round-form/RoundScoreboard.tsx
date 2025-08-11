'use client';

import { Player, PlayerId, Vote as VoteType, ScoreConfig } from '@/types/types';
import { Calculator, Mic } from 'lucide-react';

interface RoundScoreboardProps {
  players: Player[];
  votes: VoteType[];
  storytellerId: string;
  storytellerCardId: string;
  revealedCards: PlayerId[];
  cardOwners: Record<PlayerId, PlayerId>;
  scoreConfig: ScoreConfig;
}

export const RoundScoreboard = ({
  players,
  votes,
  storytellerId,
  storytellerCardId,
  revealedCards,
  cardOwners,
  scoreConfig,
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

    // 받은 투표 점수 (카드 공개된 플레이어만)
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

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
      <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <Calculator size={16} strokeWidth={1.5} />
        Score
      </label>
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
                <span className="text-gray-800">{player.name}</span>
                {isStoryteller && (
                  <Mic size={14} className="text-orange-600" strokeWidth={1} />
                )}
              </div>
              <div className="flex items-center gap-1">
                {correctGuessScore > 0 && (
                  <span className="text-blue-600">+{correctGuessScore}</span>
                )}
                {receivedVoteScore > 0 && (
                  <span className="text-green-600">+{receivedVoteScore}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
