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
const modeIndicator = document.getElementById('mode-indicator');

let currentFolder = 'images'; // Standard-Ordner
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

// Funktion um das Spielfeld zu zeichnen
function renderBoard() {
    board.innerHTML = ''; // Altes Board löschen
    characters.forEach(name => {
        const card = document.createElement('div');
        card.className = 'character-card';
        
        // Nutzt den aktuellen Ordner (images oder images2)
        const imagePath = `${currentFolder}/Wuwa/${name.toLowerCase()}.jpg`;
        
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
    updateCounter();
}

// TASTEN-KOMBINATION: Strg + I
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'i') {
        e.preventDefault(); // Verhindert Browser-Standard-Aktionen
        
        // Wechsel zwischen images und images2
        currentFolder = (currentFolder === 'images') ? 'images2' : 'images';
        
        // UI Update
        modeIndicator.innerText = `Mode: ${currentFolder === 'images' ? 'Default' : 'Alternative'} (${currentFolder})`;
        
        // Spielfeld mit neuen Pfaden neu laden
        renderBoard();
        
        // Secret Slot leeren beim Wechsel, da das Bild sonst alt bleibt
        secretSlot.innerHTML = '';
        secretSlot.classList.add('empty-slot');
        hideSecret();
        
        console.log("Ordner gewechselt zu: " + currentFolder);
    }
});

// Initiales Laden
renderBoard();

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
