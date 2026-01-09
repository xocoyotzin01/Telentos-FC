// archivo: web/logic.js

// Esperamos a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    // 1. Inyectar la configuración visual y de texto
    applyConfig();
    // 2. Configurar los eventos (clics, etc.)
    setupEventListeners();
    // 3. Iniciar plugins (Swiper, etc.)
    initPlugins();
});

// --- FUNCIÓN PRINCIPAL: APLICAR CONFIGURACIÓN ---
function applyConfig() {
    // Aplicar variables CSS de color
    const root = document.documentElement;
    root.style.setProperty('--primary', CONFIG.colors.primary);
    root.style.setProperty('--secondary', CONFIG.colors.secondary);
    root.style.setProperty('--text', CONFIG.colors.text);
    root.style.setProperty('--card-bg', CONFIG.colors.cardBg);

    // Textos e Imágenes Básicas
    document.getElementById('app-name-display').innerText = CONFIG.general.appName;
    if (CONFIG.general.welcomeAudio) {
        document.getElementById('welcome-audio').src = CONFIG.general.welcomeAudio;
    }
    
    // Configurar enlaces de WhatsApp
    setupWhatsappLinks();

    // Renderizar Secciones Dinámicas
    renderHero();
    renderServices();
    renderAbout();
    renderVideos();
    
    // Ocultar secciones desactivadas en config
    for (const [key, value] of Object.entries(CONFIG.sections)) {
        const el = document.getElementById(`sec-${key}`);
        if (el && !value.visible) el.style.display = 'none';
    }
}

// --- RENDERIZADORES DE SECCIONES ---

function renderHero() {
    const hero = document.getElementById('sec-hero');
    if (!CONFIG.sections.hero.visible) return;

    // Generar lista de logros
    let achievementsHtml = '';
    CONFIG.sections.hero.achievements.forEach(ach => {
        achievementsHtml += `<li class="mb-2"><i class="fa-solid fa-check text-primary me-2"></i>${ach}</li>`;
    });

    hero.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-5 text-center mb-4 mb-md-0 animate__animated animate__fadeInLeft">
                <div class="ratio ratio-1x1 mx-auto" style="max-width: 350px;">
                    <img src="${CONFIG.general.coachPhoto}" class="rounded-circle img-fluid border-primary object-fit-cover" style="border: 5px solid var(--primary); padding: 5px;">
                </div>
            </div>
            <div class="col-md-7 text-white animate__animated animate__fadeInRight">
                <h1 class="display-4 fw-bold text-uppercase" style="color: var(--primary)">${CONFIG.sections.hero.title}</h1>
                <p class="lead fs-4 mb-4">${CONFIG.sections.hero.subtitle}</p>
                
                <ul class="list-unstyled fs-5 mb-4">
                    ${achievementsHtml}
                </ul>

                <div class="p-3 rounded bg-darker border border-primary d-inline-block">
                     <h5 class="text-primary m-0"><i class="fa-regular fa-calendar-days me-2"></i>Próximo Entrenamiento:</h5>
                     <div id="countdown-timer" class="fw-bold fs-4 mt-1">Calculando...</div>
                </div>
            </div>
        </div>
    `;
    // Iniciar contador (versión simple)
    startCountdown(CONFIG.sections.hero.nextTrainingDate);
}

function renderServices() {
    const container = document.getElementById('services-container');
    if (!CONFIG.sections.services.visible) return;

    let cardsHtml = '';
    CONFIG.sections.services.cards.forEach(card => {
        cardsHtml += `
            <div class="col-md-4">
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <i class="fa-solid ${card.icon} fa-4x mb-3"></i>
                            <h3>${card.title}</h3>
                            <p class="fst-italic">${card.shortDesc}</p>
                            <small class="text-muted mt-auto">(Toca para más info)</small>
                        </div>
                        <div class="flip-card-back">
                            <h3>Detalles</h3>
                            <p>${card.fullDesc}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = cardsHtml;
}

function renderAbout() {
    const container = document.getElementById('sec-about');
    if(!CONFIG.sections.about.visible) return;

    container.innerHTML = `
        <div class="row justify-content-center">
            <div class="col-md-5 mb-4 animate__animated" data-ani="fadeInLeft">
                <i class="fa-solid fa-bullseye fa-3x text-primary mb-3"></i>
                <h3 class="text-primary">Nuestra Misión</h3>
                <p class="fs-5">${CONFIG.sections.about.mission}</p>
            </div>
            <div class="col-md-5 animate__animated" data-ani="fadeInRight">
                <i class="fa-solid fa-eye fa-3x text-primary mb-3"></i>
                <h3 class="text-primary">Nuestra Visión</h3>
                <p class="fs-5">${CONFIG.sections.about.vision}</p>
            </div>
        </div>
    `;
}

function renderVideos() {
     const container = document.getElementById('videos-container');
     if(!CONFIG.sections.videos.visible) return;
     
     let videosHtml = '';
     CONFIG.sections.videos.videoIds.forEach(id => {
         videosHtml += `
            <div class="col-md-4">
                <div class="ratio ratio-16x9 border border-primary rounded overflow-hidden">
                    <iframe src="https://www.youtube.com/embed/${id}" title="YouTube video" allowfullscreen></iframe>
                </div>
            </div>
         `;
     });
     container.innerHTML = videosHtml;
}


// --- EVENTOS Y LÓGICA ---
function setupEventListeners() {
    // 1. Pantalla de Bienvenida (Efecto Puerta y Audio)
    const welcomeScreen = document.getElementById('welcome-screen');
    const audio = document.getElementById('welcome-audio');
    
    welcomeScreen.addEventListener('click', () => {
        // Iniciar audio (requiere interacción del usuario)
        if (audio.src) audio.play().catch(e => console.log("Audio bloqueado por navegador"));

        // Lanzar confeti (balones si es posible, ahora simple)
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: [CONFIG.colors.primary, '#ffffff'] });

        // Animación de puerta
        welcomeScreen.classList.add('door-open');
        
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            document.getElementById('main-content').classList.remove('hidden');
            document.getElementById('main-content').classList.add('animate__animated', 'animate__fadeIn');
            // Recalcular Swiper una vez visible
            document.querySelector('.gallery-swiper').swiper.update();
        }, 1000); // Espera a que termine la animación CSS
    });


    // 2. Modo Admin (3 Clics)
    let clickCount = 0;
    let clickTimer;
    const trigger = document.getElementById('top-bar-trigger');
    const adminModal = new bootstrap.Modal(document.getElementById('adminModal'));

    trigger.addEventListener('click', () => {
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clickCount = 0; }, 800); // Reset si tarda más de 0.8s entre clics

        if (clickCount === CONFIG.admin.clickCountTrigger) {
            adminModal.show();
            clickCount = 0;
        }
    });

    // 3. Botón Flotante -> Abrir Modal Inscripción
    const inscriptionModal = new bootstrap.Modal(document.getElementById('inscriptionModal'));
    document.getElementById('floating-ball').addEventListener('click', () => {
        inscriptionModal.show();
    });
}

// --- FUNCIONES DE UTILIDAD ---

// Admin Login y Generación de Toggles
function checkAdmin() {
    const inputPass = document.getElementById('admin-pass').value;
    if (inputPass === CONFIG.admin.password) {
        document.getElementById('login-panel').classList.add('d-none');
        document.getElementById('control-panel').classList.remove('d-none');
        
        // Generar switches dinámicamente
        const container = document.getElementById('toggles-container');
        container.innerHTML = '';
        for (const [key, value] of Object.entries(CONFIG.sections)) {
            const isChecked = value.visible ? 'checked' : '';
            // Usamos un closure para pasar la key correcta a la función
            container.innerHTML += `
                <div class="form-check form-switch p-2 bg-darker rounded mb-2 border border-secondary">
                    <input class="form-check-input" type="checkbox" id="toggle-${key}" ${isChecked}>
                    <label class="form-check-label text-uppercase small fw-bold ps-2 pt-1" for="toggle-${key}">${key}</label>
                </div>
            `;
        }
        // Añadir listeners a los nuevos switches
        document.querySelectorAll('#toggles-container .form-check-input').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                const sectionKey = e.target.id.replace('toggle-', '');
                const el = document.getElementById(`sec-${sectionKey}`);
                if(el) el.style.display = e.target.checked ? 'block' : 'none';
            });
        });

    } else {
        // Temblor en el input si falla
        const passInput = document.getElementById('admin-pass');
        passInput.classList.add('animate__animated', 'animate__shakeX', 'bg-danger');
        setTimeout(() => { passInput.classList.remove('animate__animated', 'animate__shakeX', 'bg-danger'); }, 500);
    }
}

// WhatsApp Links
function setupWhatsappLinks() {
    // Enlace del Footer (Venta de tarjetas)
    const btnSell = document.getElementById('btn-sell-cards');
    const msgSell = encodeURIComponent("Hola, me interesa tener una tarjeta digital para mi negocio.");
    btnSell.href = `https://api.whatsapp.com/send?phone=${CONFIG.general.whatsappNumber}&text=${msgSell}`;
}

// Enviar formulario de inscripción por WhatsApp
function sendInscriptionWhatsapp() {
    const name = document.getElementById('reg-name').value;
    const age = document.getElementById('reg-age').value;
    
    if(!name || !age) {
        alert("Por favor completa nombre y edad.");
        return;
    }

    const message = `¡Hola Coach! Quiero ser parte de Talentos FC.\n\nMis datos:\n⚽ Nombre: ${name}\n🎂 Edad: ${age} años`;
    const url = `https://api.whatsapp.com/send?phone=${CONFIG.general.whatsappNumber}&text=${encodeURIComponent(message)}`;
    
    window.open(url, '_blank');
    bootstrap.Modal.getInstance(document.getElementById('inscriptionModal')).hide();
}


// Inicializar Plugins (Swiper)
function initPlugins() {
    new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            768: { slidesPerView: 2 }, // En tablets muestra 2 fotos
            992: { slidesPerView: 3 }  // En escritorio muestra 3 fotos
        }
    });
}

// Contador Simple
function startCountdown(dateString) {
    const targetDate = new Date(dateString).getTime();
    const timerEl = document.getElementById('countdown-timer');

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(interval);
            timerEl.innerHTML = "¡ES HOY!";
            timerEl.classList.add('text-success', 'animate__animated', 'animate__pulse', 'animate__infinite');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        timerEl.innerHTML = `${days}d ${hours}h restantes`;
    }, 1000);
}
