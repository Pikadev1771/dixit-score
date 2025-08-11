'use client';

import { Mic } from 'lucide-react';
import { Player } from '@/types/types';

interface StorytellerInfoProps {
  players: Player[];
  storytellerId: string;
}

export const StorytellerInfo = ({
  players,
  storytellerId,
}: StorytellerInfoProps) => {
  return (
    <div className="flex justify-center items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full w-fit mx-auto text-center mb-3">
      <Mic size={16} strokeWidth={1.5} />
      <div className="inline-block">
        Storyteller: {players.find((p) => p.id === storytellerId)?.name}
      </div>
    </div>
  );
};
