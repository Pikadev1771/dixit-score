'use client';

import { Mic } from 'lucide-react';
import { Player } from '@/types/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface StorytellerSelectorProps {
  players: Player[];
  storytellerId: string;
  onStorytellerSelect: (value: string) => void;
}

export const StorytellerSelector = ({
  players,
  storytellerId,
  onStorytellerSelect,
}: StorytellerSelectorProps) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <Mic size={16} strokeWidth={1.5} />
        Storyteller
      </label>
      <Select
        key={`storyteller-${storytellerId}`}
        value={storytellerId || undefined}
        onValueChange={onStorytellerSelect}
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
  );
};
