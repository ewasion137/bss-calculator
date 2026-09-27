// Парсинг значений (k, m, b, t, q)
function parseVal(val) {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const s = val.toString().toLowerCase().trim().replace(/,/g, '');
    const n = parseFloat(s);
    if (s.endsWith('q')) return n * 1e15;
    if (s.endsWith('t')) return n * 1e12;
    if (s.endsWith('b')) return n * 1e9;
    if (s.endsWith('m')) return n * 1e6;
    if (s.endsWith('k')) return n * 1e3;
    return n || 0;
}

function formatVal(n) {
    if (n >= 1e15) return (n / 1e15).toFixed(2).replace(/\.00$/, '') + 'q';
    if (n >= 1e12) return (n / 1e12).toFixed(2).replace(/\.00$/, '') + 't';
    if (n >= 1e9) return (n / 1e9).toFixed(2).replace(/\.00$/, '') + 'b';
    if (n >= 1e6) return (n / 1e6).toFixed(2).replace(/\.00$/, '') + 'm';
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'k';
    return Math.floor(n).toLocaleString();
}

// 1. Инициализация инвентаря
function initInventory() {
    const grid = document.getElementById('inventory-grid');
    grid.innerHTML = '';
    const saved = JSON.parse(localStorage.getItem('bss_inv') || '{}');
    
    Object.keys(BSS_DATA.ingredients).forEach(name => {
        const item = BSS_DATA.ingredients[name];
        grid.innerHTML += `
            <div class="inv-card" data-name="${name.toLowerCase()}">
                <img src="${item.img}" onerror="this.style.display='none'">
                <div class="res-info">
                    <span class="res-name">${name}</span>
                    <input type="text" data-res="${name}" value="${saved[name] || ''}" oninput="saveInv()">
                </div>
            </div>`;
    });
}

function saveInv() {
    const data = {};
    document.querySelectorAll('[data-res]').forEach(input => { if(input.value) data[input.dataset.res] = input.value; });
    localStorage.setItem('bss_inv', JSON.stringify(data));
    startCalculation();
}

// 2. Ядро расчета: рекурсивно собирает все базовые ресурсы
function getFlattenedNeeds(itemName, count, result = {}) {
    const itemData = BSS_DATA.ingredients[itemName];
    
    // Если нет рецепта — это базовый ресурс
    if (!itemData || itemData.recipe === "NoRecipe") {
        result[itemName] = (result[itemName] || 0) + count;
    } else {
        // Если есть рецепт — идем вглубь
        for (const [subName, subCount] of Object.entries(itemData.recipe)) {
            getFlattenedNeeds(subName, parseVal(subCount) * count, result);
        }
    }
    return result;
}

// 3. Отрисовка
function startCalculation() {
    const cat = document.getElementById('category-select').value;
    const itemName = document.getElementById('item-select').value;
    const area = document.getElementById('result-area');
    
    if (!itemName) return;

    // Получаем плоский список всего нужного
    const totalNeeded = getFlattenedNeeds(itemName, 1);
    
    // Получаем текущий инвентарь
    const inv = JSON.parse(localStorage.getItem('bss_inv') || '{}');
    
    let html = `<h2>${itemName}</h2><div class="total-grid">`;
    let hasShortage = false;

    for (const [name, needed] of Object.entries(totalNeeded)) {
        const have = parseVal(inv[name] || 0);
        const shortage = Math.max(0, needed - have);
        
        if (shortage > 0) {
            hasShortage = true;
            const img = BSS_DATA.ingredients[name]?.img || '';
            html += `
                <div class="total-item">
                    <img src="${img}" onerror="this.style.display='none'">
                    <span><b>${name}:</b> ${formatVal(shortage)}</span>
                </div>`;
        }
    }

    if (!hasShortage) html += `<p>You have enough resources!</p>`;
    html += `</div>`;
    area.innerHTML = html;
}

// Утилиты
function openTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.currentTarget.classList.add('active');
}

function updateItemList() {
    const cat = document.getElementById('category-select').value;
    const select = document.getElementById('item-select');
    select.innerHTML = '<option value="">-- Select Item --</option>';
    if (BSS_DATA.crafts[cat]) {
        Object.keys(BSS_DATA.crafts[cat]).forEach(item => {
            select.innerHTML += `<option value="${item}">${item}</option>`;
        });
    }
}

function filterInventory() {
    const query = document.getElementById('invSearch').value.toLowerCase();
    document.querySelectorAll('.inv-card').forEach(card => {
        card.style.display = card.dataset.name.includes(query) ? 'flex' : 'none';
    });
}

window.onload = () => {
    initInventory();
    updateItemList();
};
