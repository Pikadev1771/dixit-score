import { DEFAULT_SCORING_CONFIG } from '@/constants/constants';
import { Player, PlayerId } from '@/types/types';

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

export const getPlayerRank = (
  playerId: PlayerId,
  players: Player[]
): number => {
  const sortedPlayers = [...players].sort(
    (a, b) => b.totalScore - a.totalScore
  );
  return sortedPlayers.findIndex((player) => player.id === playerId) + 1;
};

export const isPlayerInFirstPlace = (
  playerId: PlayerId,
  players: Player[]
): boolean => {
  if (players.length === 0) return false;
  const sortedPlayers = [...players].sort(
    (a, b) => b.totalScore - a.totalScore
  );
  const firstPlaceScore = sortedPlayers[0].totalScore;
  const player = players.find((p) => p.id === playerId);
  return player?.totalScore === firstPlaceScore;
};

export const getFirstPlacePlayers = (players: Player[]): Player[] => {
  if (players.length === 0) return [];
  const sortedPlayers = [...players].sort(
    (a, b) => b.totalScore - a.totalScore
  );
  const firstPlaceScore = sortedPlayers[0].totalScore;
  return players.filter((player) => player.totalScore === firstPlaceScore);
};
