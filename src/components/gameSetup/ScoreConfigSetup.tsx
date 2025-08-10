'use client';

import { ScoreConfig } from '@/types/types';
import { NumberInput } from './NumberInput';

interface ScoreConfigSetupProps {
  scoreConfig: ScoreConfig;
  onScoreConfigChange: (scoreConfig: ScoreConfig) => void;
}

export const ScoreConfigSetup = ({
  scoreConfig,
  onScoreConfigChange,
}: ScoreConfigSetupProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Score Config
        </label>
      </div>

      <NumberInput
        label={`Storyteller\n(All/None Guessed)`}
        value={scoreConfig.storytellerAllOrNoneGuessedPoints}
        onChange={(value) =>
          onScoreConfigChange({
            ...scoreConfig,
            storytellerAllOrNoneGuessedPoints: value,
          })
        }
      />

      <NumberInput
        label={`Storyteller\n(Normal)`}
        value={scoreConfig.storytellerNormalPoints}
        onChange={(value) =>
          onScoreConfigChange({
            ...scoreConfig,
            storytellerNormalPoints: value,
          })
        }
      />

      <NumberInput
        label="Correct Guess"
        value={scoreConfig.correctGuessPoints}
        onChange={(value) =>
          onScoreConfigChange({
            ...scoreConfig,
            correctGuessPoints: value,
          })
        }
      />

      <NumberInput
        label="Received Vote"
        value={scoreConfig.receivedVotePoints}
        onChange={(value) =>
          onScoreConfigChange({
            ...scoreConfig,
            receivedVotePoints: value,
          })
        }
      />
    </div>
  );
};
