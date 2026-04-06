---
goal: 온보딩/로그인 플로우 추가 + 퀘스트 미션 확인 UX 개선
version: 1.1
date_created: 2026-03-31
last_updated: 2026-04-06
owner: Mega-Quest Team
status: 'Completed'
tags: [feature, ux, onboarding, login, quest]
---

# Introduction

![Status: Completed](https://img.shields.io/badge/status-Completed-green)

이 기능은 세 가지 UX 개선을 구현한다:

1. **온보딩 플로우**: 앱 진입 시 서비스 소개 화면(`/onboarding`) → "시작하기" → 로그인 화면으로 유도.
2. **로그인 플로우**: `/login` 화면에서 Google 로그인 UI (회사 계정, Mock — 실제 OAuth 없음) → 메인 대시보드로 이동.
3. **퀘스트 미션 확인 UX**: `meeting-room-qr` 퀘스트만 QR 스캔 UI를 유지하고, 나머지 모든 퀘스트는 "달성하셨나요?" 확인 플로우로 교체.

---

## 1. Requirements & Constraints

- **REQ-001**: 앱 첫 실행 시 항상 온보딩 화면(`/onboarding`) → 로그인 화면(`/login`) → 메인 대시보드(`/`) 순서로 이동한다.
- **REQ-002**: 온보딩 화면에는 서비스 설명(3개 기능 카드)과 "시작하기" 버튼이 존재한다. 클릭 시 `/login`으로 이동.
- **REQ-003**: 로그인 화면에는 Google 4색 SVG 로고 + "Google로 계속하기 (회사 계정)" 버튼이 존재한다. 클릭 시 실제 OAuth 없이 즉시 `/`로 이동.
- **REQ-004**: `meeting-room-qr` quest ID를 가진 퀘스트만 기존 `QRScannerUI`를 사용한다.
- **REQ-005**: 나머지 모든 퀘스트는 `MissionConfirmUI` 확인 플로우를 사용한다:
  - Step 1: "달성하셨나요?" + "확인" 버튼 표시
  - Step 2: 버튼 클릭 → 스피너 + "확인하는 중..." (1초)
  - Step 3: ✅ "확인되었습니다!" (1초)
  - Step 4: `completeQuest(questId)` 호출 → `CompletionModal` 표시
- **REQ-006**: `/onboarding`과 `/login` 경로는 하단 `BottomNav`를 표시하지 않는다.
- **CON-001**: 실제 Google OAuth, 세션, 토큰, 쿠키 구현 없음 — UI 전용(Mock).
- **CON-002**: 기존 Zustand store(`gameStore.ts`) 구조 변경 없음.
- **CON-003**: 기존 `QRScannerUI`, `CompletionModal` 컴포넌트 재사용.
- **GUD-001**: 모든 신규 페이지는 모바일 375px 기준 레이아웃 우선.
- **GUD-002**: 색상 시스템 — Primary `blue-600`, Success `green-500`, BG `gray-50`.
- **PAT-001**: 퀘스트 미션 분기 로직은 `app/quests/[id]/page.tsx` 내부에서 `quest.id === 'meeting-room-qr'` 조건으로 처리.

---

## 2. Implementation Steps

### Implementation Phase 1 — 온보딩 화면 구현

- GOAL-001: `/onboarding` 페이지를 생성하고, 서비스 소개 + "시작하기" 버튼을 구현한다.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-001 | `app/onboarding/page.tsx` 생성. `'use client'`. 레이아웃: 전체 화면 중앙 `flex flex-col items-center justify-between`, `bg-gradient-to-b from-blue-600 to-blue-900`, `min-h-screen`. | ✅ | 2026-03-31 |
| TASK-002 | 온보딩 콘텐츠: ① 🚀 + "Mega-Quest" (3xl bold white), ② 부제목 (sm blue-200), ③ 기능 카드 3개 (Sword/Star/Trophy + 텍스트, `bg-white/10 rounded-2xl`), ④ "시작하기 →" 버튼 (`bg-white text-blue-600`, `active:scale-95`). | ✅ | 2026-03-31 |
| TASK-003 | `components/ui/NavWrapper.tsx` 생성. `usePathname`으로 `/onboarding`, `/login` 감지 시 BottomNav + main wrapper 숨김. | ✅ | 2026-03-31 |
| TASK-004 | `app/layout.tsx` 수정. `BottomNav` 직접 사용 → `NavWrapper`로 교체. Server Component 유지. | ✅ | 2026-03-31 |

### Implementation Phase 2 — 로그인 화면 구현

- GOAL-002: `/login` 페이지를 생성하고, Google 로그인 버튼(UI 전용)을 구현한다.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-005 | `app/login/page.tsx` 생성. `'use client'`. 레이아웃: `bg-gray-50`, 상단 🚀 로고 + 중앙 로그인 카드(`bg-white rounded-2xl shadow-sm p-8`). | ✅ | 2026-03-31 |
| TASK-006 | 로그인 카드: ① "로그인" (xl bold), ② "회사 계정으로 로그인하세요" (sm gray-400), ③ Google 버튼 — 4색 SVG + "Google로 계속하기 (회사 계정)", `active:scale-95`. 클릭 시 `router.push('/')`. | ✅ | 2026-03-31 |
| TASK-007 | `components/icons/GoogleIcon.tsx` — Google 4색 SVG (viewBox 0 0 24 24). | ✅ | 2026-03-31 |

### Implementation Phase 3 — 퀘스트 미션 확인 UX 구현

- GOAL-003: `meeting-room-qr` 제외 퀘스트에 "달성하셨나요?" 확인 플로우를 구현한다.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-008 | `components/MissionConfirmUI.tsx` 생성. props: `{ quest, onConfirm, isLoading, isConfirmed }`. 3상태 렌더링: 기본(퀘스트 정보 + "달성하셨나요?" + "확인"), 로딩(스피너 + "확인하는 중..."), 확인됨(✅ + "확인되었습니다!"). | ✅ | 2026-03-31 |
| TASK-009 | `app/quests/[id]/page.tsx` 수정. `isMissionLoading`, `isMissionConfirmed` 상태 추가. `quest.id === 'meeting-room-qr'` → `QRScannerUI`, 그 외 → `MissionConfirmUI`. | ✅ | 2026-03-31 |
| TASK-010 | `handleMissionConfirm` 함수: `setIsMissionLoading(true)` → 1000ms 후 `setIsMissionConfirmed(true)` → 1000ms 후 `completeQuest` + `setShowModal(true)`. `useRef` + `useEffect` cleanup으로 타이머 정리. | ✅ | 2026-03-31 |

### Implementation Phase 4 — 추가 UX 구현

- GOAL-004: 퀘스트 상태별 화면 분기 및 완료 모달 개선.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-011 | `locked` 퀘스트 접근 시 🔒 잠금 안내 + 카테고리별 힌트(day-one/mandatory-training/company-culture) + "퀘스트 목록으로" 버튼. | ✅ | 2026-04-01 |
| TASK-012 | `completed` 퀘스트 재방문 시 ✅ 완료 안내 + 획득 포인트 표시 + "홈으로" 버튼. | ✅ | 2026-04-01 |
| TASK-013 | 존재하지 않는 퀘스트 ID 접근 시 "퀘스트를 찾을 수 없습니다" + "퀘스트 목록으로" 버튼. | ✅ | 2026-04-01 |
| TASK-014 | `CompletionModal` — "다음 퀘스트 하기"(→ `/quests`) + "홈으로"(→ `/`) 2버튼 구현. | ✅ | 2026-04-01 |

### Implementation Phase 5 — 통합 검증

- GOAL-005: 전체 플로우가 오류 없이 동작하는지 확인한다.

| Task | Description | Completed | Date |
|------|-------------|-----------|------|
| TASK-015 | `npm run build` 타입/빌드 오류 없음 확인. | ✅ | 2026-04-01 |
| TASK-016 | 온보딩 → 로그인 → 홈 → 퀘스트 → 미션 완료 전체 플로우 수동 검증. | ✅ | 2026-04-01 |
| TASK-017 | `/onboarding`, `/login`에서 BottomNav 미표시 확인. | ✅ | 2026-04-01 |
| TASK-018 | QR 퀘스트/일반 퀘스트/완료 퀘스트/잠긴 퀘스트 각각 정상 동작 확인. | ✅ | 2026-04-01 |

---

## 3. Alternatives

- **ALT-001**: `layout.tsx`에서 직접 `usePathname` 사용 — Server Component에서 불가. `NavWrapper` 분리로 해결.
- **ALT-002**: 실제 Google OAuth (`next-auth`) — 데모 전용 앱이므로 과도한 복잡도. UI 전용으로 대체.
- **ALT-003**: 온보딩을 localStorage로 최초 1회만 표시 — 데모 시연 시 매번 보여야 하므로 항상 표시.
- **ALT-004**: 미션 확인을 별도 모달로 구현 — 페이지 내 인라인 상태 전환이 UX상 자연스러워 채택 안 함.

---

## 4. Dependencies

- **DEP-001**: `lucide-react` — `Loader2`(스피너), `CheckCircle2`(확인), `ArrowLeft`(뒤로가기), `Sword`/`Star`/`Trophy`(온보딩 아이콘).
- **DEP-002**: `next/navigation` — `useRouter`, `usePathname`.
- **DEP-003**: `store/gameStore.ts` — `completeQuest` 액션 (변경 없이 재사용).
- **DEP-004**: `components/ui/Modal.tsx`, `components/CompletionModal.tsx` — 재사용.
- **DEP-005**: `components/QRScannerUI.tsx` — 재사용.

---

## 5. Files

| 파일 | 유형 | 설명 |
|------|------|------|
| `app/onboarding/page.tsx` | 신규 | 온보딩 화면 |
| `app/login/page.tsx` | 신규 | 로그인 화면 |
| `components/ui/NavWrapper.tsx` | 신규 | BottomNav 조건부 표시 래퍼 |
| `components/icons/GoogleIcon.tsx` | 신규 | Google 4색 SVG 컴포넌트 |
| `components/MissionConfirmUI.tsx` | 신규 | 미션 확인 플로우 UI |
| `app/layout.tsx` | 수정 | `BottomNav` → `NavWrapper` 교체 |
| `app/quests/[id]/page.tsx` | 수정 | QR/일반 미션 분기 + 상태별 화면 분기 + 타이머 cleanup |

---

## 6. Testing

- **TEST-001**: 온보딩 → 로그인 → 홈 이동 플로우 — ✅ 완료.
- **TEST-002**: `/onboarding`, `/login`에서 BottomNav 미표시 — ✅ 완료.
- **TEST-003**: `meeting-room-qr` 퀘스트에서 QR UI 유지 — ✅ 완료.
- **TEST-004**: 일반 퀘스트 3단계 확인 플로우 (스피너 1초 → 확인됨 1초 → 모달) — ✅ 완료.
- **TEST-005**: 완료 모달 "다음 퀘스트 하기" / "홈으로" 버튼 동작 — ✅ 완료.
- **TEST-006**: 완료 퀘스트 재방문 → 완료 안내 화면 — ✅ 완료.
- **TEST-007**: 잠긴 퀘스트 접근 → 잠금 안내 + 힌트 — ✅ 완료.
- **TEST-008**: 모든 퀘스트 완료 후 포인트 및 petStage 정상 업데이트 — ✅ 완료.
- **TEST-009**: `npm run build` 타입/빌드 오류 없음 — ✅ 완료.

---

## 7. Risks & Assumptions

- **RISK-001**: `app/layout.tsx`가 Server Component이므로 `usePathname` 직접 사용 불가 → `NavWrapper` Client Component 분리로 해결. ✅
- **RISK-002**: `setTimeout` 중첩 사용 시 언마운트 후 상태 업데이트 가능 → `useRef` + `useEffect` cleanup으로 해결. ✅
- **ASSUMPTION-001**: Google 로고 SVG는 공개 도메인 path 사용 (데모 전용).
- **ASSUMPTION-002**: 로그인 상태는 전역 상태로 관리하지 않음 — 버튼 클릭 즉시 라우팅.

---

## 8. Related Specifications

- [Epic PRD](../epic.md)
- [Requirements](../requirements.md)
- [통합 PRD](../prd/prd.md)
