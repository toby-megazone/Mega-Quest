# [프로젝트] Mega-Quest: 모바일 기반 온보딩 통합 에이전트
**주제:** 신입사원 비효율 개선 (온보딩 게이미피케이션)
**핵심 가치:** Mobile-First (언제 어디서든), Equity (평등한 정보), Fun (즐거운 적응)

---

## 1. 개발 목표
신입사원의 정보 탐색 비용을 줄이고, 채용 형태(공채/수시)에 상관없이 표준화된 온보딩 경험을 제공하는 모바일 웹앱 MVP 개발.
**Point 1(정보 탐색)** 및 **Point 2(퀘스트 시스템)** 구현에 집중.

## 2. 핵심 데모 시나리오 (User Flow)
1. **온보딩 진입:** 모바일로 접속 → `/onboarding` 화면에서 서비스 소개 확인 → "시작하기" 클릭.
2. **로그인:** `/login` 화면에서 "Google로 계속하기 (회사 계정)" 클릭 (Mock — 실제 OAuth 없음).
3. **메인 대시보드:** 트리니티 펫(알 형태) 및 포인트 프로그레스 바 확인.
4. **퀘스트 목록:** '퀘스트' 탭으로 이동하여 전체 미션 로드맵(N/28 완료) 확인.
5. **미션 선택 및 수행:**
   - QR 퀘스트(`meeting-room-qr`): QR 스캔 UI → "스캔하기" → 2초 → 완료 모달.
   - 일반 퀘스트: "달성하셨나요?" → "확인" → 1초 로딩 → "확인되었습니다!" → 1초 → 완료 모달.
6. **완료 및 보상:** 완료 모달에서 "다음 퀘스트 하기" 또는 "홈으로" 선택.
7. **성장 확인:** 포인트 누적에 따라 펫 진화 (🥚→🐣→✨).

---

## 3. 기술 스택 및 요구사항

### 프론트엔드 (Mobile Web)
- **Framework:** Next.js 14 (App Router, `'use client'` 컴포넌트에서만 Zustand 사용)
- **Styling:** Tailwind CSS 3.4 (모바일 최적화 UI)
- **State Management:** Zustand 5 + persist middleware (포인트 및 퀘스트 상태 관리)
- **Icons:** lucide-react (Loader2, CheckCircle2, ArrowLeft, ChevronRight, Sword, Star, Trophy, Zap, Home, ListChecks, Lock)

### 백엔드 및 데이터 (MVP용 Mock Data)
- **User 모델:** `{ id, name, type, points, petStage: 1|2|3, title }`
- **Quest 모델:** `{ id, category: QuestCategory, title, description, rewardPoints, status: 'locked' | 'available' | 'completed' }`
- **QuestCategory:** `'hr-beginner' | 'role-specific' | 'daily-monthly' | 'pre-boarding' | 'day-one' | 'mandatory-training' | 'company-culture'`
- **PetStageConfig:** `{ stage: 1|2|3, minPoints, maxPoints, label, emoji }`
- **총 퀘스트:** 28개 — 전체 `available` (72P)
- **펫 진화 기준:** 0~9P → 🥚 알, 10~14P → 🐣 아기 트리니티, 15P+ → ✨ 메가 트리니티
- **Zustand Store:** `mega-quest-storage` (version: 4, version 올리면 localStorage 자동 초기화)

---

## 4. UI/UX 컴포넌트 구현 명세

### [컴포넌트 1] 온보딩 화면 (`/onboarding`)
- **배경:** `bg-gradient-to-b from-blue-600 to-blue-900`, 전체 화면 중앙 정렬.
- **콘텐츠:** 🚀 이모지 + "Mega-Quest" 타이틀 + 부제목 + 기능 소개 카드 3개.
  - Sword: "퀘스트를 수행하며 회사를 탐험해요"
  - Star: "포인트를 모아 트리니티 펫을 키워요"
  - Trophy: "온보딩을 완료하고 명예 칭호를 획득해요"
- **CTA:** "시작하기 →" 버튼 (`bg-white text-blue-600`, `active:scale-95`), 클릭 시 `/login`으로 이동.

### [컴포넌트 2] 로그인 화면 (`/login`)
- **배경:** `bg-gray-50`, 중앙 정렬.
- **로고:** 🚀 이모지 + "Mega-Quest" 텍스트.
- **로그인 카드:** `bg-white rounded-2xl shadow-sm p-8`.
  - 제목: "로그인", 안내: "회사 계정으로 로그인하세요".
  - Google 로그인 버튼: 4색 Google SVG + "Google로 계속하기 (회사 계정)", `active:scale-95`.
  - 클릭 시 `/`으로 이동 (실제 OAuth 없음).
- **하단:** © 2026 Mega-Quest 문구.

### [컴포넌트 3] 메인 대시보드 (Home — `/`)
- **헤더:** "안녕하세요 👋" + "{이름}님의 온보딩 퀘스트" + 명예 칭호 배지.
- **트리니티 펫 시각화:** 이모지 전용 (🥚/🐣/✨), `h-40 w-40` 원형 배경, 라벨 표시.
- **성장 현황 카드:** 현재 포인트(큰 숫자) + "다음 단계까지 NP" 또는 "최고 단계 달성! 🎉" + 프로그레스 바.
- **일일 퀘스트 바로가기 (DailyQuestShortcut):**
  - 미완료 시: 파란 버튼 "오늘의 일일 퀘스트" (→ `/quests?category=daily-monthly`)
  - 전체 완료 시: 초록 배지 "오늘의 미션 완료! 🎉" + 획득 포인트 합계.
- **오늘 남은 미션 목록:** 미완료 일일 퀘스트를 리스트로 표시, 클릭 시 해당 퀘스트 상세로 이동.

### [컴포넌트 4] 퀘스트 로드맵 (Quest List — `/quests`)
- **타이틀:** "퀘스트 로드맵" + 설명.
- **전체 진행률 배너:** `N / 28 완료` (파란 배경).
- **카테고리 탭 (CategoryTabs):** 7개 — 온보딩 여정 순서대로 정렬
  - [입사 전 준비], [첫 출근], [필수 교육], [조직 이해], [HR 초보자], [직군별 전직], [일일/월간]
  - 가로 스크롤 + 우측 fade gradient.
  - 기본 탭: 미완료 퀘스트 있는 첫 카테고리 자동 포커스.
- **카테고리별 완료 수:** `N/M 완료` 텍스트.
- **퀘스트 카드 (QuestCard):** 상태 아이콘(🎯/✅/🔒) + 제목 + 상태 배지(도전 가능/완료/잠김) + 보상 포인트.
  - 잠긴 퀘스트: opacity-50, 클릭 비활성, pointer-events-none.

### [컴포넌트 5] 퀘스트 상세 (Quest Detail — `/quests/[id]`)
- **헤더:** 뒤로가기 화살표 + 퀘스트 제목 + 보상 포인트 (`bg-white border-b`).
- **상태별 분기:**
  - 존재하지 않는 ID → "퀘스트를 찾을 수 없습니다" + "퀘스트 목록으로" 버튼.
  - `locked` → 🔒 잠금 안내 + 카테고리별 힌트 메시지 + "퀘스트 목록으로" 버튼.
  - `completed` → ✅ 완료 안내 + 획득 포인트 표시 + "홈으로" 버튼.
  - `available` → 미션 수행 UI (QR 또는 일반).
- **QR 퀘스트 (`meeting-room-qr`):** `QRScannerUI` — 검정 배경, QR 프레임, 스캔 버튼, 2초 타이머.
- **일반 퀘스트:** `MissionConfirmUI` — 퀘스트 정보 + "달성하셨나요?" + "확인" 버튼.
  - 확인 클릭 → 스피너 "확인하는 중..." (1초) → ✅ "확인되었습니다!" (1초) → 완료 모달.
  - 로딩/확인 중 버튼 `disabled`.

### [컴포넌트 6] 완료 모달 (CompletionModal)
- 체크 아이콘 + "미션 완료!" + 퀘스트 제목 + `+NP 획득`.
- "다음 퀘스트 하기" 버튼 → `/quests`.
- "홈으로" 버튼 → `/`.

### [컴포넌트 7] 하단 네비게이션 (BottomNav + NavWrapper)
- **BottomNav:** 홈(Home 아이콘) / 퀘스트(ListChecks 아이콘) 2탭.
- **NavWrapper:** `/onboarding`, `/login`에서 BottomNav 숨김 + main 래퍼(max-w-md, pb-20) 제거.
- Safe area inset 지원.

---

## 5. 퀘스트 콘텐츠 로직 (Backlog)

| 카테고리 | ID prefix | 퀘스트 수 | 합계 P | 상태 |
|---------|-----------|----------|--------|------|
| 입사 전 준비 | `pre-boarding-*` | 5 | 11P | available |
| 첫 출근 | `day-one-*` | 6 | 12P | available |
| 필수 교육 | `training-*` | 6 | 14P | available |
| 조직 이해 | `culture-*` | 2 | 5P | available |
| HR 초보자 | `hr-*`, `office-*`, `profile-*` | 3 | 8P | available |
| 직군별 전직 | `slack-*`, `msp-*`, `ctu-*` | 3 | 13P | available |
| 일일/월간 | `meeting-*`, `email-*`, `e-*` | 3 | 9P | available |
| **합계** | | **28** | **72P** | |

- **보상 체계:** 현금성 재화가 아닌 '포인트' 적립. 포인트로 펫 성장 단계 자동 갱신.
- **일일 퀘스트 완료 상태:** 홈 화면 일일 퀘스트 버튼이 전체 완료 시 "오늘의 미션 완료! 🎉"로 변경.
- **상태 관리:** `completeQuest(questId)` — `available` 상태만 처리, 포인트 + petStage 자동 갱신.

---

## 6. UX 구현 사항 (현재 상태)

| 항목 | 구현 내용 |
|---|---|
| 앱 진입 플로우 | `/onboarding` → `/login` → `/` |
| 탭 순서 | 온보딩 여정 순서 (입사 전 준비 → 첫 출근 → 필수 교육 → 조직 이해 → HR → 직군 → 일일) |
| 기본 탭 | 미완료 퀘스트 있는 첫 카테고리 자동 포커스 |
| 전체 진행률 배너 | 퀘스트 목록 상단 `N/28 완료` |
| QR 미션 | `meeting-room-qr` 전용 — 검정 배경, QR 프레임, 스캔 버튼 |
| 일반 미션 확인 | "달성하셨나요?" → 확인(1초 로딩) → "확인되었습니다!"(1초) → 완료 모달 |
| 완료 모달 | "다음 퀘스트 하기" / "홈으로" 2버튼 |
| 잠긴 퀘스트 카드 | opacity-50, 클릭 비활성, pointer-events-none |
| 잠긴 퀘스트 상세 | 🔒 잠금 안내 + 카테고리별 힌트 + "퀘스트 목록으로" |
| 완료 퀘스트 상세 | ✅ 완료 안내 + 획득 포인트 요약 + "홈으로" |
| 일일 퀘스트 바로가기 | 미완료 시 파란 버튼, 전체 완료 시 초록 "오늘의 미션 완료! 🎉" |
| 오늘 남은 미션 | 홈에 미완료 일일 퀘스트 리스트 표시 |
| 탭 스크롤 표시 | 우측 fade gradient |
| 펫 이미지 | 이모지 전용 (🥚/🐣/✨) |
| BottomNav 숨김 | `/onboarding`, `/login`에서 NavWrapper로 숨김 |
| Zustand version | 5 (persist middleware, storage version 4) |
| 타이머 cleanup | `useRef` + `useEffect` cleanup으로 메모리 누수 방지 |

---

## 7. 프로젝트 구조

```
app/
├── layout.tsx              # RootLayout (Server Component, NavWrapper 사용)
├── globals.css
├── page.tsx                # 홈 대시보드
├── onboarding/page.tsx     # 온보딩 화면
├── login/page.tsx          # 로그인 화면
└── quests/
    ├── page.tsx            # 퀘스트 목록
    └── [id]/page.tsx       # 퀘스트 상세/미션 수행

components/
├── PetAvatar.tsx           # 펫 이모지 시각화
├── PointsProgressBar.tsx   # 포인트 프로그레스 바
├── DailyQuestShortcut.tsx  # 일일 퀘스트 바로가기
├── CategoryTabs.tsx        # 카테고리 탭
├── QuestCard.tsx           # 퀘스트 카드
├── QRScannerUI.tsx         # QR 스캔 시뮬레이터
├── MissionConfirmUI.tsx    # 미션 확인 플로우
├── CompletionModal.tsx     # 완료 모달
├── icons/
│   └── GoogleIcon.tsx      # Google 4색 로고 SVG
└── ui/
    ├── Badge.tsx           # 상태 배지 (도전 가능/완료/잠김)
    ├── BottomNav.tsx       # 하단 네비게이션
    ├── Modal.tsx           # 범용 모달 (Escape 닫기, backdrop blur)
    ├── NavWrapper.tsx      # BottomNav 조건부 표시 래퍼
    └── ProgressBar.tsx     # 프로그레스 바

lib/
├── types.ts                # TypeScript 타입 정의
├── mockData.ts             # 초기 유저/퀘스트/펫 설정 데이터
└── utils.ts                # getPetStage, getProgressPercent, getNextStagePoints

store/
└── gameStore.ts            # Zustand 전역 상태 (user, quests, completeQuest, resetGame)
```
