import { ScoreConfig } from '@/types/types';

export const INITIAL_PLAYER_COUNT = 4;
export const VICTORY_TOTAL_POINTS = 30;

export const INITIAL_PLAYER_NAMES = Array.from(
  { length: INITIAL_PLAYER_COUNT },
  () => ''
);

export const DEFAULT_SCORING_CONFIG: ScoreConfig = {
  storytellerAllOrNoneGuessedPoints: 0,
  storytellerNormalPoints: 3,
  correctGuessPoints: 3,
  receivedVotePoints: 1,
};
