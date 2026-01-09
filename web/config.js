// archivo: web/config.js

const CONFIG = {
    // 🎨 SECCIÓN DE PERSONALIZACIÓN DE COLORES
    colors: {
        primary: "#d4af37",    // Color Principal (Dorado del León)
        secondary: "#000000",  // Color de Fondo (Negro)
        text: "#ffffff",       // Color de Texto General
        cardBg: "#1a1a1a"      // Color de fondo para tarjetas
    },

    // 🔐 SEGURIDAD DEL MODO ADMIN (3 clics en el título)
    admin: {
        password: "leon",      // Contraseña para entrar al modo admin
        clickCountTrigger: 3   // Clics necesarios para abrir el login
    },

    // 📝 DATOS GENERALES
    general: {
        appName: "Talentos FC",
        coachName: "Prof. Erick",
        // IMPORTANTE: Las rutas son relativas a index.html, por eso es "assets/..."
        coachPhoto: "assets/coach_foto.jpg", // Sube tu foto a la carpeta assets
        whatsappNumber: "525570600459", // Número sin símbolos
        welcomeAudio: "assets/audio_intro.mp3" // Tu audio motivacional
    },

    // ⚙️ SECCIONES (Activa o desactiva con true/false)
    sections: {
        hero: {
            visible: true,
            title: "Forjando Campeones",
            subtitle: "La excelencia comienza con disciplina y pasión.",
            achievements: [ // Lista de logros para la animación lateral
                "Campeones Copa Juvenil 2023",
                "+50 Jugadores Formados",
                "Certificación FIFA Grassroots"
            ],
            nextTrainingDate: "2024-03-15T16:00:00" // Formato AAAA-MM-DDTHH:MM:SS
        },
        services: {
            visible: true,
            title: "Nuestros Programas",
            // Usamos iconos de FontAwesome (fa-solid ...)
            cards: [
                { title: "Infantil (4-8 años)", shortDesc: "Iniciación lúdica", fullDesc: "Desarrollo motriz básico y amor por el juego. Horario: Lun/Mie 4PM.", icon: "fa-child-reaching" },
                { title: "Juvenil (9-15 años)", shortDesc: "Táctica y técnica", fullDesc: "Perfeccionamiento técnico y conceptos tácticos avanzados. Horario: Mar/Jue 5PM.", icon: "fa-futbol" },
                { title: "Alto Rendimiento", shortDesc: "Preparación pro", fullDesc: "Entrenamiento físico y mental intenso para competencia. Horario: Sab 8AM.", icon: "fa-trophy" }
            ]
        },
        about: {
            visible: true,
            mission: "Desarrollar talento futbolístico integral con valores.",
            vision: "Ser la academia líder en formación de atletas de alto nivel."
        },
        gallery: { visible: true }, // Nota: Las imágenes se cargarán manualmente en el HTML por ahora
        videos: {
            visible: true,
            // Pega aquí solo los IDs de los videos de YouTube (lo que va después de v=)
            videoIds: ["dQw4w9WgXcQ", "dQw4w9WgXcQ", "dQw4w9WgXcQ"]
        },
        contact: { visible: true }
    }
};
