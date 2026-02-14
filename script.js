// k, m, b, t, q numbers
const toNum = v => {
    if (!v) return 0;
    if (typeof v === 'number') return v;
    const s = v.toString().toLowerCase().replace(/,/g, '');
    const n = parseFloat(s);
    const m = { k: 1e3, m: 1e6, b: 1e9, t: 1e12, q: 1e15 };
    return n * (m[s.slice(-1)] || 1) || 0;
};

const fmt = n => {
    const s = [
        { v: 1e15, l: 'q' }, { v: 1e12, l: 't' }, { v: 1e9, l: 'b' }, 
        { v: 1e6, l: 'm' }, { v: 1e3, l: 'k' }
    ];
    const f = s.find(x => n >= x.v);
    if (!f) return Math.floor(n).toLocaleString();
    return (n / f.v).toFixed(f.v === 1e3 ? 1 : 2).replace(/\.0+$/, '') + f.l;
};

let totals = {};

const goTab = (id, el) => {
    document.querySelectorAll('.tab-content, .nav-btn').forEach(x => x.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    el.classList.add('active');
};

const find = (q) => {
    const query = q.toLowerCase();
    document.querySelectorAll('.inv-card').forEach(c => {
        c.style.display = c.dataset.name.includes(query) ? 'flex' : 'none';
    });
};

// sort inv
const ORDER = ["Honey", "Royal Jelly", "Star Jelly", "Magic Bean", "Strawberry", "Blueberry", "Pineapple", "Sunflower Seed", "Gumdrops", "Moon Charm", "Coconut", "Stinger", "Neonberry", "Bitterberry", "Honeysuckle", "Whirligig", "Red Extract", "Blue Extract", "Oil", "Enzymes", "Glue", "Glitter", "Tropical Drink", "Purple Potion", "Super Smoothie", "Field Dice", "Smooth Dice", "Loaded Dice", "Soft Wax", "Hard Wax", "Swirled Wax", "Caustic Wax", "Turpentine", "Comforting Vial", "Invigorating Vial", "Refreshing Vial", "Satisfying Vial", "Motivating Vial", "Spirit Petal", "Gold Egg", "Diamond Egg"];

const init = () => {
    const grid = document.getElementById('inventory-grid');
    const saved = JSON.parse(localStorage.getItem('bss_inv') || '{}');
    
    const items = Object.keys(BSS_DATA.ingredients).sort((a, b) => {
        const iA = ORDER.indexOf(a), iB = ORDER.indexOf(b);
        return (iA === -1 ? 999 : iA) - (iB === -1 ? 999 : iB);
    });

    grid.innerHTML = items.map(name => `
        <div class="inv-card" data-name="${name.toLowerCase()}">
            <img src="${BSS_DATA.ingredients[name].img}">
            <div>
                <div class="res-name">${name}</div>
                <input type="text" placeholder="0" data-res="${name}" value="${saved[name] || ''}" oninput="save()">
            </div>
        </div>`).join('');
};

const save = () => {
    const data = {};
    document.querySelectorAll('[data-res]').forEach(i => data[i.dataset.res] = i.value);
    localStorage.setItem('bss_inv', JSON.stringify(data));
    if (document.getElementById('item-select').value) calc();
};

// craft
const updateList = () => {
    const cat = document.getElementById('category-select').value;
    const sel = document.getElementById('item-select');
    sel.innerHTML = '<option value="">-- Select Item --</option>' + 
        Object.keys(BSS_DATA.crafts[cat] || {}).map(i => `<option value="${i}">${i}</option>`).join('');
};

const calc = () => {
    const cat = document.getElementById('category-select').value;
    const name = document.getElementById('item-select').value;
    const out = document.getElementById('result-area');
    
    if (!name) return out.innerHTML = '<p class="placeholder-text">Select an item...</p>';

    totals = {};
    const recipe = BSS_DATA.crafts[cat][name];
    let html = `<h2>${name}</h2>`;

    Object.entries(recipe).forEach(([res, count]) => {
        if (!["image", "img", "recipe"].includes(res)) html += draw(res, toNum(count));
    });

    out.innerHTML = html + showTotals();
};

const draw = (name, need) => {
    const has = tragedy(name);
    const short = Math.max(0, need - has);
    const item = BSS_DATA.ingredients[name];
    const rec = item.recipe && item.recipe !== "NoRecipe" ? item.recipe : null;

    if (short > 0 && !rec) totals[name] = (totals[name] || 0) + short;

    let res = `
        <div class="result-node">
            <div class="node-header ${short === 0 ? 'done' : ''}">
                <img src="${item.img}">
                <span>${name}: ${fmt(has)} / ${fmt(need)}</span>
                ${short === 0 ? '<span class="check">✔</span>' : ''}
            </div>`;

    if (short > 0 && rec) {
        res += `<div class="subs">` + 
            Object.entries(rec).map(([n, c]) => draw(n, tragedy(n) + (toNum(c) * short))).join('') + 
            `</div>`;
    }
    return res + `</div>`;
};

const tragedy = (name) => toNum(document.querySelector(`[data-res="${name}"]`)?.value || 0);

const showTotals = () => {
    const keys = Object.entries(totals).filter(x => x[1] > 0).sort((a, b) => b[1] - a[1]);
    if (!keys.length) return "<p>You have all materials!</p>";

    return `
        <div class="total-section"><hr><h3>Shortage:</h3><div class="total-grid">
            ${keys.map(([n, a]) => `
                <div class="total-item">
                    <img src="${BSS_DATA.ingredients[n]?.img || ''}">
                    <span><b>${n}:</b> ${fmt(a)}</span>
                </div>`).join('')}
        </div></div>`;
};

window.onload = () => { init(); updateList(); };
