'use client';

import { NumberInput } from './NumberInput';

interface VictoryPointsSetupProps {
  victoryPoints: number;
  onVictoryPointsChange: (value: number) => void;
}

export const VictoryPointsSetup = ({
  victoryPoints,
  onVictoryPointsChange,
}: VictoryPointsSetupProps) => {
  return (
    <NumberInput
      label="Victory Points"
      value={victoryPoints}
      onChange={onVictoryPointsChange}
      min={3}
      max={100}
      placeholder="30"
    />
  );
};
