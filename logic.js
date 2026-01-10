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

    document.getElementById('app-name-display').innerText = CONFIG.general.appName;
    if (CONFIG.general.welcomeAudio) {
        document.getElementById('welcome-audio').src = CONFIG.general.welcomeAudio;
    }
    
    setupWhatsappLinks();
    renderHero();
    renderServices();
    renderAbout();
    renderGallery();
    renderVideos();
    
    for (const [key, value] of Object.entries(CONFIG.sections)) {
        const el = document.getElementById(`sec-${key}`);
        if (el && !value.visible) el.style.display = 'none';
    }
}

function renderHero() {
    if (!CONFIG.sections.hero.visible) return;
    const hero = document.getElementById('sec-hero');
    let achievementsHtml = '';
    CONFIG.sections.hero.achievements.forEach((ach, index) => {
        const delay = index * 0.3; 
        achievementsHtml += `
            <li class="mb-2 animate__animated animate__fadeInRight" style="animation-delay: ${delay}s;">
                <i class="fa-solid fa-trophy text-primary me-2"></i>${ach}
            </li>`;
    });

    hero.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-5 text-center mb-5 mb-md-0 animate__animated animate__fadeInLeft">
                <div class="ratio ratio-1x1 mx-auto position-relative mb-4" style="max-width: 300px;">
                    <img src="${CONFIG.general.coachPhoto}" class="rounded-circle img-fluid border-primary object-fit-cover shadow-lg" style="border: 5px solid var(--primary); padding: 5px; width: 100%; height: 100%;">
                </div>
                
                <button class="btn btn-outline-light border-primary text-primary px-4 py-2 fs-5" onclick="openCoachModal()">
                    <i class="fa-solid fa
