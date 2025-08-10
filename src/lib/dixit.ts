import { DEFAULT_SCORING_CONFIG } from '@/constants/constants';
import { PlayerId } from '@/types/types';

export const getWinnerIds = (
  players: { id: PlayerId; totalScore: number }[],
  victoryPoints: number
): PlayerId[] => {
  const winners = players.filter(
    (player) => player.totalScore >= victoryPoints
  );
  return winners.map((winner) => winner.id);
};

export const getMaxScorePerRound = (playerCount: number) => {
  const maxVoteScore = playerCount - 2;
  return DEFAULT_SCORING_CONFIG.correctGuessPoints + maxVoteScore;
};
