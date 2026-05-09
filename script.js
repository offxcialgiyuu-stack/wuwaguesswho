const characters = [
    'Aemeath', 'Augusta', 'Baizhi', 'Brant', 'Buling', 'Calcharo', 'Camellya', 'Cantarella', 
    'Carlotta', 'Cartethyia', 'Changli', 'Chisa', 'Chixia', 'Ciaccona', 'Danjin', 'Denia', 
    'Encore', 'Femalerover', 'Fleurdelys', 'Galbrena', 'Hiyuki', 'Iuno', 'Jianxin', 'Jinhsi', 
    'Jiyan', 'Lingyang', 'Lumi', 'Lupa', 'Luuk', 'Lynae', 'Malerover', 'Mornye', 'Mortefi', 
    'Phoebe', 'Phrolova', 'Qiuyuan', 'Roccia', 'Sanhua', 'Shorekeeper', 'Sigrika', 'Taoqi', 
    'Verina', 'Xiangliyao', 'Yangyang', 'Yinlin', 'Youhu', 'Yuanwu', 'Zani', 'Zhezhi'
];

const board = document.getElementById('board');
const secretSlot = document.getElementById('secret-slot');
const counterDisplay = document.getElementById('counter');
const modal = document.getElementById('custom-modal');

const totalCount = characters.length;

function updateCounter() {
    const eliminatedCount = document.querySelectorAll('.is-eliminated').length;
    counterDisplay.innerText = totalCount - eliminatedCount;
}

function hideSecret() { secretSlot.classList.add('hidden-char'); }
function showSecret() { secretSlot.classList.remove('hidden-char'); }

secretSlot.onclick = () => {
    if (!secretSlot.classList.contains('empty-slot')) {
        if (secretSlot.classList.contains('hidden-char')) showSecret();
        else hideSecret();
    }
};

characters.forEach(name => {
    const card = document.createElement('div');
    card.className = 'character-card';
    
    // Convert name to lowercase for the file path (e.g., Augusta -> augusta.jpg)
    const imagePath = `images/wuwa/${name.toLowerCase()}.jpg`;
    
    card.onclick = () => {
        card.classList.toggle('is-eliminated');
        updateCounter();
    };
    
    card.oncontextmenu = (e) => {
        e.preventDefault();
        secretSlot.classList.remove('empty-slot');
        showSecret();
        secretSlot.innerHTML = `
            <img src="${imagePath}">
            <div style="position:absolute; bottom:0; width:100%; background:rgba(0,0,0,0.8); font-size:12px; padding:4px; font-weight: bold;">${name}</div>
        `;
        setTimeout(hideSecret, 1500);
    };

    card.innerHTML = `<img src="${imagePath}" alt="${name}"><div class="name-tag">${name}</div>`;
    board.appendChild(card);
});

// MODAL LOGIC
const resetBtn = document.getElementById('reset-btn');
const confirmBtn = document.getElementById('confirm-reset');
const cancelBtn = document.getElementById('cancel-reset');

resetBtn.onclick = () => modal.style.display = 'flex';
cancelBtn.onclick = () => modal.style.display = 'none';

confirmBtn.onclick = () => {
    document.querySelectorAll('.character-card').forEach(card => card.classList.remove('is-eliminated'));
    secretSlot.innerHTML = '';
    secretSlot.classList.add('empty-slot');
    hideSecret();
    updateCounter();
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
};