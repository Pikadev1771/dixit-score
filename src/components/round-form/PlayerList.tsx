'use client';

import { Rabbit } from 'lucide-react';
import { Player, Vote as VoteType } from '@/types/types';
import { getPlayerColor } from '@/constants/theme';

interface PlayerListProps {
  nonStorytellerPlayers: Player[];
  allPlayers: Player[];
  currentStep: 'storyteller' | 'voting' | 'storytellerCard';
  currentVoterIndex: number;
  votes: VoteType[];
}

export const PlayerList = ({
  nonStorytellerPlayers,
  allPlayers,
  currentStep,
  currentVoterIndex,
  votes,
}: PlayerListProps) => {
  return (
    <div className="flex justify-center gap-2 mb-4">
      {nonStorytellerPlayers.map((player, index) => {
        const playerColor = getPlayerColor(
          allPlayers.findIndex((p) => p.id === player.id)
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
