<h1><a href="https://dixit-score.vercel.app
/">Dixit Score</a></h1>

<img width="203" height="443" alt="스크린샷 2025-08-11 오후 9 55 48" src="https://github.com/user-attachments/assets/871eba91-5a67-452c-a4e2-009369b95ef9" />
<img width="206" height="446" alt="스크린샷 2025-08-11 오후 9 54 57" src="https://github.com/user-attachments/assets/5d326346-2134-4616-bec7-240d122da1ce" />

<h4>배포 주소: <a href="https://dixit-score.vercel.app
/">https://dixit-score.vercel.app/</a></h4>

## 📋 프로젝트 개요

Dixit 보드게임의 점수 계산과 게임 진행을 관리하는 웹 애플리케이션입니다. 모바일 환경을 우선적으로 고려하여 설계되었으며, 직관적인 UI/UX를 통해 게임 진행을 원활하게 지원합니다.

## 🏗️ 시스템 아키텍처

### 기술 스택

- Frontend: Next.js 14 + TypeScript + Tailwind CSS
- State Management: Zustand
- Testing: Jest + React Testing Library
- Package Manager: pnpm
- Linting: ESLint
- PWA: next-pwa

  
### 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
├── components/             # React 컴포넌트
│   ├── game-setup/        # 게임 설정 컴포넌트
│   ├── round-form/        # 라운드 진행 컴포넌트
│   └── ui/                # 공통 UI 컴포넌트
├── lib/                   # 비즈니스 로직
├── types/                 # TypeScript 타입 정의
├── constants/             # 상수 정의
└── fonts/                 # 폰트 파일
```

## 🛠️ 구현 기능

-  Dixit 게임 규칙 구현
- 플레이어 이름 설정
- 라운드별 점수 입력
- 실시간 플레이어 점수 계산
- 자동 승리 감지 및 종료 알림
- 플레이어 수 설정
- 조건별 득점 점수 및 승리 조건 점수 설정
- 모바일 최적화 UI/UX


## 🚀 개발 프로세스

### 1. 요구사항 분석

#### 핵심 요구사항

- **게임 규칙**: Dixit 보드게임 점수 계산 로직 구현
- **플레이어 수**: 4명
- **플랫폼**: 모바일 웹 우선 설계
- **입력**: 플레이어 이름, 라운드별 점수 데이터
- **출력**: 실시간 총점, 승리 알림

#### 확장 요구사항

- **설정 가능한 점수**: 각 조건별 점수 및 승리 조건 점수 조정 기능
- **사용성 및 확장성**: 직관적인 UI/UX와 확장성을 고려한 설계

### 2. 시스템 설계

#### 데이터 모델

```typescript
export interface Round {
  id: string;
  roundNumber: number;
  form: RoundScoreForm;
  scores: Record<PlayerId, number>;
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
```

#### 상태 관리 설계

- **Zustand Store**: 게임 상태, 플레이어 정보, 라운드 히스토리 관리
- **로컬 상태**: 컴포넌트별 UI 상태 관리

#### 컴포넌트 설계

- **Atomic Design**: 재사용 가능한 컴포넌트 구조
- **Props Interface**: 명확한 타입 정의
- **단일 책임**: 각 컴포넌트의 명확한 역할 분담

### 3. 개발 구현

#### 핵심 비즈니스 로직

```typescript
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
        vote.voterId === playerId && vote.votedTargetId === storytellerCardId
    );
    return hasCorrectGuess ? scoreConfig.correctGuessPoints : 0;
  }

  return 0;
};
```

#### UI/UX 구현

- **반응형 디자인**: 모바일 우선, 데스크톱 호환

#### 게임 플로우 구현

1. **게임 설정**: 플레이어 이름 입력, 모드 선택
2. **라운드 진행**: 스토리텔러 선택 → 투표 → 카드 공개
3. **점수 계산**: 실시간 점수 업데이트
4. **승리 감지**: 자동 승리 조건 확인

### 4. 테스트 전략

#### 테스트 피라미드

```
    E2E Tests (Manual) (예정)
        /\
       /  \
   Integration Tests (예정)
      /\
     /  \
  Unit Tests
```

#### 테스트 구조

```
__tests__/
├── components.test.tsx    # UI 컴포넌트 테스트
├── store.test.tsx        # 상태 관리 테스트
└── vote.test.tsx         # 게임 로직 테스트
```

#### 단위 테스트

- **비즈니스 로직**: 점수 계산, 게임 규칙 검증
- **컴포넌트**: 렌더링, 사용자 상호작용
- **상태 관리**: Store 액션, 상태 변경

#### 테스트 시나리오

- **게임 초기화**: 플레이어 설정, 게임 시작
- **라운드 진행**: 투표, 카드 공개, 점수 계산
- **승리 조건**: 자동 승리 감지, 게임 종료
- **에러 처리**: 잘못된 입력, 예외 상황

### 5. 배포 및 운영

#### 배포 전략

- **PWA (Progressive Web App) 배포**: 모바일 네이티브 앱과 유사한 사용자 경험 제공
- **Vercel 배포**: 정적 사이트 생성 및 글로벌 CDN 배포
- **HTTPS 보안**: 모든 통신 암호화 보장
  ng, 압축

## 🔧 개발 환경 설정

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 테스트 실행
pnpm test

# 빌드
pnpm build
```

## 📱 사용자 가이드

### 게임 시작

1. 플레이어 이름 입력 (4명)
2. 게임 모드 선택 (직접 점수 입력하는 'SCORE'/ 카드를 고르면 자동 점수 계산되는 'VOTE')
3. 승리 조건 점수 및 상황별 점수 설정 조정 (선택사항)
4. `START` 버튼으로 게임 시작

### 라운드 진행

1. **스토리텔러 선택**: 해당 라운드의 스토리텔러 선택
2. **투표 단계**: 각 플레이어가 카드에 투표
3. **카드 공개**: 스토리텔러 카드 및 플레이어 카드 공개
4. **점수 계산**: 자동으로 점수 계산 및 업데이트

### 게임 종료

- 승리 조건 달성 시 자동으로 게임 종료
- 승리자 표시 및 게임 결과 확인
- NEW GAME 버튼으로 새 게임 시작

