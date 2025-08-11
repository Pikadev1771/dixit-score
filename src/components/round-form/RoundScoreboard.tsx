'use client';

import { Player, PlayerId, Vote as VoteType, ScoreConfig } from '@/types/types';
import { Calculator, Mic } from 'lucide-react';
import { calculatePlayerScores } from '@/lib/score-calculator';

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
  const getPlayerScores = (player: Player) => {
    return calculatePlayerScores(
      player,
      votes,
      storytellerId,
      storytellerCardId,
      cardOwners,
      revealedCards,
      scoreConfig
    );
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
            getPlayerScores(player);
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
