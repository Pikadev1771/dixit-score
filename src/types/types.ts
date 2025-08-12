export type PlayerId = string;

export interface Player {
  id: PlayerId;
  name: string;
  totalScore: number;
}

export interface ScoreConfig {
  storytellerAllOrNoneGuessedPoints: number;
  storytellerNormalPoints: number;
  correctGuessPoints: number;
  receivedVotePoints: number;
}

export interface Vote {
  voterId: PlayerId;
  votedTargetId: PlayerId;
}

export interface RoundForm {
  storytellerId: PlayerId;
  scores: Record<PlayerId, number>;
  votes?: Vote[];
}

export interface Round {
  id: string;
  roundNumber: number;
  storytellerId: PlayerId;
  scores: Record<PlayerId, number>;
  votes?: Vote[];
  timestamp: string;
}

export type Mode = 'VOTE' | 'SCORE';

export interface GameState {
  players: Player[];
  rounds: Round[];
  scoreConfig: ScoreConfig;
  isGameEnded: boolean;
  winnerIds: PlayerId[];
  victoryPoints: number;
  mode: Mode;
}

export type VoteStep =
  | 'STORYTELLER'
  | 'VOTING'
  | 'STORYTELLER_CARD'
  | 'PLAYER_CARD';
