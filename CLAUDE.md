# CLAUDE.md — DLAB MGT 사이트

> 디랩 코딩학원 대치점 MGT반 수업 사이트. GitHub Pages 정적 호스팅.
> 전역 규칙(`~/.claude/CLAUDE.md`)을 따르되, 충돌 시 **이 파일이 우선**한다.
> 기획·요구사항은 [plan.md](plan.md), 디자인 토큰은 [DESIGN.md](DESIGN.md).

---

## 0. 이 프로젝트가 무엇인가

- **순수 Vanilla HTML/CSS/JS.** 빌드 도구·번들러·프레임워크 **없음**. `git push` = 배포.
- **백엔드는 Google Apps Script Web App 하나뿐.** 서버·DB 없음. 동적 동작은 전부 `fetch()`.
- 사용자는 **중·고등학생과 선생님**. 모바일에서 많이 열린다.

## 1. 절대 하지 말 것 (HARD RULES)

1. **빌드 시스템·npm·프레임워크를 도입하지 마라.** React/Vue/Tailwind 빌드/번들러 금지.
   정적 파일로 끝나야 한다. CDN `<script>`도 꼭 필요할 때만, 먼저 물어라.
2. **주차 시트를 `.xlsx`로 가정하지 마라.** Apps Script는 업로드된 엑셀을 못 연다.
   네이티브 Google Sheet만 동작한다. (자세히는 §4)
3. **PIN을 로그·응답·시트 어디에도 기록하지 마라.** 검증에만 쓰고 버린다.
4. **한 학생이 다른 학생의 답을 받아볼 수 있는 코드를 쓰지 마라.** API는 항상 본인 행만 반환.
5. **요청 안 한 리팩터링·"개선"을 하지 마라.** 손댄 모든 줄이 요청에 직접 연결돼야 한다.
   인접 코드 정리·포맷 변경 금지(전역 CLAUDE.md §3 "Surgical Changes" 적용).
6. **시크릿(Web App URL 외 토큰, 마스터 시트 ID 등)을 임의로 노출/하드코딩하지 마라.**
   결정 전 물어라.

## 2. 기본 작업 태도

- **추측하지 말고, 막히면 멈추고 물어라** (전역 §1). 해석이 여럿이면 나열하고 고르게 하라.
- **최소 코드.** 200줄로 짠 게 50줄로 되면 다시 짜라 (전역 §2).
- **기존 스타일을 따라라.** 이 레포는 인라인 `<style>` + Vanilla JS 패턴이다. 그걸 맞춰라.
- **검증 가능한 목표로 바꿔라** (전역 §4). "동작 확인" = 실제로 시트에 행이 채워지는지,
  잘못된 PIN이 막히는지 눈으로 확인.

## 3. 디자인 (DESIGN.md 준수)

사이트 전체를 [DESIGN.md](DESIGN.md)의 **Geniestudio** 언어로 통일한다.

- 색: 텍스트 `#0a0d12`, 배경 `#ebf5ff`/`#ffffff`, 카드 `#fafdff`, 보조텍스트 `#535862`,
  주요 버튼(채움) `#181d27`(텍스트엔 쓰지 말 것), 링크는 `#0099ff`(브라우저 기본 파랑 금지).
- 라운드: 카드 32px, 아이콘 16px, 버튼 32px, 뱃지 90px. **각진 모서리 금지.**
- 타이포: 본문/링크/버튼 = Geist(대체 Inter, weight 500–600, tracking -0.01em).
  20px↑ 헤딩 = Aeonik(대체 Montserrat, tracking -0.02em).
- 라이트 테마 고정. 콘텐츠 섹션에 어두운 배경 쓰지 말 것(버튼 등 특정 UI만 어둡게).
- 그림자는 은은하게 1겹만(`rgba(4,69,144,0.08) 0px 14px 20px 4px`).
- 토큰은 DESIGN.md의 CSS custom properties를 단일 토큰 파일/`:root`로 공유.

## 4. Apps Script 백엔드 함정 (구현 전 필독)

1. **`.xlsx` 못 연다.** `SpreadsheetApp.openById()`는 네이티브 시트에서만 동작.
2. **CORS preflight.** Web App에 `application/json` POST → 막힘.
   POST는 **`Content-Type: text/plain`** 으로 보내고 `e.postData.contents`를 `JSON.parse`.
3. **이름 매칭.** 주차 시트 A열 이름 ≠ 마스터 `학생` 탭 이름이면 매칭 실패. 표기 통일.
4. **배포 버전.** 코드 저장만으로 반영 안 됨. "배포 관리 → 새 버전"을 내야 적용.
5. **쿼터/지연.** 제출 중 버튼 비활성으로 중복 제출 방지.

## 5. 데이터 계약 (절대 깨지 않게)

- 1교시 탭 1행: **A=`번호`, B=`이름`, C=`학년`, D열~ = 질문.** 2행=예시(스킵), 3행~=학생.
  이름은 **B열**(매칭 키), 답은 **D열부터**. 질문 `col`은 절대 열 번호(D=4…)로 주고받는다.
- **질문 개수는 가변(매주 다름). D열 시작만 불변.** 파서는 절대 개수를 하드코딩하지 말고
  D열~마지막 열을 동적으로 읽어라(빈 헤더는 스킵).
- 질문 헤더의 셀 내 줄바꿈은 렌더 전 정리.
- 헤더에 "이미지" 포함 → `type:"image"`, v1 비활성("교실에서 직접 제출").
- v1은 제출 전용 + 이름 선택(PIN 보류). 읽기 경로가 없어 남의 답은 화면에 안 뜬다.
- API 계약 상세는 [plan.md](plan.md) §4. **계약을 바꾸려면 plan.md를 먼저 고치고 합의.**

## 6. 파일 지도

```
index.html         주차 그리드(주차 셀 → answer.html 연결). 잠금 로직 유지.
answer.html        이름 선택 → 질문 폼 → 제출. 상태(로딩/에러/빈/성공) 구현. WEBAPP_URL 상수 주입 필요.
apps-script/Code.gs 답안 제출 백엔드(Web App). GET questions / POST submit.
DESIGN.md          디자인 토큰(읽기 전용 참조)
plan.md            기획/스펙(계약의 단일 출처)
```
※ 기존 `student/*`, `data/students.js`는 삭제됨(학생 알림장 폐기).

## 7. 변경 후 확인

정적 사이트라 테스트 러너가 없다. 대신 **실제로 열어서 본다**:
- 핵심 흐름은 `/run`이나 `/qa` 스킬로 브라우저에서 동작 확인.
- 백엔드 변경은 배포된 Web App URL을 직접 호출해 JSON 확인 후 화면 연결.
- 모바일 폭(375px)에서 레이아웃 확인.

## 8. 커밋

- 커밋 메시지는 기존 한국어 컨벤션 유지: `add:`, `fix:`, `feat:`, `docs:`, `chore:`.
- 사용자가 요청할 때만 커밋/푸시한다.

## 9. 스킬 라우팅

요청이 스킬과 맞으면 Skill 도구로 호출한다. 애매하면 호출하라.

- 제품/기획 브레인스토밍 → `/office-hours`
- 아키텍처 계획 → `/plan-eng-review`
- 디자인 시스템/플랜 리뷰 → `/design-consultation`, `/plan-design-review`
- 버그/에러 → `/investigate`
- 동작 QA/테스트 → `/qa`, `/run`
- 코드 리뷰/diff 점검 → `/review`, `/code-review`
- 시각 다듬기 → `/design-review`
- 배포/PR → `/ship`, `/land-and-deploy`
