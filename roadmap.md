# DLAB MGT 사이트 개편 로드맵

## 🎯 최종 목표

학생이 **매주 웹에서 문제를 보고 답을 제출** → 답이 그 주차 네이티브 구글 시트의
`1교시` 탭(B열=이름, D열~=답)에 자동 저장된다. 학생은 raw 시트를 직접 편집하지 않고,
다른 학생 답도 볼 수 없다. 동시에 **사이트 전체를 DESIGN.md(Geniestudio) 디자인으로 통일**한다.

상세 스펙은 [plan.md](plan.md), 작업 규칙은 [CLAUDE.md](CLAUDE.md).

---

## 마일스톤

### M1. 기획 & 문서화 — `[x] done`
- [x] /office-hours 설계 세션 → 설계 문서 (`~/.gstack/projects/.../*-design-*.md`)
- [x] plan.md 엔지니어링 스펙 재작성 (데이터 계약·API·함정)
- [x] CLAUDE.md 신규 작성 (엄격 규칙 + 스킬 라우팅)

### M2. 백엔드 (Apps Script Web App) — `[x] done`
- [x] Code.gs: `GET questions`(D열~ 동적), `POST submit`(B열 이름/D열~ 답)
- [x] 네이티브 구글 시트로 전환 (`.xlsx` → native) 확인
- [x] 웹 앱 배포: 실행=나 / 액세스=모든 사용자 (익명 접근 검증됨)
- [x] 이미지 문항 감지 버그 수정 ("셀 내에 이미지"만 비활성, 주제어 오탐 제거)

### M3. 학생 답안 페이지 (answer.html) — `[x] done` ✅ 백엔드+제출 전부 검증 완료
- [x] 이름 선택(박노아/김세임/정재윤/한아라) → 질문 폼 → 제출
- [x] 상태 처리: 로딩 / 에러+재시도 / 빈 / 성공
- [x] DESIGN.md 토큰 적용 (Sky Wash 배경, Arctic Mist 카드, Midnight Ink 버튼, 라운드)
- [x] WEBAPP_URL 연결
- [x] 제출 end-to-end 검증 (박노아 제출 → 시트 B/D열 저장 확인 완료)

### M4. index.html 개편 — `[x] done` ✅ (미커밋)
- [x] 주차 셀이 raw 시트 대신 `answer.html?sheetId=…&week=N`로 연결
- [x] week → sheetId 매핑 관리 (`SHEETS` 객체, 매주 한 줄 추가)
- [x] 로그인 게이트(이름+PIN 1234) → 주차 그리드 + DESIGN.md(Geniestudio) 적용
- [x] 11주 토요일 일정(`WEEK_DATES`, 8/1 휴강 스킵) + **현재 주차 1개만 접근**(지난·미래 잠금)

### M5. UI/UX 개편 — `[~] in_progress`  ※ 컴퓨터 수업실 전용으로 방향 전환
- [x] **index.html을 Geniestudio식 수업 사이트 첫 화면으로 재작업**
  - [x] `이번 주차 시작하기` CTA → 오른쪽 패널이 이름+PIN 로그인으로 전환
  - [x] 현재 열린 주차 보드 + 잠긴 주차 표시
- [x] **answer.html을 데스크톱 워크스페이스로 재작업**
  - [x] 왼쪽 문항 목록 / 가운데 문제+답변 / 오른쪽 제출 상태 3열 레이아웃
  - [x] 답변 완료 체크 표시 + 완료 카드 + 미답변/완료 섹션 경계 개선
  - [x] 답변 textarea 자동 높이 조절: 짧은 답은 작게, 긴 답은 좌우 패널 높이에 맞춘 뒤 내부 스크롤
- [x] PIN(1234) 게이트 추가 → **index.html로 이전**(이름+PIN), answer.html은 sessionStorage 인계 + 폴백. `verifyPin()` 분리
- [ ] 공유 CSS 토큰 파일 (DESIGN.md custom properties) — 현재 양쪽 인라인
- [x] 모바일(375px) 최적화 범위 제외 — 학생은 PC로만 접근

### M6. 운영 다듬기 — `[ ] todo`
- [ ] 매주 시트 등록 워크플로우 문서화 (네이티브 변환 → sheetId 등록)
- [ ] 학생 명단을 하드코딩 → DB/시트 기반으로
- [ ] (선택) PIN + "내 답 이어쓰기" 읽기 경로
- [ ] 이미지 문항 처리 방식 결정 (현재 v1 비활성)
