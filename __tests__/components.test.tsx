import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import { Scoreboard } from '@/components/Scoreboard';

// 컴포넌트 테스트
// Next.js의 useRouter 모킹
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
}));

describe('Home 컴포넌트', () => {
  it('초기에는 Game Setup 화면이 표시되어야 한다', () => {
    render(<Home />);

    expect(screen.getByText('Game Setup')).toBeInTheDocument();
    expect(screen.getByText('Player Names')).toBeInTheDocument();
    expect(screen.getByText('START')).toBeInTheDocument();
  });

  it('Start 후에는 Score 화면이 표시되어야 한다', async () => {
    render(<Home />);

    // 플레이어 이름 입력
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Alice' } });
    fireEvent.change(inputs[1], { target: { value: 'Bob' } });
    fireEvent.change(inputs[2], { target: { value: 'Charlie' } });
    fireEvent.change(inputs[3], { target: { value: 'David' } });

    // 게임 시작
    fireEvent.click(screen.getByText('START'));

    await waitFor(() => {
      expect(screen.queryByText('Game Setup')).not.toBeInTheDocument();
      expect(screen.getByText('NEW GAME')).toBeInTheDocument();
    });
  });

  it('NEW GAME 버튼을 누르면 다시 Game Setup 화면으로 돌아가야 한다', async () => {
    render(<Home />);

    // 게임 시작
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Alice' } });
    fireEvent.change(inputs[1], { target: { value: 'Bob' } });
    fireEvent.change(inputs[2], { target: { value: 'Charlie' } });
    fireEvent.change(inputs[3], { target: { value: 'David' } });
    fireEvent.click(screen.getByText('START'));

    await waitFor(() => {
      expect(screen.getByText('NEW GAME')).toBeInTheDocument();
    });

    // NEW GAME 버튼 클릭
    fireEvent.click(screen.getByText('NEW GAME'));

    await waitFor(() => {
      expect(screen.getByText('Game Setup')).toBeInTheDocument();
    });
  });
});

describe('Scoreboard 컴포넌트', () => {
  const mockPlayers = [
    { id: 'player-1', name: 'Alice', totalScore: 10 },
    { id: 'player-2', name: 'Bob', totalScore: 15 },
    { id: 'player-3', name: 'Charlie', totalScore: 5 },
    { id: 'player-4', name: 'David', totalScore: 3 },
  ];

  it('플레이어들이 점수순으로 정렬되어 표시되어야 한다', () => {
    render(
      <Scoreboard
        players={mockPlayers}
        currentRound={1}
        isGameEnded={false}
        winnerIds={[]}
      />
    );

    // Scoreboard 제목 표시
    expect(screen.getByText('Scoreboard')).toBeInTheDocument();

    // 플레이어 점수순 정렬
    const playerNames = screen.getAllByText(/Alice|Bob|Charlie/);
    expect(playerNames[0]).toHaveTextContent('Bob'); // 1위
    expect(playerNames[1]).toHaveTextContent('Alice'); // 2위
    expect(playerNames[2]).toHaveTextContent('Charlie'); // 3위
    expect(playerNames[3]).toHaveTextContent('David'); // 4위
  });

  it('게임이 종료되면 승리자가 표시되어야 한다', () => {
    render(
      <Scoreboard
        players={mockPlayers}
        currentRound={1}
        isGameEnded={true}
        winnerIds={['player-2']} // Bob이 승리자
      />
    );

    // 승리 메시지 표시
    expect(screen.getByText(/Bob님이/)).toBeInTheDocument();
    expect(screen.getByText(/승리했습니다!/)).toBeInTheDocument();
  });
});
