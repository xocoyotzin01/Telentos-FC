document.addEventListener("DOMContentLoaded", () => {
    applyConfig();
    setupEventListeners();
    initPlugins();
});

function applyConfig() {
    const root = document.documentElement;
    root.style.setProperty('--primary', CONFIG.colors.primary);
    root.style.setProperty('--secondary', CONFIG.colors.secondary);
    root.style.setProperty('--text', CONFIG.colors.text);
    root.style.setProperty('--card-bg', CONFIG.colors.cardBg);

    document.getElementById('app-name-display').innerText = CONFIG.general.appName;
    if (CONFIG.general.welcomeAudio) {
        document.getElementById('welcome-audio').src = CONFIG.general.welcomeAudio;
    }
    
    setupWhatsappLinks();
    renderHero();
    renderServices();
    renderAbout();
    renderGallery(); // Nueva función
    renderVideos();
    
    // Ocultar secciones
    for (const [key, value] of Object.entries(CONFIG.sections)) {
        const el = document.getElementById(`sec-${key}`);
        if (el && !value.visible) el.style.display = 'none';
    }
}

function renderHero() {
    if (!CONFIG.sections.hero.visible) return;
    const hero = document.getElementById('sec-hero');

    // Animación escalonada (delay) para los logros
    let achievementsHtml = '';
    CONFIG.sections.hero.achievements.forEach((ach, index) => {
        // Cada logro tarda 0.2s más que el anterior
        const delay = index * 0.3; 
        achievementsHtml += `
            <li class="mb-2 animate__animated animate__fadeInRight" style="animation-delay: ${delay}s;">
                <i class="fa-solid fa-trophy text-primary me-2"></i>${ach}
            </li>`;
    });

    hero.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-5 text-center mb-4 mb-md-0 animate__animated animate__fadeInLeft">
                <div class="ratio ratio-1x1 mx-auto position-relative" style="max-width: 300px;">
                    <img src="${CONFIG.general.coachPhoto}" class="rounded-circle img-fluid border-primary object-fit-cover" style="border: 5px solid var(--primary); padding: 5px; width: 100%; height: 100%;">
                </div>
            </div>
            <div class="col-md-7 text-white">
                <h1 class="display-4 fw-bold text-uppercase animate__animated animate__fadeInDown" style="color: var(--primary)">${CONFIG.sections.hero.title}</h1>
                <p class="lead fs-4 mb-4 animate__animated animate__fadeIn" style="animation-delay: 0.5s;">${CONFIG.sections.hero.subtitle}</p>
                
                <ul class="list-unstyled fs-5 mb-4">
                    ${achievementsHtml}
                </ul>

                <div class="d-flex gap-3 align-items-center animate__animated animate__fadeInUp" style="animation-delay: 1s;">
                    <button class="btn btn-outline-light border-primary text-primary" onclick="openCoachModal()">
                        <i class="fa-solid fa-user-tie me-2"></i>Conocer más del Entrenador
                    </button>
                    
                    <div class="p-2 rounded bg-darker border border-secondary">
                        <small class="text-muted d-block text-uppercase" style="font-size: 0.7rem;">Próximo Entreno</small>
                        <div id="countdown-timer" class="fw-bold text-white">Calculando...</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    startCountdown(CONFIG.sections.hero.nextTrainingDate);
}

function renderServices() {
    if (!CONFIG.sections.services.visible) return;
    const container = document.getElementById('services-container');
    let cardsHtml = '';
    CONFIG.sections.services.cards.forEach(card => {
        cardsHtml += `
            <div class="col-md-4">
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <i class="fa-solid ${card.icon} fa-4x mb-3 text-primary"></i>
                            <h3 class="text-uppercase">${card.title}</h3>
                            <p class="fst-italic text-muted">${card.shortDesc}</p>
                            <i class="fa-solid fa-rotate text-primary mt-auto"></i>
                        </div>
                        <div class="flip-card-back">
                            <h3 class="mb-3 border-bottom border-secondary pb-2">Detalles</h3>
                            <p class="fs-5">${card.fullDesc}</p>
                        </div>
                    </div>
                </div>
            </div>`;
    });
    container.innerHTML = cardsHtml;
}

function renderAbout() {
    if(!CONFIG.sections.about.visible) return;
    // INYECCIÓN DE ÍCONOS FontAwesome CONFIRMADA
    document.getElementById('sec-about').innerHTML = `
        <div class="row justify-content-center g-5">
            <div class="col-md-5 animate__animated" data-ani="fadeInLeft">
                <div class="p-4 border border-primary rounded h-100 bg-darker">
                    <i class="fa-solid fa-bullseye fa-3x text-primary mb-3"></i>
                    <h3 class="text-primary text-uppercase">Nuestra Misión</h3>
                    <p class="fs-5 mb-0">${CONFIG.sections.about.mission}</p>
                </div>
            </div>
            <div class="col-md-5 animate__animated" data-ani="fadeInRight">
                 <div class="p-4 border border-primary rounded h-100 bg-darker">
                    <i class="fa-solid fa-eye fa-3x text-primary mb-3"></i>
                    <h3 class="text-primary text-uppercase">Nuestra Visión</h3>
                    <p class="fs-5 mb-0">${CONFIG.sections.about.vision}</p>
                </div>
            </div>
        </div>`;
}

// NUEVA FUNCIÓN GALERÍA
function renderGallery() {
    if(!CONFIG.sections.gallery.visible) return;
    const wrapper = document.getElementById('gallery-wrapper');
    let slides = '';
    // Usa las imágenes definidas en CONFIG.js
    if(CONFIG.sections.gallery.images && CONFIG.sections.gallery.images.length > 0) {
        CONFIG.sections.gallery.images.forEach(imgName => {
            slides += `
                <div class="swiper-slide">
                    <img src="assets/${imgName}" class="img-fluid rounded border border-secondary" style="width:100%; height:300px; object-fit:cover;">
                </div>`;
        });
    } else {
        slides = '<div class="text-center text-muted p-5">Agrega fotos en config.js</div>';
    }
    wrapper.innerHTML = slides;
}

function renderVideos() {
     if(!CONFIG.sections.videos.visible) return;
     const container = document.getElementById('videos-container');
     let videosHtml = '';
     CONFIG.sections.videos.videoIds.forEach(id => {
         videosHtml += `
            <div class="col-md-4">
                <div class="ratio ratio-16x9 border border-primary rounded overflow-hidden shadow">
                    <iframe src="https://www.youtube.com/embed/${id}" title="YouTube video" allowfullscreen></iframe>
                </div>
            </div>`;
     });
     container.innerHTML = videosHtml;
}

// --- LOGICA DEL MODAL COACH (BLUR) ---
function openCoachModal() {
    // Llenar datos antes de abrir
    document.getElementById('modal-coach-name').innerText = CONFIG.general.coachName;
    document.getElementById('modal-coach-photo').src = CONFIG.general.coachPhoto;
    document.getElementById('modal-coach-resume').innerHTML = CONFIG.sections.hero.coachResume;
    
    const modal = new bootstrap.Modal(document.getElementById('coachModal'));
    modal.show();
}

// --- EVENTOS ---
function setupEventListeners() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const audio = document.getElementById('welcome-audio');
    const audioBtn = document.getElementById('audio-toggle');
    const icon = audioBtn.querySelector('i');
    
    // CLICK EN PUERTA
    welcomeScreen.addEventListener('click', () => {
        // Reproducir audio
        if (audio.src) {
            audio.play()
                .then(() => { 
                    audioBtn.style.display = 'block'; // Mostrar botón solo si suena
                })
                .catch(e => console.log("Audio autoplay bloqueado"));
        }

        // CONFETI TIPO BALÓN (Blanco y Negro mezclado)
        var end = Date.now() + 1000;
        (function frame() {
            // Círculos blancos (balón)
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ffffff'],
                shapes: ['circle'],
                scalar: 2 // Más grandes
            });
            // Círculos negros (detalles)
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#000000'],
                shapes: ['circle'], 
                scalar: 1.5 
            });
            // EMOJIS DE BALÓN (Si el navegador lo soporta)
            confetti({
                particleCount: 2,
                spread: 100,
                origin: { y: 0.6 },
                shapes: ['circle'], 
                scalar: 3,
                colors: ['#ffffff', '#000000'] 
            });
        
            if (Date.now() < end) requestAnimationFrame(frame);
        }());

        // Animación CSS Puerta
        welcomeScreen.classList.add('door-open');
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            document.getElementById('main-content').classList.remove('hidden');
            document.getElementById('main-content').classList.add('animate__animated', 'animate__fadeIn');
            // Inicializar swiper
            if(document.querySelector('.gallery-swiper').swiper) {
                document.querySelector('.gallery-swiper').swiper.update();
            }
        }, 1200); 
    });

    // BOTÓN AUDIO TOGGLE
    audioBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            icon.classList.remove('fa-volume-xmark');
            icon.classList.add('fa-volume-high');
        } else {
            audio.pause();
            icon.classList.remove('fa-volume-high');
            icon.classList.add('fa-volume-xmark');
        }
    });

    // BOTÓN FLOTANTE
    document.getElementById('floating-ball').addEventListener('click', () => {
        new bootstrap.Modal(document.getElementById('inscriptionModal')).show();
    });

    // ADMIN TRIGGER
    let clickCount = 0;
    let clickTimer;
    document.getElementById('top-bar-trigger').addEventListener('click', () => {
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clickCount = 0; }, 800);
        if (clickCount === CONFIG.admin.clickCountTrigger) {
            new bootstrap.Modal(document.getElementById('adminModal')).show();
            clickCount = 0;
        }
    });
}

// --- WHATSAPP INSCRIPCIÓN ACTUALIZADO ---
function sendInscriptionWhatsapp() {
    const name = document.getElementById('reg-name').value;
    const age = document.getElementById('reg-age').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    
    if(!name || !age || !phone) {
        alert("Por favor completa los datos obligatorios.");
        return;
    }

    const message = `¡Hola! Quiero unirme a Talentos FC. ⚽\n\n` +
                    `👤 Nombre: *${name}*\n` +
                    `🎂 Edad: *${age} años*\n` +
                    `📧 Correo: ${email}\n` +
                    `📱 Teléfono: ${phone}\n\n` +
                    `Quedo en espera de información.`;

    const url = `https://api.whatsapp.com/send?phone=${CONFIG.general.whatsappNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    
    bootstrap.Modal.getInstance(document.getElementById('inscriptionModal')).hide();
}

function setupWhatsappLinks() {
    const btnSell = document.getElementById('btn-sell-cards');
    const msgSell = encodeURIComponent("Hola, vi la tarjeta de Talentos FC y quiero una para mi negocio.");
    btnSell.href = `https://api.whatsapp.com/send?phone=${CONFIG.general.whatsappNumber}&text=${msgSell}`;
}

function checkAdmin() {
    if (document.getElementById('admin-pass').value === CONFIG.admin.password) {
        document.getElementById('login-panel').classList.add('d-none');
        document.getElementById('control-panel').classList.remove('d-none');
        generateToggles();
    } else {
        alert("Contraseña incorrecta");
    }
}

function generateToggles() {
    const container = document.getElementById('toggles-container');
    container.innerHTML = '';
    for (const [key, value] of Object.entries(CONFIG.sections)) {
        const isChecked = value.visible ? 'checked' : '';
        container.innerHTML += `
            <div class="form-check form-switch text-start">
                <input class="form-check-input" type="checkbox" id="toggle-${key}" ${isChecked} onchange="toggleSection('${key}')">
                <label class="form-check-label text-capitalize" for="toggle-${key}">${key}</label>
            </div>`;
    }
}

function toggleSection(key) {
    const el = document.getElementById(`sec-${key}`);
    const check = document.getElementById(`toggle-${key}`);
    if(el) el.style.display = check.checked ? 'block' : 'none';
}

function initPlugins() {
    new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 3000 },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 }
        }
    });
}

function startCountdown(dateString) {
    const targetDate = new Date(dateString).getTime();
    const timerEl = document.getElementById('countdown-timer');
    
    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance < 0) {
            timerEl.innerHTML = "¡ES HOY!";
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        timerEl.innerHTML = `${days}d ${hours}h`;
    };
    setInterval(updateTimer, 1000);
    updateTimer();
}
