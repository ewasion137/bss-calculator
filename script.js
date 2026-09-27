// data parse (k, m, b, t, q)
function parseVal(val) {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const s = val.toString().toLowerCase().trim().replace(/,/g, '');
    const n = parseFloat(s);
    if (isNaN(n)) return 0;
    if (s.endsWith('k')) return n * 1e3;
    if (s.endsWith('m')) return n * 1e6;
    if (s.endsWith('b')) return n * 1e9;
    if (s.endsWith('t')) return n * 1e12;
    if (s.endsWith('q')) return n * 1e15;
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

let finalTotals = {};
let virtualInv = {}; // Виртуальный инвентарь, который расходуется при расчёте

// tab
function openTab(id, event) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// search
function filterInventory() {
    const query = document.getElementById('invSearch').value.toLowerCase();
    document.querySelectorAll('.inv-card').forEach(card => {
        card.style.display = card.dataset.name.toLowerCase().includes(query) ? 'flex' : 'none';
    });
}

// inventory
const SORT_ORDER = [ 
    "Honey", "Royal Jelly", "Star Jelly", "Magic Bean", "Strawberry", "Blueberry", 
    "Pineapple", "Sunflower Seed", "Gumdrops", "Moon Charm", "Coconut", "Stinger", 
    "Neonberry", "Bitterberry", "Honeysuckle", "Whirligig", "Red Extract", "Blue Extract", 
    "Oil", "Enzymes", "Glue", "Glitter", "Tropical Drink", "Purple Potion", "Super Smoothie", 
    "Field Dice", "Smooth Dice", "Loaded Dice", "Soft Wax", "Hard Wax", "Swirled Wax", 
    "Caustic Wax", "Turpentine", "Comforting Vial", "Invigorating Vial", "Refreshing Vial", 
    "Satisfying Vial", "Motivating Vial", "Spirit Petal", "Gold Egg", "Diamond Egg" 
];

function initInventory() {
    const grid = document.getElementById('inventory-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const saved = JSON.parse(localStorage.getItem('bss_inv') || '{}');
    const sortedNames = Object.keys(BSS_DATA.ingredients).sort((a, b) => {
        let indexA = SORT_ORDER.indexOf(a), indexB = SORT_ORDER.indexOf(b);
        if (indexA === -1) indexA = 999; 
        if (indexB === -1) indexB = 999;
        return indexA - indexB;
    });

    sortedNames.forEach(name => {
        const item = BSS_DATA.ingredients[name];
        grid.innerHTML += `
            <div class="inv-card" data-name="${name.toLowerCase()}">
                <img src="${item.img}" alt="${name}">
                <div>
                    <div class="res-name">${name}</div>
                    <input type="text" placeholder="0" data-res="${name}" value="${saved[name] || ''}" oninput="saveInv()">
                </div>
            </div>`;
    });
}

function saveInv() {
    const data = {};
    document.querySelectorAll('[data-res]').forEach(input => { 
        data[input.dataset.res] = input.value; 
    });
    localStorage.setItem('bss_inv', JSON.stringify(data));
    if (document.getElementById('item-select').value) {
        startCalculation();
    }
}

// craft
function updateItemList() {
    const cat = document.getElementById('category-select').value;
    const select = document.getElementById('item-select');
    select.innerHTML = '<option value="">-- Select Item --</option>';
    if (BSS_DATA.crafts && BSS_DATA.crafts[cat]) {
        Object.keys(BSS_DATA.crafts[cat]).forEach(item => {
            select.innerHTML += `<option value="${item}">${item}</option>`;
        });
    }
}

function startCalculation() {
    const cat = document.getElementById('category-select').value;
    const itemName = document.getElementById('item-select').value;
    const area = document.getElementById('result-area');
    if (!itemName) {
        area.innerHTML = '<p class="placeholder-text">Select an item...</p>';
        return;
    }

    // 1. Инициализируем виртуальный инвентарь свежими значениями из инпутов
    virtualInv = {};
    document.querySelectorAll('[data-res]').forEach(input => {
        virtualInv[input.dataset.res] = parseVal(input.value || 0);
    });

    finalTotals = {};
    const recipe = BSS_DATA.crafts[cat][itemName];
    let html = `<h2>${itemName}</h2>`;

    // 2. Считаем крафт
    for (const [resName, count] of Object.entries(recipe)) {
        if (["image", "img", "recipe"].includes(resName)) continue;
        html += renderNode(resName, parseVal(count));
    }
    
    // 3. Выводим итоги
    html += renderTotalSection();
    area.innerHTML = html;
}

function renderNode(name, needed) {
    const itemData = BSS_DATA.ingredients[name];
    if (!itemData) { 
        console.error(`Resource not found in data.js: ${name}`); 
        return ''; 
    }

    // Сколько ЭТОГО ресурса сейчас реально осталось в свободном инвентаре
    const available = virtualInv[name] || 0;
    
    // Сколько списываем из инвентаря под эту конкретную ветку
    const allocated = Math.min(available, needed);
    virtualInv[name] = available - allocated; // списываем из пула!

    // Реальный дефицит под этот узел
    const shortage = needed - allocated;
    const isDone = shortage === 0;

    const hasRecipe = itemData.recipe && itemData.recipe !== "NoRecipe" && Object.keys(itemData.recipe).length > 0;

    // Если это базовый ресурс (без рецепта) и его не хватило — отправляем в общий список нехватки
    if (shortage > 0 && !hasRecipe) {
        finalTotals[name] = (finalTotals[name] || 0) + shortage;
    }

    let html = `
        <div class="result-node">
            <div class="node-header ${isDone ? 'done' : ''}">
                <img src="${itemData.img}" onerror="this.style.display='none'">
                <span>${name}: ${formatVal(available)} / ${formatVal(needed)}</span>
                ${isDone ? '<span class="check">✔</span>' : ''}
            </div>`;

    // Если ресурса не хватило, но его можно скрафтить — углубляемся только на размер нехватки (shortage)
    if (!isDone && hasRecipe) {
        html += `<div class="subs">`;
        for (const [subName, subCount] of Object.entries(itemData.recipe)) {
            if (["image", "img", "recipe"].includes(subName)) continue;
            html += renderNode(subName, parseVal(subCount) * shortage);
        }
        html += `</div>`;
    }

    html += `</div>`;
    return html;
}

function renderTotalSection() {
    if (Object.keys(finalTotals).length === 0) {
        return "<p style='color: #4caf50; font-weight: bold;'>You have all the required base materials!</p>";
    }

    let html = `
        <div class="total-section">
            <hr><h3>Total Base Resources Needed (Shortage):</h3>
            <div class="total-grid">`;
    
    const sorted = Object.entries(finalTotals).sort((a, b) => b[1] - a[1]);
    
    for (const [name, amount] of sorted) {
        if (amount < 1) continue;
        const img = BSS_DATA.ingredients[name]?.img || '';
        html += `
            <div class="total-item">
                <img src="${img}" onerror="this.style.display='none'">
                <span><b>${name}:</b> ${formatVal(amount)}</span>
            </div>`;
    }
    
    html += `</div></div>`;
    return html;
}

window.onload = () => {
    initInventory();
    updateItemList();
};
