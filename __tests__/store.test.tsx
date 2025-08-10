import '@testing-library/jest-dom';
import { renderHook, act } from '@testing-library/react';
import { useGameStore } from '@/lib/store';

describe('useGameStore', () => {
  beforeEach(() => {
    // 각 테스트 전에 store 초기화
    const { result } = renderHook(() => useGameStore());
    act(() => {
      result.current.resetGame();
    });
  });

  describe('initializeGame', () => {
    it('플레이어 이름들을 받아서 게임을 초기화해야 한다', () => {
      const { result } = renderHook(() => useGameStore());
      const playerNames = ['Alice', 'Bob', 'Charlie', 'David'];

      act(() => {
        result.current.initializeGame(playerNames);
      });

      expect(result.current.players).toHaveLength(4);
      expect(result.current.players[0].name).toBe('Alice');
      expect(result.current.players[1].name).toBe('Bob');
      expect(result.current.players[2].name).toBe('Charlie');
      expect(result.current.players[3].name).toBe('David');
    });

    it('빈 이름이 있으면 기본 플레이어명으로 대체해야 한다', () => {
      const { result } = renderHook(() => useGameStore());
      const playerNames = ['Alice', '', 'Charlie', ''];

      act(() => {
        result.current.initializeGame(playerNames);
      });

      expect(result.current.players[0].name).toBe('Alice');
      expect(result.current.players[1].name).toBe('플레이어 2');
      expect(result.current.players[2].name).toBe('Charlie');
      expect(result.current.players[3].name).toBe('플레이어 4');
    });

    it('모든 플레이어의 초기 점수는 0이어야 한다', () => {
      const { result } = renderHook(() => useGameStore());
      const playerNames = ['Alice', 'Bob', 'Charlie', 'David'];

      act(() => {
        result.current.initializeGame(playerNames);
      });

      result.current.players.forEach((player) => {
        expect(player.totalScore).toBe(0);
      });
    });

    it('각 플레이어는 고유한 ID를 가져야 한다', () => {
      const { result } = renderHook(() => useGameStore());
      const playerNames = ['Alice', 'Bob', 'Charlie', 'David'];

      act(() => {
        result.current.initializeGame(playerNames);
      });

      const playerIds = result.current.players.map((player) => player.id);
      const uniqueIds = new Set(playerIds);
      expect(uniqueIds.size).toBe(4);
    });
  });

  describe('resetGame', () => {
    it('게임을 초기 상태로 리셋해야 한다', () => {
      const { result } = renderHook(() => useGameStore());
      const playerNames = ['Alice', 'Bob', 'Charlie', 'David'];

      act(() => {
        result.current.initializeGame(playerNames);
      });

      expect(result.current.players).toHaveLength(4);

      act(() => {
        result.current.resetGame();
      });

      expect(result.current.players).toHaveLength(0);
      expect(result.current.rounds).toHaveLength(0);
      expect(result.current.isGameEnded).toBe(false);
      expect(result.current.winnerIds).toHaveLength(0);
    });
  });
});
