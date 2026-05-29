/**
 * DLAB MGT 답안 제출 백엔드 (Google Apps Script Web App)
 * ----------------------------------------------------------------
 * 역할: 학생이 웹에서 제출한 답을 주차 시트의 "1교시" 탭에 기록한다.
 *
 * 시트 구조 계약 (1교시 탭):
 *   A열=번호, B열=이름, C열=학년, D열~=질문
 *   1행 = 헤더(D열부터 질문 텍스트)
 *   2행 = 예시줄(홍길동) → 무시
 *   3행~ = 학생. 이름은 B열, 답은 D열부터.
 *
 * ⚠️ 중요: 시트는 반드시 "네이티브 Google Sheet"여야 한다.
 *    업로드된 .xlsx는 SpreadsheetApp이 못 연다.
 *    (.xlsx를 시트로 연 뒤 파일 → Google Sheets로 저장하면 네이티브 사본 생성)
 *
 * 배포:
 *   1) script.google.com 에서 새 프로젝트 → 이 코드 붙여넣기
 *   2) DEFAULT_SHEET_ID 를 네이티브 시트 ID로 교체
 *   3) 배포 → 새 배포 → 유형: 웹 앱
 *      - 실행: 나(소유자)  / 액세스: 모든 사용자
 *   4) 발급된 /exec URL 을 프런트(answer.html)의 WEBAPP_URL 에 넣기
 *   ※ 코드 수정 후엔 "배포 관리 → 새 버전"을 내야 반영됨(저장만으론 X).
 */

// ── 설정 ────────────────────────────────────────────────────────
var SHEET_TAB         = '1교시'; // 질문/답이 있는 탭 이름
var NAME_COL          = 2;       // B열 = 이름 (매칭 키)
var QUESTION_START_COL = 4;      // D열부터 질문/답
var DATA_START_ROW    = 3;       // 3행부터 학생 데이터(2행은 예시)
var DEFAULT_SHEET_ID  = '1n4LrQf1Oxui93CdYraN554sN0CUf-miJ8hPHk8ph9Y4'; // 1-4-1 주차 (네이티브)
// ────────────────────────────────────────────────────────────────

function doGet(e) {
  var action = (e.parameter.action || 'questions');
  try {
    if (action === 'questions') {
      return json(getQuestions(e.parameter.sheetId));
    }
    return json({ error: 'UNKNOWN_ACTION' });
  } catch (err) {
    return json({ error: 'SERVER_ERROR', message: String(err) });
  }
}

function doPost(e) {
  // 프런트는 Content-Type: text/plain 으로 보낸다(CORS preflight 회피).
  try {
    var body = JSON.parse(e.postData.contents);
    if (body.action === 'submit') {
      return json(submitAnswers(body));
    }
    return json({ error: 'UNKNOWN_ACTION' });
  } catch (err) {
    return json({ error: 'SERVER_ERROR', message: String(err) });
  }
}

/** 1교시 탭 1행에서 질문 목록을 읽어 반환 */
function getQuestions(sheetId) {
  var sheet = openTab(sheetId);
  var lastCol = sheet.getLastColumn();
  if (lastCol < QUESTION_START_COL) return { questions: [] };

  var headerRow = sheet
    .getRange(1, QUESTION_START_COL, 1, lastCol - QUESTION_START_COL + 1)
    .getValues()[0];

  var questions = [];
  for (var i = 0; i < headerRow.length; i++) {
    var raw = String(headerRow[i] || '').trim();
    if (!raw) continue; // 빈 헤더는 질문 아님
    var text = raw.replace(/\s*\n\s*/g, ' '); // 셀 내 줄바꿈 정리
    // 이미지 "업로드" 문항만 비활성. "셀 내에 이미지 삽입" 지시문이 있는 것만 해당.
    // ("아날로그 이미지" 처럼 주제어로 이미지가 들어간 텍스트 문항은 제외)
    var isImage = text.indexOf('셀 내에 이미지') !== -1 || text.indexOf('이미지를 넣') !== -1;
    questions.push({
      col: QUESTION_START_COL + i, // 절대 열 번호(D=4 …). 제출 시 그대로 돌려보냄
      text: text,
      type: isImage ? 'image' : 'text',
      disabled: isImage // 이미지 문항은 v1 비활성(교실에서 직접 제출)
    });
  }
  return { questions: questions };
}

/** 학생 답을 B열(이름)/D열~(답)에 기록 */
function submitAnswers(body) {
  var name = String(body.name || '').trim();
  if (!name) return { error: 'NO_NAME' };
  var answers = body.answers || {}; // { "4": "...", "5": "..." }

  var sheet = openTab(body.sheetId);
  var row = findStudentRow(sheet, name); // 없으면 새 행 추가

  // 이름(B열)이 비어 있으면 채움
  if (!String(sheet.getRange(row, NAME_COL).getValue()).trim()) {
    sheet.getRange(row, NAME_COL).setValue(name);
  }

  // 답 기록 (절대 열 번호 그대로)
  Object.keys(answers).forEach(function (colKey) {
    var col = parseInt(colKey, 10);
    if (col >= QUESTION_START_COL) {
      sheet.getRange(row, col).setValue(answers[colKey]);
    }
  });

  return { ok: true, savedAt: new Date().toISOString(), row: row };
}

// ── 헬퍼 ────────────────────────────────────────────────────────

function openTab(sheetId) {
  var ss = SpreadsheetApp.openById(sheetId || DEFAULT_SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_TAB);
  if (!sheet) throw new Error('탭 "' + SHEET_TAB + '" 을 찾을 수 없음');
  return sheet;
}

/** B열에서 이름이 일치하는 행을 찾는다(3행~). 없으면 새 행 번호 반환. */
function findStudentRow(sheet, name) {
  var lastRow = sheet.getLastRow();
  if (lastRow >= DATA_START_ROW) {
    var names = sheet
      .getRange(DATA_START_ROW, NAME_COL, lastRow - DATA_START_ROW + 1, 1)
      .getValues();
    for (var i = 0; i < names.length; i++) {
      if (String(names[i][0]).trim() === name) {
        return DATA_START_ROW + i; // 기존 학생 → 덮어쓰기
      }
    }
  }
  return Math.max(lastRow + 1, DATA_START_ROW); // 신규 학생 → 새 행
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
