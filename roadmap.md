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

### M4. index.html 개편 — `[ ] todo`
- [ ] 주차 셀이 raw 시트 대신 `answer.html?sheetId=…`로 연결
- [ ] week → sheetId 매핑 관리 (현재 `LINKS`와 같은 위치)
- [ ] 주차 잠금 로직 유지 + DESIGN.md 적용

### M5. UI/UX 개편 — `[ ] todo`  ※ 방향 확정 (plan.md §5.1)
- [ ] **answer.html을 Typeform형 스텝퍼로 재작업** (현재 한 화면 폼 → 한 문제 한 화면)
  - [ ] 진행바 + N/총개수, 문항 네비게이터(번호 그리드, 완료/빈칸)
  - [ ] 부드러운 전환(리로드 없음) + 키보드 ←/→ + 자동저장(localStorage)
  - [ ] 마지막 검토·제출 화면
- [ ] PIN(1234) 게이트 추가 (프런트, 백엔드 이전 쉽게 분리)
- [ ] 공유 CSS 토큰 파일 (DESIGN.md custom properties)
- [ ] index / answer 일관성 + 모바일(375px) 점검

### M6. 운영 다듬기 — `[ ] todo`
- [ ] 매주 시트 등록 워크플로우 문서화 (네이티브 변환 → sheetId 등록)
- [ ] 학생 명단을 하드코딩 → DB/시트 기반으로
- [ ] (선택) PIN + "내 답 이어쓰기" 읽기 경로
- [ ] 이미지 문항 처리 방식 결정 (현재 v1 비활성)
