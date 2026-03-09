# 📚 DLAB 수업 링크 & 알림장

> DLAB 코딩학원 대치점 학생들을 위한 수업 자료 링크 모음 & 개인 알림장

## 🔗 바로가기

| 페이지 | 링크 | 설명 |
|--------|------|------|
| 수업 링크 | [dlab01.github.io](https://dlab01.github.io) | 주차별 수업 자료 링크 |
| 학생 알림장 | [dlab01.github.io/student](https://dlab01.github.io/student) | 학생별 숙제 & 공지 |

---

## 📌 주요 기능

**수업 링크 페이지 (`/`)**
- 현재 진행 중인 주차 자동 표시
- 지난 주차 링크 열람 가능, 미래 주차는 잠금 처리
- 선생님별 카드 접기/펼치기

**학생 알림장 (`/student`)**
- 학생 이름으로 개인 페이지 접근
- 주차별 숙제 & 참고 링크 확인

---

## 🗂️ 프로젝트 구조

```
dlab01.github.io/
├── index.html          # 수업 링크 메인 페이지 (MGT LAB)
├── dlab.png            # DLAB 로고
├── student/
│   ├── index.html      # 학생 목록 페이지
│   ├── detail.html     # 학생 개인 알림장 페이지
│   └── students.js     # 학생 데이터 & 숙제 정보
└── data/               # 기타 데이터 파일
```

---

## ✏️ 수업 링크 추가 방법

`index.html` 의 `LINKS` 객체에 주차별 링크를 추가합니다.

```js
const LINKS = {
  1: 'https://docs.google.com/...',  // 1주차
  2: 'https://docs.google.com/...',  // 2주차
  // 3주차 링크 준비되면 여기에 추가
};
```

링크가 없는 주차는 자동으로 잠금 처리됩니다.

---

## 👤 학생 데이터 수정 방법

`student/students.js` 에서 학생 정보와 숙제를 관리합니다.

---

## ⚙️ 기술 스택

- **Vanilla HTML/CSS/JS** — 별도 빌드 없이 바로 배포
- **GitHub Pages** — 무료 정적 호스팅
