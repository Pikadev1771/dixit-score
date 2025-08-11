'use client';

import { Mic } from 'lucide-react';
import { Player, Vote as VoteType } from '@/types/types';
import { useGameStore } from '@/lib/store';

interface StorytellerInfoProps {
  players: Player[];
  storytellerId: string;
  storytellerCardId: string;
  votes: VoteType[];
  nonStorytellerPlayers: Player[];
}

export const StorytellerInfo = ({
  players,
  storytellerId,
  storytellerCardId,
  votes,
  nonStorytellerPlayers,
}: StorytellerInfoProps) => {
  const { scoreConfig } = useGameStore();

  return (
    <div className="flex justify-center items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full w-fit mx-auto text-center mb-3">
      <Mic size={16} strokeWidth={1.5} />
      <div className="inline-block">
        Storyteller: {players.find((p) => p.id === storytellerId)?.name}
      </div>
      {storytellerCardId && (
        <span className="text-green-600 font-bold">
          {(() => {
            const correctGuessCount = votes.filter(
              (vote) => vote.votedCardOwnerId === storytellerCardId
            ).length;
            const totalVoters = nonStorytellerPlayers.length;

            if (correctGuessCount === 0 || correctGuessCount === totalVoters) {
              return ` +${scoreConfig.storytellerAllOrNoneGuessedPoints}`;
            } else {
              return ` +${scoreConfig.storytellerNormalPoints}`;
            }
          })()}
        </span>
      )}
    </div>
  );
};
