const categories = {
    casa: {
        min: 150000, max: 2000000, step: 10000, def: 500000,
        tag: "IMÓVEIS", label: "CRÉDITO PARA IMÓVEL",
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    },
    carro: {
        min: 40000, max: 350000, step: 5000, def: 80000,
        tag: "VEÍCULOS", label: "CRÉDITO PARA VEÍCULO",
        img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    },
    caminhao: {
        min: 250000, max: 1500000, step: 20000, def: 460000,
        tag: "PESADOS", label: "CRÉDITO PARA CAMINHÃO",
        img: "https://images.unsplash.com/photo-1591768793355-74d7c504c3f7?auto=format&fit=crop&w=1200&q=80"
    },
    servico: {
        min: 10000, max: 120000, step: 1000, def: 25000,
        tag: "SERVIÇOS", label: "CRÉDITO PARA VIAGEM/SERVIÇOS",
        img: "https://images.unsplash.com/photo-1500835595353-b0d801ca260e?auto=format&fit=crop&w=1200&q=80"
    }
};

let currentKey = 'casa';
const slider = document.getElementById('range-sim');
const valorTxt = document.getElementById('valor-txt');
const intentLabel = document.getElementById('intent-label');
const intentBtns = document.querySelectorAll('.intent-btn');

function updateCategory(key) {
    const data = categories[key];
    currentKey = key;
    slider.min = data.min;
    slider.max = data.max;
    slider.step = data.step;
    slider.value = data.def;
    intentLabel.innerText = data.label;
    updateSliderVisual();
}

function updateSliderVisual() {
    let val = parseInt(slider.value);
    const min = slider.min;
    const max = slider.max;
    const percentage = (val - min) * 100 / (max - min);
    
    // Faz a barra ficar vermelha acompanhando o marcador
    slider.style.backgroundSize = percentage + '% 100%';
    valorTxt.innerText = val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

intentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        intentBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateCategory(btn.dataset.type);
    });
});

slider.oninput = updateSliderVisual;

function openModal() {
    const data = categories[currentKey];
    const modalImgElement = document.getElementById('modal-bg-img');
    
    // Aplica a imagem de fundo e garante que o degradê não a esconda totalmente
    modalImgElement.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 70%), url('${data.img}')`;
    
    document.getElementById('modal-tag').innerText = data.tag;
    document.getElementById('val-modal').innerText = valorTxt.innerText;
    document.getElementById('modalLead').style.display = 'grid';
}

function closeModal() { document.getElementById('modalLead').style.display = 'none'; }
function scrollToSim() { document.getElementById('simulador').scrollIntoView({ behavior: 'smooth' }); }

updateCategory('casa');