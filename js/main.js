// ==========================================
// SŁOWNIK "MAGIC TRANSLATE" (8 Języków)
// ==========================================
const translations = {
    en: {
        "nav-home": "Home", "nav-products": "Products", "nav-mission": "Mission", "nav-support": "Support", "nav-tools": "Tools", "nav-contact": "Contact",
        "welcome-guest": "Welcome to our platform!", "admin-panel": "Admin Panel",
        "hero-title": "Official BrainlyHQ Hub", "hero-subtitle": "Where passion for learning meets technology and community. Discover our moderating tools and grow with us!", "hero-cta": "Join Us",
        "prod-title": "Our Products", "prod-lead": "Discover innovative platforms and utilities crafted by our team.",
        "mission-title": "Our Mission", "mission-lead": "We believe in making education accessible and collaborative for every student.",
        "support-title": "Support Center", "support-lead": "Need help or have questions? Our support staff is always here for you.",
        "tools-title": "Moderator Tools", "tools-lead": "A suite of utilities designed to optimize moderation tasks and safety.",
        "contact-title": "Get in Touch", "contact-lead": "Have any business inquiries or suggestions? Reach out to us."
    },
    pl: {
        "nav-home": "Główna", "nav-products": "Produkty", "nav-mission": "Misja", "nav-support": "Pomoc", "nav-tools": "Narzędzia", "nav-contact": "Kontakt",
        "welcome-guest": "Witaj na naszej platformie!", "admin-panel": "Panel Admina",
        "hero-title": "Oficjalne Centrum BrainlyHQ", "hero-subtitle": "Gdzie pasja do nauki spotyka się z technologią i społecznością. Odkryj nasze narzędzia moderatorskie i rozwijaj się z nami!", "hero-cta": "Dołącz do nas",
        "prod-title": "Nasze Produkty", "prod-lead": "Odkryj innowacyjne platformy i narzędzia stworzone przez nasz zespół.",
        "mission-title": "Nasza Misja", "mission-lead": "Wierzymy, że edukacja powinna być dostępna i angażująca dla każdego ucznia.",
        "support-title": "Centrum Pomocy", "support-lead": "Potrzebujesz pomocy lub masz pytania? Nasz zespół służy pomocą.",
        "tools-title": "Narzędzia Moderatorskie", "tools-lead": "Zestaw narzędzi zaprojektowany do optymalizacji pracy moderatorów i bezpieczeństwa.",
        "contact-title": "Skontaktuj się", "contact-lead": "Masz pytania biznesowe lub sugestie? Napisz bezpośrednio do nas."
    },
    id: {
        "nav-home": "Beranda", "nav-products": "Produk", "nav-mission": "Misi", "nav-support": "Bantuan", "nav-tools": "Alat", "nav-contact": "Kontak",
        "welcome-guest": "Selamat datang di platform kami!", "admin-panel": "Panel Admin",
        "hero-title": "Pusat Resmi BrainlyHQ", "hero-subtitle": "Tempat di mana semangat belajar bertemu dengan teknologi dan komunitas.", "hero-cta": "Gabung Sekarang",
        "prod-title": "Produk Kami", "prod-lead": "Temukan platform inovatif yang dibuat oleh tim kami.",
        "mission-title": "Misi Kami", "mission-lead": "Kami percaya dalam membuat pendidikan dapat diakses oleh semua siswa.",
        "support-title": "Pusat Bantuan", "support-lead": "Butuh bantuan? Staf dukungan kami selalu ada untuk Anda.",
        "tools-title": "Alat Moderator", "tools-lead": "Kumpulan alat yang dirancang untuk mengoptimalkan tugas moderasi.",
        "contact-title": "Hubungi Kami", "contact-lead": "Punya pertanyaan bisnis atau saran? Hubungi kami."
    },
    fr: {
        "nav-home": "Accueil", "nav-products": "Produits", "nav-mission": "Mission", "nav-support": "Support", "nav-tools": "Outils", "nav-contact": "Contact",
        "welcome-guest": "Bienvenue sur notre plateforme !", "admin-panel": "Panel Admin",
        "hero-title": "Hub Officiel BrainlyHQ", "hero-subtitle": "Où la passion d'apprendre rencontre la technologie et la communauté.", "hero-cta": "Reignez-nous",
        "prod-title": "Nos Produits", "prod-lead": "Découvrez les plateformes innovantes créées par notre équipe.",
        "mission-title": "Notre Mission", "mission-lead": "Nous croyons en une éducation accessible et collaborative pour tous.",
        "support-title": "Centre de Support", "support-lead": "Besoin d'aide ? Notre équipe est toujours là pour vous.",
        "tools-title": "Outils de Modération", "tools-lead": "Une suite d'outils conçus pour optimiser la modération.",
        "contact-title": "Contactez-nous", "contact-lead": "Des questions ou des suggestions ? Contactez-nous."
    },
    ru: {
        "nav-home": "Главная", "nav-products": "Продукты", "nav-mission": "Миссия", "nav-support": "Поддержка", "nav-tools": "Инструменты", "nav-contact": "Контакты",
        "welcome-guest": "Добро пожаловать!", "admin-panel": "Панель админа",
        "hero-title": "Официальный хаб BrainlyHQ", "hero-subtitle": "Где страсть к обучению встречается с технологиями и сообществом.", "hero-cta": "Присоединиться",
        "prod-title": "Наши продукты", "prod-lead": "Откройте для себя инновационные платформы нашей команды.",
        "mission-title": "Наша миссия", "mission-lead": "Мы верим, что образование должно быть доступным для каждого.",
        "support-title": "Центр поддержки", "support-lead": "Нужна помощь? Наша поддержка всегда готова помочь.",
        "tools-title": "Инструменты модератора", "tools-lead": "Набор утилит для оптимизации модерации и безопасности.",
        "contact-title": "Связаться с нами", "contact-lead": "Есть предложения или вопросы? Напишите нам."
    },
    es: {
        "nav-home": "Inicio", "nav-products": "Productos", "nav-mission": "Misión", "nav-support": "Soporte", "nav-tools": "Herramientas", "nav-contact": "Contacto",
        "welcome-guest": "¡Bienvenido a nuestra plataforma!", "admin-panel": "Panel de Admin",
        "hero-title": "Centro Oficial BrainlyHQ", "hero-subtitle": "Donde la pasión por aprender se une con la tecnología y la comunidad.", "hero-cta": "Únete",
        "prod-title": "Nuestros Productos", "prod-lead": "Descubre las plataformas innovadoras diseñadas por nuestro equipo.",
        "mission-title": "Nuestra Misión", "mission-lead": "Creemos en hacer la educación accesible para todos los estudiantes.",
        "support-title": "Centro de Soporte", "support-lead": "¿Necesitas ayuda? Nuestro equipo está a tu disposición.",
        "tools-title": "Herramientas de Moderador", "tools-lead": "Utilidades diseñadas para optimizar la moderación y seguridad.",
        "contact-title": "Contacto", "contact-lead": "¿Tienes alguna propuesta o sugerencia? Contáctanos."
    },
    pt: {
        "nav-home": "Início", "nav-products": "Produtos", "nav-mission": "Missão", "nav-support": "Suporte", "nav-tools": "Ferramentas", "nav-contact": "Contato",
        "welcome-guest": "Bem-vindo à nossa plataforma!", "admin-panel": "Painel do Admin",
        "hero-title": "Hub Oficial BrainlyHQ", "hero-subtitle": "Onde a paixão pelo aprendizado encontra a tecnologia e a comunidade.", "hero-cta": "Juntar-se",
        "prod-title": "Nossos Produtos", "prod-lead": "Descubra plataformas inovadoras desenvolvidas pela nossa equipe.",
        "mission-title": "Nossa Missão", "mission-lead": "Acreditamos em tornar a educação acessível para todos os alunos.",
        "support-title": "Centro de Suporte", "support-lead": "Precisa de ajuda? Nosso suporte está sempre disponível.",
        "tools-title": "Ferramentas de Moderador", "tools-lead": "Utilitários desenvolvidos para otimizar as tarefas de moderação.",
        "contact-title": "Contato", "contact-lead": "Tem alguma proposta comercial ou sugestão? Entre em contato."
    },
    ro: {
        "nav-home": "Acasă", "nav-products": "Produse", "nav-mission": "Misiune", "nav-support": "Asistență", "nav-tools": "Instrumente", "nav-contact": "Contact",
        "welcome-guest": "Bun venit pe platforma noastră!", "admin-panel": "Panel Admin",
        "hero-title": "Hub-ul Oficial BrainlyHQ", "hero-subtitle": "Unde pasiunea pentru învățare întâlnește tehnologia și comunitatea.", "hero-cta": "Alătură-te",
        "prod-title": "Produsele Noastre", "prod-lead": "Descoperă platformele inovatoare create de echipa noastră.",
        "mission-title": "Misiunea Noastră", "mission-lead": "Credem în facilitarea accesului la educație pentru fiecare elev.",
        "support-title": "Centru de Asistență", "support-lead": "Ai nevoie de ajutor? Echipa noastră îți stă la dispoziție.",
        "tools-title": "Instrumente Moderator", "tools-lead": "O suită de utilitare concepute pentru optimizarea moderării.",
        "contact-title": "Contact", "contact-lead": "Ai întrebări de afaceri sau sugestii? Contactează-ne direct."
    }
};

// ==========================================
// INICJALIZACJA STRONY (WSTRZYKIWANIE HTML)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        fetch('components/header.html').then(res => res.text()),
        fetch('components/footer.html').then(res => res.text())
    ]).then(([headerHtml, footerHtml]) => {
        
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        if (headerPlaceholder) headerPlaceholder.innerHTML = headerHtml;
        if (footerPlaceholder) footerPlaceholder.innerHTML = footerHtml;

        // Odpalenie funkcjonalności po wczytaniu nagłówka i stopki
        initNavigationHighlight();
        initThemeSystem();
        initProfileDropdown();
        initLanguageSystem();
        initPageTransitions();
        
    }).catch(err => console.error("Error loading components: ", err));
});

// ==========================================
// SYSTEMY STRONY (FUNKCJE POMOCNICZE)
// ==========================================

// 1. Aktywne linki w nawigacji
function initNavigationHighlight() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    const activeLink = document.querySelector(`nav a[href="${path}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// 2. Obsługa systemu motywów (Ciemny / Jasny)
function initThemeSystem() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (typeof updateThemeIcon === 'function') updateThemeIcon(currentTheme);

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleTheme();
        });
    }
}

// 3. Obsługa dropdownu profilu (Otwieranie / Zamykanie)
function initProfileDropdown() {
    const userBtn = document.getElementById('user-profile-btn');
    const dropdown = document.getElementById('profile-dropdown');

    if (userBtn && dropdown) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== userBtn) {
                dropdown.classList.remove('show');
            }
        });
    }
}

// 4. "Magic Translate" - System językowy
function initLanguageSystem() {
    const langSelect = document.getElementById('custom-lang-select');
    let currentLang = localStorage.getItem('lang') || 'en';

    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            const newLang = e.target.value;
            localStorage.setItem('lang', newLang);
            applyMagicTranslations(newLang);
        });
    }

    applyMagicTranslations(currentLang);
}

function applyMagicTranslations(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}

// 5. Płynne przejścia między podstronami (Fade-out)
function initPageTransitions() {
    const localLinks = document.querySelectorAll('nav a, .logo-container a, .dropdown-links a');
    localLinks.forEach(link => {
        if (link.hostname === window.location.hostname && link.pathname.endsWith('.html')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetUrl = link.href;
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 300);
            });
        }
    });
}
