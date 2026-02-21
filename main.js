/* =========================================
   main.js — 시장 데이터 대시보드 모듈
   (환율 · 원자재 · AI 분석)
   ========================================= */

const MarketDashboard = (() => {
    'use strict';

    // === CONSTANTS ===
    const API_BASE = 'https://api.frankfurter.app';
    const MATERIAL_INFO = {
        'Cu': { name: '구리', symbol: 'Cu', icon: 'ph-lightning', color: '#ea580c' },
        'Al': { name: '알루미늄', symbol: 'Al', icon: 'ph-wind', color: '#0284c7' },
        'Zn': { name: '아연', symbol: 'Zn', icon: 'ph-shield-check', color: '#6d28d9' },
        'Pb': { name: '납', symbol: 'Pb', icon: 'ph-battery-full', color: '#64748b' },
        'Ni': { name: '니켈', symbol: 'Ni', icon: 'ph-gear', color: '#059669' },
        'Sn': { name: '주석', symbol: 'Sn', icon: 'ph-drop', color: '#b45309' }
    };
    const MATERIAL_USAGE = {
        'Cu': '전선, 배관, 코일',
        'Al': '덕트, 창호, 경량구조',
        'Zn': '도금강판, 부식방지',
        'Pb': '배관, 차폐, 배터리',
        'Ni': '스테인리스강 합금',
        'Sn': '솔더링, 도금'
    };

    // === FALLBACK DATA (모든 데이터 소스 실패 시 사용) ===
    const FALLBACK_LME_DATA = [
        { date: '2026.02.11', Cu: 13327, Al: 3098, Zn: 3437, Pb: 1938.5, Ni: 17720, Sn: 50350 },
        { date: '2026.02.12', Cu: 13172, Al: 3117, Zn: 3396, Pb: 1949,   Ni: 17465, Sn: 49500 },
        { date: '2026.02.10', Cu: 13002, Al: 3063, Zn: 3342, Pb: 1910.5, Ni: 16980, Sn: 47975 },
        { date: '2026.02.09', Cu: 12980, Al: 3083.5, Zn: 3325.5, Pb: 1903, Ni: 17050, Sn: 48110 },
        { date: '2026.02.06', Cu: 12840, Al: 3045, Zn: 3290, Pb: 1906, Ni: 16800, Sn: 45845 },
        { date: '2026.02.05', Cu: 12822, Al: 3014, Zn: 3255, Pb: 1904, Ni: 16680, Sn: 46700 },
        { date: '2026.02.04', Cu: 13247, Al: 3047.5, Zn: 3333.5, Pb: 1910, Ni: 17220, Sn: 48300 },
        { date: '2026.02.03', Cu: 13295, Al: 3103, Zn: 3290, Pb: 1934, Ni: 17175, Sn: 48600 },
    ];
    let usingFallback = false;

    // === 자재·노임 시트 이름 ===
    const MATERIAL_SHEETS = ['파이프', '밸브', '이음'];
    const LABOR_SHEET = '정부노임';

    // === 자재 분류 메타 (사이드바 표시용) ===
    const SHEET_META = {
        '파이프': { icon: 'ph-fill ph-minus',       sub: '배관 파이프',  color: 'text-blue-600',   iconBg: 'bg-blue-50'   },
        '밸브':   { icon: 'ph-fill ph-gear-six',     sub: '개폐 장치',    color: 'text-emerald-600', iconBg: 'bg-emerald-50' },
        '이음':   { icon: 'ph-fill ph-link-simple',  sub: '연결 이음쇠',  color: 'text-violet-600',  iconBg: 'bg-violet-50'  }
    };

    // === STATE ===
    let currentTab = 'currency';
    let materialViewMode = 30;
    let currencyChartInstance = null;
    let materialChartInstance = null;
    let currencyData = { rates: {}, history: [] };
    let materialData = { raw: [], processed: {} };
    let initialized = false;
    let overviewRendered = false;
    let topMoversData = [];
    let laborData = [];
    let materialDetailCache = {};

    // === HELPERS ===
    function $(id) { return document.getElementById(id); }

    /**
     * 데이터 소스 URL 생성 헬퍼
     */
    function getOpenSheetUrl() {
        return `${APP_CONFIG.OPENSHEET_API_BASE}/${APP_CONFIG.LME_SHEET_ID}/${encodeURIComponent(APP_CONFIG.LME_SHEET_NAME)}`;
    }

    function getSheetCsvUrl() {
        const sheetId = APP_CONFIG.LME_SHEET_ID;
        const sheetName = APP_CONFIG.LME_SHEET_NAME;
        return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    }

    function getSheetExportUrl() {
        const sheetId = APP_CONFIG.LME_SHEET_ID;
        return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&sheet=${encodeURIComponent(APP_CONFIG.LME_SHEET_NAME)}`;
    }

    // === TAB SWITCHING ===
    function switchTab(tabName) {
        currentTab = tabName;

        const currencySection = $('mktCurrencySection');
        const commoditySection = $('mktCommoditySection');
        const tabCurrency = $('mktTabCurrency');
        const tabCommodity = $('mktTabCommodity');

        if (tabName === 'currency') {
            currencySection.classList.remove('hidden');
            commoditySection.classList.add('hidden');
            tabCurrency.className = 'mkt-tab-active px-6 py-3 transition-colors hover:text-blue-600 flex items-center gap-2';
            tabCommodity.className = 'mkt-tab-inactive px-6 py-3 transition-colors hover:text-blue-600 flex items-center gap-2';
            $('mktLastUpdated').innerText = new Date().toLocaleString('ko-KR');
        } else {
            currencySection.classList.add('hidden');
            commoditySection.classList.remove('hidden');
            tabCurrency.className = 'mkt-tab-inactive px-6 py-3 transition-colors hover:text-blue-600 flex items-center gap-2';
            tabCommodity.className = 'mkt-tab-active px-6 py-3 transition-colors hover:text-blue-600 flex items-center gap-2';
            if (materialChartInstance) materialChartInstance.resize();
            updateMaterialUI();
            updateLastUpdatedForMaterial();
        }
    }

    // ================= CURRENCY LOGIC =================

    async function fetchCurrencyData() {
        const base = $('mktBaseCurrency').value;
        const target = $('mktTargetCurrency').value;
        const statusBadge = $('mktChangeBadge');

        statusBadge.innerText = '로딩 중...';
        if (currentTab === 'currency') {
            $('mktLastUpdated').innerText = new Date().toLocaleString('ko-KR');
        }

        try {
            const latestRes = await fetch(`${API_BASE}/latest?from=${base}`);
            if (!latestRes.ok) {
                const err = new Error(`HTTP ${latestRes.status}`);
                err.status = latestRes.status;
                throw err;
            }
            const latestData = await latestRes.json();
            currencyData.rates = latestData.rates;

            const endDate = new Date().toISOString().split('T')[0];
            const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            const historyRes = await fetch(`${API_BASE}/${startDate}..${endDate}?from=${base}&to=${target}`);
            if (!historyRes.ok) throw new Error('History API failed');
            const historyData = await historyRes.json();

            currencyData.history = Object.entries(historyData.rates).map(([date, val]) => ({
                date: date.slice(5),
                rate: val[target]
            }));

            updateCurrencyUI(base, target);
        } catch (err) {
            console.warn('Currency API failed', err);
            statusBadge.innerText = '데이터 로드 실패';
            if (typeof SecurityMonitor !== 'undefined') {
                SecurityMonitor.handleApiError('Frankfurter (환율)', err.status || 0, err.message);
            }
        }
    }

    function updateCurrencyUI(base, target) {
        $('mktChartTitle').innerText = `${base}/${target} 30일 추이`;
        $('mktDisplayCurrency').innerText = target;
        updateCurrencyFluctuation(target);
        renderChart('mktRateChart', currencyData.history, 'currency');
        calculateConversion();
        renderCurrencyTable(base);
    }

    function updateCurrencyFluctuation(target) {
        let current = 0;
        let prev = 0;
        if (currencyData.history.length >= 2) {
            current = currencyData.history[currencyData.history.length - 1].rate;
            prev = currencyData.history[currencyData.history.length - 2].rate;
        } else if (currencyData.rates[target]) {
            current = currencyData.rates[target];
            prev = current;
        }

        $('mktDisplayRate').innerText = current.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        renderFluctuationUI('mktFluctuation', current, prev);
    }

    function calculateConversion() {
        const amount = parseFloat($('mktAmountInput').value) || 0;
        const target = $('mktTargetCurrency').value;
        const rate = currencyData.rates[target] || (currencyData.history.length > 0 ? currencyData.history[currencyData.history.length - 1].rate : 0);
        $('mktConvertedResult').innerText = (amount * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function renderCurrencyTable(base) {
        const tbody = $('mktRatesTableBody');
        tbody.innerHTML = '';
        const majors = ['USD', 'EUR', 'JPY', 'GBP', 'CNY', 'KRW'];

        majors.forEach(curr => {
            if (curr === base) return;
            const rate = currencyData.rates[curr];
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50 transition-colors';
            tr.innerHTML = `
                <td class="px-6 py-4 font-bold text-slate-700">${curr}</td>
                <td class="px-6 py-4 font-mono font-medium">${rate ? rate.toFixed(4) : '-'}</td>
                <td class="px-6 py-4 text-xs text-slate-400"><span class="bg-blue-50 text-blue-600 px-2 py-1 rounded">ECB Official</span></td>
                <td class="px-6 py-4">
                    <button class="mkt-analyze-btn text-xs font-semibold text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-400 px-3 py-1 rounded-full transition-all" data-currency="${curr}">분석</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        tbody.onclick = (e) => {
            const btn = e.target.closest('.mkt-analyze-btn');
            if (!btn) return;
            $('mktTargetCurrency').value = btn.dataset.currency;
            fetchCurrencyData();
        };
    }

    // ================= COMMODITY LOGIC =================

    /**
     * LME 원자재 데이터 로드
     * 전략: ① opensheet JSON (CORS 안전) → ② gviz CSV → ③ export CSV
     * 시트 구조: A열=날짜, B=Cu, C=Al, D=Zn, E=Pb, F=Ni, G=Sn
     */
    async function fetchMaterialData() {
        console.log('[LME] 데이터 로드 시작');
        console.log('[LME] Sheet ID:', APP_CONFIG.LME_SHEET_ID);
        console.log('[LME] Sheet Name:', APP_CONFIG.LME_SHEET_NAME);

        const sources = [
            { name: 'opensheet', url: getOpenSheetUrl(), type: 'json' },
            { name: 'gviz-csv',  url: getSheetCsvUrl(),  type: 'csv'  },
            { name: 'export-csv', url: getSheetExportUrl(), type: 'csv' }
        ];

        let rawData = [];
        let lastError = null;

        for (const source of sources) {
            try {
                console.log(`[LME] ${source.name} 시도:`, source.url);
                const response = await fetch(source.url);
                console.log(`[LME] ${source.name} 응답:`, response.status, response.statusText);

                if (!response.ok) {
                    const err = new Error(`HTTP ${response.status}: ${response.statusText}`);
                    err.status = response.status;
                    throw err;
                }

                if (source.type === 'json') {
                    const jsonData = await response.json();
                    console.log(`[LME] ${source.name} JSON 수신: ${jsonData.length}건`);
                    rawData = parseOpenSheetJson(jsonData);
                } else {
                    const csvText = await response.text();
                    console.log(`[LME] ${source.name} CSV 수신: ${csvText.length} bytes`);
                    console.log('[LME] CSV 첫 2줄:\n', csvText.split('\n').slice(0, 2).join('\n'));
                    rawData = parseSheetCsv(csvText);
                }

                if (rawData.length > 0) {
                    console.log(`[LME] ${source.name} 성공: ${rawData.length}건 파싱 완료`);
                    break;  // 성공하면 루프 탈출
                }
                console.warn(`[LME] ${source.name} 파싱 결과 0건, 다음 소스 시도`);
            } catch (err) {
                console.warn(`[LME] ${source.name} 실패:`, err.message);
                lastError = err;
            }
        }

        if (rawData.length === 0) {
            console.warn('[LME] 모든 소스 실패 → Fallback 예비 데이터 적용');
            rawData = FALLBACK_LME_DATA.map(d => ({ ...d }));
            usingFallback = true;
        } else {
            usingFallback = false;
        }

        // 날짜순 정렬 (오래된 것부터 — 차트용)
        rawData.sort((a, b) => {
            const dateA = a.date.replace(/[.\-\s]/g, '');
            const dateB = b.date.replace(/[.\-\s]/g, '');
            return dateA.localeCompare(dateB);
        });

        materialData.raw = rawData;
        processMaterialData();
        updateMaterialUI();
        renderOverviewCards();
    }

    /**
     * opensheet JSON 응답을 파싱하여 원자재 데이터 배열 반환
     * 시트에 헤더가 있는 경우: [{ "날짜": "2026.02.12", "Cu": "13172", ... }]
     * 시트에 헤더가 없는 경우: [{ "undefined": "49500" }] (불량) → 빈 배열 반환
     */
    function parseOpenSheetJson(jsonData) {
        if (!Array.isArray(jsonData) || jsonData.length === 0) return [];

        const firstObj = jsonData[0];
        const keys = Object.keys(firstObj);

        // 헤더 없는 시트 감지: 키가 "undefined" 하나뿐이면 파싱 불가
        if (keys.length === 1 && keys[0] === 'undefined') {
            console.warn('[LME] opensheet: 헤더 없는 시트 감지 (undefined 키), CSV 폴백 필요');
            return [];
        }

        // 키 매핑: 한글/영문 헤더 모두 지원
        const dateKey = keys.find(k => /날짜|date|일자/i.test(k)) || keys[0];
        const matKeys = ['Cu', 'Al', 'Zn', 'Pb', 'Ni', 'Sn'];
        const keyMap = {};

        matKeys.forEach(mat => {
            const found = keys.find(k => k === mat || k.toLowerCase() === mat.toLowerCase());
            if (found) keyMap[mat] = found;
        });

        // 매핑 실패 시 위치 기반 폴백 (컬럼 순서: 날짜, Cu, Al, Zn, Pb, Ni, Sn)
        if (Object.keys(keyMap).length < 6 && keys.length >= 7) {
            console.log('[LME] opensheet: 키 매핑 실패, 위치 기반 폴백');
            matKeys.forEach((mat, i) => { keyMap[mat] = keys[i + 1]; });
        }

        console.log('[LME] opensheet 키 매핑:', { dateKey, ...keyMap });

        const rawData = [];
        jsonData.forEach((row, i) => {
            const dateStr = normalizeDate(String(row[dateKey] || ''));
            if (!dateStr) return;

            const entry = { date: dateStr };
            let allZero = true;
            matKeys.forEach(mat => {
                const val = parseNumber(String(row[keyMap[mat]] || '0'));
                entry[mat] = val;
                if (val !== 0) allZero = false;
            });

            if (allZero) {
                console.warn(`[LME] opensheet 행 ${i + 1}: 모든 값 0, 건너뜀`);
                return;
            }
            rawData.push(entry);
        });

        return rawData;
    }

    /**
     * CSV 텍스트를 파싱하여 원자재 데이터 배열 반환
     * 시트 구조: A=날짜, B=Cu, C=Al, D=Zn, E=Pb, F=Ni, G=Sn
     * 헤더 자동 감지: 첫 행의 첫 셀이 날짜 형식이면 데이터로 처리
     */
    function parseSheetCsv(csvText) {
        const lines = csvText.split('\n');
        const rawData = [];
        if (lines.length === 0) return rawData;

        // HTML 응답 가드: CSV 대신 HTML(에러 페이지, 로그인 페이지)이 반환된 경우
        const trimmedFirst = csvText.trimStart();
        if (trimmedFirst.startsWith('<!') || trimmedFirst.startsWith('<html') || trimmedFirst.startsWith('<HTML')) {
            console.warn('[LME] CSV 대신 HTML 응답 감지, 파싱 중단');
            return rawData;
        }

        // 헤더 자동 감지: 첫 행의 첫 셀이 날짜 패턴이면 헤더가 아님
        const firstValues = parseCSVLine(lines[0].trim());
        const firstCell = (firstValues[0] || '').replace(/"/g, '').trim();
        const isDatePattern = /^\d{4}[.\-/]/.test(firstCell) || /^Date\(/i.test(firstCell);
        const startRow = isDatePattern ? 0 : 1;

        console.log('[LME] CSV 첫 셀:', JSON.stringify(firstCell), '→ 헤더 여부:', !isDatePattern, '→ 시작 행:', startRow);

        for (let i = startRow; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const values = parseCSVLine(line);

            if (values.length < 7) {
                console.warn(`[LME] 행 ${i + 1}: 컬럼 수 부족 (${values.length}/7), 건너뜀:`, line.substring(0, 100));
                continue;
            }

            const dateStr = normalizeDate(values[0]);
            const cu = parseNumber(values[1]);
            const al = parseNumber(values[2]);
            const zn = parseNumber(values[3]);
            const pb = parseNumber(values[4]);
            const ni = parseNumber(values[5]);
            const sn = parseNumber(values[6]);

            if (!dateStr) {
                console.warn(`[LME] 행 ${i + 1}: 날짜 비어 있음, 건너뜀`);
                continue;
            }

            if (cu === 0 && al === 0 && zn === 0 && pb === 0 && ni === 0 && sn === 0) {
                console.warn(`[LME] 행 ${i + 1}: 모든 값 0, 건너뜀 (날짜: ${dateStr})`);
                continue;
            }

            rawData.push({ date: dateStr, Cu: cu, Al: al, Zn: zn, Pb: pb, Ni: ni, Sn: sn });
        }

        return rawData;
    }

    /**
     * 날짜 문자열 정규화
     * - gviz 포맷: "Date(2026,1,15)" → "2026.02.15" (month는 0-indexed)
     * - 일반 포맷: "2026-02-15", "2026.02.15", "2026/02/15" 등 → "YYYY.MM.DD"
     */
    function normalizeDate(raw) {
        const cleaned = raw.replace(/"/g, '').trim();

        // gviz Date() 포맷: Date(year, month, day) — month 0-indexed
        const gvizMatch = cleaned.match(/^Date\((\d+),\s*(\d+),\s*(\d+)\)$/i);
        if (gvizMatch) {
            const y = gvizMatch[1];
            const m = String(Number(gvizMatch[2]) + 1).padStart(2, '0');
            const d = String(Number(gvizMatch[3])).padStart(2, '0');
            return `${y}.${m}.${d}`;
        }

        // 일반 날짜 포맷 → YYYY.MM.DD 통일
        const parts = cleaned.split(/[-./\s]+/);
        if (parts.length >= 3) {
            const y = parts[0];
            const m = parts[1].padStart(2, '0');
            const d = parts[2].padStart(2, '0');
            return `${y}.${m}.${d}`;
        }

        return cleaned;
    }

    /**
     * 숫자 파싱 — 쉼표, 공백, 따옴표 제거 후 변환
     */
    function parseNumber(raw) {
        const cleaned = raw.replace(/"/g, '').replace(/,/g, '').replace(/\s/g, '').trim();
        const num = parseFloat(cleaned);
        return isNaN(num) ? 0 : num;
    }

    function parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') { inQuotes = !inQuotes; }
            else if (char === ',' && !inQuotes) { result.push(current); current = ''; }
            else { current += char; }
        }
        result.push(current);
        return result;
    }

    function processMaterialData() {
        Object.keys(MATERIAL_INFO).forEach(mat => {
            materialData.processed[mat] = materialData.raw.map(item => ({
                date: item.date,
                rate: item[mat]
            }));
        });
    }

    function setMaterialViewMode(days) {
        materialViewMode = days;
        const btn7 = $('mktBtn7d');
        const btn30 = $('mktBtn30d');

        if (days === 7) {
            btn7.className = 'flex-1 py-2 px-3 rounded-lg border text-sm transition-all btn-period-active';
            btn30.className = 'flex-1 py-2 px-3 rounded-lg border text-sm transition-all btn-period-inactive';
        } else {
            btn7.className = 'flex-1 py-2 px-3 rounded-lg border text-sm transition-all btn-period-inactive';
            btn30.className = 'flex-1 py-2 px-3 rounded-lg border text-sm transition-all btn-period-active';
        }
        updateMaterialUI();
    }

    function updateMaterialUI() {
        if (!materialData.raw || materialData.raw.length === 0) return;

        const selectEl = $('mktMaterialSelect');
        if (!selectEl) return;
        const selectedMat = selectEl.value;
        const fullHistory = materialData.processed[selectedMat] || [];

        if (fullHistory.length === 0) return;

        const history = fullHistory.slice(-materialViewMode);
        const chartHistory = history.map(item => {
            let displayDate = item.date;
            if (item.date.includes('.') || item.date.includes('-')) {
                const parts = item.date.split(/[.-]/);
                if (parts.length >= 3) {
                    displayDate = `${parts[1]}.${parts[2]}`;
                }
            }
            return { date: displayDate, rate: item.rate };
        });

        $('mktMatChartTitle').innerText = `${MATERIAL_INFO[selectedMat].name} (${selectedMat}) - 최근 ${materialViewMode}일`;

        if (fullHistory.length >= 2) {
            const latestPrice = fullHistory[fullHistory.length - 1].rate;
            const prevPrice = fullHistory[fullHistory.length - 2].rate;

            $('mktMatPrice').innerText = latestPrice.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
            renderFluctuationUI('mktMatFluctuation', latestPrice, prevPrice);
        }

        renderChart('mktMatChart', chartHistory, 'material');
        renderMaterialTable();
        updateLastUpdatedForMaterial();
    }

    function updateLastUpdatedForMaterial() {
        if (currentTab === 'commodity' && materialData.raw.length > 0) {
            const latestDate = materialData.raw[materialData.raw.length - 1].date;
            $('mktLastUpdated').innerText = `${latestDate} (구글시트 기준)`;
        }
    }

    function renderMaterialTable() {
        const tbody = $('mktMatTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';

        if (!materialData.raw || materialData.raw.length === 0) return;

        Object.keys(MATERIAL_INFO).forEach(mat => {
            const info = MATERIAL_INFO[mat];
            const history = materialData.processed[mat];

            if (history.length >= 2) {
                const current = history[history.length - 1].rate;
                const prev = history[history.length - 2].rate;
                const diff = current - prev;
                const diffPercent = (diff / prev) * 100;

                const colorClass = diff >= 0 ? 'text-red-500' : 'text-blue-500';
                const symbol = diff >= 0 ? '▲' : '▼';

                const tr = document.createElement('tr');
                tr.className = 'hover:bg-slate-50 transition-colors';
                tr.innerHTML = `
                    <td class="px-6 py-4 font-bold text-slate-700">${info.name} <span class="text-xs text-slate-400 font-normal">(${mat})</span></td>
                    <td class="px-6 py-4 text-xs text-slate-500">${MATERIAL_USAGE[mat]}</td>
                    <td class="px-6 py-4 font-mono font-medium">$${current.toLocaleString(undefined, {maximumFractionDigits: 1})}</td>
                    <td class="px-6 py-4 text-sm font-bold ${colorClass}">${symbol} ${Math.abs(diffPercent).toFixed(2)}%</td>
                    <td class="px-6 py-4">
                        <button class="mkt-mat-select-btn text-xs font-semibold text-slate-500 hover:text-blue-600 border border-slate-200 hover:border-blue-400 px-3 py-1 rounded-full transition-all" data-mat="${mat}">차트보기</button>
                    </td>
                `;
                tbody.appendChild(tr);
            }
        });

        tbody.onclick = (e) => {
            const btn = e.target.closest('.mkt-mat-select-btn');
            if (!btn) return;
            $('mktMaterialSelect').value = btn.dataset.mat;
            updateMaterialUI();
        };
    }

    // ================= DASHBOARD OVERVIEW CARDS =================

    /**
     * 대시보드 개요에 표시되는 원자재 카드 렌더링
     * materialData가 이미 로드되어 있으면 즉시 렌더, 아니면 fetch 후 렌더
     */
    async function fetchOverviewData() {
        // 실제 데이터가 이미 있으면 렌더만 (fallback 데이터면 재시도 허용)
        if (materialData.raw.length > 0 && !usingFallback) {
            renderOverviewCards();
            return;
        }

        const container = $('overviewMaterialCards');
        if (!container) return;

        // 로딩 표시
        container.innerHTML = `
            <div class="text-center text-gray-400 text-sm py-12 col-span-full">
                <i class="ph-bold ph-spinner animate-spin text-indigo-500 text-xl"></i>
                <p class="mt-2">LME 시세 로딩 중...</p>
            </div>
        `;

        // 데이터 페치 (fetchMaterialData 내부에서 renderOverviewCards 호출)
        await fetchMaterialData();

        // 자재 단가 변동 + 노임단가표 카드 데이터 로드
        fetchAndRenderNewCards();
    }

    /**
     * 원자재 6개 카테고리의 최신 가격/등락을 카드 형태로 렌더
     * - 최신 데이터 = rawData 정렬 후 마지막 항목 (A2 행)
     * - 전일 데이터 = 그 앞 항목 (A3 행)
     */
    function renderOverviewCards() {
        const container = $('overviewMaterialCards');
        if (!container) return;

        if (!materialData.raw || materialData.raw.length < 2) {
            container.innerHTML = `
                <div class="text-center text-gray-400 text-sm py-8 col-span-full">
                    <i class="ph-duotone ph-warning text-amber-400 text-xl"></i>
                    <p class="mt-1">데이터가 부족합니다 (최소 2일치 필요)</p>
                    <button onclick="MarketDashboard.fetchOverviewData()" class="mt-2 text-xs text-indigo-500 hover:text-indigo-700 font-medium">다시 시도</button>
                </div>
            `;
            return;
        }

        // rawData는 날짜 오름차순 정렬됨 → 마지막이 최신
        const latest = materialData.raw[materialData.raw.length - 1];
        const prev = materialData.raw[materialData.raw.length - 2];

        // 업데이트 날짜 표시 + fallback 표시
        const dateEl = $('lmeUpdateDate');
        if (dateEl) {
            dateEl.textContent = latest.date + ' 기준' + (usingFallback ? ' (예비 데이터)' : '');
            dateEl.style.color = usingFallback ? '#ea580c' : '';
        }

        const fragment = document.createDocumentFragment();

        Object.keys(MATERIAL_INFO).forEach(mat => {
            const info = MATERIAL_INFO[mat];
            const currentPrice = latest[mat] || 0;
            const prevPrice = prev[mat] || 0;
            const diff = currentPrice - prevPrice;
            const diffPercent = prevPrice !== 0 ? (diff / prevPrice) * 100 : 0;

            const isUp = diff > 0;
            const isDown = diff < 0;
            const arrow = isUp ? '▲' : isDown ? '▼' : '-';
            const changeColor = isUp ? 'text-red-500' : isDown ? 'text-blue-500' : 'text-gray-400';
            const changeBg = isUp ? 'bg-red-50' : isDown ? 'bg-blue-50' : 'bg-gray-50';

            const card = document.createElement('div');
            card.className = `${changeBg} rounded-xl p-4 border border-gray-100 transition-all hover:shadow-sm`;
            card.innerHTML = `
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-bold text-gray-700">${info.name}</span>
                    <span class="text-xs font-mono text-gray-400 bg-white px-1.5 py-0.5 rounded">${mat}</span>
                </div>
                <div class="text-xl font-bold text-gray-900 mono leading-tight">$${currentPrice.toLocaleString(undefined, { maximumFractionDigits: 1 })}</div>
                <div class="flex items-center gap-1.5 mt-1.5">
                    <span class="text-xs font-bold ${changeColor}">${arrow} ${Math.abs(diffPercent).toFixed(2)}%</span>
                    <span class="text-[11px] text-gray-400">(${isUp ? '+' : ''}${diff.toFixed(1)})</span>
                </div>
            `;
            fragment.appendChild(card);
        });

        container.innerHTML = '';
        container.appendChild(fragment);
        overviewRendered = true;
    }

    /**
     * 개요 카드에 오류 메시지 표시
     */
    function renderOverviewError(message) {
        const container = $('overviewMaterialCards');
        if (!container) return;
        container.innerHTML = `
            <div class="text-center text-red-400 text-sm py-8 col-span-full">
                <i class="ph-duotone ph-warning-circle text-red-400 text-2xl"></i>
                <p class="mt-2 font-medium">LME 시세 로드 실패</p>
                <p class="text-xs text-gray-400 mt-1">${message}</p>
                <button onclick="MarketDashboard.fetchOverviewData()" class="mt-3 text-xs text-indigo-500 hover:text-indigo-700 font-medium bg-indigo-50 px-3 py-1.5 rounded-lg">다시 시도</button>
            </div>
        `;
    }

    // ================= 자재 단가 변동 & 노임단가 =================

    /**
     * 여러 구글 시트 탭을 병렬로 가져온다 (opensheet API)
     * @param {string[]} sheetNames - 시트 탭 이름 배열
     * @returns {Object} { sheetName: [...rows], ... }
     */
    async function fetchMultipleSheets(sheetNames) {
        const sheetId = APP_CONFIG.LME_SHEET_ID;
        const base = APP_CONFIG.OPENSHEET_API_BASE;
        const results = {};

        const promises = sheetNames.map(async (name) => {
            const url = `${base}/${sheetId}/${encodeURIComponent(name)}`;
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    const err = new Error(`HTTP ${res.status}`);
                    err.status = res.status;
                    throw err;
                }
                const json = await res.json();
                results[name] = Array.isArray(json) ? json : [];
                console.log(`[Sheets] ${name}: ${results[name].length}건 로드`);
            } catch (err) {
                console.warn(`[Sheets] ${name} 로드 실패:`, err.message);
                results[name] = [];
                if (typeof SecurityMonitor !== 'undefined') {
                    SecurityMonitor.handleApiError(`Sheet(${name})`, err.status || 0, err.message);
                }
            }
        });

        await Promise.all(promises);
        return results;
    }

    /**
     * 시트 행에서 품명/규격/단가/등락액을 추출하는 헬퍼
     * 헤더 키가 한글이라 정확히 매핑한다
     */
    function parseSheetRow(row, sheetName) {
        const keys = Object.keys(row);
        // 헤더명 무관하게 위치 고정: A(0)=품명, B(1)=규격, C(2)=단가, D(3)=등락
        const name  = (row[keys[0]] || '').trim();
        const spec  = (row[keys[1]] || '').trim();
        const price = parseNumber(String(row[keys[2]] || '0'));
        const raw   = keys.length > 3 ? String(row[keys[3]] || '0') : '0';
        const diff  = parseFloat(raw.replace(/,/g, '').replace(/\s/g, ''));
        return { name, spec, price, diff: isNaN(diff) ? 0 : diff, source: sheetName };
    }

    /**
     * 자재 단가 변동(Top Movers) + 노임단가표 데이터를 가져와 렌더링
     */
    async function fetchAndRenderNewCards() {
        const allSheets = [...MATERIAL_SHEETS, LABOR_SHEET];
        const sheetsData = await fetchMultipleSheets(allSheets);

        // Top Movers: 파이프 + 전선관 + 밸브 통합
        const combined = [];
        MATERIAL_SHEETS.forEach(sheetName => {
            const rows = sheetsData[sheetName] || [];
            rows.forEach(row => {
                const parsed = parseSheetRow(row, sheetName);
                if (parsed.name) combined.push(parsed);
            });
        });
        topMoversData = combined;
        renderTopMovers(combined);

        // 노임단가표: 정부노임
        const laborRows = sheetsData[LABOR_SHEET] || [];
        laborData = laborRows.map(row => parseSheetRow(row, LABOR_SHEET)).filter(r => r.name);
        renderLaborTable(laborData);
    }

    /**
     * 상승폭 상위 3개 + 하락폭 상위 3개를 추출하여 렌더링
     */
    function renderTopMovers(data) {
        const container = $('topMoversContent');
        if (!container) return;

        if (!data || data.length === 0) {
            container.innerHTML = `
                <div class="text-center text-gray-400 text-sm py-8">
                    <i class="ph-duotone ph-warning text-amber-400 text-xl"></i>
                    <p class="mt-1">자재 데이터를 불러올 수 없습니다</p>
                </div>`;
            return;
        }

        // 등락액 기준 정렬
        const sorted = [...data].sort((a, b) => b.diff - a.diff);
        const top3Up = sorted.filter(d => d.diff > 0).slice(0, 3);
        const top3Down = sorted.filter(d => d.diff < 0).sort((a, b) => a.diff - b.diff).slice(0, 3);

        let html = '';

        // 상승 Top 3
        if (top3Up.length > 0) {
            html += `<div class="mb-3"><span class="text-[11px] font-bold text-red-500 uppercase tracking-wider">상승 Top ${top3Up.length}</span></div>`;
            html += '<div class="space-y-2 mb-4">';
            top3Up.forEach(item => {
                html += `
                    <div class="top-mover-row flex items-center justify-between p-2.5 rounded-lg bg-red-50/60 border border-red-100">
                        <div class="flex-1 min-w-0">
                            <div class="text-sm font-bold text-gray-800 truncate">${item.name}</div>
                            <div class="text-[11px] text-gray-400 truncate">${item.spec} · ${item.source}</div>
                        </div>
                        <div class="text-right flex-shrink-0 ml-3">
                            <div class="text-sm font-bold mono text-gray-800">${item.price.toLocaleString()}</div>
                            <div class="text-xs font-bold text-red-500">▲ ${Math.abs(item.diff).toLocaleString()}</div>
                        </div>
                    </div>`;
            });
            html += '</div>';
        }

        // 하락 Top 3
        if (top3Down.length > 0) {
            html += `<div class="mb-3"><span class="text-[11px] font-bold text-blue-500 uppercase tracking-wider">하락 Top ${top3Down.length}</span></div>`;
            html += '<div class="space-y-2">';
            top3Down.forEach(item => {
                html += `
                    <div class="top-mover-row flex items-center justify-between p-2.5 rounded-lg bg-blue-50/60 border border-blue-100">
                        <div class="flex-1 min-w-0">
                            <div class="text-sm font-bold text-gray-800 truncate">${item.name}</div>
                            <div class="text-[11px] text-gray-400 truncate">${item.spec} · ${item.source}</div>
                        </div>
                        <div class="text-right flex-shrink-0 ml-3">
                            <div class="text-sm font-bold mono text-gray-800">${item.price.toLocaleString()}</div>
                            <div class="text-xs font-bold text-blue-500">▼ ${Math.abs(item.diff).toLocaleString()}</div>
                        </div>
                    </div>`;
            });
            html += '</div>';
        }

        if (top3Up.length === 0 && top3Down.length === 0) {
            html = `
                <div class="text-center text-gray-400 text-sm py-6">
                    <i class="ph-duotone ph-equals text-gray-300 text-xl"></i>
                    <p class="mt-1">변동 데이터 없음</p>
                </div>`;
        }

        container.innerHTML = html;
    }

    /**
     * 노임단가표를 테이블 형태로 렌더링
     */
    function renderLaborTable(data) {
        const container = $('laborTableContent');
        if (!container) return;

        if (!data || data.length === 0) {
            container.innerHTML = `
                <div class="text-center text-gray-400 text-sm py-8">
                    <i class="ph-duotone ph-warning text-amber-400 text-xl"></i>
                    <p class="mt-1">노임 데이터를 불러올 수 없습니다</p>
                </div>`;
            return;
        }

        let html = `
            <div class="overflow-auto max-h-[320px] labor-table-scroll">
                <table class="w-full text-sm text-left">
                    <thead class="sticky top-0 bg-slate-50 z-10">
                        <tr>
                            <th class="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">직종</th>
                            <th class="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">단가 (원)</th>
                            <th class="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">변동</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">`;

        data.forEach(item => {
            const diffColor = item.diff > 0 ? 'text-red-500' : item.diff < 0 ? 'text-blue-500' : 'text-gray-400';
            const diffSymbol = item.diff > 0 ? '▲' : item.diff < 0 ? '▼' : '-';
            const diffDisplay = item.diff !== 0 ? `${diffSymbol} ${Math.abs(item.diff).toLocaleString()}` : '-';

            html += `
                <tr class="hover:bg-slate-50 transition-colors">
                    <td class="px-3 py-2.5 font-medium text-gray-800">${item.name}</td>
                    <td class="px-3 py-2.5 text-right mono font-medium text-gray-700">${item.price.toLocaleString()}</td>
                    <td class="px-3 py-2.5 text-right font-bold ${diffColor}">${diffDisplay}</td>
                </tr>`;
        });

        html += '</tbody></table></div>';
        container.innerHTML = html;
    }

    // ================= SHARED UI LOGIC =================

    function renderFluctuationUI(containerId, current, prev) {
        const diff = current - prev;
        const diffPercent = prev !== 0 ? (diff / prev) * 100 : 0;
        const container = $(containerId);
        if (!container) return;

        let colorClass = 'text-slate-500';
        let symbol = '-';

        if (diff > 0) { colorClass = 'text-red-500'; symbol = '▲'; }
        else if (diff < 0) { colorClass = 'text-blue-500'; symbol = '▼'; }

        container.innerHTML = `
            <span class="${colorClass}">${symbol} ${Math.abs(diff).toFixed(2)}</span>
            <span class="${colorClass} text-sm bg-slate-50 px-2 py-1 rounded-lg">
                ${diffPercent >= 0 ? '+' : ''}${diffPercent.toFixed(2)}%
            </span>
            <span class="text-xs text-slate-400 font-normal ml-1">전일대비</span>
        `;
    }

    function renderChart(canvasId, data, type) {
        const canvas = $(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const dates = data.map(d => d.date);
        const values = data.map(d => d.rate);

        if (values.length === 0) return;

        const start = values[0];
        const end = values[values.length - 1];
        const change = ((end - start) / start * 100).toFixed(2);

        const badgeId = type === 'currency' ? 'mktChangeBadge' : 'mktMatChangeBadge';
        const badge = $(badgeId);
        const periodText = type === 'currency' ? '30일' : `${materialViewMode}일`;

        if (badge) {
            if (change >= 0) {
                badge.className = 'px-2 py-1 rounded-md font-medium text-sm bg-red-50 text-red-600';
                badge.innerText = `▲ ${change}% (${periodText})`;
            } else {
                badge.className = 'px-2 py-1 rounded-md font-medium text-sm bg-blue-50 text-blue-600';
                badge.innerText = `▼ ${change}% (${periodText})`;
            }
        }

        if (type === 'currency') {
            if (currencyChartInstance) currencyChartInstance.destroy();
        } else {
            if (materialChartInstance) materialChartInstance.destroy();
        }

        const lineColor = change >= 0 ? '#ef4444' : '#3b82f6';
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, change >= 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        const newChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: type === 'currency' ? '환율' : '가격($)',
                    data: values,
                    borderColor: lineColor,
                    backgroundColor: gradient,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 3,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { font: { size: 10 }, maxTicksLimit: 8 } },
                    y: { display: true, position: 'right', grid: { color: '#f1f5f9' } }
                },
                interaction: { mode: 'nearest', axis: 'x', intersect: false }
            }
        });

        if (type === 'currency') currencyChartInstance = newChart;
        else materialChartInstance = newChart;
    }

    // ================= AI ANALYSIS =================

    async function analyzeTrend() {
        const aiBtn = $('mktAiBtn');
        const aiResult = $('mktAiResult');

        let subject = '';
        let start = 0;
        let end = 0;
        let contextText = '';
        let dataContext = '';

        if (currentTab === 'currency') {
            const base = $('mktBaseCurrency').value;
            const target = $('mktTargetCurrency').value;
            if (!currencyData.history.length) return;
            subject = `${base}/${target} 환율`;
            start = currencyData.history[0].rate;
            end = currencyData.history[currencyData.history.length - 1].rate;
            dataContext = `현재 환율: ${end} ${target}`;
        } else {
            const mat = $('mktMaterialSelect').value;
            const matName = MATERIAL_INFO[mat].name;
            const history = materialData.processed[mat];
            if (!history || history.length === 0) return;

            const viewHistory = history.slice(-materialViewMode);
            subject = `${matName}(${mat}) 원자재 가격`;
            start = viewHistory[0].rate;
            end = viewHistory[viewHistory.length - 1].rate;
            contextText = ` (최근 ${materialViewMode}일 LME 시세 기반)`;
            dataContext = `현재 자재가: $${end}/Ton`;
        }

        aiBtn.innerText = '실시간 정보 검색 및 분석 중...';
        aiBtn.disabled = true;

        const change = ((end - start) / start * 100).toFixed(2);
        const apiKey = APP_CONFIG.GEMINI_API_KEY;

        if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
            aiResult.innerHTML = "<span class='text-red-500 font-bold'>API 키가 설정되지 않았습니다.</span><br>config.js의 <code>GEMINI_API_KEY</code> 항목에 Google Gemini API 키를 입력하세요.";
            aiBtn.innerText = '설정 필요';
            aiBtn.disabled = false;
            return;
        }

        const prompt = `
            당신은 글로벌 건설 시장 및 한국 경제 전문가입니다.
            Google Search 도구를 사용하여 최신 정보를 검색하고 아래 데이터를 분석해주세요.

            [분석 대상 데이터]
            - 항목: ${subject}
            - 변동률: 약 ${change}% ${contextText}
            - ${dataContext}

            [수행 작업]
            1. **최신 뉴스 검색 (Google Search 필수)**:
               - 현재 시점의 한국 건설 경기 이슈 (예: 태영건설 등 PF 위기, 인건비/자재비 급등, 최신 정부 대책 등)를 검색하세요.
               - 글로벌 경제 동향 (미국 금리, 중국 부동산 이슈, 전쟁 등 지정학적 리스크) 중 ${subject} 가격에 영향을 줄 만한 최신 뉴스를 검색하세요.

            2. **종합 분석 (데이터 + 뉴스)**:
               - 위에서 검색한 최신 뉴스들이 현재의 ${subject} 가격 변동에 어떤 영향을 미치고 있는지 설명하세요.
               - 단순히 "올랐다/내렸다"가 아니라, "최근 XX 이슈로 인해 상승 압박이 있다"는 식으로 구체적인 근거(뉴스)를 들어주세요.

            3. **실무 영향 (기계/소방)**:
               - 기계설비공사: 배관(강관, 동관), 펌프, 공조기 등 자재 수급 및 단가 영향.
               - 소방설비공사: SP배관, 밸브류 등 소방 자재 및 인건비 영향.
               - 발주처/시공사 대응 전략: 지금 발주해야 하는지, 관망해야 하는지 조언.

            답변은 한국어로 작성하고, 전문적이지만 현장 소장님도 이해하기 쉽게 핵심 위주로 요약해주세요.
        `;

        const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        // 재시도 포함 fetch 헬퍼 (429 rate-limit 대응)
        async function fetchWithRetry(url, options, maxRetries = 2) {
            for (let attempt = 0; attempt <= maxRetries; attempt++) {
                const res = await fetch(url, options);
                if (res.status !== 429 || attempt === maxRetries) return res;
                aiResult.innerText = `요청 한도 초과 — ${2}초 후 재시도 중... (${attempt + 1}/${maxRetries})`;
                await new Promise(r => setTimeout(r, 2000));
            }
        }

        try {
            // 1차: Google Search Grounding 포함 시도
            let response = await fetchWithRetry(GEMINI_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    tools: [{ googleSearch: {} }]
                })
            });

            // 429 지속 시 → Grounding 없이 폴백
            if (response.status === 429) {
                aiResult.innerText = '실시간 검색 한도 초과 — 기본 분석 모드로 전환 중...';
                await new Promise(r => setTimeout(r, 1500));
                response = await fetchWithRetry(GEMINI_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                });
            }

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                const detail = errBody?.error?.message || `HTTP ${response.status}`;
                if (typeof SecurityMonitor !== 'undefined') {
                    SecurityMonitor.handleApiError('Gemini AI', response.status, detail);
                }
                if (response.status === 429) {
                    aiResult.innerHTML = "<span class='text-amber-600 font-bold'>⚠️ 요청 한도(Rate Limit) 초과</span><br>Gemini 무료 플랜은 분당 15회 제한이 있습니다. 잠시 후 다시 시도해주세요.";
                    return;
                }
                if (response.status === 400) {
                    aiResult.innerHTML = "<span class='text-red-500 font-bold'>API 요청 오류 (400)</span><br>모델 또는 요청 형식을 확인하세요.<br><small>" + detail + "</small>";
                    return;
                }
                throw new Error(`API 요청 실패 (${response.status}): ${detail}`);
            }

            const data = await response.json();
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (aiText) {
                aiResult.innerHTML = marked.parse(aiText);
            } else {
                aiResult.innerText = '분석 결과를 가져오지 못했습니다. API 키 권한을 확인해주세요.';
            }
        } catch (e) {
            console.error(e);
            aiResult.innerText = '연결 오류 발생: ' + e.message;
        } finally {
            aiBtn.innerText = '다시 물어보기';
            aiBtn.disabled = false;
        }
    }

    // ================= VIEW MANAGEMENT =================

    function init(tab) {
        currentTab = tab || 'currency';

        const overview = $('dashboard-overview');
        const detail = $('market-detail');
        if (overview) overview.classList.add('hidden');
        if (detail) detail.classList.remove('hidden');

        switchTab(currentTab);

        if (!initialized) {
            initialized = true;
            fetchCurrencyData();
            fetchMaterialData();

            $('mktAmountInput').addEventListener('input', calculateConversion);
            $('mktBaseCurrency').addEventListener('change', fetchCurrencyData);
            $('mktTargetCurrency').addEventListener('change', fetchCurrencyData);
            $('mktMaterialSelect').addEventListener('change', updateMaterialUI);
        }
    }

    function close() {
        const overview = $('dashboard-overview');
        const detail = $('market-detail');
        if (overview) overview.classList.remove('hidden');
        if (detail) detail.classList.add('hidden');
    }

    /** 자재단가 전체 탭 뷰 열기 */
    function openMaterialDetail() {
        const overview = $('dashboard-overview');
        const detail = $('view-material-detail');
        if (overview) overview.classList.add('hidden');
        if (detail) detail.classList.remove('hidden');

        renderMaterialDetailBySheet();
    }

    /** 자재단가 전체 탭 뷰 닫기 */
    function closeMaterialDetail() {
        const overview = $('dashboard-overview');
        const detail = $('view-material-detail');
        if (overview) overview.classList.remove('hidden');
        if (detail) detail.classList.add('hidden');
    }

    /** 품목 분류 사이드바 렌더링 */
    function renderMaterialDetailBySheet() {
        const selectorEl = $('matSheetSelector');
        if (!selectorEl) return;

        selectorEl.innerHTML = MATERIAL_SHEETS.map(name => {
            const meta = SHEET_META[name] || { icon: 'ph-fill ph-package', sub: name, color: 'text-gray-600', iconBg: 'bg-gray-100' };
            return `
                <button
                    id="matSheet-${name}"
                    onclick="MarketDashboard.selectMaterialSheet('${name}')"
                    class="mat-sheet-btn w-full text-left px-3 py-3 rounded-xl border border-transparent transition-all">
                    <div class="flex items-center gap-3">
                        <div class="p-1.5 ${meta.iconBg} rounded-lg flex-shrink-0">
                            <i class="${meta.icon} ${meta.color} text-base"></i>
                        </div>
                        <div class="min-w-0">
                            <div class="text-sm font-bold text-gray-800">${name}</div>
                            <div class="text-[11px] text-gray-400 truncate">${meta.sub}</div>
                        </div>
                    </div>
                </button>`;
        }).join('');

        // 진입 시 항상 첫 번째 시트 자동 선택 (캐시 없으면 fetch)
        selectMaterialSheet(MATERIAL_SHEETS[0]);
    }

    /** 시트 선택 — 캐시 없으면 fetch, 있으면 즉시 렌더 */
    async function selectMaterialSheet(sheetName) {
        // 사이드바 활성 상태 갱신
        MATERIAL_SHEETS.forEach(name => {
            const btn = $('matSheet-' + name);
            if (!btn) return;
            btn.className = (name === sheetName
                ? 'mat-sheet-btn mat-sheet-btn-active w-full text-left px-3 py-3 rounded-xl border transition-all'
                : 'mat-sheet-btn w-full text-left px-3 py-3 rounded-xl border border-transparent transition-all');
        });

        const contentEl = $('matDetailContent');
        if (!contentEl) return;

        // 캐시 없으면 fetch
        if (!materialDetailCache[sheetName]) {
            contentEl.innerHTML = `
                <div class="text-center text-gray-400 text-sm py-16">
                    <i class="ph-bold ph-spinner animate-spin text-emerald-500 text-xl"></i>
                    <p class="mt-2">${sheetName} 데이터 불러오는 중...</p>
                </div>`;
            try {
                const result = await fetchMultipleSheets([sheetName]);
                const rawRows = result[sheetName] || [];
                // 1행 헤더(실제 시트 컬럼명)와 2행~ 파싱 데이터를 함께 저장
                const headers = rawRows.length > 0 ? Object.keys(rawRows[0]) : [];
                const parsed  = rawRows
                    .map(row => parseSheetRow(row, sheetName))
                    .filter(r => r.name);
                materialDetailCache[sheetName] = { headers, parsed };
            } catch (e) {
                contentEl.innerHTML = `
                    <div class="text-center text-red-400 text-sm py-12">
                        <i class="ph-duotone ph-warning-circle text-xl"></i>
                        <p class="mt-2 font-medium">데이터 로드 실패</p>
                        <button onclick="MarketDashboard.selectMaterialSheet('${sheetName}')" class="mt-3 text-xs text-indigo-500 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg">다시 시도</button>
                    </div>`;
                return;
            }
        }

        // 테이블 렌더 (캐시 엔트리 직접 전달)
        renderSheetTable(materialDetailCache[sheetName], sheetName);
    }

    /** 시트 데이터를 렌더 — 상위3/하위3 카드 + 전체목록 테이블, 등락은 D열(diff) 기준 */
    function renderSheetTable(cacheEntry, sheetName) {
        const contentEl = $('matDetailContent');
        if (!contentEl) return;

        const { headers = [], parsed: rows = [] } = cacheEntry || {};
        // 실제 시트 1행 값을 컬럼 헤더로 사용 (없으면 열 위치로 대체)
        const colH = [
            headers[0] || 'A열',
            headers[1] || 'B열',
            headers[2] || 'C열',
            headers[3] || 'D열'
        ];
        if (rows.length === 0) {
            contentEl.innerHTML = `<div class="text-center text-gray-400 text-sm py-8">해당 시트에 데이터가 없습니다</div>`;
            return;
        }

        const upCount   = rows.filter(r => r.diff > 0).length;
        const downCount = rows.filter(r => r.diff < 0).length;
        const flatCount = rows.filter(r => r.diff === 0).length;

        // D열(diff) 기준 상위3 / 하위3
        const top3    = [...rows].sort((a, b) => b.diff - a.diff).filter(r => r.diff > 0).slice(0, 3);
        const bottom3 = [...rows].sort((a, b) => a.diff - b.diff).filter(r => r.diff < 0).slice(0, 3);

        // 순위 행 HTML 생성 헬퍼
        function rankRow(item, rank, isUp) {
            const color  = isUp ? 'text-red-500' : 'text-blue-500';
            const symbol = isUp ? '▲' : '▼';
            return `
                <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 min-w-0">
                        <span class="text-[11px] font-bold ${color} w-4 flex-shrink-0">${rank}</span>
                        <div class="min-w-0">
                            <div class="text-sm font-bold text-gray-800 truncate">${item.name}</div>
                            <div class="text-[10px] text-gray-400 truncate">${item.spec}</div>
                        </div>
                    </div>
                    <div class="text-right flex-shrink-0">
                        <div class="text-xs mono font-medium text-gray-600">${item.price.toLocaleString()}</div>
                        <div class="text-xs font-bold ${color}">${symbol} ${Math.abs(item.diff).toLocaleString()}</div>
                    </div>
                </div>`;
        }

        let html = `
            <!-- 통계 요약 -->
            <div class="flex flex-wrap items-center gap-2 mb-5">
                <span class="text-xs font-bold text-red-500 bg-red-50 px-2.5 py-1 rounded-full">▲ 상승 ${upCount}건</span>
                <span class="text-xs font-bold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-full">▼ 하락 ${downCount}건</span>
                <span class="text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">— 변동없음 ${flatCount}건</span>
                <span class="text-xs text-gray-400 ml-auto">전체 ${rows.length}건</span>
            </div>

            <!-- 상위 3 / 하위 3 카드 -->
            <div class="grid grid-cols-2 gap-4 mb-5">
                <div class="bg-red-50/60 border border-red-100 rounded-xl p-4">
                    <p class="text-[11px] font-bold text-red-500 uppercase tracking-wider mb-3">▲ 상위 3품목</p>
                    <div class="space-y-3">
                        ${top3.length > 0
                            ? top3.map((item, i) => rankRow(item, i + 1, true)).join('')
                            : '<p class="text-xs text-gray-400 text-center py-2">상승 품목 없음</p>'}
                    </div>
                </div>
                <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-4">
                    <p class="text-[11px] font-bold text-blue-500 uppercase tracking-wider mb-3">▼ 하위 3품목</p>
                    <div class="space-y-3">
                        ${bottom3.length > 0
                            ? bottom3.map((item, i) => rankRow(item, i + 1, false)).join('')
                            : '<p class="text-xs text-gray-400 text-center py-2">하락 품목 없음</p>'}
                    </div>
                </div>
            </div>

            <!-- 전체 목록 구분선 -->
            <div class="flex items-center gap-3 mb-3">
                <span class="text-xs font-bold text-gray-500">전체 목록</span>
                <div class="flex-1 border-t border-gray-100"></div>
            </div>

            <!-- 전체 테이블 -->
            <div class="overflow-auto max-h-[340px] mat-detail-scroll">
                <table class="w-full text-sm text-left">
                    <thead class="sticky top-0 bg-white z-10 border-b border-gray-100">
                        <tr>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">${colH[0]}</th>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">${colH[1]}</th>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">${colH[2]}</th>
                            <th class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">${colH[3]}</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">`;

        rows.forEach(item => {
            const diffColor  = item.diff > 0 ? 'text-red-500'  : item.diff < 0 ? 'text-blue-500'  : 'text-gray-400';
            const rowBg      = item.diff > 0 ? 'bg-red-50/40'  : item.diff < 0 ? 'bg-blue-50/40'  : '';
            const diffSymbol = item.diff > 0 ? '▲' : item.diff < 0 ? '▼' : '—';
            const diffDisplay = item.diff !== 0
                ? `${diffSymbol} ${Math.abs(item.diff).toLocaleString()}`
                : '—';

            html += `
                <tr class="hover:bg-slate-50 transition-colors ${rowBg}">
                    <td class="px-4 py-3 font-medium text-gray-800">${item.name}</td>
                    <td class="px-4 py-3 text-gray-500 text-xs">${item.spec}</td>
                    <td class="px-4 py-3 text-right mono font-medium text-gray-700">${item.price.toLocaleString()}</td>
                    <td class="px-4 py-3 text-right font-bold ${diffColor}">${diffDisplay}</td>
                </tr>`;
        });

        html += '</tbody></table></div>';
        contentEl.innerHTML = html;
    }

    // === PUBLIC API ===
    return {
        init,
        close,
        switchTab,
        setMaterialViewMode,
        analyzeTrend,
        fetchOverviewData,
        openMaterialDetail,
        closeMaterialDetail,
        selectMaterialSheet
    };
})();
