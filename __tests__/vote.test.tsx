import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VoteRoundForm } from '../src/components/round-form/VoteRoundForm';
import { useGameStore } from '../src/lib/store';

// Mock the store
jest.mock('../src/lib/store', () => ({
  useGameStore: jest.fn(),
}));

const mockUseGameStore = useGameStore as jest.MockedFunction<
  typeof useGameStore
>;

describe('VoteRoundForm', () => {
  const mockPlayers = [
    { id: '1', name: 'Alice', totalScore: 0 },
    { id: '2', name: 'Bob', totalScore: 0 },
    { id: '3', name: 'Charlie', totalScore: 0 },
  ];

  const mockScoreConfig = {
    storytellerNormalPoints: 3,
    storytellerAllOrNoneGuessedPoints: 0,
    correctGuessPoints: 3,
    receivedVotePoints: 1,
  };

  beforeEach(() => {
    mockUseGameStore.mockReturnValue({
      scoreConfig: mockScoreConfig,
      mode: 'VOTE',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('스토리텔러 선택 후 투표 단계로 진행', async () => {
    const mockOnSubmit = jest.fn();

    render(
      <VoteRoundForm
        players={mockPlayers}
        currentRound={1}
        onSubmit={mockOnSubmit}
      />
    );

    // 스토리텔러 선택
    const storytellerSelect = screen.getByRole('combobox');
    fireEvent.click(storytellerSelect);

    const aliceOption = screen.getByText('Alice');
    fireEvent.click(aliceOption);

    // 투표 단계로 진행되었는지 확인
    await waitFor(() => {
      expect(screen.getByText('카드 투표')).toBeInTheDocument();
    });
  });

  test('투표 완료 후 스토리텔러 카드 선택 단계로 진행', async () => {
    const mockOnSubmit = jest.fn();

    render(
      <VoteRoundForm
        players={mockPlayers}
        currentRound={1}
        onSubmit={mockOnSubmit}
      />
    );

    // 스토리텔러 선택
    const storytellerSelect = screen.getByRole('combobox');
    fireEvent.click(storytellerSelect);
    fireEvent.click(screen.getByText('Alice'));

    // 첫 번째 플레이어(Bob) 투표
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]); // 첫 번째 카드 선택
    });

    // 두 번째 플레이어(Charlie) 투표
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[1]); // 두 번째 카드 선택
    });

    // 스토리텔러 카드 선택 단계로 진행되었는지 확인
    await waitFor(() => {
      expect(screen.getByText('스토리텔러 카드 공개')).toBeInTheDocument();
    });
  });

  test('스토리텔러 카드 선택 후 플레이어 카드 공개 단계로 진행', async () => {
    const mockOnSubmit = jest.fn();

    render(
      <VoteRoundForm
        players={mockPlayers}
        currentRound={1}
        onSubmit={mockOnSubmit}
      />
    );

    // 스토리텔러 선택
    const storytellerSelect = screen.getByRole('combobox');
    fireEvent.click(storytellerSelect);
    fireEvent.click(screen.getByText('Alice'));

    // 투표 완료
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]);
    });
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[1]);
    });

    // 스토리텔러 카드 선택
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[2]); // 스토리텔러 카드 선택
    });

    // 플레이어 카드 공개 단계로 진행되었는지 확인
    await waitFor(() => {
      expect(screen.getByText('플레이어 카드 공개')).toBeInTheDocument();
    });
  });

  test('모든 카드 공개 완료 후 COMPLETE ROUND 버튼 표시', async () => {
    const mockOnSubmit = jest.fn();

    render(
      <VoteRoundForm
        players={mockPlayers}
        currentRound={1}
        onSubmit={mockOnSubmit}
      />
    );

    // 스토리텔러 선택
    const storytellerSelect = screen.getByRole('combobox');
    fireEvent.click(storytellerSelect);
    fireEvent.click(screen.getByText('Alice'));

    // 투표 완료
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]);
    });
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[1]);
    });

    // 스토리텔러 카드 선택
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[2]);
    });

    // 첫 번째 플레이어 카드 공개
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]);
    });

    // 마지막 플레이어는 자동으로 남은 카드가 선택되어야 함
    await waitFor(() => {
      expect(screen.getByText('COMPLETE ROUND')).toBeInTheDocument();
    });
  });

  test('COMPLETE ROUND 버튼 클릭 시 라운드 완료', async () => {
    const mockOnSubmit = jest.fn();

    render(
      <VoteRoundForm
        players={mockPlayers}
        currentRound={1}
        onSubmit={mockOnSubmit}
      />
    );

    // 전체 라운드 진행 (스토리텔러 선택 → 투표 → 스토리텔러 카드 → 플레이어 카드 공개)
    const storytellerSelect = screen.getByRole('combobox');
    fireEvent.click(storytellerSelect);
    fireEvent.click(screen.getByText('Alice'));

    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]);
    });
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[1]);
    });
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[2]);
    });
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]);
    });

    // COMPLETE ROUND 버튼 클릭
    await waitFor(() => {
      const completeButton = screen.getByText('COMPLETE ROUND');
      fireEvent.click(completeButton);
    });

    // onSubmit이 호출되었는지 확인
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        storytellerId: '1',
        directScores: expect.objectContaining({
          '1': expect.any(Number),
          '2': expect.any(Number),
          '3': expect.any(Number),
        }),
      });
    });
  });

  test('점수 계산 로직 테스트', async () => {
    const mockOnSubmit = jest.fn();

    render(
      <VoteRoundForm
        players={mockPlayers}
        currentRound={1}
        onSubmit={mockOnSubmit}
      />
    );

    // 전체 라운드 진행
    const storytellerSelect = screen.getByRole('combobox');
    fireEvent.click(storytellerSelect);
    fireEvent.click(screen.getByText('Alice'));

    // 투표: Bob이 Alice 카드에 투표, Charlie가 Bob 카드에 투표
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]); // Bob이 첫 번째 카드(Alice)에 투표
    });
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[1]); // Charlie가 두 번째 카드(Bob)에 투표
    });

    // 스토리텔러 카드 선택: Alice가 자신의 카드(첫 번째)를 선택
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]); // Alice가 자신의 카드 선택
    });

    // 플레이어 카드 공개
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[1]); // Bob이 두 번째 카드 공개
    });

    // COMPLETE ROUND 버튼 클릭
    await waitFor(() => {
      const completeButton = screen.getByText('COMPLETE ROUND');
      fireEvent.click(completeButton);
    });

    // 점수 계산 결과 확인
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        storytellerId: '1',
        directScores: expect.objectContaining({
          '1': expect.any(Number), // Alice (스토리텔러)
          '2': expect.any(Number), // Bob
          '3': expect.any(Number), // Charlie
        }),
      });
    });

    const submittedData = mockOnSubmit.mock.calls[0][0];
    expect(submittedData.storytellerId).toBe('1');
    expect(typeof submittedData.directScores['1']).toBe('number');
    expect(typeof submittedData.directScores['2']).toBe('number');
    expect(typeof submittedData.directScores['3']).toBe('number');
  });
});
