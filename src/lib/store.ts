import { create } from 'zustand';
import {
  GameState,
  Player,
  Round,
  RoundScoreForm,
  ScoreConfig,
} from '@/types/types';

import {
  DEFAULT_SCORING_CONFIG,
  INITIAL_VICTORY_TOTAL_POINTS,
} from '@/constants/constants';
import { getWinnerIds } from './dixit';

interface GameStore extends GameState {
  initializeGame: (
    playerNames: string[],
    victoryPoints?: number,
    scoreConfig?: ScoreConfig
  ) => void;
  finishRound: (form: RoundScoreForm) => void;
  resetGame: () => void;
}

const useGameStore = create<GameStore>((set, get) => ({
  players: [],
  rounds: [],
  scoreConfig: DEFAULT_SCORING_CONFIG,
  isGameEnded: false,
  winnerIds: [],
  victoryPoints: INITIAL_VICTORY_TOTAL_POINTS,

  initializeGame: (
    playerNames: string[],
    victoryPoints?: number,
    scoreConfig?: ScoreConfig
  ) => {
    const players: Player[] = playerNames.map((name, index) => ({
      id: `player-${index + 1}`,
      name: name.trim() || `플레이어 ${index + 1}`,
      totalScore: 0,
    }));

    set({
      players,
      rounds: [],
      isGameEnded: false,
      winnerIds: [],
      victoryPoints: victoryPoints || INITIAL_VICTORY_TOTAL_POINTS,
      scoreConfig: scoreConfig || DEFAULT_SCORING_CONFIG,
    });
  },

  finishRound: (form: RoundScoreForm) => {
    const { players } = get();

    // 플레이어 총점 업데이트
    const updatedPlayers = players.map((player) => ({
      ...player,
      totalScore: player.totalScore + (form.directScores[player.id] || 0),
    }));

    // 현재 라운드 정보 생성
    const currentRound: Round = {
      id: `round-${Date.now()}`,
      roundNumber: get().rounds.length + 1,
      form,
      scores: form.directScores,
      timestamp: new Date().toISOString(),
    };

    // 승자 id 배열 생성
    const winnerIds = getWinnerIds(updatedPlayers, get().victoryPoints);

    set((state) => ({
      players: updatedPlayers,
      rounds: [currentRound, ...state.rounds],
      isGameEnded: winnerIds.length > 0,
      winnerIds,
    }));
  },

  resetGame: () => {
    set({
      players: [],
      rounds: [],
      isGameEnded: false,
      winnerIds: [],
    });
  },
}));

export { useGameStore };
