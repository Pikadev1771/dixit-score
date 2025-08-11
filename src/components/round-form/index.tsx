'use client';

import { Player, RoundForm as RoundFormType } from '@/types/types';
import { useGameStore } from '@/lib/store';
import { VoteRoundForm } from './VoteRoundForm';
import { ScoreRoundForm } from './ScoreRoundForm';

interface RoundFormProps {
  players: Player[];
  currentRound: number;
  onSubmit: (form: RoundFormType) => void;
}

export const RoundForm = ({
  players,
  currentRound,
  onSubmit,
}: RoundFormProps) => {
  const { mode } = useGameStore();

  if (mode === 'VOTE') {
    return (
      <VoteRoundForm
        players={players}
        currentRound={currentRound}
        onSubmit={onSubmit}
      />
    );
  }

  return (
    <ScoreRoundForm
      players={players}
      currentRound={currentRound}
      onSubmit={onSubmit}
    />
  );
};
