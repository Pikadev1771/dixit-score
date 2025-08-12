import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VoteRoundForm } from '../src/components/round-form/VoteRoundForm';
import { useGameStore } from '../src/lib/store';

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
      expect(screen.getByText('Voting')).toBeInTheDocument();
      expect(screen.getByText('is voting.')).toBeInTheDocument();
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
      expect(screen.getByText('Storyteller Card Reveal')).toBeInTheDocument();
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
      expect(screen.getByText('Player Card Reveal')).toBeInTheDocument();
      expect(screen.getByText('is revealing the card.')).toBeInTheDocument();
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
        scores: expect.objectContaining({
          '1': expect.any(Number),
          '2': expect.any(Number),
          '3': expect.any(Number),
        }),
      });
    });
  });

  test('기본 점수 계산 로직 테스트', async () => {
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
        scores: expect.objectContaining({
          '1': expect.any(Number), // Alice (스토리텔러)
          '2': expect.any(Number), // Bob
          '3': expect.any(Number), // Charlie
        }),
      });
    });

    const submittedData = mockOnSubmit.mock.calls[0][0];

    // 점수 값 검증
    // 시나리오 분석:
    // - Alice (스토리텔러): Bob이 Alice 카드에 투표 (1명이 맞춤)
    expect(submittedData.scores['1']).toBe(3); // Alice: 3 + 0 = 3점

    // - Bob: Charlie가 Bob 카드에 투표, Bob은 Alice 카드에 투표해서 맞춤
    expect(submittedData.scores['2']).toBe(4); // Bob: 3 + 1 = 4점

    // - Charlie: Bob 카드에 투표했지만 Alice 카드 못 맞춤
    expect(submittedData.scores['3']).toBe(0); // Charlie: 0 + 0 = 0점

    // 추가 검증 (숫자 타입 확인)
    expect(submittedData.storytellerId).toBe('1');
    expect(typeof submittedData.scores['1']).toBe('number');
    expect(typeof submittedData.scores['2']).toBe('number');
    expect(typeof submittedData.scores['3']).toBe('number');
  });

  test('모든 플레이어가 스토리텔러 카드를 맞춘 경우 점수 계산', async () => {
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

    // 모든 플레이어가 Alice 카드에 투표 (모두 맞춤)
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]); // Bob이 Alice 카드에 투표
    });
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]); // Charlie도 Alice 카드에 투표
    });

    // 스토리텔러 카드 선택
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]); // Alice가 자신의 카드 선택
    });

    // 플레이어 카드 공개
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[1]); // Bob 카드 공개
    });

    // COMPLETE ROUND 버튼 클릭
    await waitFor(() => {
      const completeButton = screen.getByText('COMPLETE ROUND');
      fireEvent.click(completeButton);
    });

    // 점수 계산 결과 확인
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });

    const submittedData = mockOnSubmit.mock.calls[0][0];

    // 모든 플레이어가 스토리텔러 카드를 맞춘 경우:
    expect(submittedData.scores['1']).toBe(0); // Alice: 0점 (모두 맞춤)
    expect(submittedData.scores['2']).toBe(3); // Bob: 3점 (맞춤)
    expect(submittedData.scores['3']).toBe(3); // Charlie: 3점 (맞춤)
  });

  test('아무도 스토리텔러 카드를 못 맞춘 경우 점수 계산', async () => {
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

    // 모든 플레이어가 Bob 카드에 투표 (아무도 Alice 카드 못 맞춤)
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[1]); // Bob이 Bob (본인)카드에 투표
    });
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[1]); // Charlie도 Bob 카드에 투표
    });

    // 스토리텔러 카드 선택
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]); // Alice가 자신의 카드 선택
    });

    // 플레이어 카드 공개
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[1]); // Bob 카드 공개
    });

    // COMPLETE ROUND 버튼 클릭
    await waitFor(() => {
      const completeButton = screen.getByText('COMPLETE ROUND');
      fireEvent.click(completeButton);
    });

    // 점수 계산 결과 확인
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });

    const submittedData = mockOnSubmit.mock.calls[0][0];

    // 아무도 스토리텔러 카드를 못 맞춘 경우:
    expect(submittedData.scores['1']).toBe(0); // Alice: 0점 (아무도 못 맞춤)
    expect(submittedData.scores['2']).toBe(2); // Bob: 0 + 2 = 2점 (투표 2개 받음)
    expect(submittedData.scores['3']).toBe(0); // Charlie: 0점 (못 맞춤)
  });

  test('다양한 점수 설정에서 점수 계산 검증', async () => {
    // 다른 점수 설정으로 테스트
    mockUseGameStore.mockReturnValue({
      scoreConfig: {
        storytellerNormalPoints: 5,
        storytellerAllOrNoneGuessedPoints: 2,
        correctGuessPoints: 4,
        receivedVotePoints: 2,
      },
      mode: 'VOTE',
    });

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

    // Bob만 Alice 카드에 투표 (1명만 맞춤)
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]); // Bob이 Alice 카드에 투표
    });
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[1]); // Charlie는 Bob 카드에 투표
    });

    // 스토리텔러 카드 선택
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[0]); // Alice가 자신의 카드 선택
    });

    // 플레이어 카드 공개
    await waitFor(() => {
      const cards = screen.getAllByText(/Card \d+/);
      fireEvent.click(cards[1]); // Bob 카드 공개
    });

    // COMPLETE ROUND 버튼 클릭
    await waitFor(() => {
      const completeButton = screen.getByText('COMPLETE ROUND');
      fireEvent.click(completeButton);
    });

    // 점수 계산 결과 확인
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });

    const submittedData = mockOnSubmit.mock.calls[0][0];

    // 새로운 점수 설정에서:
    expect(submittedData.scores['1']).toBe(5); // Alice: 5 + 0 = 5점
    expect(submittedData.scores['2']).toBe(6); // Bob: 4 + 2 = 6점
    expect(submittedData.scores['3']).toBe(0); // Charlie: 0점
  });
});
