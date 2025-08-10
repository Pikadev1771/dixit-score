import { ScoreConfig } from '@/types/types';

export const INITIAL_PLAYER_COUNT = 4;
export const INITIAL_VICTORY_TOTAL_POINTS = 30;

export const INITIAL_PLAYER_NAMES = Array.from(
  { length: INITIAL_PLAYER_COUNT },
  () => ''
);

// 초기값 상수들
export const INITIAL_STORYTELLER_ALL_OR_NONE_GUESSED_POINTS = 0;
export const INITIAL_STORYTELLER_NORMAL_POINTS = 3;
export const INITIAL_CORRECT_GUESS_POINTS = 3;
export const INITIAL_RECEIVED_VOTE_POINTS = 1;

export const DEFAULT_SCORING_CONFIG: ScoreConfig = {
  storytellerAllOrNoneGuessedPoints:
    INITIAL_STORYTELLER_ALL_OR_NONE_GUESSED_POINTS,
  storytellerNormalPoints: INITIAL_STORYTELLER_NORMAL_POINTS,
  correctGuessPoints: INITIAL_CORRECT_GUESS_POINTS,
  receivedVotePoints: INITIAL_RECEIVED_VOTE_POINTS,
};
