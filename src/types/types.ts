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

export interface RoundScoreForm {
  storytellerId: PlayerId;
  directScores: Record<PlayerId, number>;
}

export interface Round {
  id: string;
  roundNumber: number;
  form: RoundScoreForm;
  scores: Record<PlayerId, number>;
  timestamp: string;
}

export interface GameState {
  players: Player[];
  rounds: Round[];
  scoreConfig: ScoreConfig;
  isGameEnded: boolean;
  winnerIds: PlayerId[];
  victoryPoints: number;
}
