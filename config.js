const CONFIG = {
    colors: {
        primary: "#d4af37",    
        secondary: "#000000",  
        text: "#ffffff",       
        cardBg: "#1a1a1a"      
    },
    admin: {
        password: "leon",      
        clickCountTrigger: 3   
    },
    general: {
        appName: "Talentos FC",
        coachName: "Prof. Erick",
        coachPhoto: "assets/coach_foto.jpg", 
        whatsappNumber: "525570600459", 
        welcomeAudio: "assets/audio_intro.mp3"
    },
    sections: {
        hero: {
            visible: true,
            title: "Forjando Campeones",
            subtitle: "La excelencia comienza con disciplina y pasión.",
            // LOGROS: Aparecerán uno a uno
            achievements: [ 
                "Campeones Copa Juvenil 2023",
                "+50 Jugadores Formados",
                "Certificación FIFA Grassroots",
                "Ex-Jugador Profesional 2da Div."
            ],
            // CURRICULUM EXTENDIDO (Para el Modal)
            coachResume: `
                <p><strong>Experiencia Profesional:</strong> Más de 10 años formando talentos en el sector juvenil.</p>
                <p><strong>Filosofía:</strong> Creemos en el desarrollo integral del atleta: mente, cuerpo y técnica.</p>
                <ul class="text-start">
                    <li>Licencia Federativa Tipo A</li>
                    <li>Especialista en preparación física</li>
                    <li>Director Técnico Titulado ENDIT</li>
                </ul>
            `,
            nextTrainingDate: "2026-02-15T16:00:00" 
        },
        services: {
            visible: true,
            title: "Nuestros Programas",
            cards: [
                { title: "Infantil (4-8 años)", shortDesc: "Iniciación lúdica", fullDesc: "Desarrollo motriz básico y amor por el juego. Horario: Lun/Mie 4PM.", icon: "fa-child-reaching" },
                { title: "Juvenil (9-15 años)", shortDesc: "Táctica y técnica", fullDesc: "Perfeccionamiento técnico y conceptos tácticos avanzados. Horario: Mar/Jue 5PM.", icon: "fa-futbol" },
                { title: "Alto Rendimiento", shortDesc: "Preparación pro", fullDesc: "Entrenamiento físico y mental intenso para competencia. Horario: Sab 8AM.", icon: "fa-trophy" }
            ]
        },
        about: {
            visible: true,
            mission: "Desarrollar talento futbolístico integral con valores inquebrantables.",
            vision: "Ser la academia líder en formación de atletas de alto nivel en México."
        },
        // GALERÍA: Solo pon los nombres de tus archivos aquí. Deben estar en la carpeta 'assets'
            gallery: {
              visible: true,
              prefix: "foto",
              extension: "jpg",
              start: 1,
              max: 500   // límite de seguridad (puede ser 1000)
            }, 
        videos: {
            visible: true,
            videoIds: ["dQw4w9WgXcQ", "dQw4w9WgXcQ", "dQw4w9WgXcQ"]
        },
        contact: { visible: true }
    }
};
