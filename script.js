const characters = [
    "Aemeath", "Augusta", "Baizhi", "Brant", "Buling", "Calcharo", "Camellya", 
    "Cantarella", "Carlotta", "Cartethyia", "Changli", "Chisa", "Danjin", "Encore", 
    "Geshu Lin", "Jianxin", "Jinhsi", "Jiyan", "Lingyang", "Lupa", "Luuk", "Lumi", 
    "Malerover", "Mortefi", "Phrolova", "Rover", "Sanhua", "Shorekeeper", "Sigrika", 
    "Taoqi", "Verina", "Xiangliyao", "Yangyang", "Yinlin", "Youhu", "Yuanwu", 
    "Zani", "Zhezhi"
];

const board = document.getElementById('board');
const countDisplay = document.getElementById('count');
const secretSlot = document.getElementById('secret-slot');

function updateCounter() {
    const active = document.querySelectorAll('.character-card:not(.is-eliminated)').length;
    countDisplay.textContent = active;
}

function showSecret() {
    secretSlot.style.transform = "scale(1.2)";
    setTimeout(() => secretSlot.style.transform = "scale(1)", 200);
}

function hideSecret() {
    secretSlot.style.opacity = "0.3";
}

secretSlot.onmouseenter = () => secretSlot.style.opacity = "1";
secretSlot.onmouseleave = () => secretSlot.style.opacity = "0.3";

// Karten erstellen
characters.forEach(name => {
    const card = document.createElement('div');
    card.className = 'character-card';
    
    // PFAD-CHECK: images/Wuwa/ (Großes W!)
    const imagePath = `images/Wuwa/${name.toLowerCase()}.jpg`;
    
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
            <div style="position:absolute; bottom:0; width:100%; background:rgba(0,0,0,0.8); font-size:12px; padding:4px; font-weight: bold; text-align:center;">${name}</div>
        `;
        setTimeout(hideSecret, 1500);
    };

    card.innerHTML = `<img src="${imagePath}" alt="${name}"><div class="name-tag">${name}</div>`;
    board.appendChild(card);
});

// Modal Logik
const modal = document.getElementById("instructions-modal");
const btn = document.getElementById("info-btn");
const span = document.getElementsByClassName("close-btn")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

updateCounter();
