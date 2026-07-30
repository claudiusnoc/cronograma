// MGCEN00 - Hourly Grid Dashboard (Full System Integrated Confirmation Dialogs)

const STORAGE_KEY = 'cronograma_mgcen00_v1';
const LEGACY_STORAGE_KEYS = ['cronograma_hourly_grid_v15', 'cronograma_hourly_grid_v14', 'cronograma_hourly_grid_v13', 'cronograma_hourly_grid'];

let isZoomOutMode = localStorage.getItem('mgcen00_zoom_out') === 'true';

function getRowHeight() {
    return isZoomOutMode ? 24 : 42;
}

// 10 Row slots definitions (08:00 to 18:00) with 1-Hour Lunch (12:00 - 13:00)
const TIME_SLOTS = [
    { row: 1, time: '08:00' },
    { row: 2, time: '09:00' },
    { row: 3, time: '10:00' },
    { row: 4, time: '11:00' },
    { row: 5, time: '12:00', isLunch: true }, // Pausa para Almoço (12:00 - 13:00)
    { row: 6, time: '13:00' },
    { row: 7, time: '14:00' },
    { row: 8, time: '15:00' },
    { row: 9, time: '16:00' },
    { row: 10, time: '17:00' }
];

const defaultData = {
    title: 'Cronograma Geral de Manutenção Preventiva',
    subtitle: 'Sistemas de Climatização (HVAC), Refrigeração e Infraestrutura Elétrica • Unidade BHE ES',
    weeks: [
        // SEMANA 1
        {
            id: 'w1',
            title: 'Semana 1 - Sistemas Centrais e Energia',
            tasks: [
                { id: 'w1_t1', day: 1, startRow: 1, duration: 3, title: 'GMG 01 a 05', desc: 'Teste s/ carga (15min/cada)', category: 'cat-elec' },
                { id: 'w1_t2', day: 1, startRow: 6, duration: 2, title: 'CHILLER 01 (BAG01)', desc: 'Inspeção / Preventiva', category: 'cat-hvac' },
                { id: 'w1_t3', day: 1, startRow: 8, duration: 3, title: 'CHILLER 02 (BAG02)', desc: 'Inspeção / Preventiva', category: 'cat-hvac' },
                { id: 'w1_t4', day: 2, startRow: 1, duration: 4, title: 'CAG: CHILLER 03 (BAG03)', desc: 'Inspeção geral CAG', category: 'cat-hvac' },
                { id: 'w1_t5', day: 2, startRow: 6, duration: 4, title: 'AC-SALA CAG', desc: 'Manutenção Preventiva', category: 'cat-hvac' },
                { id: 'w1_t6', day: 3, startRow: 1, duration: 4, title: 'Torres/abrandador: TORRE01', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w1_t7', day: 3, startRow: 6, duration: 4, title: 'TORRE02', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w1_t8', day: 4, startRow: 1, duration: 4, title: 'TORRE03', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w1_t9', day: 4, startRow: 6, duration: 4, title: 'Abrandador', desc: 'Reposição de sal', category: 'cat-routine' },
                { id: 'w1_t10', day: 5, startRow: 1, duration: 4, title: 'SPLIT: AC-601 (A, B, C, D)', desc: 'Manutenção de Splits', category: 'cat-hvac' },
                { id: 'w1_t11', day: 5, startRow: 6, duration: 4, title: 'RELATORIO INFRATEL', desc: 'Emissão e Validação de Relatórios', category: 'cat-routine' }
            ]
        },
        // SEMANA 2
        {
            id: 'w2',
            title: 'Semana 2 - Áreas Críticas e BBIP',
            tasks: [
                { id: 'w2_t1', day: 1, startRow: 1, duration: 2, title: 'GMG 01 a 05 / AC 5° ANDAR', desc: 'Teste s/ carga (15min/cada)', category: 'cat-elec' },
                { id: 'w2_t2', day: 1, startRow: 3, duration: 1, title: 'Abrandador', desc: 'Reposição de sal', category: 'cat-routine' },
                { id: 'w2_t3', day: 1, startRow: 4, duration: 1, title: 'AC-501.1-A', desc: 'Manutenção Climatização', category: 'cat-hvac' },
                { id: 'w2_t4', day: 1, startRow: 6, duration: 4, title: 'AC-501.1-B', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w2_t5', day: 2, startRow: 1, duration: 4, title: 'AC 5° ANDAR: AC-501.1-C', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w2_t6', day: 2, startRow: 6, duration: 4, title: 'AC-501.1-D', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w2_t7', day: 3, startRow: 1, duration: 4, title: 'AC 6° ANDAR: AC-604-A', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w2_t8', day: 3, startRow: 6, duration: 4, title: 'AC-604-B', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w2_t9', day: 4, startRow: 1, duration: 4, title: 'AC 6° ANDAR: AC-604-C', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w2_t10', day: 4, startRow: 6, duration: 4, title: 'AC-604-E-BBIP', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w2_t11', day: 5, startRow: 1, duration: 4, title: 'AC 604-F - BBIP', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w2_t12', day: 5, startRow: 6, duration: 4, title: 'AC 604-G - BBIP', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' }
            ]
        },
        // SEMANA 3
        {
            id: 'w3',
            title: 'Semana 3 - Séries 400 a 600',
            tasks: [
                { id: 'w3_t1', day: 1, startRow: 1, duration: 2, title: 'GMG 01 a 05 e AC 7° ANDAR', desc: 'Teste s/ carga (15min/cada)', category: 'cat-elec' },
                { id: 'w3_t2', day: 1, startRow: 3, duration: 1, title: 'AC-606.1-A', desc: 'Manutenção Preventiva', category: 'cat-hvac' },
                { id: 'w3_t3', day: 1, startRow: 4, duration: 1, title: 'AC-606.1-B', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w3_t4', day: 2, startRow: 1, duration: 4, title: 'AC-606.2-A', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w3_t5', day: 2, startRow: 6, duration: 4, title: 'Abrandador', desc: 'Reposição de sal', category: 'cat-routine' },
                { id: 'w3_t6', day: 3, startRow: 1, duration: 4, title: 'AC 7° ANDAR: AC-701.1-A', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w3_t7', day: 3, startRow: 6, duration: 4, title: 'AC-701.1-B', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w3_t8', day: 4, startRow: 1, duration: 4, title: 'AC 7° ANDAR: AC-701.1-C', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w3_t9', day: 4, startRow: 6, duration: 4, title: 'AC-701.1-D', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w3_t10', day: 5, startRow: 1, duration: 4, title: 'AC 7° ANDAR: AC-701.1-E & F', desc: 'Revisão Dupla', category: 'cat-hvac' },
                { id: 'w3_t11', day: 5, startRow: 6, duration: 4, title: 'RELATORIO INFRATEL', desc: 'Emissão e Validação de Relatórios', category: 'cat-routine' }
            ]
        },
        // SEMANA 4
        {
            id: 'w4',
            title: 'Semana 4 - Séries 700 e 800 + Fechamento',
            tasks: [
                { id: 'w4_t1', day: 1, startRow: 1, duration: 2, title: 'GMG 01 a 05', desc: 'Teste s/ carga (15min/cada)', category: 'cat-elec' },
                { id: 'w4_t2', day: 1, startRow: 3, duration: 1, title: 'Abrandador', desc: 'Reposição de sal', category: 'cat-routine' },
                { id: 'w4_t3', day: 1, startRow: 4, duration: 1, title: 'AC-706.1-A', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w4_t4', day: 2, startRow: 1, duration: 4, title: 'AC 7° ANDAR: AC-706.1-B', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w4_t5', day: 2, startRow: 6, duration: 4, title: 'AC-706.1-C', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w4_t6', day: 3, startRow: 1, duration: 4, title: 'AC 8° ANDAR: AC-801.1-A', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w4_t7', day: 3, startRow: 6, duration: 4, title: 'AC-801.1-B', desc: 'RELATORIO INFRATEL', category: 'cat-hvac' },
                { id: 'w4_t8', day: 4, startRow: 1, duration: 4, title: 'AC 8° ANDAR: AC-SUBESTAÇÃO 1', desc: 'RELATORIO INFRATEL', category: 'cat-elec' },
                { id: 'w4_t9', day: 4, startRow: 6, duration: 4, title: 'AC-SUBESTAÇÃO 2', desc: 'RELATORIO INFRATEL', category: 'cat-elec' },
                { id: 'w4_t10', day: 5, startRow: 1, duration: 2, title: 'SPLIT 01 - SALA INVERSOR DAS TORRES', desc: 'Manutenção Especial', category: 'cat-hvac' },
                { id: 'w4_t11', day: 5, startRow: 3, duration: 1, title: 'SPLIT 1 - BBIP', desc: 'Preventiva BBIP', category: 'cat-hvac' },
                { id: 'w4_t12', day: 5, startRow: 4, duration: 1, title: 'SPLIT 2 - BBIP', desc: 'Preventiva BBIP', category: 'cat-hvac' },
                { id: 'w4_t13', day: 5, startRow: 6, duration: 4, title: 'SPLIT 3 - BBIP & FECHAMENTO', desc: 'Finalização do Ciclo Mensal', category: 'cat-hvac' }
            ]
        },
        // SEMANA 5
        {
            id: 'w5',
            title: 'Semana 5 - Quadros Elétricos AC',
            tasks: [
                { id: 'w5_t1', day: 1, startRow: 1, duration: 2, title: 'QDCA#QAC-604 / 606', desc: 'Inspeção Quadros AC', category: 'cat-elec' },
                { id: 'w5_t2', day: 1, startRow: 3, duration: 2, title: 'QDCA#QAC-701 / 706', desc: 'Inspeção Quadros AC', category: 'cat-elec' },
                { id: 'w5_t3', day: 1, startRow: 6, duration: 2, title: 'QDCA#QAC-TORRES', desc: 'Quadros AC Torres', category: 'cat-elec' },
                { id: 'w5_t4', day: 1, startRow: 8, duration: 3, title: 'QDCA#QGAG-02', desc: 'Quadro GAG 02', category: 'cat-elec' },
                { id: 'w5_t5', day: 2, startRow: 1, duration: 2, title: 'QDCA#QGAG-01 / 03', desc: 'Quadros GAG', category: 'cat-elec' },
                { id: 'w5_t6', day: 2, startRow: 3, duration: 2, title: 'QDCA#QDAC-604A / 604B', desc: 'Quadros DAC 604', category: 'cat-elec' },
                { id: 'w5_t7', day: 2, startRow: 6, duration: 2, title: 'QDCA#QAC-406', desc: 'Quadro AC 406', category: 'cat-elec' },
                { id: 'w5_t8', day: 2, startRow: 8, duration: 3, title: 'QDCA#QAC-801 / 501', desc: 'Quadros AC 801 e 501', category: 'cat-elec' }
            ]
        }
    ]
};

let appData = null;

// Track drag/resize state
let wasDraggingOrResizing = false;

// Track task card being edited inline
let editingInlineTaskId = null;

// SYSTEM CLIPBOARD & CONTEXT MENU STATE
let taskClipboard = null; // { action: 'copy'|'cut', task, sourceWeekId }
let selectedTaskContext = null; // { task, weekId }
let selectedSlotContext = null; // { weekId, day, row }

// UNDO & REDO SYSTEM STACKS
const historyStack = [];
const redoStack = [];
const MAX_HISTORY = 40;

function recordState() {
    if (appData) {
        historyStack.push(JSON.stringify(appData));
        if (historyStack.length > MAX_HISTORY) {
            historyStack.shift();
        }
        redoStack.length = 0;
    }
}

function undoAction() {
    if (historyStack.length > 0) {
        redoStack.push(JSON.stringify(appData));
        appData = JSON.parse(historyStack.pop());
        saveData();
        renderHourlyGridDashboard();
        showToast('↩️ Ação desfeita (Ctrl+Z)');
    } else {
        showToast('ℹ️ Nenhuma ação anterior para desfazer');
    }
}

function redoAction() {
    if (redoStack.length > 0) {
        historyStack.push(JSON.stringify(appData));
        appData = JSON.parse(redoStack.pop());
        saveData();
        renderHourlyGridDashboard();
        showToast('↪️ Ação refeita (Ctrl+Y)');
    } else {
        showToast('ℹ️ Nenhuma ação para refazer');
    }
}

let toastTimer = null;
function showToast(msg) {
    const toast = document.getElementById('system-toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toast.classList.remove('toast-exit');
    toastMsg.textContent = msg;
    toast.classList.remove('hidden');
    // Force re-trigger entrance animation
    toast.style.animation = 'none';
    toast.offsetHeight; // reflow
    toast.style.animation = '';

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('toast-exit');
        }, 200);
    }, 2000);
}

/* UNIVERSAL SYSTEM INTEGRATED CONFIRMATION DIALOG (PROMISE ENGINE) */
function confirmSystemDialog(title, message, confirmText = 'Excluir', isDanger = true) {
    return new Promise((resolve) => {
        const sysModal = document.getElementById('system-confirm-modal');
        const sysTitle = document.getElementById('sys-confirm-title');
        const sysMsg = document.getElementById('sys-confirm-message');
        const btnCancel = document.getElementById('btn-sys-confirm-cancel');
        const btnAction = document.getElementById('btn-sys-confirm-action');
        const btnCloseX = document.getElementById('btn-sys-confirm-x');

        sysTitle.textContent = title;
        sysMsg.textContent = message;
        btnAction.textContent = confirmText;

        if (isDanger) {
            btnAction.className = 'btn btn-danger';
        } else {
            btnAction.className = 'btn btn-primary';
        }

        const cleanup = () => {
            sysModal.classList.add('hidden');
            btnCancel.removeEventListener('click', onCancel);
            btnAction.removeEventListener('click', onConfirm);
            btnCloseX.removeEventListener('click', onCancel);
        };

        const onCancel = () => {
            cleanup();
            resolve(false);
        };

        const onConfirm = () => {
            cleanup();
            resolve(true);
        };

        btnCancel.addEventListener('click', onCancel);
        btnAction.addEventListener('click', onConfirm);
        btnCloseX.addEventListener('click', onCancel);

        sysModal.classList.remove('hidden');
    });
}

// MOTOR DE SINCRONIZAÇÃO PERMANENTE NA NUVEM (JSONBIN.IO PERMANENT CLOUD ENGINE)
const JSONBIN_MASTER_KEY = '$2a$10$EwG6CwIkRwMRvUN2LDv6CeTX0k.ftT3EnCIy9w4MVNktpnps/D6Ca';
const JSONBIN_BIN_ID = '6a6b6ba1da38895dfea4bed4';
const JSONBIN_READ_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`;
const JSONBIN_WRITE_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

let cloudSaveTimer = null;
let isSavingToCloud = false;

function updateCloudBadge(state, text) {
    const badge = document.getElementById('cloud-sync-badge');
    if (!badge) return;

    badge.className = 'cloud-sync-badge ' + state;
    const statusTextEl = badge.querySelector('.cloud-status-text');
    const svgEl = badge.querySelector('.cloud-icon-svg');

    if (state === 'online') {
        badge.title = 'Sincronizado na Nuvem Permanente (JSONBin.io) · Clique para atualizar';
        if (statusTextEl) statusTextEl.textContent = 'NUVEM SINC';
        if (svgEl) svgEl.innerHTML = '<path d="M17.5 19a5 5 0 0 0 2-9.19M18 10a5 5 0 0 0-3.79 8.25M6.5 19h11a4.5 4.5 0 0 0 2.5-8.24 7 7 0 0 0-13.44-2.12A4.5 4.5 0 0 0 6.5 19z"></path><polyline points="9 13 11 15 15 11"></polyline>';
    } else if (state === 'syncing') {
        badge.title = 'Enviando alterações para a nuvem permanente...';
        if (statusTextEl) statusTextEl.textContent = 'SALVANDO...';
        if (svgEl) svgEl.innerHTML = '<path d="M17.5 19a5 5 0 0 0 2-9.19M18 10a5 5 0 0 0-3.79 8.25M6.5 19h11a4.5 4.5 0 0 0 2.5-8.24 7 7 0 0 0-13.44-2.12A4.5 4.5 0 0 0 6.5 19z"></path><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line>';
    } else {
        badge.title = 'Modo Local (dados salvos no armazenamento local)';
        if (statusTextEl) statusTextEl.textContent = 'MODO LOCAL';
        if (svgEl) svgEl.innerHTML = '<path d="m2 2 20 20"></path><path d="M5.782 5.782A4.5 4.5 0 0 0 6.5 19h11a4.5 4.5 0 0 0 2.5-.75"></path><path d="M21.5 15.5A4.5 4.5 0 0 0 18 10a5 5 0 0 0-3.79-3.75"></path>';
    }
}

async function syncFromCloud(isInitial = false) {
    try {
        if (!isInitial) updateCloudBadge('syncing', 'Sincronizando...');
        const res = await fetch(JSONBIN_READ_URL, {
            headers: { 'X-Master-Key': JSONBIN_MASTER_KEY }
        });
        if (res.ok) {
            const dataObj = await res.json();
            const targetData = (dataObj && dataObj.record) ? dataObj.record : null;

            if (targetData && Array.isArray(targetData.weeks)) {
                if (targetData.weeks.length > 0) {
                    // A NUVEM PERMANENTE É A AUTORIDADE SUPREMA
                    const cleanData = {
                        title: targetData.title || (appData ? appData.title : 'BHE ES'),
                        subtitle: targetData.subtitle || (appData ? appData.subtitle : ''),
                        weeks: targetData.weeks
                    };

                    const cloudJson = JSON.stringify(cleanData);
                    const localJson = JSON.stringify(appData);

                    if (cloudJson !== localJson) {
                        appData = cleanData;
                        localStorage.setItem(STORAGE_KEY, cloudJson);
                        renderHourlyGridDashboard();
                    }
                }
                updateCloudBadge('online', 'Nuvem ON');
                return true;
            }
        }
    } catch (err) {
        console.warn('Fallback para dados locais:', err);
    }
    updateCloudBadge('offline', 'Modo Local');
    return false;
}

async function pushToCloud() {
    if (isSavingToCloud) return;
    isSavingToCloud = true;
    updateCloudBadge('syncing', 'Salvando...');
    try {
        const payload = {
            title: appData.title,
            subtitle: appData.subtitle,
            weeks: appData.weeks
        };

        const res = await fetch(JSONBIN_WRITE_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_MASTER_KEY
            },
            body: JSON.stringify(payload)
        });

        if (res.ok || res.status === 200) {
            updateCloudBadge('online', 'Nuvem ON');
        } else {
            updateCloudBadge('offline', 'Modo Local');
        }
    } catch (err) {
        console.warn('Erro ao salvar na nuvem:', err);
        updateCloudBadge('offline', 'Modo Local');
    } finally {
        isSavingToCloud = false;
    }
}

function triggerCloudSave() {
    if (cloudSaveTimer) clearTimeout(cloudSaveTimer);
    cloudSaveTimer = setTimeout(() => {
        pushToCloud();
    }, 600);
}

function loadData() {
    let saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
        for (const legacyKey of LEGACY_STORAGE_KEYS) {
            const legacyData = localStorage.getItem(legacyKey);
            if (legacyData) {
                saved = legacyData;
                localStorage.setItem(STORAGE_KEY, legacyData);
                break;
            }
        }
    }

    if (saved) {
        try { 
            appData = JSON.parse(saved); 
        } catch (e) { 
            appData = JSON.parse(JSON.stringify(defaultData)); 
        }
    }

    if (!appData || !Array.isArray(appData.weeks) || appData.weeks.length === 0) {
        appData = JSON.parse(JSON.stringify(defaultData));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    }

    // Sincroniza a versão mais recente da nuvem em segundo plano
    syncFromCloud(true);
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    triggerCloudSave();
}

function rowToTime(row) {
    const slot = TIME_SLOTS.find(s => s.row === row);
    return slot ? slot.time : '08:00';
}

function formatDurationText(hours) {
    if (hours === 1) return '1h';
    return `${hours}h`;
}

function hasTaskCollision(weekId, day, startRow, duration, excludeTaskId = null) {
    const week = appData.weeks.find(w => w.id === weekId);
    if (!week) return false;

    const targetEndRow = startRow + duration - 1;

    return week.tasks.some(task => {
        if (excludeTaskId && task.id === excludeTaskId) return false;
        if (task.day !== day) return false;

        const taskEndRow = task.startRow + task.duration - 1;
        return (startRow <= taskEndRow && targetEndRow >= task.startRow);
    });
}

// Render Master View
function renderHourlyGridDashboard() {
    const stack = document.getElementById('weeks-stack');
    stack.innerHTML = '';

    appData.weeks.forEach((week, weekIndex) => {
        const card = document.createElement('div');
        card.className = 'week-card';
        card.dataset.weekId = week.id;

        // Card Header
        const header = document.createElement('div');
        header.className = 'week-card-header';
        header.innerHTML = `
            <div class="week-title-group">
                <span class="week-badge">SEMANA ${weekIndex + 1}</span>
                <h3 contenteditable="true" spellcheck="false" title="Clique para editar o título da semana">${week.title}</h3>
                <span class="week-count-badge">${week.tasks.length} ${week.tasks.length === 1 ? 'tarefa' : 'tarefas'}</span>
            </div>
            <button class="btn-icon-delete-week" title="Excluir esta semana">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        `;

        // Auto-save for week title
        const titleH3 = header.querySelector('h3');
        titleH3.addEventListener('focus', () => recordState());

        const saveWeekTitle = () => {
            const cleanTitle = titleH3.innerText.replace(/[\r\n]+/g, ' ').trim() || `Semana ${weekIndex + 1}`;
            week.title = cleanTitle;
            saveData();
            populateModalSelects();
        };

        titleH3.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                titleH3.blur();
            }
        });

        titleH3.addEventListener('input', saveWeekTitle);
        titleH3.addEventListener('blur', saveWeekTitle);

        header.querySelector('.btn-icon-delete-week').addEventListener('click', async () => {
            if (appData.weeks.length <= 1) {
                showToast('⚠️ Não é possível excluir a única semana do cronograma.');
                return;
            }
            const confirmed = await confirmSystemDialog(
                `Excluir ${week.title}`,
                `Tem certeza que deseja excluir "${week.title}"? Todas as ${week.tasks.length} tarefas agendadas neste ciclo serão removidas permanentemente.`,
                'Sim, Excluir Semana',
                true
            );
            if (confirmed) {
                recordState();
                appData.weeks = appData.weeks.filter(w => w.id !== week.id);
                saveData();
                renderHourlyGridDashboard();
                showToast('🗑️ Semana excluída');
            }
        });

        card.appendChild(header);

        // Header Row (Hora | SEG ... SEX)
        const headerRow = document.createElement('div');
        headerRow.className = 'timeline-header-row';
        headerRow.innerHTML = `
            <div class="time-header-cell" title="Horário de Operação (08:00 - 18:00)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>HORA</span>
            </div>
            <div class="day-header-cell"><span class="day-code">SEG</span></div>
            <div class="day-header-cell"><span class="day-code">TER</span></div>
            <div class="day-header-cell"><span class="day-code">QUA</span></div>
            <div class="day-header-cell"><span class="day-code">QUI</span></div>
            <div class="day-header-cell"><span class="day-code">SEX</span></div>
        `;
        card.appendChild(headerRow);

        // Timeline Grid (11 rows of 42px)
        const grid = document.createElement('div');
        grid.className = 'timeline-grid';
        grid.dataset.weekId = week.id;

        // Background lines & Time Axis Labels
        const gridBg = document.createElement('div');
        gridBg.className = 'grid-background';

        TIME_SLOTS.forEach(slot => {
            if (!slot.isLunch) {
                const label = document.createElement('div');
                label.className = 'time-row-label';
                label.style.top = `${(slot.row - 1) * getRowHeight()}px`;
                label.textContent = slot.time;
                gridBg.appendChild(label);
            }

            const hLine = document.createElement('div');
            hLine.className = 'horizontal-grid-line';
            hLine.style.top = `${(slot.row - 1) * getRowHeight()}px`;
            gridBg.appendChild(hLine);
        });

        // Vertical Day Dividers
        const timeColW = isZoomOutMode ? 76 : 90;
        for (let i = 1; i <= 5; i++) {
            const vLine = document.createElement('div');
            vLine.className = 'vertical-grid-line';
            vLine.style.left = `calc(${timeColW}px + ((100% - ${timeColW}px) / 5) * ${i})`;
            gridBg.appendChild(vLine);
        }

        grid.appendChild(gridBg);

        // Fixed Lunch Break Row
        const lunch = document.createElement('div');
        lunch.className = 'lunch-break-row';
        lunch.innerHTML = `
            <div class="lunch-break-text">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>PAUSA PARA ALMOÇO (12:00 - 13:00)</span>
            </div>
        `;
        grid.appendChild(lunch);

        // Render Empty Clickable Cells for Creating Task & Context Menu
        for (let day = 1; day <= 5; day++) {
            TIME_SLOTS.forEach(slot => {
                if (slot.isLunch) return;

                const emptySlot = document.createElement('div');
                emptySlot.className = 'grid-empty-slot';
                emptySlot.style.gridColumn = `${day + 1}`;
                emptySlot.style.gridRow = `${slot.row}`;
                emptySlot.title = `Clique para criar ou botão direito para colar (${getDayName(day)} às ${slot.time})`;

                emptySlot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openModal(null, week.id, day, slot.row);
                });

                emptySlot.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showContextMenu(e, null, { weekId: week.id, day, row: slot.row });
                });

                grid.appendChild(emptySlot);
            });
        }

        // Render Tasks
        week.tasks.forEach(task => {
            const isEditing = (task.id === editingInlineTaskId);
            const taskCard = document.createElement('div');
            
            taskCard.className = `task-card ${task.category} ${task.duration === 1 ? 'compact-1h' : ''} ${isEditing ? 'is-editing' : ''}`;
            taskCard.dataset.taskId = task.id;
            taskCard.dataset.weekId = week.id;

            taskCard.style.gridColumn = `${task.day + 1}`;
            taskCard.style.gridRow = `${task.startRow} / span ${task.duration}`;

            taskCard.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showContextMenu(e, { task, weekId: week.id }, null);
            });

            if (isEditing) {
                taskCard.addEventListener('click', (e) => e.stopPropagation());

                taskCard.innerHTML = `
                    <div class="postit-edit-form">
                        <div class="task-card-header">
                            <span class="task-time-badge">${rowToTime(task.startRow)} · ${formatDurationText(task.duration)}</span>
                            <button class="task-delete-btn postit-delete" title="Excluir">×</button>
                        </div>
                        <textarea class="postit-input-title" placeholder="Título da Manutenção">${task.title}</textarea>
                        <textarea class="postit-input-desc" placeholder="Escopo / Detalhes...">${task.desc || ''}</textarea>
                    </div>
                `;

                const titleInput = taskCard.querySelector('.postit-input-title');
                const descInput = taskCard.querySelector('.postit-input-desc');

                const autoGrowCard = () => {
                    titleInput.style.height = 'auto';
                    titleInput.style.height = titleInput.scrollHeight + 'px';

                    descInput.style.height = 'auto';
                    descInput.style.height = descInput.scrollHeight + 'px';

                    const requiredHeight = titleInput.scrollHeight + descInput.scrollHeight + 36;
                    const defaultSlotHeight = task.duration * getRowHeight();

                    taskCard.style.height = `${Math.max(defaultSlotHeight, requiredHeight)}px`;
                };

                setTimeout(() => {
                    titleInput.focus();
                    autoGrowCard();
                }, 50);

                titleInput.addEventListener('input', autoGrowCard);
                descInput.addEventListener('input', autoGrowCard);

                titleInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        editingInlineTaskId = null;
                        renderHourlyGridDashboard();
                    }
                });

                descInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        editingInlineTaskId = null;
                        renderHourlyGridDashboard();
                    }
                });

                taskCard.querySelector('.postit-delete').addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const confirmed = await confirmSystemDialog(
                        'Excluir Tarefa',
                        `Tem certeza que deseja excluir "${task.title}"?`,
                        'Sim, Excluir',
                        true
                    );
                    if (confirmed) {
                        recordState();
                        week.tasks = week.tasks.filter(t => t.id !== task.id);
                        editingInlineTaskId = null;
                        saveData();
                        renderHourlyGridDashboard();
                        showToast('🗑️ Tarefa excluída');
                    }
                });

            } else {
                // Task render (custom glassmorphism tooltip handling via global mouseover listener)

                if (task.duration === 1) {
                    taskCard.innerHTML = `
                        <div class="task-card-header">
                            <div class="task-header-meta">
                                <span class="task-category-dot"></span>
                                <span class="task-time-text">${rowToTime(task.startRow)} · ${formatDurationText(task.duration)}</span>
                            </div>
                            <button class="task-delete-btn" title="Excluir tarefa">×</button>
                        </div>
                        <div class="task-card-title">${task.title}</div>
                        <div class="resize-handle" title="Arraste a borda para alterar a duração"></div>
                    `;
                } else {
                    taskCard.innerHTML = `
                        <div class="task-card-header">
                            <div class="task-header-meta">
                                <span class="task-category-dot"></span>
                                <span class="task-time-text">${rowToTime(task.startRow)} · ${formatDurationText(task.duration)}</span>
                            </div>
                            <button class="task-delete-btn" title="Excluir tarefa">×</button>
                        </div>
                        <div class="task-card-title">${task.title}</div>
                        ${task.desc ? `<div class="task-card-desc">${task.desc}</div>` : ''}
                        <div class="resize-handle" title="Arraste a borda para alterar a duração"></div>
                    `;
                }

                taskCard.querySelector('.task-delete-btn').addEventListener('click', async (e) => {
                    e.stopPropagation();
                    const confirmed = await confirmSystemDialog(
                        'Excluir Tarefa',
                        `Tem certeza que deseja excluir "${task.title}"?`,
                        'Sim, Excluir',
                        true
                    );
                    if (confirmed) {
                        recordState();
                        week.tasks = week.tasks.filter(t => t.id !== task.id);
                        saveData();
                        renderHourlyGridDashboard();
                        showToast('🗑️ Tarefa excluída');
                    }
                });

                taskCard.addEventListener('click', (e) => {
                    if (wasDraggingOrResizing) {
                        wasDraggingOrResizing = false;
                        return;
                    }
                    if (e.target.classList.contains('resize-handle') || e.target.classList.contains('task-delete-btn')) return;
                    
                    e.stopPropagation();
                    
                    if (editingInlineTaskId && editingInlineTaskId !== task.id) {
                        const openCard = document.querySelector('.task-card.is-editing');
                        if (openCard) {
                            const titleIn = openCard.querySelector('.postit-input-title');
                            const descIn = openCard.querySelector('.postit-input-desc');
                            const openTaskId = openCard.dataset.taskId;
                            const openWeekId = openCard.dataset.weekId;
                            const openWeek = appData.weeks.find(w => w.id === openWeekId);
                            if (openWeek) {
                                const openTask = openWeek.tasks.find(t => t.id === openTaskId);
                                if (openTask && titleIn) {
                                    openTask.title = titleIn.value.trim() || 'Sem Título';
                                    openTask.desc = descIn ? descIn.value.trim() : '';
                                    saveData();
                                }
                            }
                        }
                    }

                    editingInlineTaskId = task.id;
                    selectedTaskContext = { task, weekId: week.id };
                    renderHourlyGridDashboard();
                });
            }

            grid.appendChild(taskCard);
        });

        card.appendChild(grid);
        stack.appendChild(card);
    });

    setupInteractions();
    applyCategoryFilter();
}

function getDayName(day) {
    const days = ['', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
    return days[day] || '';
}

// Drag & Vertical Resize Handler
let activeTaskObj = null;
let activeTaskEl = null;
let activeWeekObj = null;
let interactionType = null;
let startY, startX, startRow, startDuration, startDay;

function setupInteractions() {
    document.querySelectorAll('.timeline-grid').forEach(grid => {
        grid.addEventListener('pointerdown', (e) => {
            const taskCard = e.target.closest('.task-card');
            if (!taskCard) return;
            if (taskCard.classList.contains('is-editing')) return;
            if (e.target.classList.contains('task-delete-btn')) return;

            recordState();

            wasDraggingOrResizing = false;

            const weekId = taskCard.dataset.weekId;
            activeWeekObj = appData.weeks.find(w => w.id === weekId);
            activeTaskObj = activeWeekObj.tasks.find(t => t.id === taskCard.dataset.taskId);
            activeTaskEl = taskCard;
            selectedTaskContext = { task: activeTaskObj, weekId };

            startY = e.clientY;
            startX = e.clientX;
            startRow = activeTaskObj.startRow;
            startDuration = activeTaskObj.duration;
            startDay = activeTaskObj.day;

            if (e.target.classList.contains('resize-handle')) {
                interactionType = 'resize';
            } else {
                interactionType = 'drag';
            }

            // Remove any lingering settle class
            activeTaskEl.classList.remove('is-settling');

            document.addEventListener('pointermove', onPointerMove);
            document.addEventListener('pointerup', onPointerUp);
        });
    });
}

let currentDeltaX = 0;
let currentDeltaY = 0;

function onPointerMove(e) {
    if (!activeTaskObj || !activeTaskEl) return;

    const deltaY = e.clientY - startY;
    const deltaX = e.clientX - startX;
    currentDeltaX = deltaX;
    currentDeltaY = deltaY;

    if (Math.abs(deltaY) > 4 || Math.abs(deltaX) > 4) {
        if (!wasDraggingOrResizing) {
            wasDraggingOrResizing = true;
            if (interactionType === 'drag') {
                activeTaskEl.classList.add('is-dragging');
            } else {
                activeTaskEl.classList.add('is-resizing');
            }
        }
    }

    if (interactionType === 'resize') {
        const deltaRows = Math.round(deltaY / getRowHeight());
        let newDuration = Math.max(1, startDuration + deltaRows);

        if (startRow + newDuration - 1 > 10) {
            newDuration = 10 - startRow + 1;
        }

        // Anti-Colisão para Resize: Limita redimensionamento antes da próxima tarefa abaixo
        if (activeWeekObj) {
            const tasksBelow = activeWeekObj.tasks.filter(t => t.id !== activeTaskObj.id && t.day === startDay && t.startRow > startRow);
            if (tasksBelow.length > 0) {
                const nextTaskStartRow = Math.min(...tasksBelow.map(t => t.startRow));
                const maxAllowedDuration = nextTaskStartRow - startRow;
                if (newDuration > maxAllowedDuration) {
                    newDuration = maxAllowedDuration;
                }
            }
        }

        activeTaskObj.duration = newDuration;
        activeTaskEl.style.gridRow = `${activeTaskObj.startRow} / span ${activeTaskObj.duration}`;

        const badge = activeTaskEl.querySelector('.task-time-text') || activeTaskEl.querySelector('.task-time-badge');
        if (badge) {
            badge.textContent = `${rowToTime(activeTaskObj.startRow)} · ${formatDurationText(newDuration)}`;
        }
    } else if (interactionType === 'drag') {
        const gridEl = activeTaskEl.closest('.timeline-grid');
        const timeColWidth = isZoomOutMode ? 76 : 90;
        const colWidth = (gridEl.offsetWidth - timeColWidth) / 5;
        const rowHeight = getRowHeight();

        const deltaRows = Math.round(deltaY / rowHeight);
        const deltaDays = Math.round(deltaX / colWidth);

        let previewRow = Math.max(1, startRow + deltaRows);
        let previewDay = Math.max(1, Math.min(5, startDay + deltaDays));
        if (previewRow === 5) previewRow = 6;
        if (previewRow + activeTaskObj.duration - 1 > 10) {
            previewRow = 10 - activeTaskObj.duration + 1;
        }

        const isCollision = hasTaskCollision(activeWeekObj.id, previewDay, previewRow, activeTaskObj.duration, activeTaskObj.id);
        if (isCollision) {
            activeTaskEl.classList.add('is-collision');
        } else {
            activeTaskEl.classList.remove('is-collision');
        }

        // CAMPO GRAVITACIONAL: calcula atração magnética quando próximo do centro da célula
        const targetPixelX = (previewDay - startDay) * colWidth;
        const targetPixelY = (previewRow - startRow) * rowHeight;
        const dist = Math.hypot(deltaX - targetPixelX, deltaY - targetPixelY);
        const pullRadius = 75;

        if (dist < pullRadius && !isCollision) {
            const pullFactor = Math.pow(1 - (dist / pullRadius), 1.5) * 0.38;
            const drawnX = deltaX + (targetPixelX - deltaX) * pullFactor;
            const drawnY = deltaY + (targetPixelY - deltaY) * pullFactor;
            activeTaskEl.style.transform = `translate(${drawnX}px, ${drawnY}px) scale(1.03) rotate(-0.3deg)`;
        } else {
            activeTaskEl.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.04) rotate(-0.5deg)`;
        }

        const badge = activeTaskEl.querySelector('.task-time-text') || activeTaskEl.querySelector('.task-time-badge');
        if (badge) {
            badge.textContent = `${rowToTime(previewRow)} · ${formatDurationText(activeTaskObj.duration)}${isCollision ? ' 🛑 (Ocupado)' : ''}`;
        }
    }
}

function onPointerUp() {
    if (!activeTaskObj) return;

    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);

    const wasResizing = (interactionType === 'resize');

    if (interactionType === 'drag' && wasDraggingOrResizing && activeTaskEl) {
        const gridEl = activeTaskEl.closest('.timeline-grid');
        const timeColWidth = isZoomOutMode ? 76 : 90;
        const colWidth = (gridEl.offsetWidth - timeColWidth) / 5;
        const rowHeight = getRowHeight();

        const deltaRows = Math.round(currentDeltaY / rowHeight);
        const deltaDays = Math.round(currentDeltaX / colWidth);

        let newRow = Math.max(1, startRow + deltaRows);
        let newDay = Math.max(1, Math.min(5, startDay + deltaDays));
        if (newRow === 5) newRow = 6;
        if (newRow + activeTaskObj.duration - 1 > 10) {
            newRow = 10 - activeTaskObj.duration + 1;
        }

        const isCollision = hasTaskCollision(activeWeekObj.id, newDay, newRow, activeTaskObj.duration, activeTaskObj.id);
        const settlingEl = activeTaskEl;
        settlingEl.classList.remove('is-dragging', 'is-resizing', 'is-collision');

        if (isCollision) {
            // REJEIÇÃO POR COLISÃO: Reverte para a posição original
            activeTaskObj.startRow = startRow;
            activeTaskObj.day = startDay;
            settlingEl.style.transform = '';
            settlingEl.style.gridColumn = `${startDay + 1}`;
            settlingEl.style.gridRow = `${startRow} / span ${activeTaskObj.duration}`;
            showToast('⚠️ Horário já ocupado por outra tarefa.');
        } else {
            // ENCAIXE INSTANTÂNEO NA CÉLULA DE DESTINO
            activeTaskObj.startRow = newRow;
            activeTaskObj.day = newDay;

            settlingEl.style.transform = '';
            settlingEl.style.gridColumn = `${newDay + 1}`;
            settlingEl.style.gridRow = `${newRow} / span ${activeTaskObj.duration}`;

            const badge = settlingEl.querySelector('.task-time-text') || settlingEl.querySelector('.task-time-badge');
            if (badge) {
                badge.textContent = `${rowToTime(newRow)} · ${formatDurationText(activeTaskObj.duration)}`;
            }
        }

        // Leve micro-ajuste rápido de encaixe (0.1s)
        settlingEl.classList.add('is-settling');
        setTimeout(() => {
            settlingEl.classList.remove('is-settling');
            settlingEl.style.zIndex = '';
        }, 100);
    } else if (activeTaskEl) {
        activeTaskEl.classList.remove('is-dragging', 'is-resizing', 'is-collision');
        activeTaskEl.style.transform = '';
        activeTaskEl.style.zIndex = '';
    }

    saveData();

    if (wasResizing && wasDraggingOrResizing) {
        renderHourlyGridDashboard();
    }

    activeTaskObj = null;
    activeTaskEl = null;
    activeWeekObj = null;
    interactionType = null;
}

/* DESKTOP CONTEXT MENU CONTROLLER */
const ctxMenu = document.getElementById('custom-context-menu');

function showContextMenu(e, taskCtx, slotCtx) {
    selectedTaskContext = taskCtx;
    selectedSlotContext = slotCtx;

    const ctxUndo = document.getElementById('ctx-undo');
    const ctxRedo = document.getElementById('ctx-redo');
    const ctxCopy = document.getElementById('ctx-copy');
    const ctxCut = document.getElementById('ctx-cut');
    const ctxPaste = document.getElementById('ctx-paste');
    const ctxDuplicate = document.getElementById('ctx-duplicate');
    const ctxDelete = document.getElementById('ctx-delete');

    if (historyStack.length > 0) ctxUndo.classList.remove('disabled');
    else ctxUndo.classList.add('disabled');

    if (redoStack.length > 0) ctxRedo.classList.remove('disabled');
    else ctxRedo.classList.add('disabled');

    if (taskCtx) {
        ctxCopy.classList.remove('disabled');
        ctxCut.classList.remove('disabled');
        ctxDuplicate.classList.remove('disabled');
        ctxDelete.classList.remove('disabled');
    } else {
        ctxCopy.classList.add('disabled');
        ctxCut.classList.add('disabled');
        ctxDuplicate.classList.add('disabled');
        ctxDelete.classList.add('disabled');
    }

    if (taskClipboard) {
        ctxPaste.classList.remove('disabled');
    } else {
        ctxPaste.classList.add('disabled');
    }

    let x = e.clientX;
    let y = e.clientY;

    const menuWidth = 210;
    const menuHeight = 310;

    if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 10;
    if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 10;

    ctxMenu.style.left = `${x}px`;
    ctxMenu.style.top = `${y}px`;
    ctxMenu.classList.remove('hidden');
}

function hideContextMenu() {
    if (ctxMenu) ctxMenu.classList.add('hidden');
}

// CONTEXT MENU & UNDO ACTIONS
document.getElementById('ctx-undo').addEventListener('click', () => {
    undoAction();
    hideContextMenu();
});

document.getElementById('ctx-redo').addEventListener('click', () => {
    redoAction();
    hideContextMenu();
});

document.getElementById('ctx-copy').addEventListener('click', () => {
    if (!selectedTaskContext) return;
    taskClipboard = {
        action: 'copy',
        task: JSON.parse(JSON.stringify(selectedTaskContext.task)),
        sourceWeekId: selectedTaskContext.weekId
    };
    showToast('📋 Tarefa copiada para a área de transferência');
    hideContextMenu();
});

document.getElementById('ctx-cut').addEventListener('click', () => {
    if (!selectedTaskContext) return;
    taskClipboard = {
        action: 'cut',
        task: JSON.parse(JSON.stringify(selectedTaskContext.task)),
        sourceWeekId: selectedTaskContext.weekId
    };
    showToast('✂️ Tarefa recortada');
    hideContextMenu();
});

document.getElementById('ctx-paste').addEventListener('click', () => {
    if (!taskClipboard) return;
    
    recordState();

    let targetWeekId = null;
    let targetDay = 1;
    let targetRow = 1;

    if (selectedSlotContext) {
        targetWeekId = selectedSlotContext.weekId;
        targetDay = selectedSlotContext.day;
        targetRow = selectedSlotContext.row;
    } else if (selectedTaskContext) {
        targetWeekId = selectedTaskContext.weekId;
        targetDay = selectedTaskContext.task.day;
        targetRow = selectedTaskContext.task.startRow;
    } else if (appData.weeks.length > 0) {
        targetWeekId = appData.weeks[0].id;
    }

    if (!targetWeekId) return;

    const targetWeek = appData.weeks.find(w => w.id === targetWeekId);
    if (!targetWeek) return;

    if (hasTaskCollision(targetWeek.id, targetDay, targetRow, taskClipboard.task.duration)) {
        showToast('⚠️ Horário de destino já está ocupado por outra tarefa.');
        hideContextMenu();
        return;
    }

    recordState();

    if (taskClipboard.action === 'cut' && taskClipboard.sourceWeekId) {
        const sourceWeek = appData.weeks.find(w => w.id === taskClipboard.sourceWeekId);
        if (sourceWeek) {
            sourceWeek.tasks = sourceWeek.tasks.filter(t => t.id !== taskClipboard.task.id);
        }
    }

    const newTask = JSON.parse(JSON.stringify(taskClipboard.task));
    newTask.id = 't' + Date.now();
    newTask.day = targetDay;
    newTask.startRow = targetRow;

    targetWeek.tasks.push(newTask);

    if (taskClipboard.action === 'cut') {
        taskClipboard = null;
    }

    saveData();
    renderHourlyGridDashboard();
    showToast('📋 Tarefa colada com sucesso');
    hideContextMenu();
});

document.getElementById('ctx-duplicate').addEventListener('click', () => {
    if (!selectedTaskContext) return;
    const week = appData.weeks.find(w => w.id === selectedTaskContext.weekId);
    if (!week) return;

    recordState();

    const newTask = JSON.parse(JSON.stringify(selectedTaskContext.task));
    newTask.id = 't' + Date.now();
    
    if (newTask.startRow + newTask.duration <= 11) {
        newTask.startRow += newTask.duration;
    } else if (newTask.day < 5) {
        newTask.day += 1;
        newTask.startRow = 1;
    }

    week.tasks.push(newTask);
    saveData();
    renderHourlyGridDashboard();
    showToast('🔄 Tarefa duplicada');
    hideContextMenu();
});

document.getElementById('ctx-delete').addEventListener('click', async () => {
    if (!selectedTaskContext) return;
    const week = appData.weeks.find(w => w.id === selectedTaskContext.weekId);
    if (week) {
        const confirmed = await confirmSystemDialog(
            'Excluir Tarefa',
            `Tem certeza que deseja excluir "${selectedTaskContext.task.title}"?`,
            'Sim, Excluir',
            true
        );
        if (confirmed) {
            recordState();
            week.tasks = week.tasks.filter(t => t.id !== selectedTaskContext.task.id);
            saveData();
            renderHourlyGridDashboard();
            showToast('🗑️ Tarefa excluída');
        }
    }
    hideContextMenu();
});

// Color swatch click handler inside Context Menu
document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!selectedTaskContext) return;
        recordState();
        const newColorCat = swatch.dataset.color;
        selectedTaskContext.task.category = newColorCat;
        saveData();
        renderHourlyGridDashboard();
        showToast('🎨 Cor da tarefa atualizada');
        hideContextMenu();
    });
});

// KEYBOARD SHORTCUTS (Ctrl+Z, Ctrl+Y, Ctrl+C, Ctrl+X, Ctrl+V, Delete)
document.addEventListener('keydown', async (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

    if (e.ctrlKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
            redoAction();
        } else {
            undoAction();
        }
    } else if (e.ctrlKey && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redoAction();
    } else if (e.ctrlKey && e.key.toLowerCase() === 'c') {
        if (selectedTaskContext) {
            e.preventDefault();
            taskClipboard = {
                action: 'copy',
                task: JSON.parse(JSON.stringify(selectedTaskContext.task)),
                sourceWeekId: selectedTaskContext.weekId
            };
            showToast('📋 Tarefa copiada (Ctrl+C)');
        }
    } else if (e.ctrlKey && e.key.toLowerCase() === 'x') {
        if (selectedTaskContext) {
            e.preventDefault();
            taskClipboard = {
                action: 'cut',
                task: JSON.parse(JSON.stringify(selectedTaskContext.task)),
                sourceWeekId: selectedTaskContext.weekId
            };
            showToast('✂️ Tarefa recortada (Ctrl+X)');
        }
    } else if (e.ctrlKey && e.key.toLowerCase() === 'v') {
        if (taskClipboard) {
            e.preventDefault();
            const targetWeek = appData.weeks.find(w => w.id === (selectedSlotContext ? selectedSlotContext.weekId : appData.weeks[0].id));
            if (targetWeek) {
                const pasteDay = selectedSlotContext ? selectedSlotContext.day : 1;
                const pasteRow = selectedSlotContext ? selectedSlotContext.row : 1;

                if (hasTaskCollision(targetWeek.id, pasteDay, pasteRow, taskClipboard.task.duration)) {
                    showToast('⚠️ Horário de destino já está ocupado por outra tarefa.');
                    return;
                }

                recordState();
                if (taskClipboard.action === 'cut' && taskClipboard.sourceWeekId) {
                    const sourceWeek = appData.weeks.find(w => w.id === taskClipboard.sourceWeekId);
                    if (sourceWeek) {
                        sourceWeek.tasks = sourceWeek.tasks.filter(t => t.id !== taskClipboard.task.id);
                    }
                }

                const newTask = JSON.parse(JSON.stringify(taskClipboard.task));
                newTask.id = 't' + Date.now();
                newTask.day = pasteDay;
                newTask.startRow = pasteRow;
                targetWeek.tasks.push(newTask);
                if (taskClipboard.action === 'cut') taskClipboard = null;

                saveData();
                renderHourlyGridDashboard();
                showToast('📋 Tarefa colada (Ctrl+V)');
            }
        }
    } else if (e.key === 'Delete') {
        if (selectedTaskContext) {
            e.preventDefault();
            const week = appData.weeks.find(w => w.id === selectedTaskContext.weekId);
            if (week) {
                const confirmed = await confirmSystemDialog(
                    'Excluir Tarefa',
                    `Tem certeza que deseja excluir "${selectedTaskContext.task.title}"?`,
                    'Sim, Excluir',
                    true
                );
                if (confirmed) {
                    recordState();
                    week.tasks = week.tasks.filter(t => t.id !== selectedTaskContext.task.id);
                    saveData();
                    renderHourlyGridDashboard();
                    showToast('🗑️ Tarefa excluída (Del)');
                }
            }
        }
    }
});

// Header Undo Button
const btnUndo = document.getElementById('btn-undo');
if (btnUndo) btnUndo.addEventListener('click', () => undoAction());

// Modals
const modal = document.getElementById('task-modal');
let editingTaskId = null;
let editingWeekId = null;

function populateModalSelects() {
    const weekSel = document.getElementById('task-week-select');
    if (!weekSel) return;
    weekSel.innerHTML = '';
    appData.weeks.forEach(w => {
        const opt = document.createElement('option');
        opt.value = w.id;
        opt.textContent = w.title;
        weekSel.appendChild(opt);
    });

    const timeSel = document.getElementById('task-time-select');
    if (!timeSel) return;
    timeSel.innerHTML = '';
    TIME_SLOTS.forEach(s => {
        if (s.isLunch) return;
        const opt = document.createElement('option');
        opt.value = s.time;
        opt.textContent = s.time;
        timeSel.appendChild(opt);
    });
}

function openModal(task = null, weekId = null, presetDay = null, presetRow = null) {
    populateModalSelects();

    if (task) {
        editingTaskId = task.id;
        editingWeekId = weekId;

        document.getElementById('modal-title').textContent = 'Editar Tarefa';
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.desc || '';
        document.getElementById('task-week-select').value = weekId;
        document.getElementById('task-day-select').value = task.day;
        document.getElementById('task-time-select').value = rowToTime(task.startRow);
        document.getElementById('task-duration-select').value = task.duration;
        document.getElementById('task-category').value = task.category;
        document.getElementById('btn-delete-task').style.display = 'block';
    } else {
        editingTaskId = null;
        editingWeekId = weekId || (appData.weeks.length > 0 ? appData.weeks[0].id : null);

        document.getElementById('modal-title').textContent = 'Nova Tarefa';
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
        document.getElementById('task-week-select').value = editingWeekId;
        document.getElementById('task-day-select').value = presetDay || 1;
        document.getElementById('task-time-select').value = presetRow ? rowToTime(presetRow) : '08:00';
        document.getElementById('task-duration-select').value = '1';
        document.getElementById('task-category').value = 'cat-routine';
        document.getElementById('btn-delete-task').style.display = 'none';
    }

    modal.classList.remove('hidden');
}

const btnAddTask = document.getElementById('btn-add-task');
if (btnAddTask) btnAddTask.addEventListener('click', () => openModal());
document.getElementById('btn-close-modal').addEventListener('click', () => modal.classList.add('hidden'));
document.getElementById('btn-close-modal-x').addEventListener('click', () => modal.classList.add('hidden'));

document.getElementById('btn-save-task').addEventListener('click', () => {
    const title = document.getElementById('task-title').value || 'Nova Tarefa';
    const desc = document.getElementById('task-desc').value;
    const targetWeekId = document.getElementById('task-week-select').value;
    const day = parseInt(document.getElementById('task-day-select').value);
    const timeStr = document.getElementById('task-time-select').value;
    const duration = parseInt(document.getElementById('task-duration-select').value);
    const category = document.getElementById('task-category').value;

    const slotObj = TIME_SLOTS.find(s => s.time === timeStr);
    const startRow = slotObj ? slotObj.row : 1;

    // Verificação Anti-Colisão antes de salvar
    if (hasTaskCollision(targetWeekId, day, startRow, duration, editingTaskId)) {
        showToast('⚠️ O horário selecionado já possui outra tarefa agendada.');
        return;
    }

    recordState();
    const targetWeek = appData.weeks.find(w => w.id === targetWeekId);

    if (editingTaskId) {
        const sourceWeek = appData.weeks.find(w => w.id === editingWeekId);
        const index = sourceWeek.tasks.findIndex(t => t.id === editingTaskId);
        if (index > -1) {
            const [task] = sourceWeek.tasks.splice(index, 1);
            task.title = title;
            task.desc = desc;
            task.day = day;
            task.startRow = startRow;
            task.duration = duration;
            task.category = category;
            targetWeek.tasks.push(task);
        }
    } else {
        if (targetWeek) {
            targetWeek.tasks.push({
                id: 't' + Date.now(),
                day,
                startRow,
                duration,
                title,
                desc,
                category
            });
        }
    }

    saveData();
    renderHourlyGridDashboard();
    modal.classList.add('hidden');
});

document.getElementById('btn-delete-task').addEventListener('click', async () => {
    if (editingTaskId) {
        const week = appData.weeks.find(w => w.id === editingWeekId);
        const task = week ? week.tasks.find(t => t.id === editingTaskId) : null;
        const taskName = task ? task.title : 'esta tarefa';

        const confirmed = await confirmSystemDialog(
            'Excluir Tarefa',
            `Tem certeza que deseja excluir "${taskName}"?`,
            'Sim, Excluir',
            true
        );

        if (confirmed && week) {
            recordState();
            week.tasks = week.tasks.filter(t => t.id !== editingTaskId);
            saveData();
            renderHourlyGridDashboard();
            modal.classList.add('hidden');
            showToast('🗑️ Tarefa excluída');
        }
    }
});

// Actions
document.getElementById('btn-add-week').addEventListener('click', () => {
    recordState();
    const weekNum = appData.weeks.length + 1;
    const newWeekId = 'w' + Date.now();
    appData.weeks.push({
        id: newWeekId,
        title: `Semana ${weekNum} - Novo Ciclo`,
        tasks: []
    });
    saveData();
    renderHourlyGridDashboard();

    // ROLA SUAVEMENTE ATÉ A NOVA SEMANA CRIADA
    setTimeout(() => {
        const newWeekEl = document.querySelector(`.week-card[data-week-id="${newWeekId}"]`);
        if (newWeekEl) {
            newWeekEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            newWeekEl.classList.add('week-card-highlight');
            setTimeout(() => newWeekEl.classList.remove('week-card-highlight'), 1500);
        }
    }, 50);
});

document.getElementById('btn-export').addEventListener('click', () => {
    const exportBtn = document.getElementById('btn-export');
    const originalText = exportBtn.innerHTML;
    exportBtn.innerHTML = '⌛ Gerando PDF...';
    exportBtn.disabled = true;

    document.body.classList.add('pdf-export-mode');

    const element = document.querySelector('.month-schedule-viewport');
    
    const opt = {
        margin:       [5, 5, 5, 5],
        filename:     `Cronograma_BHE_ES_Claudius.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        enableLinks:  true,
        html2canvas:  { 
            scale: 2, 
            useCORS: true,
            logging: false,
            scrollX: 0,
            scrollY: 0
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' },
        pagebreak:    { mode: ['css', 'legacy'], avoid: '.week-card' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        document.body.classList.remove('pdf-export-mode');
        exportBtn.innerHTML = originalText;
        exportBtn.disabled = false;
        applyCategoryFilter();
    }).catch(err => {
        console.error(err);
        document.body.classList.remove('pdf-export-mode');
        exportBtn.innerHTML = originalText;
        exportBtn.disabled = false;
        applyCategoryFilter();
    });
});

// Category Filtering (Fluid Focus / Translucency)
let activeCategoryFilter = null;

function setupCategoryFilters() {
    const legendItems = document.querySelectorAll('.legend-item');
    legendItems.forEach(item => {
        item.addEventListener('click', () => {
            const cat = item.dataset.category;
            if (activeCategoryFilter === cat) {
                activeCategoryFilter = null;
            } else {
                activeCategoryFilter = cat;
            }
            applyCategoryFilter();
        });
    });
}

function applyCategoryFilter() {
    const legendItems = document.querySelectorAll('.legend-item');
    legendItems.forEach(item => {
        if (activeCategoryFilter && item.dataset.category === activeCategoryFilter) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(card => {
        if (!activeCategoryFilter) {
            card.classList.remove('task-dimmed', 'task-focused');
        } else if (card.classList.contains(activeCategoryFilter)) {
            card.classList.remove('task-dimmed');
            card.classList.add('task-focused');
        } else {
            card.classList.remove('task-focused');
            card.classList.add('task-dimmed');
        }
    });
}

// Global click listener to auto-save open edit & hide context menu when clicking outside
document.addEventListener('click', (e) => {
    hideContextMenu();
    if (editingInlineTaskId && !e.target.closest('.task-card.is-editing') && !e.target.closest('.modal-overlay')) {
        const openCard = document.querySelector('.task-card.is-editing');
        if (openCard) {
            const titleIn = openCard.querySelector('.postit-input-title');
            const descIn = openCard.querySelector('.postit-input-desc');
            const openTaskId = openCard.dataset.taskId;
            const openWeekId = openCard.dataset.weekId;
            const openWeek = appData.weeks.find(w => w.id === openWeekId);
            if (openWeek) {
                const openTask = openWeek.tasks.find(t => t.id === openTaskId);
                if (openTask && titleIn) {
                    const newTitle = titleIn.value.trim() || 'Sem Título';
                    const newDesc = descIn ? descIn.value.trim() : '';
                    if (newTitle !== openTask.title || newDesc !== (openTask.desc || '')) {
                        recordState();
                        openTask.title = newTitle;
                        openTask.desc = newDesc;
                        saveData();
                    }
                }
            }
        }
        editingInlineTaskId = null;
        renderHourlyGridDashboard();
    }
});

// ZOOM-OUT / BROAD VIEW CONTROLLER SYSTEM
function applyZoomOutState() {
    const container = document.querySelector('.app-container');
    const zoomBtn = document.getElementById('btn-zoom-toggle');
    if (isZoomOutMode) {
        container?.classList.add('zoom-out-mode');
        zoomBtn?.classList.add('active');
        if (zoomBtn) {
            zoomBtn.title = 'Visão Padrão (Shift+Z)';
            zoomBtn.setAttribute('aria-label', 'Voltar à Visão Padrão');
            // SVG: zoom-in icon (plus in lens)
            zoomBtn.querySelector('svg').innerHTML = '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line><line x1="11" y1="8" x2="11" y2="14"></line>';
        }
    } else {
        container?.classList.remove('zoom-out-mode');
        zoomBtn?.classList.remove('active');
        if (zoomBtn) {
            zoomBtn.title = 'Visão Ampla (Shift+Z)';
            zoomBtn.setAttribute('aria-label', 'Alternar Visão Ampla');
            // SVG: zoom-out icon (minus in lens)
            zoomBtn.querySelector('svg').innerHTML = '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line>';
        }
    }
}

function toggleZoomOutMode() {
    isZoomOutMode = !isZoomOutMode;
    localStorage.setItem('mgcen00_zoom_out', isZoomOutMode ? 'true' : 'false');
    applyZoomOutState();
    renderHourlyGridDashboard();
    showToast(isZoomOutMode ? '🔍 Visão Ampla (Zoom-Out) Ativada' : '🔍 Visão Padrão Ativada');
}

function setupZoomController() {
    applyZoomOutState();

    const zoomBtn = document.getElementById('btn-zoom-toggle');
    if (zoomBtn) {
        zoomBtn.addEventListener('click', toggleZoomOutMode);
    }

    document.addEventListener('keydown', (e) => {
        if (e.shiftKey && (e.key === 'Z' || e.key === 'z') && !editingInlineTaskId) {
            const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
            if (activeTag !== 'input' && activeTag !== 'textarea') {
                e.preventDefault();
                toggleZoomOutMode();
            }
        }
    });
}

// DARK MODE / LIGHT MODE THEME CONTROLLER SYSTEM
let isDarkMode = localStorage.getItem('mgcen00_dark_theme') === 'true';

function applyThemeState() {
    const body = document.body;
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (isDarkMode) {
        body.classList.add('dark-theme');
        if (themeBtn) {
            themeBtn.title = 'Alternar para Modo Claro';
            themeBtn.setAttribute('aria-label', 'Alternar Modo Claro');
            themeBtn.classList.add('active');
            // Sun Icon
            themeBtn.querySelector('svg').innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        }
    } else {
        body.classList.remove('dark-theme');
        if (themeBtn) {
            themeBtn.title = 'Alternar para Modo Escuro';
            themeBtn.setAttribute('aria-label', 'Alternar Modo Escuro');
            themeBtn.classList.remove('active');
            // Moon Icon
            themeBtn.querySelector('svg').innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        }
    }
}

function toggleDarkMode(event) {
    const changeTheme = () => {
        isDarkMode = !isDarkMode;
        localStorage.setItem('mgcen00_dark_theme', isDarkMode ? 'true' : 'false');
        applyThemeState();
        showToast(isDarkMode ? '🌙 Modo Escuro Ativado' : '☀️ Modo Claro Ativado');
    };

    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) {
        themeBtn.classList.add('theme-spin');
        setTimeout(() => themeBtn.classList.remove('theme-spin'), 750);
    }

    if (document.startViewTransition && event && event.clientX) {
        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            changeTheme();
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ];
            document.documentElement.animate(
                {
                    clipPath: isDarkMode ? clipPath.reverse() : clipPath
                },
                {
                    duration: 1150,
                    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    pseudoElement: isDarkMode
                        ? '::view-transition-old(root)'
                        : '::view-transition-new(root)'
                }
            );
        });
    } else {
        changeTheme();
    }
}

function setupThemeController() {
    applyThemeState();
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', (e) => toggleDarkMode(e));
    }
}

// REFINED FLOATING GLASS TOOLTIP CONTROLLER SYSTEM
const glassTooltip = document.getElementById('task-floating-tooltip');
const ttDot = document.getElementById('tt-dot');
const ttTime = document.getElementById('tt-time');
const ttTitle = document.getElementById('tt-title');
const ttDesc = document.getElementById('tt-desc');

let currentHoverTaskEl = null;

document.addEventListener('mouseover', (e) => {
    const taskCard = e.target.closest('.task-card');
    if (taskCard && !editingInlineTaskId && !wasDraggingOrResizing) {
        currentHoverTaskEl = taskCard;
        const weekId = taskCard.dataset.weekId;
        const taskId = taskCard.dataset.taskId;
        const week = appData.weeks.find(w => w.id === weekId);
        if (week) {
            const task = week.tasks.find(t => t.id === taskId);
            if (task && glassTooltip) {
                // Populate tooltip contents
                const timeText = `${rowToTime(task.startRow)} · ${formatDurationText(task.duration)}`;
                ttTime.textContent = timeText;
                ttTitle.textContent = task.title || 'Sem Título';
                ttDesc.textContent = task.desc ? task.desc : 'Sem observações adicionais.';
                
                // Color dot
                if (ttDot) {
                    if (task.category === 'cat-hvac') ttDot.style.backgroundColor = '#0284C7';
                    else if (task.category === 'cat-elec') ttDot.style.backgroundColor = '#D97706';
                    else ttDot.style.backgroundColor = '#16A34A';
                }

                // Remove native title attribute to suppress raw browser tooltip
                if (taskCard.hasAttribute('title')) {
                    taskCard.dataset.nativeTitle = taskCard.getAttribute('title');
                    taskCard.removeAttribute('title');
                }

                glassTooltip.classList.remove('hidden');
                updateTooltipPosition(e);
            }
        }
    }
});

document.addEventListener('mousemove', (e) => {
    if (currentHoverTaskEl && glassTooltip && !glassTooltip.classList.contains('hidden')) {
        updateTooltipPosition(e);
    }
});

document.addEventListener('mouseout', (e) => {
    if (currentHoverTaskEl) {
        const related = e.relatedTarget ? e.relatedTarget.closest('.task-card') : null;
        if (related !== currentHoverTaskEl) {
            // Restore native title attribute if needed
            if (currentHoverTaskEl.dataset.nativeTitle) {
                currentHoverTaskEl.setAttribute('title', currentHoverTaskEl.dataset.nativeTitle);
                delete currentHoverTaskEl.dataset.nativeTitle;
            }
            currentHoverTaskEl = null;
            if (glassTooltip) glassTooltip.classList.add('hidden');
        }
    }
});

function updateTooltipPosition(e) {
    if (!glassTooltip) return;
    const padding = 15;
    let x = e.clientX + padding;
    let y = e.clientY + padding;

    const tooltipWidth = glassTooltip.offsetWidth || 260;
    const tooltipHeight = glassTooltip.offsetHeight || 120;

    if (x + tooltipWidth > window.innerWidth - 10) {
        x = e.clientX - tooltipWidth - padding;
    }
    if (y + tooltipHeight > window.innerHeight - 10) {
        y = e.clientY - tooltipHeight - padding;
    }

    glassTooltip.style.left = `${Math.max(10, x)}px`;
    glassTooltip.style.top = `${Math.max(10, y)}px`;
}

// Init
loadData();
applyZoomOutState();
setupThemeController();
renderHourlyGridDashboard();
setupCategoryFilters();
setupZoomController();

// Sincronização imediata na nuvem ao carregar a página
syncFromCloud(true);

// Listener de clique no selo de nuvem para sincronização manual
const cloudBadge = document.getElementById('cloud-sync-badge');
if (cloudBadge) {
    cloudBadge.addEventListener('click', async () => {
        showToast('☁️ Conectando e sincronizando com a nuvem...');
        const success = await syncFromCloud();
        if (success) {
            showToast('🟢 Cronograma sincronizado com a nuvem!');
        } else {
            showToast('⚠️ Usando dados armazenados localmente.');
        }
    });
}

// Polling automático da Nuvem a cada 45 segundos para economizar requisições e sincronizar alterações
setInterval(() => {
    if (!wasDraggingOrResizing && !editingTaskId && !editingInlineTaskId) {
        syncFromCloud(true);
    }
}, 45000);
