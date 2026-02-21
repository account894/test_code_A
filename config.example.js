/**
 * config.example.js — 설정 파일 템플릿
 * =============================================
 * 사용 방법:
 *   1. 이 파일을 복사합니다
 *   2. 파일명을 config.js 로 변경합니다
 *   3. 아래 YOUR_... 값을 실제 값으로 교체합니다
 *   4. config.js 는 .gitignore 에 등록되어 있어 Git에 추적되지 않습니다.
 *
 *   cp config.example.js config.js
 * =============================================
 * ⚠️  보안 주의: config.js 를 GitHub 공개 저장소에 절대 커밋하지 마세요.
 */
const APP_CONFIG = Object.freeze({

    // ── Google Sheets ──────────────────────────────────
    // 견적/DB 데이터가 있는 구글 시트 ID
    // URL: https://docs.google.com/spreadsheets/d/<여기>/edit
    GOOGLE_SHEETS_ID: 'YOUR_GOOGLE_SHEETS_ID_HERE',

    // Opensheet API 엔드포인트 (변경 불필요)
    OPENSHEET_API_BASE: 'https://opensheet.elk.sh',

    // LME 원자재 시세 시트 ID
    LME_SHEET_ID: 'YOUR_LME_SHEET_ID_HERE',
    LME_SHEET_NAME: 'LME',

    // 품셈 계산기 시트 ID
    PUMSUM_SHEET_ID: 'YOUR_PUMSUM_SHEET_ID_HERE',
    PUMSUM_SHEET_NAME: 'Table종합',

    // ── 환율 API ───────────────────────────────────────
    // 무료 환율 API (변경 불필요)
    EXCHANGE_RATE_API: 'https://open.er-api.com/v6/latest/USD',

    // ── Gemini AI 분석 ─────────────────────────────────
    // Google AI Studio → https://aistudio.google.com/app/apikey
    GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE',

    // ── n8n Webhook ────────────────────────────────────
    // 알림 시스템용 n8n Webhook URL
    N8N_NOTIFICATION_WEBHOOK: 'YOUR_N8N_WEBHOOK_URL_HERE',

    // ── 관리자 ─────────────────────────────────────────
    // 초기 관리자 비밀번호 (첫 로그인 후 반드시 변경하세요)
    DEFAULT_ADMIN_PASSWORD: 'CHANGE_ME',

});
