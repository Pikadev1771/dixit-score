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
    <div className="flex items-center justify-between">
      <label className="text-md font-medium text-gray-700">
        Victory Points
      </label>
      <NumberInput
        value={victoryPoints}
        onChange={onVictoryPointsChange}
        min={3}
        max={100}
      />
    </div>
  );
};
