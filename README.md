# 🎮 Mega-Quest

> **신입사원을 위한 모바일 게이미피케이션 온보딩 앱**  
> 퀘스트를 완료하며 포인트를 쌓고, 트리니티 펫을 성장시키세요.

![Status](https://img.shields.io/badge/status-demo-blue) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8) ![Zustand](https://img.shields.io/badge/Zustand-5-orange)

---

## 📌 프로젝트 개요

Mega-Quest는 신입사원의 온보딩 경험을 게임처럼 만들어, 정보 탐색 비용을 줄이고 회사 적응을 돕는 **모바일 웹앱 MVP**입니다.  
해커톤 데모 시연용으로 제작되었으며, 실제 백엔드 없이 **Mock 데이터**로 동작합니다.

**핵심 가치**
- 📱 **Mobile-First** — 언제 어디서든 모바일로 접근 가능
- ⚖️ **Equity** — 채용 형태(공채/수시)에 관계없이 동일한 온보딩 경험
- 🎉 **Fun** — 퀘스트, 포인트, 펫 성장으로 즐거운 적응

---

## 🚀 시작하기

### 요구 사항

- Node.js 18+
- npm 9+

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

브라우저에서 [http://localhost:3000/onboarding](http://localhost:3000/onboarding) 접속 후 데모를 시작하세요.

### 빌드

```bash
npm run build
npm run start
```

---

## 🗺️ 데모 시나리오 (User Flow)

```
/onboarding  →  /login  →  /  →  /quests  →  /quests/[id]
   인트로        로그인    홈 대시보드   퀘스트 목록    미션 수행
```

1. **온보딩** — 앱 소개 인트로 화면
2. **로그인** — Google 로그인 UI (Mock, 실제 인증 없음)
3. **홈 대시보드** — 트리니티 펫 확인 + 포인트 현황 + 오늘의 미완료 퀘스트 목록
4. **퀘스트 로드맵** — HR·직군·일일 카테고리별 미션 전체 목록
5. **미션 수행** — QR 스캔(회의실) 또는 달성 확인 플로우 → 포인트 획득 + 펫 성장

---

## 🏗️ 기술 스택

| 분류 | 기술 |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3 |
| State | Zustand 5 (persist middleware) |
| Language | TypeScript 5 |
| Icons | lucide-react |
| Data | Mock (no backend) |

---

## 📁 프로젝트 구조

```
Mega-Quest/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (NavWrapper 포함)
│   ├── page.tsx            # 홈 대시보드
│   ├── onboarding/         # 온보딩 인트로 화면
│   ├── login/              # 로그인 화면 (Mock)
│   └── quests/
│       ├── page.tsx        # 퀘스트 목록 (카테고리 탭)
│       └── [id]/page.tsx   # 미션 수행 화면
├── components/
│   ├── ui/                 # 공통 UI (Badge, Modal, ProgressBar, BottomNav, NavWrapper)
│   ├── icons/              # SVG 아이콘
│   ├── PetAvatar.tsx       # 펫 이미지/이모지
│   ├── PointsProgressBar.tsx
│   ├── DailyQuestShortcut.tsx
│   ├── CategoryTabs.tsx
│   ├── QuestCard.tsx
│   ├── QRScannerUI.tsx     # QR 스캔 시뮬레이터
│   ├── MissionConfirmUI.tsx
│   └── CompletionModal.tsx
├── store/
│   └── gameStore.ts        # Zustand 전역 상태 (퀘스트, 포인트, 펫)
├── lib/
│   ├── types.ts            # TypeScript 인터페이스
│   ├── mockData.ts         # Mock 퀘스트 데이터 (9개)
│   └── utils.ts            # 유틸리티 함수
└── docs/
    └── ways-of-work/plan/  # 기획 문서 (Epic PRD, Feature PRD, 구현 계획)
```

---

## 🐾 트리니티 펫 성장 시스템

| 단계 | 조건 | 상태 |
|---|---|---|
| Stage 1 🥚 | 0 – 9P | 알 |
| Stage 2 🐣 | 10 – 14P | 아기 |
| Stage 3 🦋 | 15P 이상 | 메가 트리니티 |

총 9개 퀘스트 완료 시 최대 30P 획득 가능 → Stage 3 달성 가능

---

## 📋 퀘스트 목록

| 카테고리 | 퀘스트 | 포인트 |
|---|---|---|
| HR 초보자 | 인사 제도 확인 | 3P |
| HR 초보자 | 오피스 투어 완료 | 3P |
| HR 초보자 | 프로필 설정 | 2P |
| 직군별 전직 | Slack/Jira 권한 신청 | 5P |
| 직군별 전직 | MSP 기초 교육 수강 | 5P |
| 직군별 전직 | CTU 소개 세션 참석 | 5P |
| 일일/월간 | 메일함 확인 | 2P |
| 일일/월간 | 전자결재 확인 | 2P |
| 일일/월간 | 회의실 QR 체크인 🎯 | 3P |

---

## ⚙️ 주요 설정

**Zustand persist `version: 2`** — `mockData.ts` 변경 시 버전을 올리면 사용자 localStorage가 자동 초기화됩니다.

**PostCSS 설정** — `postcss.config.js`는 반드시 `.js` (CommonJS) 형식이어야 합니다. `.mjs`는 동작하지 않습니다.

**Next.js 설정** — `next.config.mjs` 사용. `.ts` 형식은 Next.js 14에서 지원하지 않습니다.

---

## 📄 기획 문서

- [`docs/ways-of-work/plan/mega-quest-mvp/epic.md`](docs/ways-of-work/plan/mega-quest-mvp/epic.md) — Epic PRD
- [`docs/ways-of-work/plan/mega-quest-mvp/full-mvp/implementation-plan.md`](docs/ways-of-work/plan/mega-quest-mvp/full-mvp/implementation-plan.md) — 전체 구현 계획 (v2.0)
- [`docs/ways-of-work/plan/mega-quest-mvp/onboarding-flow/prd.md`](docs/ways-of-work/plan/mega-quest-mvp/onboarding-flow/prd.md) — 온보딩 PRD
- [`docs/ways-of-work/plan/mega-quest-mvp/login-flow/prd.md`](docs/ways-of-work/plan/mega-quest-mvp/login-flow/prd.md) — 로그인 PRD
- [`docs/ways-of-work/plan/mega-quest-mvp/quest-mission-ux/prd.md`](docs/ways-of-work/plan/mega-quest-mvp/quest-mission-ux/prd.md) — 퀘스트 미션 UX PRD

