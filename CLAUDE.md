# Project Guidelines

## Project Structure

- HTML, CSS, JavaScript files are maintained separately — do not inline styles or scripts.
  - `index.html` — markup only
  - `style.css` — all styling
  - `script.js` — all logic

## CSS Rules

- Use CSS custom properties (`--variable-name`) for colors, spacing, font sizes, and other reusable values.
- Define variables in `:root` for global access.
- Avoid hardcoded magic numbers — extract repeated values into variables.

## JavaScript Rules

- Write clean, modular code using ES Modules (`import`/`export`) or the revealing module pattern.
- Keep functions small and single-purpose.
- Avoid polluting the global scope — use `const`/`let`, never `var`.
- Use descriptive names for variables and functions.

## Security Expert Agent

- All security data must be processed according to the **NVD (National Vulnerability Database) API v2.0** specification.
  - Use the `/cves/2.0` endpoint for CVE queries.
  - Parse response fields (`cve.id`, `cve.metrics.cvssMetricV31`, `cve.descriptions`, etc.) per the official schema.
- Severity is visually distinguished by **CVSS score** using the following color mapping:
  - **Critical** (9.0–10.0) → Red (`--severity-critical: #dc2626`)
  - **High** (7.0–8.9) → Orange (`--severity-high: #ea580c`)
  - **Medium** (4.0–6.9) → Yellow (`--severity-medium: #ca8a04`)
  - **Low** (0.1–3.9) → Blue (`--severity-low: #2563eb`)
- Every API call must include proper **loading state** and **error handling** reflected in the UI:
  - Show a spinner or skeleton placeholder while data is being fetched.
  - Display a user-friendly error message on failure (network error, timeout, invalid response).
  - Never leave the UI in a blank or broken state — always fall back to a clear status message.

## Security Guidelines (API Key Leak Prevention)

### File-Level Rules
- **Never hardcode** API keys, Sheet IDs, passwords, webhook URLs, or any credentials in `script.js` or `index.html`.
- All sensitive values must live in `config.js`, which is **excluded from Git** via `.gitignore`.
- Provide `config.example.js` with placeholder values (`YOUR_..._HERE`) so collaborators know what to configure.

### Code-Level Rules
- Reference secrets only through the `APP_CONFIG` constant (e.g., `APP_CONFIG.GOOGLE_SHEETS_ID`).
- Never log, `alert()`, or display raw secret values in the UI — mask or omit them.
- When changing passwords, never echo the new value back to the user.

### API Error Monitoring
- All `fetch()` calls must check the HTTP status code and route errors through `SecurityMonitor.handleApiError()`.
- **401/403** responses trigger a red danger alert — treat as potential unauthorized key usage.
- **429** responses trigger an amber warning — may indicate key abuse or scraping.
- The dashboard displays a real-time security traffic light (green/amber/red) via the `SecurityMonitor` module.

### Git & Deployment
- `.gitignore` must always include: `config.js`, `.env`, `.env.*`.
- Before every commit, verify no secrets appear in staged files (`git diff --cached`).
- Never commit `localStorage` dumps, console exports, or debug logs containing credentials.

## Admin Settings Module (`AdminSettings`)

- The admin settings tab uses the `AdminSettings` IIFE module in `script.js`.
- **Webhook URLs** are stored as an **array** (`n8nConfig.webhooks`), not individual fields.
  - Each entry has `{ type: 'add' | 'update' | 'delete' | 'custom', url: string }`.
  - The UI renders dynamic rows: users can add/remove URLs freely.
  - Backward-compatible: `webhookAdd`, `webhookUpdate`, `webhookDelete` keys are still written on save for legacy code paths.
- **Auto-migration**: `AdminSettings.load()` converts old single-field configs to the new array format automatically.
- **UI structure** follows grouped card layout with three sections in priority order:
  1. Data Connection (Google Sheets ID, auto-sync)
  2. Webhook URL Management (dynamic list)
  3. Security (password change)
- All styles use CSS variables prefixed with `--settings-*`.

## General

- Keep files focused — one responsibility per file.
- Use semantic HTML elements.
- Ensure the project works without a build step (vanilla HTML/CSS/JS).

---

## 서브 에이전트 체제 (Sub-Agent System)

> 모든 코드 수정 작업은 아래 3단계 에이전트 파이프라인을 거친다.

### 에이전트 A — Architect (설계자)

- **역할**: 전체 시스템 설계 관리자
- 파일 구조와 데이터 흐름을 총괄하며, 수정 요청이 들어오면 **기존 설계**(건설 뉴스 및 LME 데이터 수집 등)를 벗어나지 않는지 사전 검증한다.
- 수정 범위(scope)를 명확히 정의하고, Developer에게 **최소 수정 단위**를 지시한다.
- 새로운 파일 추가나 구조 변경이 필요한 경우 반드시 Architect가 승인한다.

### 에이전트 B — Developer (개발자)

- **역할**: 코드 수정 수행자
- Architect가 정의한 범위 내에서만 코드를 수정한다.
- **원본 코드 보존 최우선** — 요청된 기능만 최소 단위로 변경하며, 관련 없는 코드를 리팩터링하거나 개선하지 않는다.
- 수정 전후 변경점을 명확히 기록한다 (diff 수준 설명).

### 에이전트 C — Reviewer (검수자)

- **역할**: 변경 사항 최종 검증자
- Developer가 수정한 내용이 **요청 외의 다른 로직을 건드렸는지** 확인한다.
- 기존 기능 회귀(regression) 여부를 점검한다.
- 문제가 없으면 최종 반영을 승인하고, 문제가 발견되면 Developer에게 수정을 요청한다.

### 작업 흐름 (Workflow)

```
요청 접수 → [A] 설계 검증 & 범위 정의
         → [B] 최소 단위 코드 수정
         → [C] 변경점 검수 & 승인/반려
         → 최종 반영 + 진행 상황 테이블 업데이트
```

### 규칙

1. **범위 밖 수정 금지** — 요청에 명시되지 않은 파일이나 함수는 절대 수정하지 않는다.
2. **단계 건너뛰기 금지** — A→B→C 순서를 반드시 지킨다. Reviewer 승인 없이 코드가 반영되지 않는다.
3. **변경 로그 필수** — 모든 수정은 아래 진행 상황 테이블에 기록한다.
4. **원본 보존 우선** — 동작하는 코드를 불필요하게 변경하지 않는다.

---

## 진행 상황

> 이 섹션은 파일 수정 작업 후 자동으로 최신화됩니다.

| 날짜 | 수정 파일 | 작업 내용 | 다음 단계 |
|------|-----------|-----------|-----------|
| 2026-02-14 | `CLAUDE.md` | 진행 상황 추적 섹션 추가 | - |
| 2026-02-14 | `script.js`, `index.html`, `style.css` | DB 검색탭: ① 전용 시트 "DB더보기"에서 독립 데이터 로드 ② 코드필터 수동/자동 토글 추가 — 수동 시 자유 텍스트 입력 검색 | - |
| 2026-02-14 | `script.js`, `index.html` | DB 검색탭: ① 코드필터 G열 기준으로 변경 ② +추가 검색어 필드 추가 (AND 검색) ③ 테이블에 코드(G열) 컬럼 추가 ④ 빈 결과 시 "일치하는 항목 없음" 표시 | - |
| 2026-02-14 | `script.js`, `index.html`, `style.css` | DB 검색탭: ① 가상 스크롤(Virtual Scroll) 적용 — 화면 보이는 행만 렌더링 ② 행 클릭 시 재료비,노무비 클립보드 자동 복사 + 토스트 ③ 이벤트 위임(Event Delegation) 방식 적용 | - |
| 2026-02-14 | `script.js` | 자동 검색 모드에 디바운스(800ms) 적용 — 타이핑 멈춘 후 0.8초 뒤 검색 실행 | 브라우저 테스트 |
| 2026-02-15 | `index.html`, `style.css`, `main.js`, `config.js`, `config.example.js` | one.html 시장 대시보드를 기존 프로젝트에 통합: ① 소스 분리(HTML/CSS/JS) ② max-w-7xl 레이아웃 + gap-8 확장 ③ API키 config.js 분리 ④ 원자재/환율 카드 클릭 시 상세 대시보드 전환 ⑤ one.html 삭제 | - |
| 2026-02-15 | `main.js`, `index.html`, `script.js` | 원자재 대시보드 점검: ① 구글 시트 CSV URL 검증 + fallback URL 추가 ② 상세 에러 로깅(헤더/행별 파싱 상태) ③ 대시보드 개요 카드를 그래프→6개 원자재 카드(등락 표시)로 교체 ④ 타이틀 "주요자재→원자재 단가 추이" 수정 | 브라우저 테스트 |
| 2026-02-16 | `script.js`, `index.html` | DB 업데이트 탭 one.html 원본 이식: ① `sendToN8n` 한글 키 매핑 payload + lookup/oldData 지원 ② `getWebhookUrl` 헬퍼 (배열+레거시 호환) ③ `updateCategoryOptions` 독립 함수 ④ `renderDBTable` realIdx 기반 인덱스 버그 수정 + 규격 검색 ⑤ `updateDBItem` oldItem 보존 + autoSync 연동 ⑥ `addNewItem` 3필드 필수 검증 + 폼 초기화 ⑦ `checkDeleteAll` 개별 순차 삭제 + n8n 동기화 ⑧ `importDBFromExcel` XLSX 라이브러리 + 중복체크 ⑨ `exportDBToExcel` XLSX .xlsx 생성 ⑩ UI 아이콘/레이아웃 one.html 동일 복원 | 브라우저 테스트 |
| 2026-02-16 | `main.js` | LME 원자재 데이터 로딩 수정: ① 3단계 페치 전략 (opensheet JSON → gviz CSV → export CSV) ② `parseOpenSheetJson()` 신규 추가 (한글/영문 헤더 + 위치 기반 폴백) ③ `parseSheetCsv()` 헤더 자동 감지 + HTML 응답 가드 ④ 전체 실패 시 `FALLBACK_LME_DATA` 예비 데이터 자동 적용 ⑤ `renderOverviewCards` fallback 표시 배지 + "다시 시도" 버튼 ⑥ `fetchOverviewData` fallback 상태 시 재시도 허용 | 브라우저 테스트 |
| 2026-02-16 | `main.js`, `style.css` | 정보마당 자재단가·노임 카드 신규 연동: ① `fetchMultipleSheets()` 4개 시트(파이프/전선관/밸브/정부노임) 병렬 fetch ② `parseSheetRow()` A~D열 한글 헤더 자동 매핑 ③ `renderTopMovers()` 등락액 기준 상승·하락 Top 3 렌더링 ④ `renderLaborTable()` 정부노임 직종·단가·변동 테이블 렌더링 ⑤ `fetchOverviewData()`에서 자동 호출 ⑥ Top Mover 행 hover/CSS + 노임 테이블 스크롤 스타일 추가 | 브라우저 테스트 |
| 2026-02-16 | `index.html`, `style.css`, `script.js` | 알림 시스템 v2 교체: ① 벨 아이콘을 `#notificationContainer` 래퍼 + `animate-ping` 빨간 배지로 교체 ② 드롭다운에 알림함 헤더 + 리스트 + 새로고침 버튼 구조 ③ 이전 알림 CSS 전면 제거 → `dropdownFadeIn` 애니메이션 + `notification-item` hover 스타일로 교체 ④ 이전 `NotificationSystem` 전면 제거 → `DOMContentLoaded` 기반 init + `WEBHOOK_URL` 플레이스홀더 + `updateUI` 통합 렌더링으로 교체 | n8n 웹훅 URL 설정 후 테스트 |
| 2026-02-21 | `config.js`, `config.example.js`, `main.js`, `script.js` | 품셈계산기 동기화 및 AI 분석 수정: ① `config.js`에 `PUMSUM_SHEET_ID`·`PUMSUM_SHEET_NAME` 추가 ② `config.example.js` 따옴표 누락 문법 오류 수정 + 품셈 플레이스홀더 추가 ③ `main.js` Gemini 모델 `gemini-2.5-flash-preview-09-2025` → `gemini-2.0-flash` 변경 (만료 모델) ④ `script.js`에 `syncPumsumData()` 함수 신규 구현 (opensheet API 연동, 로딩/에러 상태 UI 포함) ⑤ `exportPumsumToExcel()` 함수 신규 구현 (XLSX 다운로드) | 브라우저 테스트 |
| 2026-02-21 | `main.js` | AI 분석 429 Rate-Limit 대응: ① `fetchWithRetry` 헬퍼 추가 (429 시 2초 간격 최대 2회 재시도) ② Google Search Grounding 429 지속 시 Grounding 없는 기본 모드로 자동 폴백 ③ 오류 응답에서 상세 메시지 파싱(`errBody.error.message`) ④ 429·400 전용 한국어 안내 메시지 UI 출력 | - |
| 2026-02-21 | `index.html`, `style.css`, `script.js` | 자유게시판 통합: ① 홈화면 자유게시판 버튼 `switchMainView('board')` 연결 ② `view-board` 독립 뷰 섹션 추가 (홈 돌아가기 버튼 포함) ③ 글쓰기 모달(`boardWriteModal`) + 상세보기/댓글 모달(`boardDetailModal`) 추가 ④ `style.css`에 게시판 전용 CSS 변수·클래스 추가 (`post-card`, `badge-*`, `board-tab-btn`, `board-modal-scroll`) ⑤ `script.js`에 `Board` IIFE 모듈 추가 (카테고리 필터·검색·글쓰기·댓글·상세보기 포함) ⑥ `switchMainView()` board 케이스 추가 및 전체 뷰 토글 리팩터링 | 브라우저 테스트 |
