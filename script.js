// --- 1. Парсинг чисел (k, m, b, t, q) ---
function parseVal(val) {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    const s = val.toString().toLowerCase().trim().replace(/,/g, '');
    const n = parseFloat(s);
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

// --- 2. Вкладки и Поиск ---
function openTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    event.currentTarget.classList.add('active');
}

function filterInventory() {
    const query = document.getElementById('invSearch').value.toLowerCase();
    document.querySelectorAll('.inv-card').forEach(card => {
        card.style.display = card.dataset.name.toLowerCase().includes(query) ? 'flex' : 'none';
    });
}

// --- 3. Инвентарь (с сортировкой) ---
const SORT_ORDER = [ "Honey", "Royal Jelly", "Star Jelly", "Magic Bean", "Strawberry", "Blueberry", "Pineapple", "Sunflower Seed", "Gumdrops", "Moon Charm", "Coconut", "Stinger", "Neonberry", "Bitterberry", "Honeysuckle", "Whirligig", "Red Extract", "Blue Extract", "Oil", "Enzymes", "Glue", "Glitter", "Tropical Drink", "Purple Potion", "Super Smoothie", "Field Dice", "Smooth Dice", "Loaded Dice", "Soft Wax", "Hard Wax", "Swirled Wax", "Caustic Wax", "Turpentine", "Comforting Vial", "Invigorating Vial", "Refreshing Vial", "Satisfying Vial", "Motivating Vial", "Spirit Petal", "Gold Egg", "Diamond Egg" ];

function initInventory() {
    const grid = document.getElementById('inventory-grid');
    grid.innerHTML = '';
    const saved = JSON.parse(localStorage.getItem('bss_inv') || '{}');
    const sortedNames = Object.keys(BSS_DATA.ingredients).sort((a, b) => {
        let indexA = SORT_ORDER.indexOf(a), indexB = SORT_ORDER.indexOf(b);
        if (indexA === -1) indexA = 999; if (indexB === -1) indexB = 999;
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
    document.querySelectorAll('[data-res]').forEach(input => { data[input.dataset.res] = input.value; });
    localStorage.setItem('bss_inv', JSON.stringify(data));
    if (document.getElementById('item-select').value) startCalculation();
}

// --- 4. Логика Крафта (ИСПРАВЛЕННАЯ) ---
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

function startCalculation() {
    const cat = document.getElementById('category-select').value;
    const itemName = document.getElementById('item-select').value;
    const area = document.getElementById('result-area');
    if (!itemName) {
        area.innerHTML = '<p class="placeholder-text">Select an item...</p>';
        return;
    }

    finalTotals = {}; // Сброс итогов
    const recipe = BSS_DATA.crafts[cat][itemName];
    let html = `<h2>${itemName}</h2>`;

    for (const [resName, count] of Object.entries(recipe)) {
        if (["image", "img", "recipe"].includes(resName)) continue;
        html += renderNode(resName, parseVal(count));
    }
    
    html += renderTotalSection();
    area.innerHTML = html;
}

function renderNode(name, needed) {
    const invVal = parseVal(document.querySelector(`[data-res="${name}"]`)?.value || 0);
    const shortage = Math.max(0, needed - invVal);
    const isDone = shortage === 0;
    
    const itemData = BSS_DATA.ingredients[name];
    if (!itemData) { console.error(`Resource not found in data.js: ${name}`); return ''; }
    
    const hasRecipe = itemData.recipe && itemData.recipe !== "NoRecipe";

    // **КЛЮЧЕВОЙ ФИКС:** Добавляем в итоги только базовые ресурсы (у которых нет рецепта)
    if (shortage > 0 && !hasRecipe) {
        finalTotals[name] = (finalTotals[name] || 0) + shortage;
    }

    let html = `
        <div class="result-node">
            <div class="node-header ${isDone ? 'done' : ''}">
                <img src="${itemData.img}" onerror="this.style.display='none'">
                <span>${name}: ${formatVal(invVal)} / ${formatVal(needed)}</span>
                ${isDone ? '<span class="check">✔</span>' : ''}
            </div>`;

    if (!isDone && hasRecipe) {
        html += `<div class="subs">`;
        for (const [subName, subCount] of Object.entries(itemData.recipe)) {
            // Рекурсивный вызов теперь корректно передает нехватку вниз по дереву
            html += renderNode(subName, parseVal(subCount) * shortage);
        }
        html += `</div>`;
    }

    html += `</div>`;
    return html;
}


function renderTotalSection() {
    if (Object.keys(finalTotals).length === 0) return "<p>You have all the required base materials!</p>";

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