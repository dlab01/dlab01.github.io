# Geniestudio for DLAB MGT

> 디랩 코딩학원 대치점 MGT반 답안 제출 사이트의 디자인 기준.
> 정적 HTML/CSS/JS 화면을 유지하면서, 수업 중 학생이 바로 읽고 제출할 수 있는 밝고 또렷한 UI를 만든다.

## 1. Direction

이 사이트는 외부 제품처럼 보이면 안 된다. 기준은 **Geniestudio의 밝은 캔버스, 큰 둥근 카드, 어두운 주요 버튼, 파란 링크 포인트**이고, DLAB MGT 수업 화면에 맞게 더 실용적으로 쓴다.

- 첫 화면은 주차 보드와 입장 흐름이 바로 보여야 한다.
- 답안 화면은 문항 목록, 답안 작성, 제출 상태가 한눈에 읽혀야 한다.
- 디자인 변경은 기존 레이아웃을 유지한 채 토큰, 간격, 타이포, 상태 표현을 맞추는 방식으로 한다.
- 어두운 히어로, 브랜드 녹색 CTA, 가격표/마케팅 섹션 같은 외부 사이트 패턴은 쓰지 않는다.

## 2. CSS Tokens

`index.html`과 `answer.html`의 `:root`는 아래 값을 기준으로 맞춘다. 새 파일/빌드 시스템을 만들지 않는다.

```css
@font-face {
  font-family: "AppleSDGothicNeoLocal";
  src: url("assets/AppleSDGothicNeo.ttc");
  font-weight: 400 800;
  font-display: swap;
}

@font-face {
  font-family: "NeoDunggeunmo";
  src: url("assets/neodgm.ttf") format("truetype");
  font-display: swap;
}

:root {
  --color-midnight-ink:#181d27;
  --color-arctic-mist:#fafdff;
  --color-canvas-white:#ffffff;
  --color-obsidian:#0a0d12;
  --color-silver-pine:#535862;
  --color-ash-gray:#93979f;
  --color-sky-wash:#ebf5ff;
  --color-ghostly-blue:#cce7ff;
  --color-electric-blue:#0069e0;
  --color-lavender-mist:#f1e6ff;
  --color-mint-glaze:#d3f6e3;
  --color-sunburst-yellow:#bb9915;
  --color-zesty-orange:#f26110;
  --color-luminous-blue:#0099ff;
  --gradient-whisper-fade-blue:linear-gradient(rgb(229,246,255) 0%, rgb(194,233,255) 100%);
  --gradient-whisper-fade-violet:linear-gradient(rgb(244,235,255) 0%, rgb(228,204,255) 100%);
  --gradient-whisper-fade-yellow:linear-gradient(rgb(255,249,224) 0%, rgb(255,236,163) 100%);
  --font-geist:"AppleSDGothicNeoLocal","Apple SD Gothic Neo",ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  --font-aeonik:var(--font-geist);
  --font-pixel:"NeoDunggeunmo",var(--font-geist);
  --shadow-lg:rgba(4,69,144,0.08) 0px 14px 20px 4px;
}
```

## 3. Color Rules

- Primary text: `#0a0d12`.
- Body background: `#ebf5ff`.
- Main card surface: `#ffffff`.
- Secondary card surface: `#fafdff`.
- Secondary text: `#535862`.
- Muted text/placeholders: `#93979f`.
- Primary filled button: `#181d27` background with white text.
- Link/focus color: `#0099ff`; browser default blue is not allowed.
- `#181d27` is for button fills and selected states only. Do not use it as normal paragraph text.
- Keep the site light. Do not add dark content sections.

## 4. Typography

### Primary UI

- Body, links, labels, buttons: `--font-geist`, weight 500-600, letter-spacing `-0.01em`.
- Headings 20px and above: `--font-aeonik`, weight 600, letter-spacing `-0.02em`.
- `assets/AppleSDGothicNeo.ttc` is the global UI font source. Do not reintroduce remote Google Fonts for the core UI.
- Body line-height should stay generous, roughly `1.45` to `1.6`, because students read and write answers here.

### Pixel Accent

`assets/neodgm.ttf` is available as `--font-pixel`. Use it sparingly.

Good uses:
- Small identity text such as `MGT LAB`.
- Week numbers, date pills, question numbers, stat numbers.
- Short status labels where the pixel feel helps the classroom/game-like mood.

Avoid:
- Long paragraphs.
- Textarea content.
- Full answer/question bodies.
- Dense navigation lists.

The pixel font is an accent, not the global reading font.

## 5. Shape, Spacing, Elevation

- Cards and major panels: `32px` radius.
- Smaller cards and answer boxes: `24px` radius.
- Inputs and small controls: `16px` to `24px` radius.
- Buttons and badges: pill shape, `32px` or `90px` radius.
- Avoid sharp corners.
- Use one soft shadow: `var(--shadow-lg)`.
- Avoid stacked shadows, glass effects, heavy gradients, and dark decorative blobs.
- Keep major layout gaps around `20px` to `32px`; cards should feel roomy but not like a marketing page.

## 6. Components

### Primary Button

- Background `--color-midnight-ink`.
- Text `--color-canvas-white`.
- Pill radius.
- Use only for the main next/start/submit action.

### Secondary Button

- Background `--color-arctic-mist`.
- Text `--color-obsidian`.
- Border `rgba(83,88,98,.14)`.
- Use for back, previous, and secondary navigation.

### Text Link

- Color `--color-luminous-blue`.
- No browser default blue.
- Use for low-emphasis navigation or reset actions.

### Cards

- Main panels use `--color-canvas-white`.
- Nested/secondary panels use `--color-arctic-mist`.
- Do not put many card layers inside each other unless the answer workflow needs clear separation.

### Week Cells

- Open week is the primary CTA. It should be a real clickable button that starts the answer flow.
- Open week may use the dark filled primary-button treatment when it is the only active week.
- Locked weeks should be muted, lower opacity, and include a lock signal.
- Dates should remain short and scannable.
- Current-week date should read as supporting metadata, not as a detached decorative pill.
- Do not place a separate main "start" action far away in the left intro copy.

### Question Workspace

- Left panel: compact question navigation.
- Center panel: question text and large answer area.
- Right panel: completion stats and missing/done lists.
- Do not make decorative changes that reduce answer textarea height or make Korean question text harder to scan.

## 7. Responsive Scope

Current priority is desktop classroom width around 1440px.

- Desktop layout should not overlap or clip text.
- Existing mobile fallback can remain, but do not redesign around mobile unless requested.
- If a Korean label overflows a pill or card, fix the container or line break instead of shrinking all typography.

## 8. Do / Don't

### Do

- Keep the DLAB logo visible in the top bar.
- Preserve the current two-page flow: week board -> answer workspace.
- Add visual polish through tokens and small component adjustments.
- Use `NeoDunggeunmo` as a small classroom/game accent.
- Keep text readable for middle/high school students.

### Don't

- Do not introduce React, Tailwind, npm, or a build step.
- Do not copy MongoDB/Spotify/etc. brand systems into this site.
- Do not change backend/API contracts while touching visual design.
- Do not make body text or answer writing use the pixel font.
- Do not add dark sections, hard corners, multiple shadows, or browser-default link blue.
