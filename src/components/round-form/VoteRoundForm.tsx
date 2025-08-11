'use client';

import { useState } from 'react';
import { Mic, Check, Rabbit, Dices } from 'lucide-react';
import {
  Player,
  RoundScoreForm as RoundScoreFormType,
  PlayerId,
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

  const handleStorytellerSelect = (value: string) => {
    setStorytellerId(value);
  };

  const handleNextStep = () => {
    console.log('storytellerId', storytellerId);
  };

  return (
    <div className="bg-white border-1 border-gray-600 p-6">
      <h2 className="font-light text-lg text-gray-800 mb-4 flex items-center gap-2">
        <Dices size={20} strokeWidth={1.5} /> Round {currentRound} (Vote Mode)
      </h2>

      <div className="space-y-4">
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
      </div>
    </div>
  );
};
