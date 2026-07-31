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
    title: 'BHE ES',
    subtitle: 'ESPÍRITO SANTO N°1000',
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

// MOTOR MULTI-PERFIL DE CRONOGRAMAS INDEPENDENTES (MULTI-SCHEDULE STORE)
let multiProfileStore = {
    activeProfileId: 'bhe_es',
    profiles: []
};

function ensureMultiProfileStructure(storedObj) {
    if (storedObj && Array.isArray(storedObj.profiles) && storedObj.profiles.length > 0 && storedObj.activeProfileId) {
        multiProfileStore = storedObj;
        multiProfileStore.profiles.forEach(p => {
            if (p.name === 'Cronograma Geral de Manutenção Preventiva') {
                p.name = 'BHE ES';
            }
        });
    } else {
        let baseTitle = (storedObj && storedObj.title && storedObj.title !== 'Cronograma Geral de Manutenção Preventiva') ? storedObj.title : 'BHE ES';
        const baseSub = (storedObj && storedObj.subtitle && !storedObj.subtitle.includes('ESPÍRITO SANTO')) ? storedObj.subtitle : 'Unidade CEM EP';
        const baseWeeks = (storedObj && Array.isArray(storedObj.weeks) && storedObj.weeks.length > 0) ? storedObj.weeks : defaultData.weeks;
        const baseFloating = (storedObj && Array.isArray(storedObj.floatingTasks)) ? storedObj.floatingTasks : [];

        multiProfileStore = {
            activeProfileId: 'bhe_es',
            profiles: [
                {
                    id: 'bhe_es',
                    name: baseTitle,
                    subtitle: baseSub,
                    weeks: baseWeeks,
                    floatingTasks: baseFloating
                }
            ]
        };
    }

    let active = multiProfileStore.profiles.find(p => p.id === multiProfileStore.activeProfileId);
    if (!active) {
        active = multiProfileStore.profiles[0];
        multiProfileStore.activeProfileId = active.id;
    }
    if (active && (!active.subtitle || active.subtitle.includes('ESPÍRITO SANTO'))) {
        active.subtitle = 'Unidade CEM EP';
    }
    appData = active;
}

function getActiveProfile() {
    let active = multiProfileStore.profiles.find(p => p.id === multiProfileStore.activeProfileId);
    if (!active && multiProfileStore.profiles.length > 0) {
        active = multiProfileStore.profiles[0];
        multiProfileStore.activeProfileId = active.id;
    }
    return active;
}

function updateHeaderProfileInfo(force = false) {
    const active = getActiveProfile();
    const titleEl = document.getElementById('active-profile-title');
    const subEl = document.getElementById('active-profile-subtitle');

    if (force && document.activeElement && (document.activeElement === titleEl || document.activeElement === subEl)) {
        document.activeElement.blur();
    }

    if (titleEl && (force || document.activeElement !== titleEl)) {
        titleEl.textContent = active.name || 'BHE ES';
    }
    if (subEl && (force || document.activeElement !== subEl)) {
        subEl.textContent = active.subtitle || 'ESPÍRITO SANTO N°1000';
    }
    document.title = `${active.name || 'BHE ES'} | Cronograma de Manutenção`;
}

function renderProfileDropdown() {
    const container = document.getElementById('profile-list-container');
    const countBadge = document.getElementById('profile-count-badge');
    if (!container) return;

    container.innerHTML = '';
    if (countBadge) countBadge.textContent = multiProfileStore.profiles.length;

    if (multiProfileStore.profiles.length > 4) {
        container.classList.add('has-scroll');
    } else {
        container.classList.remove('has-scroll');
    }

    multiProfileStore.profiles.forEach(prof => {
        const item = document.createElement('div');
        const isActive = (prof.id === multiProfileStore.activeProfileId);
        item.className = `profile-item ${isActive ? 'active' : ''}`;
        
        item.innerHTML = `
            <div class="profile-item-info">
                <span class="profile-item-name">${escapeHtml(prof.name)}</span>
                <span class="profile-item-sub">${escapeHtml(prof.subtitle || 'Cronograma de Manutenção')} · ${prof.weeks ? prof.weeks.length : 0} semanas</span>
            </div>
            <div class="profile-item-actions">
                ${isActive ? '<span class="profile-item-check" title="Perfil Ativo">✓</span>' : ''}
                ${multiProfileStore.profiles.length > 1 ? `<button class="profile-item-del-btn" title="Excluir este cronograma" data-prof-id="${escapeHtml(prof.id)}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>` : ''}
            </div>
        `;

        item.addEventListener('click', (e) => {
            if (e.target.closest('.profile-item-del-btn')) return;
            switchProfile(prof.id);
        });

        const delBtn = item.querySelector('.profile-item-del-btn');
        if (delBtn) {
            delBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteProfile(prof.id);
            });
        }

        container.appendChild(item);
    });
}

function toggleProfileDropdown(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('profile-dropdown-menu');
    const brandBtn = document.getElementById('btn-profile-selector');
    if (!menu) return;

    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
        renderProfileDropdown();
        menu.classList.remove('hidden');
        if (brandBtn) brandBtn.classList.add('active');
    } else {
        closeProfileDropdown();
    }
}

function closeProfileDropdown() {
    const menu = document.getElementById('profile-dropdown-menu');
    const brandBtn = document.getElementById('btn-profile-selector');
    if (menu) menu.classList.add('hidden');
    if (brandBtn) brandBtn.classList.remove('active');
}

function switchProfile(profileId) {
    if (multiProfileStore.activeProfileId === profileId) return;
    recordState();

    // 1. Atualiza o ID do perfil ativo IMEDIATAMENTE, forçando blur e re-render do menu
    multiProfileStore.activeProfileId = profileId;
    appData = getActiveProfile();
    updateHeaderProfileInfo(true);
    renderProfileDropdown();

    // 2. Animação fluida de transição do cabeçalho
    const brandText = document.querySelector('.brand-text');
    if (brandText) {
        brandText.style.transition = 'opacity 0.16s cubic-bezier(0.16, 1, 0.3, 1), transform 0.16s cubic-bezier(0.16, 1, 0.3, 1)';
        brandText.style.opacity = '0.3';
        brandText.style.transform = 'translateY(-3px)';
    }

    setTimeout(() => {
        saveData();
        updateHeaderProfileInfo(true);

        if (brandText) {
            brandText.style.opacity = '1';
            brandText.style.transform = 'translateY(0)';
        }

        renderHourlyGridDashboard();
        showToast(`📂 Cronograma "${appData.name}" carregado`);
    }, 130);

    // 3. Fecha o menu dropdown de forma fluida após 220ms
    setTimeout(() => {
        closeProfileDropdown();
    }, 220);
}

function createNewProfile(name, subtitle) {
    recordState();
    const newId = 'prof_' + Date.now();
    const cleanWeeks = [1, 2, 3, 4].map((num) => ({
        id: `w_${newId}_${num}`,
        title: `Semana ${num}`,
        tasks: []
    }));

    const newProfile = {
        id: newId,
        name: name.trim() || 'Novo Cronograma',
        subtitle: subtitle.trim() || 'Unidade de Manutenção',
        weeks: cleanWeeks,
        floatingTasks: []
    };

    multiProfileStore.profiles.push(newProfile);
    multiProfileStore.activeProfileId = newId;
    appData = newProfile;

    saveData();
    updateHeaderProfileInfo();
    renderHourlyGridDashboard();
    showToast(`✨ Novo cronograma "${newProfile.name}" criado com sucesso!`);
}

function duplicateProfile(profileId) {
    const source = multiProfileStore.profiles.find(p => p.id === profileId) || getActiveProfile();
    if (!source) return;

    recordState();
    const newId = 'prof_' + Date.now();
    const cloned = JSON.parse(JSON.stringify(source));
    cloned.id = newId;
    cloned.name = `${source.name} (Cópia)`;

    multiProfileStore.profiles.push(cloned);
    multiProfileStore.activeProfileId = newId;
    appData = cloned;

    saveData();
    updateHeaderProfileInfo();
    renderHourlyGridDashboard();
    showToast(`📋 Cronograma duplicado como "${cloned.name}"`);
}

function confirmProfileDeletionSecurity(profileName) {
    return new Promise((resolve) => {
        const modal = document.getElementById('modal-profile-delete-confirm');
        const profNameEl = document.getElementById('del-security-prof-name');
        const inputEl = document.getElementById('delete-security-input');
        const btnCancel = document.getElementById('btn-cancel-del-security');
        const btnConfirm = document.getElementById('btn-confirm-del-security');
        const btnCloseX = document.getElementById('btn-close-del-security-x');

        if (!modal) return resolve(false);

        if (profNameEl) profNameEl.textContent = profileName;
        if (inputEl) {
            inputEl.value = '';
            inputEl.classList.remove('valid');
        }
        if (btnConfirm) btnConfirm.disabled = true;

        const cleanup = () => {
            modal.classList.add('hidden');
            btnCancel.removeEventListener('click', onCancel);
            btnConfirm.removeEventListener('click', onConfirm);
            btnCloseX.removeEventListener('click', onCancel);
            if (inputEl) inputEl.removeEventListener('input', onInput);
            document.removeEventListener('keydown', onKeyDown);
        };

        const onCancel = () => {
            cleanup();
            resolve(false);
        };

        const onConfirm = () => {
            if (btnConfirm.disabled) return;
            cleanup();
            resolve(true);
        };

        const onInput = () => {
            const typed = inputEl.value.trim().toUpperCase();
            if (typed === 'EXCLUIR') {
                btnConfirm.disabled = false;
                inputEl.classList.add('valid');
            } else {
                btnConfirm.disabled = true;
                inputEl.classList.remove('valid');
            }
        };

        const onKeyDown = (e) => {
            if (e.key === 'Enter') {
                if (!btnConfirm.disabled) {
                    e.preventDefault();
                    e.stopPropagation();
                    onConfirm();
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                onCancel();
            }
        };

        btnCancel.addEventListener('click', onCancel);
        btnConfirm.addEventListener('click', onConfirm);
        btnCloseX.addEventListener('click', onCancel);
        if (inputEl) inputEl.addEventListener('input', onInput);
        document.addEventListener('keydown', onKeyDown);

        modal.classList.remove('hidden');
        setTimeout(() => inputEl?.focus(), 60);
    });
}

async function deleteProfile(profileId) {
    if (multiProfileStore.profiles.length <= 1) {
        showToast('⚠️ Não é possível excluir o único cronograma do sistema.');
        return;
    }

    const target = multiProfileStore.profiles.find(p => p.id === profileId);
    if (!target) return;

    closeProfileDropdown();
    const confirmed = await confirmProfileDeletionSecurity(target.name);

    if (confirmed) {
        recordState();
        multiProfileStore.profiles = multiProfileStore.profiles.filter(p => p.id !== profileId);
        if (multiProfileStore.activeProfileId === profileId) {
            multiProfileStore.activeProfileId = multiProfileStore.profiles[0].id;
        }
        appData = getActiveProfile();
        saveData();
        updateHeaderProfileInfo();
        renderHourlyGridDashboard();
        showToast(`🗑️ Cronograma "${target.name}" foi permanentemente excluído`);
    }
}

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
        historyStack.push(JSON.stringify(multiProfileStore));
        if (historyStack.length > MAX_HISTORY) {
            historyStack.shift();
        }
        redoStack.length = 0;
    }
}

function undoAction() {
    if (historyStack.length > 0) {
        redoStack.push(JSON.stringify(multiProfileStore));
        multiProfileStore = JSON.parse(historyStack.pop());
        appData = getActiveProfile();
        saveData();
        renderHourlyGridDashboard();
        showToast('↩️ Ação desfeita (Ctrl+Z)');
    } else {
        showToast('ℹ️ Nenhuma ação anterior para desfazer');
    }
}

function redoAction() {
    if (redoStack.length > 0) {
        historyStack.push(JSON.stringify(multiProfileStore));
        multiProfileStore = JSON.parse(redoStack.pop());
        appData = getActiveProfile();
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
    toast.style.animation = 'none';
    toast.offsetHeight;
    toast.style.animation = '';

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('toast-exit');
        }, 220);
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
            document.removeEventListener('keydown', onKeyDown);
        };

        const onCancel = () => {
            cleanup();
            resolve(false);
        };

        const onConfirm = () => {
            cleanup();
            resolve(true);
        };

        const onKeyDown = (e) => {
            if (e.key === 'Delete' || e.key === 'Del' || e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                onConfirm();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                onCancel();
            }
        };

        btnCancel.addEventListener('click', onCancel);
        btnAction.addEventListener('click', onConfirm);
        btnCloseX.addEventListener('click', onCancel);
        document.addEventListener('keydown', onKeyDown);

        sysModal.classList.remove('hidden');
        btnAction.focus();
    });
}

// MOTOR DE SINCRONIZAÇÃO PERMANENTE NA NUVEM (JSONBIN.IO PERMANENT CLOUD ENGINE)
const JSONBIN_MASTER_KEY = '$2a$10$EwG6CwIkRwMRvUN2LDv6CeTX0k.ftT3EnCIy9w4MVNktpnps/D6Ca';
const JSONBIN_BIN_ID = '6a6b617df5f4af5e29d60c42';
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
        if (svgEl) svgEl.innerHTML = '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><polyline points="9 13.5 11.5 16 16.5 11"></polyline>';
    } else if (state === 'syncing') {
        badge.title = 'Enviando alterações para a nuvem permanente...';
        if (statusTextEl) statusTextEl.textContent = 'SALVANDO...';
        if (svgEl) svgEl.innerHTML = '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><path d="M12 12v5m0-5-2 2m2-2 2 2"></path>';
    } else {
        badge.title = 'Modo Local (dados salvos no armazenamento local)';
        if (statusTextEl) statusTextEl.textContent = 'MODO LOCAL';
        if (svgEl) svgEl.innerHTML = '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><line x1="4" y1="4" x2="20" y2="20"></line>';
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

            if (targetData && typeof targetData === 'object' && targetData.profiles && Array.isArray(targetData.profiles)) {
                const cloudJson = JSON.stringify(targetData);
                const localJson = JSON.stringify(multiProfileStore);

                if (cloudJson !== localJson) {
                    ensureMultiProfileStructure(targetData);
                    try {
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(multiProfileStore));
                    } catch (e) {}
                    renderHourlyGridDashboard();
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
        const payload = multiProfileStore;

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

    let parsed = null;
    if (saved) {
        try { 
            parsed = JSON.parse(saved); 
        } catch (e) { 
            parsed = null; 
        }
    }

    ensureMultiProfileStructure(parsed);

    // Sincroniza a versão mais recente da nuvem em segundo plano
    syncFromCloud(true);
}

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(multiProfileStore));
    } catch (e) {
        console.error('Erro ao salvar no LocalStorage:', e);
        if (e.name === 'QuotaExceededError' || e.code === 22) {
            showToast('⚠️ Armazenamento local cheio. Dados salvos na nuvem.');
        }
    }
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
function renderHourlyGridDashboard(highlightWeekId = null) {
    appData = getActiveProfile();
    updateHeaderProfileInfo();

    const stack = document.getElementById('weeks-stack');
    if (!stack) return;
    stack.innerHTML = '';

    appData.weeks.forEach((week, weekIndex) => {
        const card = document.createElement('div');
        card.className = 'week-card';
        card.dataset.weekId = week.id;

        if (highlightWeekId && week.id === highlightWeekId) {
            card.classList.add('week-card-highlight');
            setTimeout(() => {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }

        // Card Header
        const header = document.createElement('div');
        header.className = 'week-card-header';
        header.innerHTML = `
            <div class="week-title-group">
                <span class="week-badge"><span class="badge-dot"></span>SEMANA ${weekIndex + 1}</span>
                <h3 contenteditable="true" spellcheck="false" data-placeholder="Digite o título personalizado da semana..." title="Clique para editar o título da semana">${escapeHtml(week.title || '')}</h3>
                <span class="week-count-badge">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                    ${week.tasks.length} ${week.tasks.length === 1 ? 'tarefa' : 'tarefas'}
                </span>
            </div>
            <div class="week-actions" style="display: flex; align-items: center; gap: 4px;">
                <button class="btn-icon-copy-week" title="Duplicar / Copiar esta semana">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                </button>
                <button class="btn-icon-delete-week" title="Excluir esta semana">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;

        // Auto-save for week title
        const titleH3 = header.querySelector('h3');
        titleH3.addEventListener('focus', () => recordState());

        const saveWeekTitle = () => {
            const cleanTitle = titleH3.innerText.replace(/[\r\n]+/g, ' ').trim();
            week.title = cleanTitle || `Semana ${weekIndex + 1}`;
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

        header.querySelector('.btn-icon-copy-week').addEventListener('click', (e) => {
            e.stopPropagation();
            recordState();
            
            // Deep clone week and tasks
            const clonedWeek = JSON.parse(JSON.stringify(week));
            clonedWeek.id = 'w' + Date.now();
            clonedWeek.title = clonedWeek.title + ' (Cópia)';
            
            // Generate new IDs for cloned tasks
            clonedWeek.tasks.forEach((t, i) => {
                t.id = 't' + Date.now() + i;
            });
            
            // Insert cloned week exactly after the current week
            const currentIndex = appData.weeks.findIndex(w => w.id === week.id);
            appData.weeks.splice(currentIndex + 1, 0, clonedWeek);
            
            saveData();
            renderHourlyGridDashboard(clonedWeek.id);
            showToast('📋 Semana duplicada e destacada abaixo!');
        });

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
            // Limita a duração para não ultrapassar a linha 10 (17:00 as 18:00 = 1h max)
            const maxDur = Math.max(1, 10 - task.startRow + 1);
            if (task.duration > maxDur) {
                task.duration = maxDur;
            }

            const isEditing = (task.id === editingInlineTaskId);
            const taskCard = document.createElement('div');
            
            taskCard.className = `task-card ${task.category} ${task.duration === 1 ? 'compact-1h' : ''} ${isEditing ? 'is-editing' : ''}`;
            taskCard.dataset.taskId = task.id;
            taskCard.dataset.weekId = week.id;

            let spanGridTracks = task.duration;
            if (task.startRow < 5 && (task.startRow + task.duration) > 5) {
                spanGridTracks = task.duration + 1;
            }

            taskCard.style.gridColumn = `${task.day + 1}`;
            taskCard.style.gridRow = `${task.startRow} / span ${spanGridTracks}`;

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

                // INJEÇÃO DA PONTE FLUTUANTE DE ALMOÇO (APPLE FLOATING BRIDGE OVERLAY)
                const overlapsLunch = task.startRow <= 5 && (task.startRow + task.duration - 1) >= 5;
                if (overlapsLunch) {
                    const offset = (5 - task.startRow) * getRowHeight();
                    taskCard.insertAdjacentHTML('beforeend', `
                        <div class="lunch-overlay" style="top: ${offset}px; height: ${getRowHeight()}px;">
                            <div class="lunch-overlay-content">
                                <span class="lunch-pill">
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                        <line x1="6" y1="2" x2="6" y2="4"></line>
                                        <line x1="10" y1="2" x2="10" y2="4"></line>
                                        <line x1="14" y1="2" x2="14" y2="4"></line>
                                    </svg>
                                    12:00 – 13:00 • Pausa
                                </span>
                            </div>
                        </div>
                    `);
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
    renderFloatingStagingArea();
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderFloatingStagingArea() {
    const area = document.getElementById('floating-staging-area');
    const container = document.getElementById('staging-cards-container');
    const countBadge = document.getElementById('staging-count');
    if (!area || !container) return;

    if (!appData.floatingTasks) appData.floatingTasks = [];

    if (appData.floatingTasks.length === 0) {
        area.classList.add('hidden');
        container.innerHTML = '';
        if (countBadge) countBadge.textContent = '0';
        return;
    }

    area.classList.remove('hidden');
    container.innerHTML = '';
    if (countBadge) countBadge.textContent = appData.floatingTasks.length;

    appData.floatingTasks.forEach(task => {
        const card = document.createElement('div');
        card.className = `task-card ${task.category || 'cat-hvac'}`;
        card.dataset.taskId = task.id;
        card.dataset.isFloating = 'true';

        card.innerHTML = `
            <div class="task-card-header">
                <div class="task-header-meta">
                    <span class="task-category-dot"></span>
                    <span class="task-time-text">${formatDurationText(task.duration || 1)} · Mesa</span>
                </div>
                <button class="task-delete-btn" title="Excluir tarefa">×</button>
            </div>
            <div class="task-card-title">${escapeHtml(task.title || 'Sem título')}</div>
            ${task.desc ? `<div class="task-card-desc">${escapeHtml(task.desc)}</div>` : ''}
        `;

        const deleteBtn = card.querySelector('.task-delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const confirmed = await confirmSystemDialog(
                    'Excluir Tarefa',
                    `Tem certeza que deseja excluir "${task.title}"?`,
                    'Sim, Excluir',
                    true
                );
                if (confirmed) {
                    recordState();
                    appData.floatingTasks = appData.floatingTasks.filter(t => t.id !== task.id);
                    saveData();
                    renderHourlyGridDashboard();
                    showToast('🗑️ Tarefa excluída da mesa');
                }
            });
        }

        card.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showContextMenu(e, { task, weekId: null, isFloating: true }, null);
        });

        container.appendChild(card);
    });
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

let isInteractionsInitialized = false;

function setupInteractions() {
    if (isInteractionsInitialized) return;
    isInteractionsInitialized = true;

    document.addEventListener('pointerdown', (e) => {
        const taskCard = e.target.closest('.task-card');
        if (!taskCard) return;
        if (taskCard.classList.contains('is-editing')) return;
        if (e.target.classList.contains('task-delete-btn')) return;

        recordState();
        wasDraggingOrResizing = false;

        const taskId = taskCard.dataset.taskId;
        const weekId = taskCard.dataset.weekId;

        if (weekId) {
            activeWeekObj = appData.weeks.find(w => w.id === weekId);
            activeTaskObj = activeWeekObj ? activeWeekObj.tasks.find(t => t.id === taskId) : null;
            if (!activeTaskObj) return;

            selectedTaskContext = { task: activeTaskObj, weekId };
            startRow = activeTaskObj.startRow;
            startDuration = activeTaskObj.duration;
            startDay = activeTaskObj.day;
        } else {
            activeWeekObj = null;
            activeTaskObj = appData.floatingTasks ? appData.floatingTasks.find(t => t.id === taskId) : null;
            if (!activeTaskObj) return;

            activeTaskObj.isFloating = true;
            selectedTaskContext = { task: activeTaskObj, weekId: null };
            startRow = 1;
            startDuration = activeTaskObj.duration || 1;
            startDay = 1;
        }

        activeTaskEl = taskCard;
        startY = e.clientY;
        startX = e.clientX;

        if (e.target.classList.contains('resize-handle')) {
            interactionType = 'resize';
        } else {
            interactionType = 'drag';
        }

        activeTaskEl.classList.remove('is-settling');

        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
    });
}

let dragProxyEl = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

function createDragProxy(taskCard, mouseX, mouseY) {
    removeDragProxy();

    const rect = taskCard.getBoundingClientRect();
    dragOffsetX = mouseX - rect.left;
    dragOffsetY = mouseY - rect.top;

    dragProxyEl = taskCard.cloneNode(true);
    dragProxyEl.id = 'active-drag-proxy';
    dragProxyEl.classList.add('is-dragging-proxy');
    dragProxyEl.style.position = 'fixed';
    dragProxyEl.style.width = `${rect.width}px`;
    dragProxyEl.style.height = `${rect.height}px`;
    dragProxyEl.style.left = `${mouseX - dragOffsetX}px`;
    dragProxyEl.style.top = `${mouseY - dragOffsetY}px`;
    dragProxyEl.style.zIndex = '999999';
    dragProxyEl.style.pointerEvents = 'none';
    dragProxyEl.style.margin = '0';
    dragProxyEl.style.transform = 'rotate(-1.5deg) scale(1.04)';
    dragProxyEl.style.boxShadow = '0 20px 48px rgba(15, 23, 42, 0.28), 0 8px 16px rgba(15, 23, 42, 0.16)';
    dragProxyEl.style.opacity = '0.98';

    document.body.appendChild(dragProxyEl);
}

function updateDragProxyPosition(mouseX, mouseY) {
    if (dragProxyEl) {
        dragProxyEl.style.left = `${mouseX - dragOffsetX}px`;
        dragProxyEl.style.top = `${mouseY - dragOffsetY}px`;
    }
}

function removeDragProxy() {
    if (dragProxyEl) {
        dragProxyEl.remove();
        dragProxyEl = null;
    }
    const existing = document.getElementById('active-drag-proxy');
    if (existing) existing.remove();
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
                createDragProxy(activeTaskEl, e.clientX, e.clientY);
                activeTaskEl.style.opacity = '0.2';
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
    } else if (interactionType === 'drag' && wasDraggingOrResizing) {
        updateDragProxyPosition(e.clientX, e.clientY);
    }
}

function onPointerUp(e) {
    if (!activeTaskObj) return;

    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);

    removeDragProxy();

    if (activeTaskEl) {
        activeTaskEl.style.opacity = '';
    }

    const wasResizing = (interactionType === 'resize');

    if (interactionType === 'drag' && wasDraggingOrResizing) {
        const elementBelow = document.elementFromPoint(e.clientX, e.clientY);

        let targetGridEl = elementBelow ? elementBelow.closest('.timeline-grid') : null;
        if (!targetGridEl && elementBelow) {
            const weekCard = elementBelow.closest('.week-card');
            if (weekCard) {
                targetGridEl = weekCard.querySelector('.timeline-grid');
            }
        }

        if (!targetGridEl) {
            // SOLTOU FORA DE UM CRONOGRAMA -> ANIMAÇÃO DE VOO ATÉ O FINAL DA MESA DE IDEIAS
            const dropX = e.clientX;
            const dropY = e.clientY;
            const stagingArea = document.getElementById('floating-staging-area');

            let targetX = window.innerWidth - 230;
            let targetY = 60;

            if (stagingArea) {
                const wasHidden = stagingArea.classList.contains('hidden');
                if (wasHidden) stagingArea.classList.remove('hidden');

                const cards = stagingArea.querySelectorAll('.staging-cards-container .task-card');
                if (cards.length > 0) {
                    // Se existe último card, voa exatamente para ABAIXO do último card!
                    const lastCard = cards[cards.length - 1];
                    const lastRect = lastCard.getBoundingClientRect();
                    targetX = lastRect.left;
                    targetY = lastRect.bottom + 6;
                } else {
                    // Se não tiver nenhum card, voa para o topo da fila da mesa!
                    const container = stagingArea.querySelector('.staging-cards-container') || stagingArea;
                    const containerRect = container.getBoundingClientRect();
                    targetX = containerRect.left > 10 ? containerRect.left + 4 : (window.innerWidth - 230);
                    targetY = containerRect.top > 10 ? containerRect.top + 32 : 60;
                }
            }

            if (activeTaskEl) {
                const flyingClone = activeTaskEl.cloneNode(true);
                flyingClone.id = 'flying-task-clone';
                flyingClone.className = `task-card ${activeTaskObj.category || 'cat-hvac'} is-flying-clone`;
                flyingClone.style.position = 'fixed';
                flyingClone.style.width = '210px';
                flyingClone.style.left = `${dropX - dragOffsetX}px`;
                flyingClone.style.top = `${dropY - dragOffsetY}px`;
                flyingClone.style.zIndex = '999999';
                flyingClone.style.pointerEvents = 'none';
                flyingClone.style.transition = 'all 0.42s cubic-bezier(0.16, 1, 0.3, 1)';
                flyingClone.style.transform = 'rotate(-4deg) scale(1.05)';
                flyingClone.style.boxShadow = '0 20px 48px rgba(15, 23, 42, 0.3)';

                document.body.appendChild(flyingClone);

                requestAnimationFrame(() => {
                    flyingClone.style.left = `${targetX}px`;
                    flyingClone.style.top = `${targetY}px`;
                    flyingClone.style.transform = 'rotate(-1.8deg) scale(0.96)';
                    flyingClone.style.opacity = '0.85';
                });

                setTimeout(() => {
                    if (flyingClone) flyingClone.remove();

                    recordState();
                    if (activeWeekObj) {
                        activeWeekObj.tasks = activeWeekObj.tasks.filter(t => t.id !== activeTaskObj.id);
                    }
                    if (!appData.floatingTasks) appData.floatingTasks = [];
                    if (!appData.floatingTasks.some(t => t.id === activeTaskObj.id)) {
                        delete activeTaskObj.isFloating;
                        appData.floatingTasks.push(activeTaskObj); // Adiciona ao final da pilha para alinhar com o voo!
                    }

                    saveData();
                    renderHourlyGridDashboard();
                    showToast('📌 Tarefa solta na mesa de tarefas');
                }, 420);
            }
            return;
        }

        // SOLTOU DENTRO DE UM CRONOGRAMA (.timeline-grid)
        const targetWeekId = targetGridEl.dataset.weekId;
        const rect = targetGridEl.getBoundingClientRect();
        const timeColWidth = isZoomOutMode ? 76 : 90;
        const colWidth = (rect.width - timeColWidth) / 5;
        const rowHeight = getRowHeight();

        const relativeX = e.clientX - rect.left - timeColWidth;
        const relativeY = e.clientY - rect.top;

        let newDay = Math.max(1, Math.min(5, Math.floor(relativeX / colWidth) + 1));
        let newRow = Math.max(1, Math.min(10, Math.floor(relativeY / rowHeight) + 1));
        if (newRow === 5) newRow = 6;

        const targetWeek = appData.weeks.find(w => w.id === targetWeekId);
        const tasksInDay = targetWeek ? targetWeek.tasks.filter(t => t.id !== activeTaskObj.id && t.day === newDay) : [];
        const tasksBelow = tasksInDay.filter(t => t.startRow >= newRow);

        let maxAvailable = 10 - newRow + 1;
        if (tasksBelow.length > 0) {
            const nextTaskStartRow = Math.min(...tasksBelow.map(t => t.startRow));
            maxAvailable = nextTaskStartRow - newRow;
        }

        if (maxAvailable <= 0) {
            showToast('⚠️ Horário de destino já está ocupado.');
            renderHourlyGridDashboard();
            return;
        }

        const finalDuration = Math.min(activeTaskObj.duration || 1, maxAvailable);

        if (!activeWeekObj || activeTaskObj.isFloating) {
            // Veio da mesa flutuante
            recordState();
            if (appData.floatingTasks) {
                appData.floatingTasks = appData.floatingTasks.filter(t => t.id !== activeTaskObj.id);
            }
            delete activeTaskObj.isFloating;
            activeTaskObj.startRow = newRow;
            activeTaskObj.day = newDay;
            activeTaskObj.duration = finalDuration;

            if (targetWeek) {
                targetWeek.tasks.push(activeTaskObj);
            }

            saveData();
            renderHourlyGridDashboard();
            showToast('🚀 Tarefa encaixada no cronograma!');
            return;
        }

        if (targetWeekId !== activeWeekObj.id && targetWeek) {
            // Mudou de semana
            recordState();
            const taskIndex = activeWeekObj.tasks.findIndex(t => t.id === activeTaskObj.id);
            if (taskIndex > -1) {
                const [migratedTask] = activeWeekObj.tasks.splice(taskIndex, 1);
                migratedTask.startRow = newRow;
                migratedTask.day = newDay;
                migratedTask.duration = finalDuration;
                targetWeek.tasks.push(migratedTask);
            }

            saveData();
            renderHourlyGridDashboard();
            showToast('🚀 Tarefa movida para outra semana!');
            return;
        }

        // Atualização normal na mesma semana
        recordState();
        activeTaskObj.startRow = newRow;
        activeTaskObj.day = newDay;
        activeTaskObj.duration = finalDuration;

        saveData();
        renderHourlyGridDashboard();
    } else if (activeTaskEl) {
        activeTaskEl.style.opacity = '';
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
    if (!selectedTaskContext || !selectedTaskContext.task) return;
    
    const confirmed = await confirmSystemDialog(
        'Excluir Tarefa',
        `Tem certeza que deseja excluir "${selectedTaskContext.task.title}"?`,
        'Sim, Excluir',
        true
    );
    if (confirmed) {
        recordState();
        if (selectedTaskContext.weekId) {
            const week = appData.weeks.find(w => w.id === selectedTaskContext.weekId);
            if (week) {
                week.tasks = week.tasks.filter(t => t.id !== selectedTaskContext.task.id);
            }
        } else if (appData.floatingTasks) {
            appData.floatingTasks = appData.floatingTasks.filter(t => t.id !== selectedTaskContext.task.id);
        }
        saveData();
        renderHourlyGridDashboard();
        showToast('🗑️ Tarefa excluída');
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

// MOUSE POSITION TRACKER & HOVER DETECTOR FOR KEYBOARD SHORTCUTS
let currentMouseX = 0;
let currentMouseY = 0;

window.addEventListener('mousemove', (e) => {
    currentMouseX = e.clientX;
    currentMouseY = e.clientY;
});

function getTaskUnderMouseOrSelected() {
    const el = document.elementFromPoint(currentMouseX, currentMouseY);
    if (el) {
        const taskCard = el.closest('.task-card');
        if (taskCard) {
            const taskId = taskCard.dataset.taskId;
            const weekId = taskCard.dataset.weekId;
            if (weekId) {
                const week = appData.weeks.find(w => w.id === weekId);
                if (week) {
                    const task = week.tasks.find(t => t.id === taskId);
                    if (task) return { task, weekId };
                }
            } else if (appData.floatingTasks) {
                const task = appData.floatingTasks.find(t => t.id === taskId);
                if (task) return { task, weekId: null };
            }
        }
    }
    return selectedTaskContext;
}

// KEYBOARD SHORTCUTS (Ctrl+Z, Ctrl+Y, Ctrl+C, Ctrl+X, Ctrl+V, Delete)
document.addEventListener('keydown', async (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

    if (cmdOrCtrl && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
            redoAction();
        } else {
            undoAction();
        }
    } else if (cmdOrCtrl && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redoAction();
    } else if (cmdOrCtrl && e.key.toLowerCase() === 'c') {
        const targetCtx = getTaskUnderMouseOrSelected();
        if (targetCtx) {
            e.preventDefault();
            taskClipboard = {
                action: 'copy',
                task: JSON.parse(JSON.stringify(targetCtx.task)),
                sourceWeekId: targetCtx.weekId
            };
            document.body.classList.add('has-clipboard');
            showToast(`📋 Tarefa "${targetCtx.task.title}" copiada (Ctrl+C)`);
        }
    } else if (cmdOrCtrl && e.key.toLowerCase() === 'x') {
        const targetCtx = getTaskUnderMouseOrSelected();
        if (targetCtx) {
            e.preventDefault();
            taskClipboard = {
                action: 'cut',
                task: JSON.parse(JSON.stringify(targetCtx.task)),
                sourceWeekId: targetCtx.weekId
            };
            document.body.classList.add('has-clipboard');
            showToast(`✂️ Tarefa "${targetCtx.task.title}" recortada (Ctrl+X)`);
        }
    } else if (cmdOrCtrl && e.key.toLowerCase() === 'v') {
        if (!taskClipboard) {
            showToast('⚠️ Nenhuma tarefa na área de transferência para colar.');
            return;
        }
        e.preventDefault();

        const elementBelow = document.elementFromPoint(currentMouseX, currentMouseY);
        const targetGridEl = elementBelow ? elementBelow.closest('.timeline-grid') : null;

        if (!targetGridEl) {
            showToast('⚠️ Posicione o ponteiro do mouse sobre um dia da grade para colar (Ctrl+V).');
            return;
        }

        const targetWeekId = targetGridEl.dataset.weekId;
        const targetWeek = appData.weeks.find(w => w.id === targetWeekId);
        if (!targetWeek) return;

        const rect = targetGridEl.getBoundingClientRect();
        const timeColWidth = isZoomOutMode ? 76 : 90;
        const colWidth = (rect.width - timeColWidth) / 5;
        const rowHeight = getRowHeight();

        const relativeX = currentMouseX - rect.left - timeColWidth;
        const relativeY = currentMouseY - rect.top;

        let pasteDay = Math.max(1, Math.min(5, Math.floor(relativeX / colWidth) + 1));
        let pasteRow = Math.max(1, Math.min(10, Math.floor(relativeY / rowHeight) + 1));
        if (pasteRow === 5) pasteRow = 6;

        // Auto-Resize check for collision
        const tasksInDay = targetWeek.tasks.filter(t => (taskClipboard.action !== 'cut' || t.id !== taskClipboard.task.id) && t.day === pasteDay);
        const tasksBelow = tasksInDay.filter(t => t.startRow >= pasteRow);

        let maxAvailable = 10 - pasteRow + 1;
        if (tasksBelow.length > 0) {
            const nextTaskStartRow = Math.min(...tasksBelow.map(t => t.startRow));
            maxAvailable = nextTaskStartRow - pasteRow;
        }

        if (maxAvailable <= 0) {
            showToast('⚠️ Horário sob o cursor já está ocupado por outra tarefa.');
            return;
        }

        const finalDuration = Math.min(taskClipboard.task.duration, maxAvailable);

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
        newTask.duration = finalDuration;

        targetWeek.tasks.push(newTask);

        if (taskClipboard.action === 'cut') {
            taskClipboard = null;
            document.body.classList.remove('has-clipboard');
        }

        saveData();
        renderHourlyGridDashboard();
        showToast(`📋 Tarefa "${newTask.title}" colada sob o ponteiro do mouse!`);
    } else if (e.key === 'Delete') {
        const targetCtx = getTaskUnderMouseOrSelected();
        if (targetCtx) {
            e.preventDefault();
            const week = appData.weeks.find(w => w.id === targetCtx.weekId);
            if (week) {
                const confirmed = await confirmSystemDialog(
                    'Excluir Tarefa',
                    `Tem certeza que deseja excluir "${targetCtx.task.title}"?`,
                    'Sim, Excluir',
                    true
                );
                if (confirmed) {
                    recordState();
                    week.tasks = week.tasks.filter(t => t.id !== targetCtx.task.id);
                    saveData();
                    renderHourlyGridDashboard();
                    showToast('🗑️ Tarefa excluída');
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

function selectModalCategorySwatch(cat) {
    const hiddenSelect = document.getElementById('task-category');
    if (hiddenSelect) hiddenSelect.value = cat;
    
    document.querySelectorAll('.category-swatches-grid .swatch-btn').forEach(btn => {
        if (btn.dataset.cat === cat) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function selectModalDurationChip(dur) {
    const hiddenSelect = document.getElementById('task-duration-select');
    if (hiddenSelect) hiddenSelect.value = String(dur);

    document.querySelectorAll('.duration-chips-group .dur-chip-btn').forEach(btn => {
        if (btn.dataset.dur === String(dur)) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function updateModalContextBadge() {
    const weekId = document.getElementById('task-week-select')?.value;
    const day = parseInt(document.getElementById('task-day-select')?.value || 1);
    const timeStr = document.getElementById('task-time-select')?.value || '08:00';
    const badgeTextEl = document.getElementById('task-context-badge-text');

    const weekObj = appData.weeks.find(w => w.id === weekId);
    const weekTitle = weekObj ? weekObj.title : 'Semana';
    const dayName = getDayName(day);

    if (badgeTextEl) {
        badgeTextEl.textContent = `🗓️ ${weekTitle} · ${dayName} · ${timeStr}`;
    }
}

function openModal(task = null, weekId = null, presetDay = null, presetRow = null) {
    populateModalSelects();

    const advPanel = document.getElementById('task-advanced-panel');
    const advToggleBtn = document.getElementById('btn-toggle-task-advanced');
    if (advPanel) advPanel.classList.add('hidden');
    if (advToggleBtn) advToggleBtn.classList.remove('active');

    if (task) {
        editingTaskId = task.id;
        editingWeekId = weekId;

        document.getElementById('modal-title').textContent = 'Editar Tarefa';
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-desc').value = task.desc || '';
        document.getElementById('task-week-select').value = weekId;
        document.getElementById('task-day-select').value = task.day;
        document.getElementById('task-time-select').value = rowToTime(task.startRow);
        
        selectModalDurationChip(task.duration);
        selectModalCategorySwatch(task.category);
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

        selectModalDurationChip(1);
        selectModalCategorySwatch('cat-hvac');
        document.getElementById('btn-delete-task').style.display = 'none';
    }

    updateModalContextBadge();
    modal.classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('task-title')?.focus();
    }, 60);
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
    const maxAllowedDur = Math.max(1, 10 - startRow + 1);
    const finalDuration = Math.min(duration, maxAllowedDur);

    // Verificação Anti-Colisão antes de salvar
    if (hasTaskCollision(targetWeekId, day, startRow, finalDuration, editingTaskId)) {
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
            task.duration = finalDuration;
            task.category = category;
            targetWeek.tasks.push(task);
        }
    } else {
        if (targetWeek) {
            targetWeek.tasks.push({
                id: 't' + Date.now(),
                day,
                startRow,
                duration: finalDuration,
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
        setTimeout(() => themeBtn.classList.remove('theme-spin'), 300);
    }

    if (document.startViewTransition) {
        let x, y;
        if (themeBtn) {
            const rect = themeBtn.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        } else if (event && event.clientX) {
            x = event.clientX;
            y = event.clientY;
        } else {
            x = window.innerWidth / 2;
            y = window.innerHeight / 2;
        }

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            changeTheme();
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`
                    ]
                },
                {
                    duration: 650,
                    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    pseudoElement: '::view-transition-new(root)'
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

function setupProfileSelectorListeners() {
    const brandBtn = document.getElementById('btn-profile-selector');
    if (brandBtn) {
        brandBtn.addEventListener('click', (e) => {
            toggleProfileDropdown(e);
        });
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('#btn-profile-selector')) {
            closeProfileDropdown();
        }
    });

    const btnCreate = document.getElementById('btn-action-create-profile');
    if (btnCreate) {
        btnCreate.addEventListener('click', (e) => {
            e.stopPropagation();
            closeProfileDropdown();
            openModalNewProfile();
        });
    }

    const btnDuplicate = document.getElementById('btn-action-duplicate-profile');
    if (btnDuplicate) {
        btnDuplicate.addEventListener('click', (e) => {
            e.stopPropagation();
            closeProfileDropdown();
            duplicateProfile(multiProfileStore.activeProfileId);
        });
    }

    const modalNewProf = document.getElementById('modal-new-profile');
    const btnCloseNewProfX = document.getElementById('btn-close-new-profile-x');
    const btnCancelNewProf = document.getElementById('btn-cancel-new-profile');
    const btnSaveNewProf = document.getElementById('btn-save-new-profile');

    function openModalNewProfile() {
        if (!modalNewProf) return;
        document.getElementById('new-profile-name').value = '';
        document.getElementById('new-profile-sub').value = '';
        modalNewProf.classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('new-profile-name')?.focus();
        }, 50);
    }

    function closeModalNewProfile() {
        if (modalNewProf) modalNewProf.classList.add('hidden');
    }

    if (btnCloseNewProfX) btnCloseNewProfX.addEventListener('click', closeModalNewProfile);
    if (btnCancelNewProf) btnCancelNewProf.addEventListener('click', closeModalNewProfile);
    
    const titleEl = document.getElementById('active-profile-title');
    const subEl = document.getElementById('active-profile-subtitle');

    if (titleEl) {
        titleEl.addEventListener('click', (e) => e.stopPropagation());
        titleEl.addEventListener('blur', () => {
            const newName = titleEl.textContent.trim() || 'BHE ES';
            titleEl.textContent = newName;
            const active = getActiveProfile();
            if (active && active.name !== newName) {
                recordState();
                active.name = newName;
                saveData();
                document.title = `${newName} | Cronograma de Manutenção`;
                showToast(`✏️ Cronograma renomeado para "${newName}"`);
            }
        });
        titleEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                titleEl.blur();
            }
        });
    }

    if (subEl) {
        subEl.addEventListener('click', (e) => e.stopPropagation());
        subEl.addEventListener('blur', () => {
            const newSub = subEl.textContent.trim() || 'ESPÍRITO SANTO N°1000';
            subEl.textContent = newSub;
            const active = getActiveProfile();
            if (active && active.subtitle !== newSub) {
                recordState();
                active.subtitle = newSub;
                saveData();
                showToast('✏️ Subtítulo da unidade atualizado');
            }
        });
        subEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                subEl.blur();
            }
        });
    }

    if (btnSaveNewProf) {
        btnSaveNewProf.addEventListener('click', () => {
            const name = document.getElementById('new-profile-name').value;
            const sub = document.getElementById('new-profile-sub').value;
            if (!name.trim()) {
                showToast('⚠️ Por favor digite o nome do novo cronograma.');
                return;
            }
            createNewProfile(name, sub);
            closeModalNewProfile();
        });
    }
}

function setupTaskModalListeners() {
    document.querySelectorAll('.category-swatches-grid .swatch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectModalCategorySwatch(btn.dataset.cat);
        });
    });

    document.querySelectorAll('.duration-chips-group .dur-chip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectModalDurationChip(btn.dataset.dur);
        });
    });

    const advToggleBtn = document.getElementById('btn-toggle-task-advanced');
    const advPanel = document.getElementById('task-advanced-panel');
    if (advToggleBtn && advPanel) {
        advToggleBtn.addEventListener('click', () => {
            const isHidden = advPanel.classList.contains('hidden');
            if (isHidden) {
                advPanel.classList.remove('hidden');
                advToggleBtn.classList.add('active');
            } else {
                advPanel.classList.add('hidden');
                advToggleBtn.classList.remove('active');
            }
        });
    }

    ['task-week-select', 'task-day-select', 'task-time-select'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', updateModalContextBadge);
    });
}

const CURRENT_APP_VERSION = 'v.0.0.7';

function setupWhatsNewModal() {
    const modal = document.getElementById('modal-whats-new');
    const btnCloseX = document.getElementById('btn-close-whats-new-x');
    const btnClose = document.getElementById('btn-close-whats-new');
    const btnFooterOpen = document.getElementById('btn-open-whats-new');

    function openWhatsNew() {
        if (!modal) return;
        modal.classList.remove('hidden');
    }

    function closeWhatsNew() {
        if (!modal) return;
        modal.classList.add('hidden');
        localStorage.setItem('mgcen00_last_version_seen', CURRENT_APP_VERSION);
    }

    if (btnCloseX) btnCloseX.addEventListener('click', closeWhatsNew);
    if (btnClose) btnClose.addEventListener('click', closeWhatsNew);
    if (btnFooterOpen) btnFooterOpen.addEventListener('click', openWhatsNew);

    // Exibe apenas no primeiro acesso do usuário
    const lastSeenVersion = localStorage.getItem('mgcen00_last_version_seen');
    if (lastSeenVersion !== CURRENT_APP_VERSION) {
        setTimeout(() => {
            openWhatsNew();
        }, 150);
    }
}

function setupStagingCollapse() {
    const area = document.getElementById('floating-staging-area');
    const btnToggle = document.getElementById('btn-toggle-staging-collapse');
    const header = area ? area.querySelector('.staging-header') : null;
    if (!area) return;

    const isCollapsed = localStorage.getItem('cronogramas_staging_collapsed') === 'true';
    if (isCollapsed) {
        area.classList.add('is-collapsed');
    }

    function toggleCollapse(e) {
        if (e) e.stopPropagation();
        area.classList.toggle('is-collapsed');
        const nowCollapsed = area.classList.contains('is-collapsed');
        localStorage.setItem('cronogramas_staging_collapsed', nowCollapsed ? 'true' : 'false');
    }

    if (btnToggle) {
        btnToggle.addEventListener('click', toggleCollapse);
    }
    if (header) {
        header.addEventListener('click', (e) => {
            if (e.target.closest('#btn-toggle-staging-collapse')) return;
            toggleCollapse(e);
        });
    }
}

// Init
loadData();
setupProfileSelectorListeners();
setupTaskModalListeners();
setupWhatsNewModal();
applyZoomOutState();
setupThemeController();
renderHourlyGridDashboard();
setupCategoryFilters();
setupZoomController();
setupStagingCollapse();

// Sincronização imediata na nuvem ao carregar a página
syncFromCloud(true);

// ==========================================================================
// MOTOR DE EXPORTAÇÃO PDF EXECUTIVO (A4 LANDSCAPE TABLE SYSTEM - 2 WEEKS/PAGE)
// ==========================================================================
function getCategoryLabel(catClass) {
    const categoriesMap = {
        'cat-hvac': 'HVAC',
        'cat-elec': 'Elétrica',
        'cat-routine': 'Rotina',
        'cat-purple': 'Infratel',
        'cat-pink': 'Relatórios',
        'cat-orange': 'Corretiva',
        'cat-cyan': 'Refrigeração',
        'cat-teal': 'Hidráulica',
        'cat-indigo': 'Especial'
    };
    return categoriesMap[catClass] || 'Manutenção';
}

let currentSelectedPdfMode = '2weeks';

function buildExecutivePrintSheet(weeksPerPageMode = currentSelectedPdfMode) {
    try {
        // Garantir que tooltips e menus flutuantes sejam escondidos imediatamente
        const floatingTooltip = document.getElementById('task-floating-tooltip');
        if (floatingTooltip) floatingTooltip.classList.add('hidden');

        const contextMenu = document.getElementById('custom-context-menu');
        if (contextMenu) contextMenu.classList.add('hidden');

        let existingSheet = document.getElementById('executive-pdf-print-sheet');
        if (existingSheet) existingSheet.remove();

        const activeProfile = getActiveProfile();
        const weeks = activeProfile ? (activeProfile.weeks || []) : [];
        const now = new Date();
        const formattedDate = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        let totalTasksCount = 0;
        weeks.forEach(w => totalTasksCount += (w.tasks ? w.tasks.length : 0));

        const printContainer = document.createElement('div');
        printContainer.id = 'executive-pdf-print-sheet';
        printContainer.className = `executive-pdf-print-sheet mode-${weeksPerPageMode}`;

        const perPage = (weeksPerPageMode === '1week') ? 1 : 2;
        const pagesCount = Math.ceil(weeks.length / perPage) || 1;

        for (let p = 0; p < pagesCount; p++) {
            const pageWeeks = weeks.slice(p * perPage, p * perPage + perPage);
            const pageEl = document.createElement('div');
            pageEl.className = `pdf-page-container mode-${weeksPerPageMode}`;

            let headerHtml = '';
            if (p === 0) {
                headerHtml = `
                    <div class="pdf-exec-header">
                        <div class="pdf-exec-title-row">
                            <div>
                                <h1 class="pdf-doc-title">CRONOGRAMA DE MANUTENÇÃO PREVENTIVA E CORRETIVA</h1>
                                <div class="pdf-doc-sub">UNIDADE: <strong>${escapeHtml(activeProfile.name || 'BHE ES')}</strong> &nbsp;·&nbsp; ${escapeHtml(activeProfile.subtitle || 'ESPÍRITO SANTO N°1000')}</div>
                            </div>
                            <div class="pdf-doc-meta">
                                <span class="pdf-meta-tag">EMISSÃO: ${formattedDate}</span>
                                <span class="pdf-meta-tag">TOTAL: ${totalTasksCount} MANUTENÇÕES</span>
                                <span class="pdf-meta-tag">${weeks.length} SEMANAS</span>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                headerHtml = `
                    <div class="pdf-exec-header compact">
                        <div class="pdf-exec-title-row">
                            <span class="pdf-doc-sub">UNIDADE: <strong>${escapeHtml(activeProfile.name || 'BHE ES')}</strong> &nbsp;·&nbsp; RELATÓRIO EXECUTIVO DE MANUTENÇÃO</span>
                            <span class="pdf-meta-tag">PÁGINA ${p + 1} DE ${pagesCount}</span>
                        </div>
                    </div>
                `;
            }

            let weeksHtml = '<div class="pdf-weeks-stack">';
            pageWeeks.forEach((week, indexOnPage) => {
                const actualWeekNum = (p * perPage) + indexOnPage + 1;
                weeksHtml += `
                    <div class="pdf-week-card">
                        <div class="pdf-week-header">
                            <span class="pdf-week-badge">SEMANA ${actualWeekNum}</span>
                            <h3 class="pdf-week-title">${escapeHtml(week.title || `Semana ${actualWeekNum}`)}</h3>
                            <span class="pdf-week-count">${week.tasks ? week.tasks.length : 0} manutenções</span>
                        </div>
                        <table class="pdf-grid-table">
                            <thead>
                                <tr>
                                    <th class="pdf-col-time">HORÁRIO</th>
                                    <th>SEG (01)</th>
                                    <th>TER (02)</th>
                                    <th>QUA (03)</th>
                                    <th>QUI (04)</th>
                                    <th>SEX (05)</th>
                                </tr>
                            </thead>
                            <tbody>
                `;

                TIME_SLOTS.forEach(slot => {
                    if (slot.row === 5) {
                        weeksHtml += `
                            <tr class="pdf-lunch-row">
                                <td class="pdf-col-time">${slot.time}</td>
                                <td colspan="5" class="pdf-lunch-cell">☕ REFEIÇÃO / INTERVALO ALMOÇO (12:00 - 13:00)</td>
                            </tr>
                        `;
                    } else {
                        weeksHtml += `<tr><td class="pdf-col-time">${slot.time}</td>`;
                        for (let day = 1; day <= 5; day++) {
                            const tasksInWeek = week.tasks || [];
                            
                            const activeTask = tasksInWeek.find(t => {
                                if (t.day !== day) return false;
                                if (slot.row === 5) return false;

                                if (t.startRow < 5) {
                                    const morningHours = 5 - t.startRow;
                                    if ((t.duration || 1) <= morningHours) {
                                        if (slot.row > 5) return false;
                                        return slot.row >= t.startRow && slot.row <= (t.startRow + (t.duration || 1) - 1);
                                    } else {
                                        if (slot.row < 5) {
                                            return slot.row >= t.startRow && slot.row <= 4;
                                        } else {
                                            const afternoonHours = (t.duration || 1) - morningHours;
                                            const afternoonEndRow = 5 + afternoonHours;
                                            return slot.row >= 6 && slot.row <= afternoonEndRow;
                                        }
                                    }
                                } else {
                                    if (slot.row < 5) return false;
                                    return slot.row >= t.startRow && slot.row <= (t.startRow + (t.duration || 1) - 1);
                                }
                            });

                            if (activeTask) {
                                const isStart = (activeTask.startRow === slot.row) || (slot.row === 6 && activeTask.startRow < 5);
                                const catClass = activeTask.category || 'cat-hvac';
                                const catLabel = getCategoryLabel(catClass);

                                if (isStart) {
                                    weeksHtml += `
                                        <td class="pdf-task-cell ${catClass} task-start">
                                            <div class="pdf-task-box">
                                                <div class="pdf-task-top">
                                                    <span class="pdf-task-time">${activeTask.startTime || '08:00'} (${activeTask.duration || 1}h)</span>
                                                    <span class="pdf-task-cat">${catLabel}</span>
                                                </div>
                                                <strong class="pdf-task-title">${escapeHtml(activeTask.title || 'Manutenção')}</strong>
                                                ${activeTask.description ? `<p class="pdf-task-desc">${escapeHtml(activeTask.description)}</p>` : ''}
                                            </div>
                                        </td>
                                    `;
                                } else {
                                    weeksHtml += `
                                        <td class="pdf-task-cell ${catClass} task-cont">
                                            <div class="pdf-task-cont-box">
                                                <span class="pdf-task-cont-line">↕ ${escapeHtml(activeTask.title || 'Manutenção')}</span>
                                            </div>
                                        </td>
                                    `;
                                }
                            } else {
                                weeksHtml += `<td class="pdf-empty-cell"></td>`;
                            }
                        }
                        weeksHtml += `</tr>`;
                    }
                });

                weeksHtml += `
                            </tbody>
                        </table>
                    </div>
                `;
            });
            weeksHtml += '</div>';

            const footerHtml = `
                <div class="pdf-page-footer">
                    <div>Desenvolvido e Projetado por <strong>Claudius Rangel</strong> &nbsp;•&nbsp; EQS ENGENHARIA · Claro Infra MG</div>
                    <div>UNIDADE ${escapeHtml(activeProfile.name || 'BHE ES')} &nbsp;•&nbsp; v.0.0.7 &nbsp;•&nbsp; Página ${p + 1} de ${pagesCount}</div>
                </div>
            `;

            pageEl.innerHTML = headerHtml + weeksHtml + footerHtml;
            printContainer.appendChild(pageEl);
        }

        document.body.appendChild(printContainer);
    } catch (err) {
        console.error('Erro ao construir folha do PDF:', err);
    }
}

function generateExecutivePDF(mode = currentSelectedPdfMode) {
    currentSelectedPdfMode = mode;
    showToast(`📄 Gerando PDF executivo (${mode === '1week' ? '1 Semana por Página' : '2 Semanas por Página'})...`);
    buildExecutivePrintSheet(mode);
    setTimeout(() => {
        window.print();
    }, 150);
}

// Global print event handlers
window.addEventListener('beforeprint', () => {
    buildExecutivePrintSheet(currentSelectedPdfMode);
});

window.addEventListener('afterprint', () => {
    const sheet = document.getElementById('executive-pdf-print-sheet');
    if (sheet) sheet.remove();
});

// CONTROLADOR DO MENU DROPDOWN DE EXPORTAÇÃO PDF DO BOTÃO
const exportPdfDropdownMenu = document.getElementById('export-pdf-dropdown-menu');
const btnExportPdf = document.getElementById('btn-export');
const optPdf2weeks = document.getElementById('opt-pdf-2weeks');
const optPdf1week = document.getElementById('opt-pdf-1week');

if (btnExportPdf && exportPdfDropdownMenu) {
    btnExportPdf.addEventListener('click', (e) => {
        e.stopPropagation();
        exportPdfDropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!exportPdfDropdownMenu.contains(e.target) && e.target !== btnExportPdf) {
            exportPdfDropdownMenu.classList.add('hidden');
        }
    });
}

if (optPdf2weeks) {
    optPdf2weeks.addEventListener('click', (e) => {
        e.stopPropagation();
        if (exportPdfDropdownMenu) exportPdfDropdownMenu.classList.add('hidden');
        generateExecutivePDF('2weeks');
    });
}

if (optPdf1week) {
    optPdf1week.addEventListener('click', (e) => {
        e.stopPropagation();
        if (exportPdfDropdownMenu) exportPdfDropdownMenu.classList.add('hidden');
        generateExecutivePDF('1week');
    });
}

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

// ATALHOS GLOBAIS DE TECLADO & LIMPEZA DE ARRASTO AO PERDER FOCO
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProfileDropdown();

        const exportDropdown = document.getElementById('export-pdf-dropdown-menu');
        if (exportDropdown) exportDropdown.classList.add('hidden');

        const floatingTooltip = document.getElementById('task-floating-tooltip');
        if (floatingTooltip) floatingTooltip.classList.add('hidden');

        const ctxMenu = document.getElementById('custom-context-menu');
        if (ctxMenu) ctxMenu.classList.add('hidden');
    }
});

window.addEventListener('blur', () => {
    const activeDrag = document.getElementById('active-drag-proxy');
    if (activeDrag) activeDrag.remove();

    const flyingClone = document.getElementById('flying-task-clone');
    if (flyingClone) flyingClone.remove();

    document.body.classList.remove('is-dragging-task');
});
