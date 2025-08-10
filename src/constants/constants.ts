import { ScoreConfig } from '@/types/types';

export const PLAYER_COUNT = 4;
export const VICTORY_TOTAL_POINTS = 30;

export const DEFAULT_PLAYER_PLACEHOLDERS = Array.from(
  { length: PLAYER_COUNT },
  (_, i) => `플레이어 ${i + 1}`
);

export const INITIAL_PLAYER_NAMES = Array.from(
  { length: PLAYER_COUNT },
  () => ''
);

export const DEFAULT_SCORING_CONFIG: ScoreConfig = {
  storytellerAllOrNoneGuessedPoints: 0,
  storytellerNormalPoints: 3,
  correctGuessPoints: 3,
  receivedVotePoints: 1,
};
