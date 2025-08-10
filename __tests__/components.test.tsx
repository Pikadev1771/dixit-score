import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '@/app/page';

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
