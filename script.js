/* =========================================
   0. 코드정보 / 이용안내 상수 데이터
   ========================================= */

const CONST_CONTENT = {
    'code-info': {
        title: '코드정보 안내',
        sections: [
            {
                heading: '공사 분류 코드',
                type: 'table',
                columns: ['대분류', '중분류', '세부분류', '코드'],
                rows: [
                    ['배관공사', '강관', '강관', 'PIP-STL'],
                    ['', '강관', '스테인리스강관', 'PIP-STS'],
                    ['', '동관', '동관', 'PIP-CUP'],
                    ['', '주철관', '주철관', 'PIP-CIP'],
                    ['', '합성수지관', '경질관', 'PIP-PVC'],
                    ['', '합성수지관', '연질관', 'PIP-FLX'],
                    ['덕트공사', '덕트', '덕트', 'DCT-MTR'],
                    ['', '', '덕트기구', 'DCT-ACC'],
                    ['보온공사', '보온', '배관보온', 'INS-PIP, INS-VLV, INS-DCT'],
                    ['', '', '밸브보온', ''],
                    ['', '', '덕트보온', ''],
                    ['', '발열', '발열선', 'INS-HEAT'],
                    ['펌프 및 공기설비', '펌프', '펌프', 'PMP-EQP'],
                    ['', '송풍', '송풍기 및 환풍기', 'FAN-EQP'],
                    ['밸브 및 이음', '밸브', '밸브설비, 밸브', 'VLV-GEN'],
                    ['', '특수이음', '증기트랩, 플랙시블/팽창이음', 'VLV-TRP, JNT-EXP'],
                    ['', '방지기', '수격방지기', 'JNT-WTR'],
                    ['측정 및 위생', '측정기기', '유량계, 적산열량계', 'MTR-FLO, MTR-CAL'],
                    ['', '위생기구', '위생기구류, 수전, 욕실부착물', 'SAN-FIXT, SAN-TAP'],
                    ['공조 및 열원', '냉난방', '냉동기, 냉각탑, 공기조화기', 'HVAC-REF, HVAC-AHU'],
                    ['', '보일러', '보일러, 방열기, 온수기/분배기', 'BLR-GEN, BLR-RAD'],
                    ['', '부속장비', '탱크 및 헤더, 부수장비', 'TNK-HDR, AUX-EQP'],
                    ['기타공사', '지지/마감', '지지금구, 도장, 슬리브', 'MISC-SUP, MISC-PNT, MISC-SLV'],
                    ['', '관리', '배관관리 및 시험, 시운전/조정', 'MISC-TST, MISC-TAB'],
                    ['소방설비', '소화설비', '소화함, 소방밸브, 옥외소화전', 'FIRE-BOX, FIRE-VLV, FIRE-HYD'],
                    ['', '소화기구', '송수구, 탱크, 유량계, 헤드', 'FIRE-INL, FIRE-TNK, FIRE-HED'],
                    ['', '소화/피난', '소화기, 피난기구', 'FIRE-EXT, FIRE-ESC'],
                    ['가스/자동제어', '가스설비', '강관, PE관, 부속기기', 'GAS-STL, GAS-PE, GAS-ACC'],
                    ['', '자동제어', '계기반/함류, 제어기기, 전선배선', 'AUTO-PNL, AUTO-DEV, AUTO-WR'],
                    ['플랜트설비', '플랜트', '플랜트 배관/용접, 보온', 'PLT-PIP, PLT-WLD, PLT-INS'],
                    ['', '제작설치', '강재 제작 및 설치', 'PLT-STW'],
                    ['', '발전기계', '화력발전, 수력발전', 'PLT-PWR-T, PLT-PWR-H'],
                    ['', '산업기계', '제철, 쓰레기소각, 하수처리', 'PLT-STL, PLT-INC, PLT-WWT'],
                    ['', '운반/기타', '운반기계, 기타기계', 'PLT-CNV, PLT-ETC'],
                    ['유지관리', '해체', '일반기계설비 해체, 자동제어 해체', 'MNT-DEM-M, MNT-DEM-A'],
                    ['', '수선', '수선 및 보수공사', 'MNT-REP']
                ]
            },
            {
                heading: '건설사 코드',
                type: 'table',
                columns: ['건설사명', '코드'],
                rows: [
                    ['대우', 'C01'], ['더와이', 'C11'], ['라인', 'C21'], ['롯데', 'C31'],
                    ['모아', 'C41'], ['미래', 'C51'], ['산이', 'C61'], ['서진', 'C71'],
                    ['영무', 'C81'], ['용봉', 'C91'], ['유탑', 'C101'], ['제일', 'C111'],
                    ['중흥', 'C121'], ['토광', 'C131'], ['하림', 'C141'], ['한양', 'C151'],
                    ['호반', 'C161'], ['기타(etc)', 'CETC']
                ]
            },
            {
                heading: '협력업체 코드',
                type: 'table',
                columns: ['업체명', '코드'],
                rows: [
                    ['동양', 'DY'], ['동진', 'DJ'], ['두진', 'DO'], ['마스테코', 'MAR'],
                    ['보광시티', 'BG'], ['성화', 'SHWA'], ['세한', 'SH'], ['신영소방', 'SY'],
                    ['신일', 'SL'], ['신한메탈', 'SHT'], ['영신코아스', 'YS'], ['영진플렉스', 'YJ'],
                    ['영화', 'YH'], ['우당기술산업', 'WO'], ['유진', 'UJ'], ['인성PPI', 'IS'],
                    ['조은원대', 'JW'], ['중경산업', 'JK'], ['진안', 'JN'], ['케이비', 'KB'],
                    ['프럼파스트', 'PF'], ['하이스텐', 'HS'], ['한국소방', 'KF'], ['화성', 'HWA'],
                    ['화이어대상', 'HD']
                ]
            },
            {
                heading: '구분 코드',
                type: 'table',
                columns: ['구분', '코드'],
                rows: [
                    ['견적', 'E'], ['현장', 'EO'],
                    ['삼진', 'SAM'], ['외주', 'OS']
                ]
            }
        ]
    },
    'user-guide': {
        title: '이용안내',
        sections: [
            {
                heading: '시작하기',
                type: 'steps',
                items: [
                    { step: 1, title: '홈 화면', desc: '상단 네비게이션 또는 홈 카드를 클릭하여 정보마당 또는 견적시스템으로 이동합니다.' },
                    { step: 2, title: '정보마당', desc: 'LME 원자재 시세, 실시간 환율, 자재 단가 변동, 노임단가표를 한눈에 확인할 수 있습니다. 카드를 클릭하면 상세 대시보드로 전환됩니다.' },
                    { step: 3, title: '견적시스템', desc: '엑셀 내역서를 업로드하면 품셈 DB와 자동 매칭하여 재료비·노무비를 산출합니다.' }
                ]
            },
            {
                heading: '견적시스템 사용법',
                type: 'steps',
                items: [
                    { step: 1, title: 'DB 시트 선택', desc: '좌측 상단 드롭다운에서 매칭에 사용할 단가 시트(통합 단가, 협력사 단가 등)를 선택합니다.' },
                    { step: 2, title: '엑셀 업로드', desc: '.xlsx / .xls / .csv 형식의 내역서 파일을 드래그하거나 클릭하여 업로드합니다.' },
                    { step: 3, title: '고속 매칭 실행', desc: '"고속 매칭 실행" 버튼을 클릭하면 Web Worker 기반으로 빠르게 품목을 비교합니다.' },
                    { step: 4, title: '결과 다운로드', desc: '매칭 완료 후 "결과 엑셀 저장" 버튼으로 결과를 다운로드합니다.' }
                ]
            },
            {
                heading: 'DB 검색 탭',
                type: 'list',
                items: [
                    '품명/규격 검색: 메인 검색창에 키워드를 입력하고 검색 버튼을 클릭합니다.',
                    '추가 검색어: AND 조건으로 세부 필터링이 가능합니다.',
                    '비고 검색: 비고(연도 등) 기준으로 필터링합니다.',
                    '코드 필터: 자동 모드(드롭다운)와 수동 모드(자유 입력) 전환이 가능합니다.',
                    '행 클릭: 검색 결과 행을 클릭하면 재료비·노무비가 클립보드에 자동 복사됩니다.'
                ]
            },
            {
                heading: 'DB 업데이트 탭',
                type: 'list',
                items: [
                    '품목 추가: 품명, 규격, 단위를 입력하여 로컬 DB에 항목을 추가합니다.',
                    '엑셀 업로드: 기존 엑셀 파일로 대량 등록이 가능합니다 (중복 자동 스킵).',
                    '수정/삭제: 테이블에서 직접 값을 수정하거나 삭제합니다.',
                    '자동 동기화: 관리자 설정에서 활성화하면 n8n 웹훅으로 변경사항이 자동 전송됩니다.'
                ]
            },
            {
                heading: '관리자 설정',
                type: 'list',
                items: [
                    '관리자 탭 접근 시 비밀번호 인증이 필요합니다 (기본 4자리).',
                    'Google Sheets ID를 설정하여 데이터 소스를 연결합니다.',
                    'Webhook URL을 등록하면 품목 추가/수정/삭제 시 n8n으로 자동 전송됩니다.',
                    '비밀번호는 설정 페이지 하단에서 변경할 수 있습니다.'
                ]
            }
        ]
    }
};

/* =========================================
   0-2. 이용안내 / 공지사항 상수 데이터
   ========================================= */

const CONST_USAGE_GUIDE = {
    'notice': {
        title: '공지사항',
        sections: [
            {
                heading: '운영 및 유지보수 정책',
                type: 'paragraph',
                text: '본 시스템은 공식 상용 서비스가 아닌 업무 보조용 내부 도구입니다.\n\n안정적인 운영을 지향하나, 개발 환경 및 보안 정책에 따라 기능 수정, 서버 점검 또는 서비스 구성이 예고 없이 변경되거나 중단될 수 있습니다.'
            },
            {
                heading: '보안 및 사용 권한 안내',
                type: 'list',
                items: [
                    '사내 업무 전용: 본 시스템은 임직원의 업무 편의를 위해 제공되며, 외부 유출 및 무단 배포를 엄격히 금지합니다.',
                    '서비스 보호: 무단 공유로 인한 트래픽 과부하 및 보안 이슈 발생 시 서비스 이용이 제한될 수 있습니다. 현재 보안 모니터링이 적용 중이며 단계별로 접근 통제를 강화할 예정입니다.'
                ]
            },
            {
                heading: '건의 및 개선 요청',
                type: 'paragraph',
                text: '사용 중 발생하는 오류나 기능 개선 제안은 자유게시판을 통해 남겨주시면 검토 후 적극 반영하도록 하겠습니다.'
            }
        ]
    },
    'usage': {
        title: 'SAMJIN 플랫폼 이용안내',
        sections: [
            {
                heading: '플랫폼 소개',
                type: 'paragraph',
                text: '본 플랫폼은 공동주택(아파트) 기계 및 소방설비공사 견적 업무의 효율성을 극대화하기 위해 개발된 내부 업무 지원 시스템입니다. 반복적인 단가 확인 및 자료 조회 업무를 자동화하여 처리 속도를 높이는 것을 목적으로 합니다.'
            },
            {
                heading: '1. 핵심 기능 안내',
                type: 'list',
                items: [
                    '정보마당 (Market Dashboard): 자재 단가(LME), 환율, 노임단가 등 견적 필수 지표를 실시간으로 제공하여 시장 변화를 빠르게 확인할 수 있습니다.',
                    '견적 자동화 매칭: 엑셀 내역서를 업로드하면 표준 품셈 DB와 구조적으로 연동하여 자동 계산 및 단가 매칭을 수행합니다.'
                ]
            },
            {
                heading: '2. 운영 및 유지보수 정책',
                type: 'paragraph',
                text: '본 시스템은 공식 상용 서비스가 아닌 업무 보조용 내부 도구입니다.\n\n안정적인 운영을 지향하나, 개발 환경 및 보안 정책에 따라 기능 수정, 서버 점검 또는 서비스 구성이 예고 없이 변경되거나 중단될 수 있습니다.'
            },
            {
                heading: '3. 보안 및 사용 권한 안내',
                type: 'list',
                items: [
                    '사내 업무 전용: 본 시스템은 임직원의 업무 편의를 위해 제공되며, 외부 유출 및 무단 배포를 엄격히 금지합니다.',
                    '서비스 보호: 무단 공유로 인한 트래픽 과부하 및 보안 이슈 발생 시 서비스 이용이 제한될 수 있습니다. 현재 보안 모니터링이 적용 중이며 단계별로 접근 통제를 강화할 예정입니다.'
                ]
            },
            {
                heading: '4. 건의 및 개선 요청',
                type: 'paragraph',
                text: '사용 중 발생하는 오류나 기능 개선 제안은 자유게시판을 통해 남겨주시면 검토 후 적극 반영하도록 하겠습니다.'
            },
            {
                heading: '주의사항',
                type: 'warning',
                text: '본 시스템은 견적 작성을 돕는 보조 도구입니다. 최종 견적 제출 전에는 반드시 담당자가 데이터의 정확성을 최종 검토하시기 바랍니다.'
            }
        ]
    }
};

/* =========================================
   1. 화면 전환 및 기본 UI 로직
   ========================================= */

// 메인 화면 전환 (홈 <-> 대시보드 <-> 견적시스템)
function switchMainView(viewId) {
    const homeView      = document.getElementById('view-home');
    const dashboardView = document.getElementById('view-dashboard');
    const quotationView = document.getElementById('view-quotation');
    const boardView     = document.getElementById('view-board');

    const dashboardBtn = document.getElementById('nav-btn-dashboard');
    const quotationBtn = document.getElementById('nav-btn-quotation');

    // 모든 뷰 숨기기 & 네비 초기화
    [homeView, dashboardView, quotationView, boardView].forEach(v => v && v.classList.add('hidden'));
    if(dashboardBtn) dashboardBtn.classList.remove('active');
    if(quotationBtn) quotationBtn.classList.remove('active');

    if (viewId === 'home') {
        homeView.classList.remove('hidden');
    } else if (viewId === 'dashboard') {
        dashboardView.classList.remove('hidden');
        if(dashboardBtn) dashboardBtn.classList.add('active');
        if (typeof MarketDashboard !== 'undefined') MarketDashboard.fetchOverviewData();
    } else if (viewId === 'quotation') {
        quotationView.classList.remove('hidden');
        if(quotationBtn) quotationBtn.classList.add('active');
    } else if (viewId === 'board') {
        boardView.classList.remove('hidden');
        if (typeof Board !== 'undefined') Board.renderPosts();
    }
}

// Chart.js 기본 설정
function initCharts() {
    Chart.defaults.font.family = "'Noto Sans KR', sans-serif";
    Chart.defaults.color = '#9ca3af';
}

/* =========================================
   2. 견적 시스템 (Web Worker 포함) 로직
   ========================================= */

// 워커 스크립트 정의
const WORKER_CODE_STRING = `
    const ALIAS_MAP = {
        "스테인리스": "STS", "스텐": "STS", "SUS": "STS", "SU": "STS", "고강도": "고강성",
        "배관용탄소강관(무용접)": "배관용탄소강관", "PIPE": "파이프", "엘보": "ELBOW", "덕트": "DUCT", "닥트": "덕트",
        "레듀샤": "리듀서", "티": "TEE", "행거": "행가", "달대": "전산", "S#": "SCH", "GATE": "게이트",  "매직": "보온", "가교": "보온",
        "보온재": "보온", "매직테이프": "보온", "붓싱": "부싱", "닛뿔": "니플", "니뿔": "니플", "BLACK": "블랙", "어댑타": "어댑터", 
        
        "발포": "보온", "메꾸라": "캡", "BAND": "밴드", "드레인": "배수", "WHC": "수격방지기"
       };
    const REMOVE_KEYWORDS = ["포함", "에서", "(", ")", "+", "=", "-", ",", " "];

    function normalize(str) {
        if (!str) return "";
        let n = str.toString().toUpperCase().replace(/\\s+/g, "");
        n = n.replace(/\\*|X/g, "x");
        const sortedKeys = Object.keys(ALIAS_MAP).sort((a, b) => b.length - a.length);
        for (const key of sortedKeys) {
            if (n.includes(key)) n = n.split(key).join(ALIAS_MAP[key]);
        }
        REMOVE_KEYWORDS.forEach(kw => { n = n.split(kw).join(""); });
        n = n.replace(/EA|EACH|개|SET|세트|BOX|박스|M|MTR/g, "");
        return n.replace(/[^A-Z0-9가-힣]/g, "");
    }

    function getSimilarity(s1, s2) {
        if (!s1 || !s2) return 0;
        if (s1 === s2) return 100;
        const getPairs = (str) => {
            const pairs = new Set();
            for (let i = 0; i < str.length - 1; i++) pairs.add(str.substring(i, i + 2));
            return pairs;
        };
        const pairs1 = getPairs(s1);
        const pairs2 = getPairs(s2);
        if (pairs1.size === 0 || pairs2.size === 0) return 0;
        let intersection = 0;
        pairs1.forEach(p => { if (pairs2.has(p)) intersection++; });
        return (2.0 * intersection) / (pairs1.size + pairs2.size) * 100;
    }

    self.onmessage = function(e) {
        const { csvRows, dbRows, config } = e.data;
        const results = [];
        const THRESHOLD = 45;

        const processedDB = dbRows.map(row => ({
            original: row,
            combined: normalize(row.A + row.B),
            normName: normalize(row.A),
            normSpec: normalize(row.B),
            normUnit: normalize(row.C),
            totalCost: (parseFloat(row.D) || 0) + (parseFloat(row.E) || 0)
        }));

        for (let i = 0; i < csvRows.length; i++) {
            const row = csvRows[i];
            const srcName = row[config.nameIdx] || "";
            const srcSpec = row[config.specIdx] || "";
            const srcUnit = row[config.unitIdx] || "";
            
            const rawMat = row[config.matIdx];
            const rawLab = row[config.labIdx];
            const numMat = parseFloat(String(rawMat || "0").replace(/[^0-9.]/g, ""));
            const numLab = parseFloat(String(rawLab || "0").replace(/[^0-9.]/g, ""));
            
            if (numMat > 0 || numLab > 0) {
                results.push([srcName, srcSpec, srcUnit, rawMat, rawLab, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
                continue;
            }

            const nCombined = normalize(srcName + srcSpec);
            const nUnit = normalize(srcUnit);
            const nName = normalize(srcName);
            const nSpec = normalize(srcSpec);

            if (!nCombined) {
                results.push([srcName, srcSpec, srcUnit, 0, 0, "", "", "", "", "", "", "", "", "", ""]);
                continue;
            }

            const identicalMatches = processedDB.filter(db => db.combined === nCombined && (db.normUnit === nUnit || !nUnit));

            if (identicalMatches.length > 0) {
                const best = identicalMatches[0].original;
                results.push([srcName, srcSpec, srcUnit, best.D, best.E, "", "", "", "자동매칭", "", "", "", "", "", ""]);
            } else {
                let candidates = [];
                for (let j = 0; j < processedDB.length; j++) {
                    const db = processedDB[j];
                    const nameSim = getSimilarity(nName, db.normName);
                    const specSim = getSimilarity(nSpec, db.normSpec);
                    const unitSim = (nUnit === db.normUnit && nUnit !== "") ? 100 : 0;
                    const totalScore = (nameSim * 0.5) + (specSim * 0.4) + (unitSim * 0.1);
                    if (totalScore >= THRESHOLD) candidates.push({ score: totalScore, item: db.original });
                }
                candidates.sort((a, b) => b.score - a.score);
                const c1 = candidates[0] ? candidates[0].item : {};
                const c2 = candidates[1] ? candidates[1].item : {};
                results.push([srcName, srcSpec, srcUnit, 0, 0, c1.A || "", c1.B || "", c1.C || "", c1.D || "", c1.E || "", c2.A || "", c2.B || "", c2.C || "", c2.D || "", c2.E || ""]);
            }

            if (i % 50 === 0 || i === csvRows.length - 1) {
                self.postMessage({ type: 'PROGRESS', percent: Math.floor(((i + 1) / csvRows.length) * 100) });
            }
        }
        self.postMessage({ type: 'COMPLETE', results });
    };
`;

// 전역 변수 설정
let dbRows = [];
let csvRows = [];
let resultRows = [];
let colConfig = { nameIdx: 0, specIdx: 1, unitIdx: 2, matIdx: 3, labIdx: 4 };
let localDB = JSON.parse(localStorage.getItem('samjin_local_db')) || [];
let n8nConfig = JSON.parse(localStorage.getItem('samjin_n8n_config')) || {
    webhookAdd: '', webhookUpdate: '', webhookDelete: '', sheetsId: APP_CONFIG.GOOGLE_SHEETS_ID, autoSync: false
};
let adminPassword = localStorage.getItem('samjin_admin_password') || APP_CONFIG.DEFAULT_ADMIN_PASSWORD;
let isAdminAuthenticated = false;
let pendingTab = null;

// DOM 요소 참조
const logEl = document.getElementById("log");
const matchBtn = document.getElementById("matchBtn");
const downloadBtn = document.getElementById("downloadBtn");
const dbStatusText = document.getElementById("dbStatusText");
const dbStatusBadge = document.getElementById("dbStatusBadge");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");
const fileNameDisplay = document.getElementById("fileNameDisplay");

// 커스텀 알림창
function customAlert(msg) {
    const message = typeof msg === 'string' ? msg : JSON.stringify(msg);
    document.getElementById('alertMessage').textContent = message.replace(/\n/g, '\n');
    document.getElementById('alertModal').classList.add('active');
}
function closeAlertModal() { document.getElementById('alertModal').classList.remove('active'); }
window.alert = customAlert;

// 정보 모달 (코드정보 / 이용안내 / 공지사항)
function showInfoModal(type) {
    const data = CONST_CONTENT[type] || CONST_USAGE_GUIDE[type];
    if (!data) return;

    document.getElementById('infoModalTitle').textContent = data.title;
    const body = document.getElementById('infoModalBody');
    body.innerHTML = '';

    data.sections.forEach(section => {
        const wrapper = document.createElement('div');
        wrapper.className = 'info-section';

        // warning 타입은 별도 헤더 스타일
        if (section.type !== 'warning') {
            const h4 = document.createElement('h4');
            h4.className = 'text-base font-bold text-slate-800 mb-3 flex items-center gap-2';
            h4.innerHTML = '<span class="w-1.5 h-5 bg-indigo-500 rounded-full inline-block"></span>' + section.heading;
            wrapper.appendChild(h4);
        }

        if (section.type === 'table') {
            const tableWrap = document.createElement('div');
            tableWrap.className = 'overflow-x-auto rounded-xl border border-slate-200';
            const table = document.createElement('table');
            table.className = 'info-table';

            const thead = document.createElement('thead');
            const headRow = document.createElement('tr');
            section.columns.forEach(col => {
                const th = document.createElement('th');
                th.textContent = col;
                headRow.appendChild(th);
            });
            thead.appendChild(headRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            section.rows.forEach(row => {
                const tr = document.createElement('tr');
                row.forEach((cell, ci) => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    if (ci === 0 && cell) td.className = 'font-bold text-slate-700';
                    if (ci === row.length - 1 && cell) td.className = 'font-mono text-indigo-600 text-xs';
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            tableWrap.appendChild(table);
            wrapper.appendChild(tableWrap);

        } else if (section.type === 'steps') {
            const ol = document.createElement('ol');
            ol.className = 'info-steps';
            section.items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'info-step';
                li.innerHTML = `
                    <span class="info-step-num">${item.step}</span>
                    <div>
                        <span class="font-bold text-slate-800">${item.title}</span>
                        <p class="text-slate-600 text-sm leading-relaxed mt-0.5">${item.desc}</p>
                    </div>
                `;
                ol.appendChild(li);
            });
            wrapper.appendChild(ol);

        } else if (section.type === 'list') {
            const ul = document.createElement('ul');
            ul.className = 'info-list';
            section.items.forEach(text => {
                const li = document.createElement('li');
                li.className = 'info-list-item';
                const parts = text.split(':');
                if (parts.length > 1) {
                    li.innerHTML = `<span class="font-bold text-slate-700">${parts[0]}:</span><span class="text-slate-600">${parts.slice(1).join(':')}</span>`;
                } else {
                    li.textContent = text;
                }
                ul.appendChild(li);
            });
            wrapper.appendChild(ul);

        } else if (section.type === 'paragraph') {
            const p = document.createElement('p');
            p.className = 'text-slate-700 text-sm leading-relaxed whitespace-pre-line';
            p.textContent = section.text;
            wrapper.appendChild(p);

        } else if (section.type === 'warning') {
            const box = document.createElement('div');
            box.className = 'info-warning';
            box.innerHTML = `
                <div class="info-warning-icon">
                    <i class="ph-fill ph-warning-circle"></i>
                </div>
                <div>
                    <span class="font-bold text-amber-800">${section.heading}</span>
                    <p class="text-amber-700 text-sm leading-relaxed mt-1">${section.text}</p>
                </div>
            `;
            wrapper.appendChild(box);
        }

        body.appendChild(wrapper);
    });

    document.getElementById('infoModal').classList.add('active');
}

function closeInfoModal() {
    document.getElementById('infoModal').classList.remove('active');
}

// 탭 전환 로직
function switchTab(tabName) {
    if (tabName === 'n8n-config' && !isAdminAuthenticated) {
        pendingTab = tabName;
        openPasswordModal();
        return;
    }
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => {
        if(btn.getAttribute('onclick').includes(tabName)) btn.classList.add('active');
    });

    if (tabName === 'db-manager') renderDBTable();
    else if (tabName === 'n8n-config') loadN8nConfig();
    else if (tabName === 'db-search') initExternalDB();
}

// 비밀번호 모달 관련 함수
function openPasswordModal() {
    document.getElementById('passwordModal').classList.add('active');
    document.getElementById('adminPassword').value = '';
    document.getElementById('passwordError').classList.add('hidden');
}
function closePasswordModal() {
    document.getElementById('passwordModal').classList.remove('active');
    pendingTab = null;
}
function checkAdminPassword() {
    const inputPassword = document.getElementById('adminPassword').value;
    if (inputPassword === adminPassword) {
        isAdminAuthenticated = true;
        closePasswordModal();
        if (pendingTab) switchTab(pendingTab);
        addLog('관리자 인증 성공', 'success');
    } else {
        document.getElementById('passwordError').classList.remove('hidden');
    }
}
function changePasswordClick() {
    const newPassword = document.getElementById('newAdminPassword').value.trim();
    if (newPassword && newPassword.length === 4) {
        adminPassword = newPassword;
        localStorage.setItem('samjin_admin_password', newPassword);
        customAlert('비밀번호가 변경되었습니다.');
    } else {
        customAlert('4자리 비밀번호를 입력하세요.');
    }
}

// 로그 출력 함수
function addLog(msg, type='info') {
    const time = new Date().toLocaleTimeString('ko-KR', {hour12:false, hour:'2-digit', minute:'2-digit', second:'2-digit'});
    let colorClass = "text-indigo-300";
    let symbol = "»";
    if (type === 'success') { colorClass = "text-emerald-400"; symbol = "✓"; }
    if (type === 'error') { colorClass = "text-rose-400"; symbol = "✗"; }
    
    if(logEl) {
        const div = document.createElement('div');
        div.className = `mb-1.5 flex items-start gap-3`;
        div.innerHTML = `<span class="text-slate-600 shrink-0 text-[10px] mt-0.5">${time}</span><span class="${colorClass} shrink-0">${symbol}</span><span class="${colorClass} break-all">${msg}</span>`;
        logEl.appendChild(div);
        logEl.scrollTop = logEl.scrollHeight;
    }
}
function clearLog() { if(logEl) logEl.innerHTML = ""; addLog("로그 초기화 완료."); }

// DB 가져오기
async function fetchDB() {
    const sheetSelect = document.getElementById("sheetSelect");
    if(!sheetSelect) return;
    const sheetName = sheetSelect.value;
    const SPREADSHEET_ID = n8nConfig.sheetsId;
    const DB_URL = `${APP_CONFIG.OPENSHEET_API_BASE}/${SPREADSHEET_ID}/${encodeURIComponent(sheetName)}`;
    
    if(dbStatusBadge) dbStatusBadge.textContent = "SYNCING";
    if(dbStatusText) dbStatusText.textContent = "동기화 중...";
    
    try {
        const res = await fetch(DB_URL);
        if (!res.ok) {
            const err = new Error(`HTTP ${res.status}`);
            err.status = res.status;
            throw err;
        }
        const data = await res.json();
        
        const getValue = (obj, keys) => {
            const foundKey = Object.keys(obj).find(k => keys.some(kw => k.includes(kw)));
            return foundKey ? obj[foundKey] : null;
        };

        dbRows = data.map(r => ({
            A: getValue(r, ["품명", "이름"]) || "",
            B: getValue(r, ["규격", "사이즈"]) || "",
            C: getValue(r, ["단위"]) || "",
            D: String(getValue(r, ["재료비", "단가"]) || "0").replace(/[^0-9.]/g, ""),
            E: String(getValue(r, ["노무비"]) || "0").replace(/[^0-9.]/g, ""),
            F: getValue(r, ["비고"]) || ""
        }));

        localDB.forEach(local => {
            const exists = dbRows.find(db => db.A === local.A && db.B === local.B);
            if (!exists) dbRows.push(local);
        });

        if(dbStatusBadge) dbStatusBadge.textContent = "CONNECTED";
        if(dbStatusText) dbStatusText.textContent = "DB 연결됨 (" + dbRows.length + "건)";
        addLog(`DB 로드 완료: ${sheetName}`, 'success');
        if(csvRows.length > 0) matchBtn.disabled = false;
        
        // DB 검색 탭의 필터 초기화를 위해 필요 시 호출
        if(!document.getElementById('view-quotation').classList.contains('hidden')) {
             // initExternalDB(); // 필요하면 호출
        }

    } catch (err) {
        if(dbStatusBadge) dbStatusBadge.textContent = "ERROR";
        addLog("DB 로드 실패 (로컬모드): " + err.message, 'error');
        SecurityMonitor.handleApiError('Google Sheets', err.status || 0, err.message);
        dbRows = [...localDB];
    }
}

// 엑셀 파일 업로드
document.getElementById("excelFile")?.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    fileNameDisplay.textContent = file.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
        try {
            const data = new Uint8Array(evt.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            csvRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            
            const header = csvRows[0].map(h => String(h || "").replace(/\s+/g, ""));
            const findIdx = (kws) => {
                const idx = header.findIndex(h => kws.some(kw => h.includes(kw)));
                return idx === -1 ? 0 : idx;
            };
            colConfig.nameIdx = findIdx(["품명", "내역"]);
            colConfig.specIdx = findIdx(["규격", "사이즈"]);
            colConfig.unitIdx = findIdx(["단위"]);
            colConfig.matIdx = findIdx(["재료비", "단가"]);
            colConfig.labIdx = findIdx(["노무비"]);

            addLog(`내역서 로드 완료: ${file.name}`, 'success');
            if(dbRows.length > 0) matchBtn.disabled = false;
        } catch (err) { addLog("파일 오류: " + err.message, 'error'); }
    };
    reader.readAsArrayBuffer(file);
});

// 매칭 실행
function startWorkerMatch() {
    if (csvRows.length < 2) return;
    matchBtn.disabled = true;
    downloadBtn.disabled = true;
    matchBtn.classList.add('matching-active');
    progressContainer.classList.remove('hidden');
    
    const blob = new Blob([WORKER_CODE_STRING], { type: "text/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    
    worker.postMessage({ csvRows: csvRows.slice(1), dbRows: dbRows, config: colConfig });
    
    worker.onmessage = function(e) {
        if (e.data.type === 'PROGRESS') {
            progressBar.style.width = e.data.percent + "%";
            document.getElementById("matchBtnText").textContent = `처리 중... ${e.data.percent}%`;
        } else if (e.data.type === 'COMPLETE') {
            resultRows = e.data.results;
            addLog(`매칭 완료!`, 'success');
            matchBtn.disabled = false;
            matchBtn.classList.remove('matching-active');
            document.getElementById("matchBtnText").textContent = "⚡ 고속 매칭 실행";
            downloadBtn.disabled = false;
            progressContainer.classList.add('hidden');
            worker.terminate();
        }
    };
}

// 엑셀 다운로드
function downloadExcel() {
    if (resultRows.length === 0) return;
    const header = ["공_품명", "공_규격", "공_단위", "M_재료비", "M_노무비", "매칭_품명", "매칭_규격", "매칭_단위", "재료비", "노무비", "후보2_품명", "후보2_규격", "후보2_단위", "재료비", "노무비"];
    const ws = XLSX.utils.aoa_to_sheet([header, ...resultRows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "매칭결과");
    XLSX.writeFile(wb, "매칭결과.xlsx");
}

/* =========================================
   3. DB 관리 및 검색 (Updated for New UI)
   ========================================= */

/* =========================================
   3. DB 관리 모듈 (one.html 원본 이식)
   ========================================= */

/* --- n8n 웹훅 전송 (sendToN8n) --- */
async function sendToN8n(webhookUrl, data, action, oldData = null) {
    if (!webhookUrl) return;
    try {
        const payload = {
            action: action,
            timestamp: new Date().toISOString(),
            data: {
                품명: data.A,
                규격: data.B,
                단위: data.C,
                재료비: data.D,
                노무비: data.E,
                비고: data.F
            }
        };
        if (action === 'update' && oldData) {
            payload.lookup = { 품명: oldData.A, 규격: oldData.B };
            payload.oldData = {
                품명: oldData.A,
                규격: oldData.B,
                단위: oldData.C,
                재료비: oldData.D,
                노무비: oldData.E,
                비고: oldData.F
            };
        }
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            addLog(`n8n 동기화 성공: ${action} - ${data.A}`, 'success');
        } else {
            SecurityMonitor.handleApiError('n8n-webhook', response.status, `Webhook ${action} failed`);
            addLog(`n8n 동기화 실패: ${response.statusText}`, 'error');
        }
    } catch (err) {
        addLog(`n8n 연동 오류: ${err.message}`, 'error');
    }
}

/** 웹훅 URL을 action 타입에 따라 조회하는 헬퍼 */
function getWebhookUrl(action) {
    const config = JSON.parse(localStorage.getItem('samjin_n8n_config')) || n8nConfig;
    // 신규 배열 형식 우선
    if (config.webhooks && Array.isArray(config.webhooks)) {
        const entry = config.webhooks.find(w => w.type === action);
        if (entry) return entry.url;
    }
    // 레거시 단일 필드 폴백
    const keyMap = { add: 'webhookAdd', update: 'webhookUpdate', delete: 'webhookDelete' };
    return config[keyMap[action]] || '';
}

/* --- 카테고리 옵션 갱신 --- */
function updateCategoryOptions() {
    const select = document.getElementById('filterCategory');
    if (!select) return;
    const currentVal = select.value;
    const uniqueNotes = [...new Set(localDB.map(item => item.F || "").filter(x => x))].sort();
    select.innerHTML = '<option value="">전체 카테고리</option>';
    uniqueNotes.forEach(note => {
        const option = document.createElement('option');
        option.value = note;
        option.textContent = note;
        if (note === currentVal) option.selected = true;
        select.appendChild(option);
    });
}

/* --- DB 테이블 렌더링 --- */
function renderDBTable() {
    updateCategoryOptions();
    const tbody = document.getElementById('dbTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    const searchTerm = document.getElementById('searchDB').value.toLowerCase();
    const filterCategory = document.getElementById('filterCategory').value;

    let filteredDB = localDB;
    if (searchTerm) {
        filteredDB = filteredDB.filter(item =>
            item.A.toLowerCase().includes(searchTerm) || item.B.toLowerCase().includes(searchTerm)
        );
    }
    if (filterCategory) {
        filteredDB = filteredDB.filter(item => (item.F || "") === filterCategory);
    }

    filteredDB.forEach((item, idx) => {
        const realIdx = localDB.indexOf(item);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="text-slate-600 font-mono">${idx + 1}</td>
            <td><input type="text" value="${item.A}" onchange="updateDBItem(${realIdx}, 'A', this.value)"></td>
            <td><input type="text" value="${item.B}" onchange="updateDBItem(${realIdx}, 'B', this.value)"></td>
            <td><input type="text" value="${item.C}" onchange="updateDBItem(${realIdx}, 'C', this.value)"></td>
            <td><input type="number" value="${item.D}" onchange="updateDBItem(${realIdx}, 'D', this.value)"></td>
            <td><input type="number" value="${item.E}" onchange="updateDBItem(${realIdx}, 'E', this.value)"></td>
            <td><input type="text" value="${item.F || ''}" onchange="updateDBItem(${realIdx}, 'F', this.value)"></td>
            <td><button onclick="openConfirmDelete(${realIdx})" class="text-rose-600 hover:text-rose-800 font-semibold">삭제</button></td>
            <td><button onclick="applyDBItem(${realIdx})" class="text-blue-600 hover:text-blue-800 font-semibold">적용</button></td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById('dbCount').textContent = filteredDB.length;
}

/* --- 개별 수정 --- */
function updateDBItem(idx, field, value) {
    const oldItem = JSON.parse(JSON.stringify(localDB[idx]));
    localDB[idx][field] = value;
    localStorage.setItem('samjin_local_db', JSON.stringify(localDB));
    addLog(`품목 수정: ${oldItem.A} -> ${localDB[idx].A} (${field} 변경)`, 'success');
    if (field === 'F') updateCategoryOptions();
    if (n8nConfig.autoSync) {
        const url = getWebhookUrl('update');
        if (url) sendToN8n(url, localDB[idx], 'update', oldItem);
    }
}

/* --- 개별 삭제 (확인 모달) --- */
let pendingDeleteIdx = null;

function openConfirmDelete(idx) {
    pendingDeleteIdx = idx;
    document.getElementById('confirmModal').classList.add('active');
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
    pendingDeleteIdx = null;
}

function executePendingDelete() {
    if (pendingDeleteIdx === null) return;
    const deletedItem = localDB[pendingDeleteIdx];
    localDB.splice(pendingDeleteIdx, 1);
    localStorage.setItem('samjin_local_db', JSON.stringify(localDB));
    renderDBTable();
    addLog(`품목 삭제: ${deletedItem.A}`, 'warn');
    if (n8nConfig.autoSync) {
        const url = getWebhookUrl('delete');
        if (url) sendToN8n(url, deletedItem, 'delete');
    }
    closeConfirmModal();
}

/* --- 개별 적용 (로컬 삭제) --- */
function applyDBItem(idx) {
    const appliedItem = localDB[idx];
    localDB.splice(idx, 1);
    localStorage.setItem('samjin_local_db', JSON.stringify(localDB));
    renderDBTable();
    addLog(`품목 적용 완료 (로컬 삭제): ${appliedItem.A}`, 'success');
}

/* --- 모두 적용 --- */
function applyAllDBItems() {
    if (localDB.length === 0) {
        customAlert("적용할 데이터가 없습니다.");
        return;
    }
    const count = localDB.length;
    localDB = [];
    localStorage.setItem('samjin_local_db', JSON.stringify(localDB));
    renderDBTable();
    addLog(`모두 적용 완료: ${count}개 항목 로컬 캐시 삭제됨`, 'success');
    customAlert("모든 품목이 업데이트 & 적용되었습니다.");
}

/* --- 품목 추가 모달 --- */
function openAddItemModal() { document.getElementById('addItemModal').classList.add('active'); }
function closeAddItemModal() {
    document.getElementById('addItemModal').classList.remove('active');
    document.getElementById('newItemName').value = '';
    document.getElementById('newItemSpec').value = '';
    document.getElementById('newItemUnit').value = '';
    document.getElementById('newItemMat').value = '';
    document.getElementById('newItemLab').value = '';
    document.getElementById('newItemNote').value = '';
}

function addNewItem() {
    const name = document.getElementById('newItemName').value.trim();
    const spec = document.getElementById('newItemSpec').value.trim();
    const unit = document.getElementById('newItemUnit').value.trim();
    const mat = document.getElementById('newItemMat').value || '0';
    const lab = document.getElementById('newItemLab').value || '0';
    const note = document.getElementById('newItemNote').value.trim();
    if (!name || !spec || !unit) { customAlert('품명, 규격, 단위는 필수 입력 항목입니다.'); return; }
    const newItem = { A: name, B: spec, C: unit, D: mat, E: lab, F: note };
    localDB.push(newItem);
    localStorage.setItem('samjin_local_db', JSON.stringify(localDB));
    closeAddItemModal();
    renderDBTable();
    addLog(`새 품목 추가: ${name} (${spec})`, 'success');
    if (n8nConfig.autoSync) {
        const url = getWebhookUrl('add');
        if (url) sendToN8n(url, newItem, 'add');
    }
}

/* --- 전체 삭제 모달 --- */
function openDeleteAllModal() {
    if (localDB.length === 0) {
        customAlert("삭제할 데이터가 없습니다.");
        return;
    }
    document.getElementById('deleteAllPassword').value = '';
    document.getElementById('deleteAllModal').classList.add('active');
    setTimeout(() => { document.getElementById('deleteAllPassword').focus(); }, 100);
}

function closeDeleteAllModal() {
    document.getElementById('deleteAllModal').classList.remove('active');
    document.getElementById('deleteAllPassword').value = '';
}

async function checkDeleteAll() {
    const pwd = document.getElementById('deleteAllPassword').value;
    if (pwd !== adminPassword) {
        customAlert("비밀번호가 올바르지 않습니다.");
        document.getElementById('deleteAllPassword').value = '';
        document.getElementById('deleteAllPassword').focus();
        return;
    }
    const itemsToDelete = JSON.parse(JSON.stringify(localDB));
    const count = itemsToDelete.length;
    localDB = [];
    localStorage.setItem('samjin_local_db', JSON.stringify(localDB));
    renderDBTable();
    closeDeleteAllModal();
    addLog(`로컬 DB 전체 삭제 완료 (${count}건)`, 'warn');

    const deleteUrl = getWebhookUrl('delete');
    if (n8nConfig.autoSync && deleteUrl) {
        addLog(`n8n 서버 데이터 삭제 요청 시작... (${count}건)`, 'info');
        for (const item of itemsToDelete) {
            await sendToN8n(deleteUrl, item, 'delete');
        }
        addLog(`n8n 서버 데이터 삭제 작업 종료`, 'success');
        customAlert(`모든 데이터가 삭제되었습니다.\n(업데이트 & 동기화 완료)`);
    } else {
        customAlert("모든 데이터가 삭제되었습니다.\n(업데이트 & 동기화 완료)");
    }
}

/* --- 엑셀 내보내기 (XLSX 라이브러리) --- */
function exportDBToExcel() {
    if (localDB.length === 0) {
        customAlert('내보낼 데이터가 없습니다.');
        return;
    }
    const ws = XLSX.utils.json_to_sheet(localDB.map(item => ({
        '품명': item.A, '규격': item.B, '단위': item.C,
        '재료비': item.D, '노무비': item.E, '비고': item.F
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DB");
    XLSX.writeFile(wb, `SAMJIN_DB_${new Date().toISOString().slice(0, 10)}.xlsx`);
    addLog('DB 엑셀 파일 다운로드 완료', 'success');
}

/* --- 엑셀 가져오기 (XLSX 라이브러리 + 중복 체크) --- */
function importDBFromExcel(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            if (jsonData.length < 2) { customAlert('파일에 유효한 데이터가 없습니다.'); return; }

            let importCount = 0;
            let skipCount = 0;
            const startRow = (String(jsonData[0][0]).includes('품명') || String(jsonData[0][0]).includes('이름')) ? 1 : 0;

            for (let i = startRow; i < jsonData.length; i++) {
                const row = jsonData[i];
                const itemName = row[0] ? String(row[0]).trim() : "";
                const itemSpec = row[1] ? String(row[1]).trim() : "";
                const itemUnit = row[2] ? String(row[2]).trim() : "";
                const itemMat  = row[3] ? String(row[3]).replace(/[^0-9.]/g, '') : "0";
                const itemLab  = row[4] ? String(row[4]).replace(/[^0-9.]/g, '') : "0";
                const itemNote = row[5] ? String(row[5]).trim() : "";
                if (!itemName) { skipCount++; continue; }

                const isDuplicate = localDB.some(item => item.A === itemName && item.B === itemSpec);
                if (isDuplicate) { skipCount++; continue; }

                const newItem = { A: itemName, B: itemSpec, C: itemUnit, D: itemMat, E: itemLab, F: itemNote };
                localDB.push(newItem);
                importCount++;

                if (n8nConfig.autoSync) {
                    const url = getWebhookUrl('add');
                    if (url) sendToN8n(url, newItem, 'import');
                }
            }

            localStorage.setItem('samjin_local_db', JSON.stringify(localDB));
            renderDBTable();
            customAlert(`엑셀 업로드 완료!\n추가: ${importCount}건\n스킵: ${skipCount}건`);
            addLog(`DB 엑셀 업로드 완료: ${importCount}건 추가, ${skipCount}건 스킵`, 'success');
            event.target.value = '';
        } catch (err) {
            customAlert('엑셀 파일 읽기 중 오류가 발생했습니다: ' + err.message);
            addLog('DB 엑셀 업로드 오류: ' + err.message, 'error');
        }
    };
    reader.readAsArrayBuffer(file);
}

/* --- 관리자 설정 모듈 (AdminSettings) --- */

const AdminSettings = (() => {
    const WEBHOOK_TYPES = [
        { value: 'add',    label: 'Add' },
        { value: 'update', label: 'Update' },
        { value: 'delete', label: 'Delete' },
        { value: 'custom', label: 'Custom' }
    ];

    function migrateConfig(cfg) {
        // 기존 단일 webhook 필드 → webhooks 배열로 마이그레이션
        if (!cfg.webhooks) {
            const webhooks = [];
            if (cfg.webhookAdd)    webhooks.push({ type: 'add',    url: cfg.webhookAdd });
            if (cfg.webhookUpdate) webhooks.push({ type: 'update', url: cfg.webhookUpdate });
            if (cfg.webhookDelete) webhooks.push({ type: 'delete', url: cfg.webhookDelete });
            cfg.webhooks = webhooks;
            delete cfg.webhookAdd;
            delete cfg.webhookUpdate;
            delete cfg.webhookDelete;
        }
        return cfg;
    }

    function createWebhookRow(type, url) {
        const div = document.createElement('div');
        div.className = 'webhook-row';

        const select = document.createElement('select');
        WEBHOOK_TYPES.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t.value;
            opt.textContent = t.label;
            if (t.value === type) opt.selected = true;
            select.appendChild(opt);
        });

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'settings-input';
        input.placeholder = 'https://n8n.example.com/webhook/...';
        input.value = url || '';

        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'webhook-delete-btn';
        delBtn.innerHTML = '<i class="ph-bold ph-x"></i>';
        delBtn.onclick = () => div.remove();

        div.appendChild(select);
        div.appendChild(input);
        div.appendChild(delBtn);
        return div;
    }

    function addWebhook(type, url) {
        const list = document.getElementById('webhookList');
        if (!list) return;
        list.appendChild(createWebhookRow(type || 'add', url || ''));
    }

    function getWebhooks() {
        const rows = document.querySelectorAll('#webhookList .webhook-row');
        const result = [];
        rows.forEach(row => {
            const type = row.querySelector('select')?.value || 'custom';
            const url = row.querySelector('input')?.value?.trim() || '';
            if (url) result.push({ type, url });
        });
        return result;
    }

    function save() {
        n8nConfig.sheetsId = document.getElementById('googleSheetsId')?.value || '';
        n8nConfig.autoSync = document.getElementById('enableAutoSync')?.checked || false;
        n8nConfig.webhooks = getWebhooks();

        // 하위 호환: 기존 키 유지
        const findUrl = (t) => (n8nConfig.webhooks.find(w => w.type === t) || {}).url || '';
        n8nConfig.webhookAdd    = findUrl('add');
        n8nConfig.webhookUpdate = findUrl('update');
        n8nConfig.webhookDelete = findUrl('delete');

        localStorage.setItem('samjin_n8n_config', JSON.stringify(n8nConfig));
        customAlert('설정이 저장되었습니다.');
        addLog('관리자 설정 저장 완료', 'success');
    }

    function load() {
        migrateConfig(n8nConfig);

        document.getElementById('googleSheetsId').value = n8nConfig.sheetsId || '';
        document.getElementById('enableAutoSync').checked = n8nConfig.autoSync || false;

        // Webhook 리스트 렌더링
        const list = document.getElementById('webhookList');
        if (list) list.innerHTML = '';

        if (n8nConfig.webhooks && n8nConfig.webhooks.length > 0) {
            n8nConfig.webhooks.forEach(w => addWebhook(w.type, w.url));
        } else {
            // 기본 3행 추가
            addWebhook('add', '');
            addWebhook('update', '');
            addWebhook('delete', '');
        }
    }

    return { addWebhook, save, load };
})();

// 기존 함수명 하위 호환 래퍼
function saveN8nConfig() { AdminSettings.save(); }
function loadN8nConfig() { AdminSettings.load(); }

/* --- DB 검색 모듈 (DBSearch) --- */

const DBSearch = (() => {
    let searchRows = [];  // DB 검색 전용 데이터
    let lastResults = [];
    let sortOrder = 'none'; // 'none' | 'asc' | 'desc'
    let isManualMode = true; // true = 수동(버튼 클릭 시만 검색)
    let isCodeManual = false; // 코드필터 수동 모드 여부

    const SEARCH_SHEET_NAME = 'DB더보기';

    async function fetchSearchDB() {
        const SPREADSHEET_ID = n8nConfig.sheetsId;
        const url = `${APP_CONFIG.OPENSHEET_API_BASE}/${SPREADSHEET_ID}/${encodeURIComponent(SEARCH_SHEET_NAME)}`;
        const status = document.getElementById('extDbStatus');
        const spinner = document.getElementById('extDbSpinner');

        if (spinner) spinner.classList.remove('hidden');
        if (status) { status.textContent = '동기화 중...'; status.classList.remove('hidden'); }
        addLog(`[DB검색] 시트 "${SEARCH_SHEET_NAME}" 로드 요청...`, 'info');

        try {
            const res = await fetch(url);
            if (!res.ok) {
                const err = new Error(`HTTP ${res.status}`);
                err.status = res.status;
                throw err;
            }
            const data = await res.json();

            const getValue = (obj, keys) => {
                const foundKey = Object.keys(obj).find(k => keys.some(kw => k.includes(kw)));
                return foundKey ? obj[foundKey] : null;
            };

            searchRows = data.map(r => ({
                A: getValue(r, ["품명", "이름"]) || "",
                B: getValue(r, ["규격", "사이즈"]) || "",
                C: getValue(r, ["단위"]) || "",
                D: String(getValue(r, ["재료비", "단가"]) || "0").replace(/[^0-9.]/g, ""),
                E: String(getValue(r, ["노무비"]) || "0").replace(/[^0-9.]/g, ""),
                F: getValue(r, ["비고"]) || "",
                G: getValue(r, ["코드"]) || ""
            }));

            if (status) {
                status.innerHTML = `<i class="ph-fill ph-check-circle mr-1"></i> 로드됨 (${searchRows.length}건)`;
                status.classList.remove('hidden');
            }
            addLog(`DB 검색 시트 로드 완료: ${SEARCH_SHEET_NAME} (${searchRows.length}건)`, 'success');
            populateCodeFilter();
        } catch (err) {
            if (status) { status.textContent = '로드 실패'; status.classList.remove('hidden'); }
            addLog(`DB 검색 시트 로드 실패: ${err.message}`, 'error');
            SecurityMonitor.handleApiError('Google Sheets (DB검색)', err.status || 0, err.message);
        } finally {
            if (spinner) spinner.classList.add('hidden');
        }
    }

    function populateCodeFilter() {
        const codes = [...new Set(searchRows.map(r => r.G || '').filter(x => x))].sort();
        const sel = document.getElementById('externalCodeFilter');
        if (sel && !isCodeManual) {
            sel.innerHTML = '<option value="">전체 코드(선택)</option>';
            codes.forEach(c => {
                const o = document.createElement('option');
                o.value = c;
                o.textContent = c;
                sel.appendChild(o);
            });
        }
    }

    function getSourceData() {
        return searchRows.length > 0 ? searchRows : [];
    }

    function readInputs() {
        const mainInput = (document.getElementById('externalSearchInput')?.value || '').trim().toLowerCase();
        const subInput = (document.getElementById('externalSubSearchInput')?.value || '').trim().toLowerCase();
        const remarkInput = (document.getElementById('externalRemarkInput')?.value || '').trim().toLowerCase();
        const codeFilter = (document.getElementById('externalCodeFilter')?.value || '').trim();
        const codeInput = (document.getElementById('externalCodeInput')?.value || '').trim().toLowerCase();
        return { mainInput, subInput, remarkInput, codeFilter: isCodeManual ? '' : codeFilter, codeInput: isCodeManual ? codeInput : '' };
    }

    function filter(sourceData, inputs) {
        const { mainInput, subInput, remarkInput, codeFilter, codeInput } = inputs;

        return sourceData.filter(item => {
            const name = (item.A || '').toString().toLowerCase();
            const spec = (item.B || '').toString().toLowerCase();
            const code = (item.G || '').toString().toLowerCase();

            // 코드 필터 (드롭다운 모드 — G열 기준)
            if (codeFilter && code !== codeFilter.toLowerCase()) {
                return false;
            }

            // 코드 검색 (수동 입력 모드 — G열 부분 일치)
            if (codeInput && !code.includes(codeInput)) {
                return false;
            }

            // 비고 전용 검색
            if (remarkInput) {
                const remark = (item.F || '').toString().toLowerCase();
                if (!remark.includes(remarkInput)) return false;
            }

            // 품명/규격 검색 (AND 검색: 공백으로 구분)
            const targetText = name + ' ' + spec;
            if (mainInput) {
                const keywords = mainInput.split(' ').filter(k => k);
                if (!keywords.every(kw => targetText.includes(kw))) {
                    return false;
                }
            }

            // 추가 검색어 (AND — 품명+규격에 포함되어야 함)
            if (subInput) {
                const subKeywords = subInput.split(' ').filter(k => k);
                if (!subKeywords.every(kw => targetText.includes(kw))) {
                    return false;
                }
            }

            return true;
        });
    }

    function sortResults(results) {
        if (sortOrder === 'none') return results;
        const sorted = [...results];
        sorted.sort((a, b) => {
            const ra = (a.G || '').toString().toLowerCase();
            const rb = (b.G || '').toString().toLowerCase();
            if (ra < rb) return sortOrder === 'asc' ? -1 : 1;
            if (ra > rb) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }

    /* --- 가상 스크롤 엔진 --- */
    const ROW_HEIGHT = 44;       // 행 높이(px)
    const OVERSCAN = 10;         // 뷰포트 밖 여유 행 수
    let vsRafId = null;          // requestAnimationFrame ID
    let vsDelegated = false;     // 이벤트 위임 등록 여부

    function render(results) {
        const viewport = document.getElementById('vsViewport');
        const spacer = document.getElementById('vsSpacer');
        const tbody = document.getElementById('externalResultBody');
        const emptyState = document.getElementById('emptySearchResult');
        const countEl = document.getElementById('searchResultCount');
        if (!viewport || !tbody) return;

        if (countEl) {
            countEl.textContent = results.length > 0 ? `${results.length}건 검색됨` : '';
        }

        if (results.length === 0) {
            spacer.style.height = '0px';
            tbody.innerHTML = '';
            if (emptyState) {
                emptyState.innerHTML = '<i class="ph-duotone ph-magnifying-glass text-4xl mb-2 opacity-50"></i><p>일치하는 항목 없음</p>';
                emptyState.classList.add('visible');
            }
            return;
        }

        if (emptyState) emptyState.classList.remove('visible');

        // 전체 높이 설정 — 스크롤바가 전체 데이터 크기를 반영
        const totalHeight = results.length * ROW_HEIGHT;
        spacer.style.height = totalHeight + 'px';

        // 스크롤 이벤트 핸들러 (throttled via rAF)
        const paintRows = () => {
            const scrollTop = viewport.scrollTop;
            const viewportHeight = viewport.clientHeight;

            const startIdx = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
            const endIdx = Math.min(results.length, Math.ceil((scrollTop + viewportHeight) / ROW_HEIGHT) + OVERSCAN);

            // 실제 DOM에 보이는 행만 렌더
            const fragment = document.createDocumentFragment();
            for (let i = startIdx; i < endIdx; i++) {
                const item = results[i];
                const tr = document.createElement('tr');
                tr.style.height = ROW_HEIGHT + 'px';
                tr.dataset.idx = i;
                tr.className = 'vs-row';
                const matPrice = Number(item.D || 0).toLocaleString();
                const labPrice = Number(item.E || 0).toLocaleString();
                tr.innerHTML = `
                    <td class="font-medium text-slate-700"><div class="cell-ellipsis" title="${item.A}">${item.A}</div></td>
                    <td class="text-slate-600"><div class="cell-ellipsis" title="${item.B}">${item.B}</div></td>
                    <td class="text-center text-slate-500"><div class="cell-ellipsis" title="${item.C}">${item.C}</div></td>
                    <td class="text-center font-mono text-slate-700"><div class="cell-ellipsis" style="text-align:center" title="${matPrice}">${matPrice}</div></td>
                    <td class="text-center font-mono text-slate-700"><div class="cell-ellipsis" style="text-align:center" title="${labPrice}">${labPrice}</div></td>
                    <td class="text-slate-400 text-xs"><div class="cell-ellipsis" title="${item.F}">${item.F}</div></td>
                `;
                fragment.appendChild(tr);
            }
            tbody.innerHTML = '';
            tbody.style.transform = `translateY(${startIdx * ROW_HEIGHT}px)`;
            tbody.appendChild(fragment);
        };

        // 스크롤 리스너 (rAF 스로틀)
        viewport.onscroll = () => {
            if (vsRafId) cancelAnimationFrame(vsRafId);
            vsRafId = requestAnimationFrame(paintRows);
        };

        // 초기 렌더
        viewport.scrollTop = 0;
        paintRows();

        // 이벤트 위임: tbody 클릭 → 재료비, 노무비 클립보드 복사
        if (!vsDelegated) {
            vsDelegated = true;
            document.getElementById('externalResultBody').addEventListener('click', (e) => {
                const tr = e.target.closest('tr');
                if (!tr || !tr.dataset.idx) return;
                const idx = Number(tr.dataset.idx);
                const item = lastResults[idx];
                if (!item) return;

                const matVal = item.D || '0';
                const labVal = item.E || '0';
                const text = `${matVal}\t${labVal}`;

                navigator.clipboard.writeText(text).then(() => {
                    showCopyToast(tr, text);
                }).catch(() => {
                    // fallback
                    const ta = document.createElement('textarea');
                    ta.value = text;
                    document.body.appendChild(ta);
                    ta.select();
                    document.execCommand('copy');
                    document.body.removeChild(ta);
                    showCopyToast(tr, text);
                });
            });
        }
    }

    function showCopyToast(tr, text) {
        // 행 하이라이트
        tr.classList.add('vs-row--copied');
        setTimeout(() => tr.classList.remove('vs-row--copied'), 600);

        // 토스트 메시지
        const toast = document.getElementById('copyToast');
        if (toast) {
            toast.textContent = '복사되었습니다';
            toast.classList.add('visible');
            setTimeout(() => toast.classList.remove('visible'), 1500);
        }
    }

    function execute() {
        const sourceData = getSourceData();
        const emptyState = document.getElementById('emptySearchResult');

        if (sourceData.length === 0) {
            if (emptyState) emptyState.classList.add('visible');
            return;
        }

        const inputs = readInputs();
        lastResults = filter(sourceData, inputs);
        lastResults = sortResults(lastResults);
        render(lastResults);
    }

    function toggleSort() {
        const th = document.getElementById('thRemark');
        if (!th) return;

        if (sortOrder === 'none' || sortOrder === 'desc') {
            sortOrder = 'asc';
            th.className = th.className.replace(/\b(asc|desc)\b/g, '').trim() + ' sortable-th asc';
        } else {
            sortOrder = 'desc';
            th.className = th.className.replace(/\b(asc|desc)\b/g, '').trim() + ' sortable-th desc';
        }

        lastResults = sortResults(lastResults);
        render(lastResults);
    }

    function toggleMode() {
        isManualMode = !isManualMode;
        const btn = document.getElementById('btnSearchMode');
        const icon = document.getElementById('searchModeIcon');
        const label = document.getElementById('searchModeLabel');

        if (isManualMode) {
            btn.classList.remove('active');
            btn.title = '수동 모드: 버튼 클릭 시에만 검색';
            if (icon) icon.className = 'ph-bold ph-hand-tap';
            if (label) label.textContent = '수동';
        } else {
            btn.classList.add('active');
            btn.title = '자동 모드: 입력 시 실시간 검색';
            if (icon) icon.className = 'ph-bold ph-lightning';
            if (label) label.textContent = '자동';
            execute();
        }
        updateAutoListeners();
    }

    function toggleCodeMode() {
        isCodeManual = !isCodeManual;
        const wrapper = document.getElementById('codeFilterWrapper');
        const btn = document.getElementById('btnCodeMode');
        const btnLabel = document.getElementById('codeModeLabel');

        if (!wrapper) return;

        if (isCodeManual) {
            // 드롭다운 → 입력칸으로 교체
            wrapper.innerHTML = '<input type="text" id="externalCodeInput" placeholder="코드 검색 (자유 입력)" class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-700" onkeypress="if(event.key===\'Enter\') DBSearch.execute()">';
            if (btn) btn.classList.add('active');
            if (btnLabel) btnLabel.textContent = '수동';
        } else {
            // 입력칸 → 드롭다운으로 복원
            wrapper.innerHTML = '<select id="externalCodeFilter" class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-700 bg-white"><option value="">전체 코드(선택)</option></select>';
            populateCodeFilter();
            if (btn) btn.classList.remove('active');
            if (btnLabel) btnLabel.textContent = '자동';
        }
        updateAutoListeners();
    }

    let debounceTimer = null;
    const DEBOUNCE_MS = 800;

    function handleAutoSearch() {
        if (isManualMode) return;
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => execute(), DEBOUNCE_MS);
    }

    function updateAutoListeners() {
        const mainInput = document.getElementById('externalSearchInput');
        const subInput = document.getElementById('externalSubSearchInput');
        const remarkInput = document.getElementById('externalRemarkInput');
        const codeFilter = document.getElementById('externalCodeFilter');
        const codeInput = document.getElementById('externalCodeInput');

        const handler = isManualMode ? null : handleAutoSearch;

        [mainInput, subInput, remarkInput, codeInput].forEach(el => {
            if (!el) return;
            el.removeEventListener('input', handleAutoSearch);
            if (handler) el.addEventListener('input', handler);
        });
        if (codeFilter) {
            codeFilter.removeEventListener('change', handleAutoSearch);
            if (handler) codeFilter.addEventListener('change', handler);
        }
    }

    return { execute, toggleSort, toggleCodeMode, fetchSearchDB };
})();

// DB 검색 탭 초기화 (기존 함수명 유지 — switchTab에서 호출)
function initExternalDB() {
    DBSearch.fetchSearchDB();
}

// 하위 호환: 기존 searchExternalDB 호출을 DBSearch.execute로 연결
function searchExternalDB() { DBSearch.execute(); }
function toggleRemarkSearch() { /* 제거됨 — 비고 전용 검색창으로 대체 */ }

/* =========================================
   4. 보안 감시 모듈 (SecurityMonitor)
   ========================================= */

const SecurityMonitor = (() => {
    const LOG_KEY = 'samjin_security_log';
    const MAX_LOG = 50;

    function getLog() {
        return JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
    }

    function saveLog(log) {
        localStorage.setItem(LOG_KEY, JSON.stringify(log.slice(-MAX_LOG)));
    }

    function record(entry) {
        const log = getLog();
        log.push({
            timestamp: new Date().toISOString(),
            ...entry
        });
        saveLog(log);
    }

    function setStatus(level, message) {
        const banner = document.getElementById('securityBanner');
        const light = document.getElementById('securityLight');
        const bannerText = document.getElementById('securityBannerText');
        const dot = document.getElementById('securityDot');
        const statusText = document.getElementById('securityStatusText');

        if (dot) {
            dot.className = 'security-dot';
            if (level !== 'safe') dot.classList.add(level);
        }
        if (statusText) {
            const labels = { safe: '정상', warn: '주의', danger: '경고' };
            statusText.textContent = labels[level] || '정상';
            statusText.style.color = level === 'danger' ? 'var(--security-danger)' : level === 'warn' ? 'var(--security-warn)' : '';
        }

        if (level === 'safe') {
            if (banner) banner.classList.add('hidden');
            return;
        }

        if (banner) {
            banner.className = 'security-banner ' + level;
            banner.classList.remove('hidden');
        }
        if (light) {
            light.className = 'security-light ' + level;
        }
        if (bannerText) {
            bannerText.textContent = message;
        }
    }

    function handleApiError(source, status, message) {
        const isUnauthorized = status === 401 || status === 403;
        const isRateLimit = status === 429;

        if (isUnauthorized) {
            record({ level: 'danger', source, status, message: 'Unauthorized access detected' });
            setStatus('danger', `API 보안 경고 — [${source}] 인증 실패 (${status}): 무단 접근 시도가 감지되었습니다.`);
            addLog(`보안 경고: ${source} API 무단 접근 시도 감지 (HTTP ${status})`, 'error');
        } else if (isRateLimit) {
            record({ level: 'warn', source, status, message: 'Rate limit exceeded' });
            setStatus('warn', `API 주의 — [${source}] 요청 한도 초과 (429): 비정상적 트래픽이 감지되었습니다.`);
            addLog(`보안 주의: ${source} API 요청 한도 초과`, 'error');
        } else if (status >= 400) {
            record({ level: 'warn', source, status, message });
            setStatus('warn', `API 주의 — [${source}] 요청 오류 (${status}): ${message}`);
        }
    }

    function dismiss() {
        const banner = document.getElementById('securityBanner');
        if (banner) banner.classList.add('hidden');
    }

    function reset() {
        setStatus('safe', '');
    }

    return { handleApiError, dismiss, reset, record, setStatus };
})();

/* =========================================
   5. 실시간 환율 모듈 (ExchangeRate)
   ========================================= */

const ExchangeRate = (() => {
    const API_URL = APP_CONFIG.EXCHANGE_RATE_API;

    function formatNumber(num) {
        return num.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function setLoading(isLoading) {
        const btn = document.getElementById('exchangeRefreshBtn');
        if (btn) btn.classList.toggle('loading', isLoading);
    }

    function renderCard(id, rate, prevRate) {
        const rateEl = document.getElementById(`rate-${id}`);
        const subEl = document.getElementById(`rate-${id}-sub`);
        if (!rateEl || !subEl) return;

        rateEl.textContent = formatNumber(rate) + ' 원';

        if (prevRate !== null) {
            const diff = rate - prevRate;
            const pct = ((diff / prevRate) * 100).toFixed(2);
            const isUp = diff > 0;
            const arrow = isUp ? '▲' : '▼';
            subEl.textContent = `${arrow} ${formatNumber(Math.abs(diff))} (${isUp ? '+' : ''}${pct}%)`;
            subEl.className = 'exchange-card__sub ' + (isUp ? 'up' : 'down');
        } else {
            subEl.textContent = '이전 데이터 없음';
            subEl.className = 'exchange-card__sub';
        }
    }

    async function fetchRates() {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            if (!res.ok) {
                SecurityMonitor.handleApiError('Exchange Rate', res.status, `HTTP ${res.status}`);
                throw new Error(`API 요청 실패 (${res.status})`);
            }
            const data = await res.json();

            const krwPerUsd = data.rates.KRW;
            const krwPerJpy = data.rates.KRW / data.rates.JPY;

            const prev = JSON.parse(localStorage.getItem('samjin_prev_rates') || 'null');

            renderCard('usd', krwPerUsd, prev ? prev.usd : null);
            renderCard('jpy', krwPerJpy, prev ? prev.jpy : null);

            localStorage.setItem('samjin_prev_rates', JSON.stringify({ usd: krwPerUsd, jpy: krwPerJpy }));

            const timeEl = document.getElementById('exchangeUpdateTime');
            if (timeEl) {
                const now = new Date().toLocaleString('ko-KR', { hour12: false });
                timeEl.textContent = '마지막 갱신: ' + now;
            }

            addLog(`환율 정보 갱신 완료 — USD ${formatNumber(krwPerUsd)}`, 'success');
        } catch (err) {
            addLog('환율 정보 불러오기 실패: ' + err.message, 'error');
            document.getElementById('rate-usd-sub').textContent = '조회 실패';
            document.getElementById('rate-jpy-sub').textContent = '조회 실패';
        } finally {
            setLoading(false);
        }
    }

    return { refresh: fetchRates };
})();

/* =========================================
   5-6. 자유게시판 (Board)
   ========================================= */
const Board = (() => {
    let currentFilter = '전체';
    let searchKeyword = '';
    let currentPostId = null;

    const INITIAL_POSTS = [
        {
            id: 0,
            category: '공지',
            nickname: '관리자',
            title: 'SAMJIN 통합 견적 플랫폼 운영 및 보안 지침 안내',
            content: `안녕하세요, 개발자 K.95입니다.\n\n본 플랫폼은 기계/소방 설비 견적 업무의 효율을 높이기 위해 개인적으로 개발된 내부 전용 업무 보조 도구입니다. 원활하고 안정적인 시스템 운영을 위해 아래의 이용 지침을 반드시 준수해 주시기 바랍니다.\n\n1. 외부 유출 금지: 본 시스템의 접속 주소 및 데이터는 사내 업무 전용으로만 한정됩니다.\n\n2. 데이터 보안 안내: 견적 매칭을 위해 업로드하시는 엑셀 데이터는 실시간 매칭 목적으로만 일시적으로 사용되며, 별도의 수집이나 저장을 하지 않습니다.\n\n3. 오류 제보 및 피드백: 시스템 버그나 기타 데이터 오류를 발견하시면 '개선제안' 카테고리로 글을 남겨주세요. 확인 후 검토하여 적극 반영하겠습니다.`,
            date: new Date('2026-02-16T09:00:00'),
            views: 1245,
            comments: [{ nickname: 'K.95', text: '정책 준수 부탁드립니다!', date: new Date('2026-02-16T10:30:00') }]
        }
    ];

    let posts = [...INITIAL_POSTS];

    // ── 필터 & 검색 ──────────────────────────────
    function setFilter(category) {
        currentFilter = category;
        document.querySelectorAll('.board-tab-btn').forEach(btn => btn.classList.remove('active'));
        const activeTab = document.getElementById(`board-tab-${category}`);
        if (activeTab) activeTab.classList.add('active');
        renderPosts();
    }

    function onSearch(keyword) {
        searchKeyword = keyword.trim().toLowerCase();
        renderPosts();
    }

    // ── 렌더링 ───────────────────────────────────
    function renderPosts() {
        const container = document.getElementById('boardPostList');
        if (!container) return;
        container.innerHTML = '';

        const pinnedNotices = posts.filter(p => p.category === '공지');
        let displayPosts = [];

        if (currentFilter === '전체') {
            displayPosts = posts.filter(p => p.category !== '공지');
            pinnedNotices.forEach(p => { if (matchesSearch(p)) container.insertAdjacentHTML('beforeend', createPostCard(p)); });
        } else if (currentFilter === '공지') {
            displayPosts = pinnedNotices;
        } else {
            displayPosts = posts.filter(p => p.category === currentFilter);
        }

        displayPosts.filter(matchesSearch).forEach(p => container.insertAdjacentHTML('beforeend', createPostCard(p)));

        if (container.innerHTML === '') {
            container.innerHTML = `<div class="py-20 text-center text-slate-400 font-medium">해당 카테고리에 게시글이 없습니다.</div>`;
        }
    }

    function matchesSearch(post) {
        if (!searchKeyword) return true;
        return post.title.toLowerCase().includes(searchKeyword) || post.content.toLowerCase().includes(searchKeyword) || post.nickname.toLowerCase().includes(searchKeyword);
    }

    function createPostCard(post) {
        const isNotice = post.category === '공지';
        const badgeClass = isNotice ? 'badge-notice' :
            post.category === '개선제안' ? 'badge-suggestion' :
            post.category === '질문'    ? 'badge-question' : 'badge-general';
        const cardBg  = isNotice ? 'bg-rose-50 border-rose-100' : 'bg-white border-slate-100';
        const iconCls = isNotice          ? 'ph-fill ph-megaphone text-rose-500 bg-white' :
                        post.category === '개선제안' ? 'ph-fill ph-lightbulb text-amber-400 bg-amber-50' :
                        post.category === '질문'    ? 'ph-fill ph-question text-rose-500 bg-rose-50' :
                        'ph ph-chat-text text-slate-400 bg-slate-50';
        return `
            <div class="post-card ${cardBg} border p-4 rounded-2xl flex items-center justify-between shadow-sm cursor-pointer animate-fade-in" onclick="Board.viewPostDetail(${post.id})">
                <div class="flex items-center gap-4 min-w-0">
                    <span class="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                        <i class="${iconCls} text-xl"></i>
                    </span>
                    <div class="min-w-0">
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="${badgeClass} px-2 py-0.5 rounded text-[10px] font-bold uppercase">${post.category}</span>
                            <h3 class="font-medium text-slate-800 tracking-tight truncate">${post.title}</h3>
                        </div>
                        <p class="text-xs text-slate-400 mt-1">${post.nickname} | ${formatTime(post.date)} | 조회 ${post.views}</p>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-slate-400 shrink-0 ml-4">
                    <i class="ph ph-chat-circle text-lg"></i>
                    <span class="text-xs font-bold">${post.comments.length}</span>
                </div>
            </div>`;
    }

    function formatTime(date) {
        const diff = Date.now() - date;
        const h = Math.floor(diff / 3600000);
        if (h < 1) {
            const m = Math.floor(diff / 60000);
            return m <= 0 ? '방금 전' : `${m}분 전`;
        }
        if (h < 24) return `${h}시간 전`;
        const y = date.getFullYear(), mo = String(date.getMonth() + 1).padStart(2, '0'), d = String(date.getDate()).padStart(2, '0');
        return `${y}.${mo}.${d}`;
    }

    // ── 상세보기 ─────────────────────────────────
    function viewPostDetail(id) {
        const post = posts.find(p => p.id === id);
        if (!post) return;
        currentPostId = id;
        post.views++;

        const badgeClass = post.category === '공지' ? 'badge-notice' :
            post.category === '개선제안' ? 'badge-suggestion' :
            post.category === '질문'    ? 'badge-question' : 'badge-general';

        document.getElementById('boardDetailHeader').innerHTML = `
            <span class="${badgeClass} px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-2 inline-block">${post.category}</span>
            <h3 class="text-xl font-bold text-slate-900">${post.title}</h3>
            <p class="text-xs text-slate-400 mt-1">${post.nickname} | ${post.date.toLocaleString()}</p>`;
        document.getElementById('boardDetailBody').innerText = post.content;
        document.getElementById('boardDetailModal').style.display = 'flex';
        renderComments();
        renderPosts();
    }

    // ── 댓글 ─────────────────────────────────────
    function renderComments() {
        const post = posts.find(p => p.id === currentPostId);
        if (!post) return;
        const container = document.getElementById('boardCommentList');
        document.getElementById('boardCommentCount').innerText = post.comments.length;
        container.innerHTML = '';
        if (post.comments.length === 0) {
            container.innerHTML = `<p class="text-center text-xs text-slate-300 py-4">첫 번째 댓글을 남겨보세요.</p>`;
            return;
        }
        post.comments.forEach(c => {
            container.insertAdjacentHTML('beforeend', `
                <div class="bg-white border border-slate-100 p-3 rounded-2xl animate-fade-in">
                    <div class="flex items-center justify-between mb-1">
                        <span class="text-xs font-bold text-indigo-600">${c.nickname}</span>
                        <span class="text-[10px] text-slate-300">${formatTime(c.date)}</span>
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">${c.text}</p>
                </div>`);
        });
    }

    function submitComment() {
        const nickname = document.getElementById('boardCommentNickname').value.trim() || '익명';
        const text = document.getElementById('boardCommentInput').value.trim();
        if (!text) return;
        const post = posts.find(p => p.id === currentPostId);
        if (!post) return;
        post.comments.push({ nickname, text, date: new Date() });
        document.getElementById('boardCommentInput').value = '';
        renderComments();
        renderPosts();
    }

    // ── 글쓰기 ───────────────────────────────────
    function submitPost() {
        const category = document.getElementById('boardPostCategory').value;
        const nickname = document.getElementById('boardPostNickname').value.trim() || '익명';
        const title    = document.getElementById('boardPostTitle').value.trim();
        const content  = document.getElementById('boardPostContent').value.trim();
        if (!title || !content) { alert('제목과 내용을 입력해주세요.'); return; }
        posts.unshift({ id: Date.now(), category, nickname, title, content, date: new Date(), views: 0, comments: [] });
        renderPosts();
        closeWriteModal();
        // 폼 초기화
        document.getElementById('boardPostNickname').value = '';
        document.getElementById('boardPostTitle').value = '';
        document.getElementById('boardPostContent').value = '';
    }

    // ── 모달 열기/닫기 ────────────────────────────
    function openWriteModal()  { document.getElementById('boardWriteModal').style.display = 'flex'; }
    function closeWriteModal() { document.getElementById('boardWriteModal').style.display = 'none'; }
    function closeDetailModal(){ document.getElementById('boardDetailModal').style.display = 'none'; currentPostId = null; }

    return { setFilter, onSearch, renderPosts, viewPostDetail, submitComment, submitPost, openWriteModal, closeWriteModal, closeDetailModal };
})();

/* =========================================
   5-7. 품셈 계산기 (PumsumCalculator)
   ========================================= */

let pumsumDB = [];

async function syncPumsumData() {
    const syncBtn = document.getElementById('pumsumSyncBtn');
    const syncStatus = document.getElementById('pumsumSyncStatus');
    const loadingEl = document.getElementById('pumsumLoading');
    const resultArea = document.getElementById('pumsumResultArea');
    const emptyState = document.getElementById('pumsumEmptyState');

    syncBtn.disabled = true;
    syncStatus.textContent = '동기화 중...';
    syncStatus.style.color = '#6b7280';
    if (loadingEl) { loadingEl.classList.remove('hidden'); }
    if (resultArea) resultArea.classList.add('hidden');
    if (emptyState) emptyState.classList.add('hidden');

    const sheetId = APP_CONFIG.PUMSUM_SHEET_ID;
    const sheetName = APP_CONFIG.PUMSUM_SHEET_NAME;
    const url = `${APP_CONFIG.OPENSHEET_API_BASE}/${sheetId}/${encodeURIComponent(sheetName)}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            const err = new Error(`HTTP ${res.status}`);
            err.status = res.status;
            throw err;
        }
        const data = await res.json();
        pumsumDB = data;

        const headerEl = document.getElementById('pumsumTableHeader');
        const bodyEl = document.getElementById('pumsumResultBody');
        const statTotal = document.getElementById('pumsumStatTotal');
        const statScore = document.getElementById('pumsumStatScore');

        if (data.length > 0) {
            const keys = Object.keys(data[0]);
            if (headerEl) {
                headerEl.innerHTML = `<tr>${keys.map(k =>
                    `<th class="px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 whitespace-nowrap sticky top-0">${k}</th>`
                ).join('')}</tr>`;
            }
            if (bodyEl) {
                bodyEl.innerHTML = data.map(row =>
                    `<tr class="hover:bg-blue-50 cursor-default">${keys.map(k =>
                        `<td class="px-3 py-1.5 border border-slate-100 text-xs text-slate-700 whitespace-nowrap">${row[k] ?? ''}</td>`
                    ).join('')}</tr>`
                ).join('');
            }
            if (resultArea) resultArea.classList.remove('hidden');
            if (emptyState) emptyState.classList.add('hidden');
            if (statTotal) statTotal.textContent = data.length;
            if (statScore) statScore.textContent = data.length;
        } else {
            if (emptyState) { emptyState.textContent = '시트에 데이터가 없습니다.'; emptyState.classList.remove('hidden'); }
        }

        syncStatus.textContent = `완료: ${data.length}건 불러옴`;
        syncStatus.style.color = '#16a34a';
    } catch (err) {
        syncStatus.textContent = '오류: ' + err.message;
        syncStatus.style.color = '#dc2626';
        if (emptyState) { emptyState.textContent = '데이터 불러오기 실패: ' + err.message; emptyState.classList.remove('hidden'); }
        SecurityMonitor.handleApiError('PumsumSheets', err.status || 0, err.message);
    } finally {
        syncBtn.disabled = false;
        if (loadingEl) loadingEl.classList.add('hidden');
    }
}

function exportPumsumToExcel() {
    if (!pumsumDB || pumsumDB.length === 0) {
        alert('먼저 품셈 DB를 동기화하세요.');
        return;
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(pumsumDB);
    XLSX.utils.book_append_sheet(wb, ws, APP_CONFIG.PUMSUM_SHEET_NAME || 'Table종합');
    const dateStr = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `품셈_DB_${dateStr}.xlsx`);
}

// 초기화 이벤트
window.onload = () => {
    SecurityMonitor.reset();
    fetchDB();
    loadN8nConfig();
    ExchangeRate.refresh();
    document.getElementById("sheetSelect")?.addEventListener("change", fetchDB);
    document.getElementById("searchDB")?.addEventListener("input", renderDBTable);
};

/* =========================================
   6. 알림 시스템 (NotificationSystem)
   ========================================= */

const NotificationSystem = (() => {
    const WEBHOOK_URL = (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.N8N_NOTIFICATION_WEBHOOK)
        ? APP_CONFIG.N8N_NOTIFICATION_WEBHOOK : '';
    const btn = document.getElementById('notificationBtn');
    const badge = document.getElementById('notificationBadge');
    const dropdown = document.getElementById('notificationDropdown');
    const listEl = document.getElementById('notificationList');
    const countEl = document.getElementById('notificationCountText');
    let isOpen = false;

    function init() {
        if(!btn || !dropdown) return;
        btn.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });
        document.addEventListener('click', (e) => { if(isOpen && !document.getElementById('notificationContainer').contains(e.target)) close(); });
        fetchNotifications();
    }
    function toggle() { isOpen = !isOpen; isOpen ? (dropdown.classList.remove('hidden'), fetchNotifications()) : dropdown.classList.add('hidden'); }
    function close() { isOpen = false; dropdown.classList.add('hidden'); }

    async function fetchNotifications() {
        try {
            const res = await fetch(WEBHOOK_URL);
            if(!res.ok) throw new Error("서버 응답 에러 (" + res.status + ")");
            const data = await res.json();
            updateUI(data);
        } catch (e) {
            console.error(e);
            listEl.innerHTML = '<li class="px-4 py-4 text-center text-xs text-red-500">연동 실패<br><span class="text-[10px] text-gray-400">(주소창 자물쇠 -> 안전하지 않은 콘텐츠 허용 필요)</span></li>';
        }
    }

    function updateUI(data) {
        if(!Array.isArray(data)) return;
        const count = data.length;
        count > 0 ? (badge.classList.remove('hidden'), countEl.textContent = count+'건') : (badge.classList.add('hidden'), countEl.textContent = '0건');
        listEl.innerHTML = '';
        if(count === 0) { listEl.innerHTML = '<li class="px-4 py-8 text-center text-gray-400 text-xs">새로운 알림이 없습니다.</li>'; return; }
        data.forEach(item => {
            const li = document.createElement('li');
            li.className = 'notification-item px-4 py-3 cursor-pointer border-b border-gray-50 last:border-0';
            li.innerHTML = `<div class="text-sm font-medium text-gray-800 truncate">${item.title || '제목 없음'}</div><div class="text-[10px] text-gray-400 flex items-center gap-1"><i class="ph-fill ph-clock"></i> ${item.date || '-'}</div>`;
            listEl.appendChild(li);
        });
    }
    return { init, fetchNotifications };
})();
document.addEventListener('DOMContentLoaded', () => NotificationSystem.init());