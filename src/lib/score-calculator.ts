import { Player, PlayerId, Vote, ScoreConfig } from '@/types/types';

export interface PlayerScore {
  correctGuessScore: number;
  receivedVoteScore: number;
}

// 스토리텔러 점수 계산
export const calculateStorytellerScore = (
  votes: Vote[],
  storytellerCardId: string,
  totalVoters: number,
  scoreConfig: ScoreConfig
): number => {
  if (!storytellerCardId) return 0;

  const correctGuessCount = votes.filter(
    (vote) => vote.votedCardOwnerId === storytellerCardId
  ).length;

  if (correctGuessCount === 0 || correctGuessCount === totalVoters) {
    return scoreConfig.storytellerAllOrNoneGuessedPoints;
  } else {
    return scoreConfig.storytellerNormalPoints;
  }
};

// 플레이어 정답 점수 계산
export const calculateCorrectGuessScore = (
  playerId: string,
  votes: Vote[],
  storytellerId: string,
  storytellerCardId: string,
  scoreConfig: ScoreConfig
): number => {
  // 스토리텔러인 경우
  if (playerId === storytellerId && storytellerCardId) {
    const totalVoters = votes.length;
    return calculateStorytellerScore(
      votes,
      storytellerCardId,
      totalVoters,
      scoreConfig
    );
  }

  // 스토리텔러가 아닌 플레이어인 경우
  if (playerId !== storytellerId && storytellerCardId) {
    const hasCorrectGuess = votes.some(
      (vote) =>
        vote.voterId === playerId && vote.votedCardOwnerId === storytellerCardId
    );
    return hasCorrectGuess ? scoreConfig.correctGuessPoints : 0;
  }

  return 0;
};

// 플레이어의 투표 점수 계산 (플레이어만 해당)
export const calculateReceivedVoteScore = (
  playerId: string,
  votes: Vote[],
  cardOwners: Record<PlayerId, PlayerId>,
  revealedCards: PlayerId[],
  scoreConfig: ScoreConfig
): number => {
  // 플레이어의 카드 ID 찾기
  const playerCardId = Object.keys(cardOwners).find(
    (cardId) => cardOwners[cardId] === playerId
  );

  // 해당 플레이어의 카드가 공개되지 않았으면 점수 0
  if (!playerCardId || !revealedCards.includes(playerCardId)) {
    return 0;
  }

  // 해당 플레이어가 받은 투표 수
  const receivedVotes = votes.filter(
    (vote) => vote.votedCardOwnerId === playerCardId
  ).length;

  return receivedVotes * scoreConfig.receivedVotePoints;
};

// 플레이어 총점 계산 (정답 점수 + 받은 투표 점수)
export const calculatePlayerScores = (
  player: Player,
  votes: Vote[],
  storytellerId: string,
  storytellerCardId: string,
  cardOwners: Record<PlayerId, PlayerId>,
  revealedCards: PlayerId[],
  scoreConfig: ScoreConfig
): PlayerScore => {
  const correctGuessScore = calculateCorrectGuessScore(
    player.id,
    votes,
    storytellerId,
    storytellerCardId,
    scoreConfig
  );

  const receivedVoteScore = calculateReceivedVoteScore(
    player.id,
    votes,
    cardOwners,
    revealedCards,
    scoreConfig
  );

  return { correctGuessScore, receivedVoteScore };
};
