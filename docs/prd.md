# Feature PRD: 온보딩 · 로그인 · 퀘스트 미션 UX

---

## 1. Feature Name

**온보딩 플로우 + 로그인 플로우 + 퀘스트 미션 확인 UX**

---

## 2. Epic

- **Parent Epic PRD:** [Mega-Quest MVP Epic](../epic.md)
- **Requirements:** [요구사항 명세](../requirements.md)

---

## 3. Goal

### Problem
1. 앱을 처음 실행한 신입사원은 서비스에 대한 컨텍스트 없이 바로 대시보드에 진입하여 서비스의 가치를 전달하지 못한다.
2. 온보딩 후 로그인 단계가 없으면 "누구의 온보딩인가?"에 대한 맥락이 부재하고, 실제 도입 가능성을 보여주기 어렵다.
3. 모든 퀘스트가 QR 스캔 UI를 사용하면 맥락에 맞지 않아 UX가 어색하고 앱이 미완성으로 보인다.

### Solution
1. **온보딩 화면** (`/onboarding`): 블루 그라데이션 배경에 서비스 핵심 가치를 3개 카드로 전달하고, "시작하기" 버튼으로 로그인으로 유도.
2. **로그인 화면** (`/login`): Google 회사 계정 로그인 버튼(Mock — UI 전용)을 제공하여 실제 서비스와 유사한 완성도 전달.
3. **미션 확인 UX 분기**: `meeting-room-qr`만 QR 스캔 UI를 유지하고, 나머지 퀘스트는 "달성하셨나요?" 자기 선언 확인 플로우를 제공.

### Impact
- 서비스 첫인상에서 핵심 가치를 3초 내에 전달
- 온보딩→로그인→대시보드 완결된 사용자 진입 플로우 완성
- 퀘스트별 맥락에 맞는 UX로 완성도 향상
- "검증 중" 로딩 효과로 시스템 신뢰감 부여

---

## 4. User Personas

### 페르소나 1: 신입사원 (Primary User)
- 앱을 처음 접하는 사용자로, 서비스에 대한 사전 지식 없음
- 회사 Gmail 계정을 보유, Google SSO에 익숙
- 퀘스트 완료 시 즉각적인 피드백과 보상을 기대

### 페르소나 2: HR 담당자 / 해커톤 심사자
- 데모 시연 시 앱의 목적을 즉시 이해하고 싶음
- 매 데모마다 처음부터 플로우를 체험해야 함
- QR 체크인과 일반 미션의 UX 차이를 직관적으로 이해하고 싶음

---

## 5. User Stories

### 온보딩 플로우
- **US-O01:** 신입사원은 앱을 처음 열면 서비스 소개 화면을 봐야 한다.
- **US-O02:** 신입사원은 3개의 핵심 기능 카드를 통해 서비스 가치를 빠르게 이해할 수 있어야 한다.
- **US-O03:** 신입사원은 "시작하기" 버튼을 눌러 로그인 화면으로 이동할 수 있어야 한다.
- **US-O04:** 온보딩 화면은 매 실행 시 항상 표시되어야 한다 (데모 일관성).
- **US-O05:** 온보딩/로그인 화면에서는 BottomNav가 표시되지 않아야 한다.

### 로그인 플로우
- **US-L01:** 신입사원은 온보딩 후 깔끔한 로그인 화면을 봐야 한다.
- **US-L02:** 신입사원은 Google 4색 로고가 포함된 "Google로 계속하기" 버튼을 봐야 한다.
- **US-L03:** 신입사원은 로그인 버튼 클릭 시 즉시 홈 대시보드로 이동해야 한다.
- **US-L04:** 심사자는 실제 서비스와 유사한 로그인 UI를 봐야 한다.

### 퀘스트 미션 확인 UX
- **US-Q01:** 신입사원은 퀘스트 타입에 맞는 UI를 봐야 한다 (QR vs 일반).
- **US-Q02:** QR 외 퀘스트에서 "달성하셨나요?" 확인 화면 + "확인" 버튼을 봐야 한다.
- **US-Q03:** "확인" 클릭 후 스피너 로딩 애니메이션을 봐야 한다 (시스템 검증 느낌).
- **US-Q04:** 로딩 후 "확인되었습니다! ✅" 메시지를 봐야 한다.
- **US-Q05:** QR 퀘스트(`meeting-room-qr`)에서는 QR 스캐너 UI를 봐야 한다.
- **US-Q06:** 로딩/확인 중 "확인" 버튼이 비활성화되어야 한다 (중복 방지).
- **US-Q07:** 이미 완료한 퀘스트 재방문 시 완료 안내 화면을 봐야 한다.
- **US-Q08:** 잠긴 퀘스트 직접 접근 시 잠금 안내 + 힌트를 봐야 한다.

---

## 6. Requirements

### Functional Requirements

**온보딩 화면 (`/onboarding`)**
- 앱 최초 진입 경로. 매 실행 시 항상 표시 (localStorage skip 없음).
- 블루 그라데이션 배경 (`bg-gradient-to-b from-blue-600 to-blue-900`).
- 🚀 이모지 + "Mega-Quest" 타이틀 + 부제목.
- 기능 카드 3개: Sword/Star/Trophy 아이콘 + 설명 텍스트.
- "시작하기 →" CTA 버튼 → `/login`으로 이동.
- BottomNav 미표시.

**로그인 화면 (`/login`)**
- `bg-gray-50` 배경, 중앙 정렬.
- 상단 로고: 🚀 + "Mega-Quest".
- 흰색 로그인 카드: "로그인" 제목 + "회사 계정으로 로그인하세요" 안내.
- Google 4색 SVG 로고 + "Google로 계속하기 (회사 계정)" 버튼.
- 클릭 시 실제 OAuth 없이 `/`으로 이동.
- 하단 © 문구. BottomNav 미표시.

**퀘스트 미션 분기 (`/quests/[id]`)**
- `quest.id === 'meeting-room-qr'` → `QRScannerUI` 표시.
- 그 외 모든 퀘스트 → `MissionConfirmUI` 표시.

**MissionConfirmUI 동작:**
- 기본 상태: 🎯 아이콘 + 퀘스트 제목/설명 + `+NP 획득 예정` + "달성하셨나요?" + "확인" 버튼.
- "확인" 클릭:
  - Step 1 (1000ms): `Loader2` 스피너 + "확인하는 중..." 표시.
  - Step 2 (1000ms): `CheckCircle2` 아이콘 + "확인되었습니다! ✅" 표시.
  - Step 3: `completeQuest(questId)` 호출 → `CompletionModal` 표시.
- 로딩/확인 상태에서 버튼 `disabled`.

**QRScannerUI 동작:**
- 검정 배경 (`bg-black`), QR 프레임 (코너 마커 4개), 스캔 라인.
- "스캔하기" 버튼 클릭 → 2000ms 후 `completeQuest` 호출 → 완료 모달.

**공통 상태 분기:**
- `completed` 퀘스트 재방문 → ✅ 완료 안내 + 획득 포인트 + "홈으로" 버튼.
- `locked` 퀘스트 접근 → 🔒 잠금 안내 + 카테고리별 힌트 + "퀘스트 목록으로" 버튼.
- 존재하지 않는 ID → "퀘스트를 찾을 수 없습니다" + "퀘스트 목록으로" 버튼.

**CompletionModal:**
- ✅ 아이콘 + "미션 완료!" + 퀘스트 제목 + `+NP 획득`.
- "다음 퀘스트 하기" → `/quests`.
- "홈으로" → `/`.

**NavWrapper:**
- `/onboarding`, `/login`에서 BottomNav 숨김 + main wrapper 제거.
- 그 외: `<main className="mx-auto min-h-screen max-w-md pb-20">` 래핑 + `<BottomNav />`.

### Non-Functional Requirements
- **모바일 우선:** 375px 기준 레이아웃. `max-w-md` 제한.
- **접근성:** CTA/확인 버튼에 `aria-label`, `disabled` 속성. 모달에 `role="dialog"` + `aria-modal`.
- **타이밍:** MissionConfirmUI Step1=1000ms, Step2=1000ms. QR 스캔=2000ms.
- **메모리 안전:** `useRef` + `useEffect` cleanup으로 언마운트 시 `setTimeout` 정리.
- **보안(데모):** 실제 OAuth/토큰/쿠키/세션 없음 — UI 전용.
- **확장성:** 향후 `next-auth` 연동 시 버튼의 `onClick`만 교체 가능한 구조.
- **브랜딩:** Primary `blue-600`, Success `green-500`, BG `gray-50`.

---

## 7. Acceptance Criteria

### 온보딩 화면
- [x] `/onboarding` 접근 시 블루 그라데이션 배경 표시.
- [x] 🚀 + "Mega-Quest" 타이틀 + 부제목 표시.
- [x] 3개 기능 카드 표시.
- [x] "시작하기 →" 클릭 시 `/login` 이동.
- [x] `active:scale-95` 터치 피드백.
- [x] BottomNav 미표시.
- [x] 매 실행 시 항상 표시 (skip 로직 없음).

### 로그인 화면
- [x] `/login` 접근 시 흰색 카드 중앙 표시.
- [x] Google 4색 SVG 로고 정확 표시.
- [x] 버튼 클릭 시 `/` 이동 + BottomNav 표시.
- [x] BottomNav 미표시.

### QR 퀘스트 분기
- [x] `meeting-room-qr` 진입 시 `QRScannerUI` 표시.
- [x] 스캔하기 → 2초 → 완료 모달 → 포인트 반영.

### 일반 퀘스트 확인 플로우
- [x] `meeting-room-qr` 외 퀘스트 진입 시 `MissionConfirmUI` 표시.
- [x] 제목, 설명, 보상 포인트 표시.
- [x] "확인" 클릭 → 스피너(1초) → "확인되었습니다!"(1초) → 완료 모달.
- [x] 로딩/확인 중 버튼 `disabled`.

### 완료 모달
- [x] 퀘스트 제목 + 획득 포인트 표시.
- [x] "다음 퀘스트 하기" → `/quests`.
- [x] "홈으로" → `/` + 포인트/petStage 업데이트.

### 상태별 화면
- [x] `completed` 퀘스트 재방문 → 완료 안내 + "홈으로".
- [x] `locked` 퀘스트 접근 → 잠금 안내 + 힌트 + "퀘스트 목록으로".

---

## 8. Out of Scope

- 실제 Google OAuth 2.0 / `next-auth` 구현
- 이메일/비밀번호 로그인 폼
- 로그인 실패 에러 처리 UI, 로그아웃 기능
- 사용자 세션/토큰 관리, 자동 로그인
- 다른 SSO 제공자 (GitHub, Kakao 등)
- 온보딩 슬라이드 페이지네이션, 건너뛰기(Skip) 버튼
- 애니메이션 입장 효과 (fade-in 등)
- 온보딩 완료 여부 서버 저장, A/B 테스트
- 실제 QR 코드 카메라 스캔 기능
- 미션 증거 사진 업로드, 관리자 검수/승인
- 퀘스트 취소/되돌리기, 타이머 기반 잠금 (cooldown)

---

## 9. Implementation Files

| 파일 | 유형 | 설명 |
|------|------|------|
| `app/onboarding/page.tsx` | 신규 | 온보딩 화면 |
| `app/login/page.tsx` | 신규 | 로그인 화면 |
| `components/ui/NavWrapper.tsx` | 신규 | BottomNav 조건부 표시 래퍼 |
| `components/icons/GoogleIcon.tsx` | 신규 | Google 4색 로고 SVG |
| `components/MissionConfirmUI.tsx` | 신규 | 미션 확인 플로우 UI |
| `app/layout.tsx` | 수정 | `BottomNav` → `NavWrapper`로 교체 |
| `app/quests/[id]/page.tsx` | 수정 | QR/일반 미션 분기 + 상태별 화면 분기 |

---

## 10. Dependencies

- `lucide-react`: `Loader2`(스피너), `CheckCircle2`(확인), `ArrowLeft`(뒤로가기), `Sword`/`Star`/`Trophy`(온보딩 아이콘)
- `next/navigation`: `useRouter`, `usePathname`
- `store/gameStore.ts`: `completeQuest` 액션 (변경 없이 재사용)
- `components/ui/Modal.tsx`, `components/CompletionModal.tsx`: 재사용
- `components/QRScannerUI.tsx`: 재사용
