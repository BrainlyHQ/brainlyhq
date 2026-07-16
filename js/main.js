// ==========================================
// SŁOWNIK "MAGIC TRANSLATE" (8 Języków)
// ==========================================
const translations = {
    en: {
        "nav-home": "Home", "nav-products": "Products", "nav-careers": "Careers", "nav-documentation": "Documentation", "nav-tools": "Tools",
        "welcome-guest": "Welcome to our platform!", "admin-panel": "Admin Panel",
        "hero-title": "Official BrainlyHQ Hub", "hero-subtitle": "Where passion for learning meets technology and community. Discover our moderating tools and grow with us!", "hero-cta": "Join Us",
        "prod-title": "Our Products", "prod-lead": "Discover innovative platforms and utilities crafted by our team.",
        "mission-title": "Our Mission", "mission-lead": "We believe in making education accessible and collaborative for every student.",
        "tools-title": "Community Utilities", "tools-lead": "A versatile suite of tools built for both our server members and staff. Designed to enhance your Discord experience, streamline formatting, and keep our community safe."
    },
    pl: {
        "nav-home": "Główna", "nav-products": "Produkty", "nav-careers": "Kariera", "nav-documentation": "Dokumentacja", "nav-tools": "Narzędzia",
        "welcome-guest": "Witaj na naszej platformie!", "admin-panel": "Panel Admina",
        "hero-title": "Oficjalne Centrum BrainlyHQ", "hero-subtitle": "Gdzie pasja do nauki spotyka się z technologią i społecznością. Odkryj nasze narzędzia moderatorskie i rozwijaj się z nami!", "hero-cta": "Dołącz do nas",
        "prod-title": "Nasze Produkty", "prod-lead": "Odkryj innowacyjne platformy i narzędzia stworzone przez nasz zespół.",
        "mission-title": "Nasza Misja", "mission-lead": "Wierzymy, że edukacja powinna być dostępna i angażująca dla każdego ucznia.",
        "tools-title": "Narzędzia Społecznościowe", "tools-lead": "Wszechstronny zestaw narzędzi stworzony zarówno dla członków serwera, jak i personelu. Zaprojektowany, aby ułatwić korzystanie z Discorda."
    },
    id: {
        "nav-home": "Beranda", "nav-products": "Produk", "nav-mission": "Misi", "nav-documentation": "Dokumentasi", "nav-tools": "Alat",
        "welcome-guest": "Selamat datang di platform kami!", "admin-panel": "Panel Admin",
        "hero-title": "Pusat Resmi BrainlyHQ", "hero-subtitle": "Tempat di mana semangat belajar bertemu dengan teknologi dan komunitas.", "hero-cta": "Gabung Sekarang",
        "prod-title": "Produk Kami", "prod-lead": "Temukan platform inovatif yang dibuat oleh tim kami.",
        "mission-title": "Misi Kami", "mission-lead": "Kami percaya dalam membuat pendidikan dapat diakses oleh semua siswa.",
        "tools-title": "Alat Komunitas", "tools-lead": "Kumpulan alat yang dirancang untuk mengoptimalkan tugas moderasi."
    },
    fr: {
        "nav-home": "Accueil", "nav-products": "Produits", "nav-mission": "Mission", "nav-documentation": "Documentation", "nav-tools": "Outils",
        "welcome-guest": "Bienvenue sur notre plateforme !", "admin-panel": "Panel Admin",
        "hero-title": "Hub Officiel BrainlyHQ", "hero-subtitle": "Où la passion d'apprendre rencontre la technologie et la communauté.", "hero-cta": "Reignez-nous",
        "prod-title": "Nos Produits", "prod-lead": "Découvrez les plateformes innovantes créées par notre équipe.",
        "mission-title": "Notre Mission", "mission-lead": "Nous croyons en une éducation accessible et collaborative pour tous.",
        "tools-title": "Outils Communautaires", "tools-lead": "Une suite d'outils conçus pour optimiser la modération."
    },
    ru: {
        "nav-home": "Главная", "nav-products": "Продукты", "nav-mission": "Миссия", "nav-documentation": "Документация", "nav-tools": "Инструменты",
        "welcome-guest": "Добро пожаловать!", "admin-panel": "Панель админа",
        "hero-title": "Официальный хаб BrainlyHQ", "hero-subtitle": "Где страсть к обучению встречается с технологиями и сообществом.", "hero-cta": "Присоединиться",
        "prod-title": "Наши продукты", "prod-lead": "Откройте для себя инновационные платформы нашей команды.",
        "mission-title": "Наша миссия", "mission-lead": "Мы верим, что образование должно быть доступным для каждого.",
        "tools-title": "Инструменты сообщества", "tools-lead": "Набор утилит для оптимизации модерации и безопасности."
    },
    es: {
        "nav-home": "Inicio", "nav-products": "Productos", "nav-mission": "Misión", "nav-documentation": "Documentación", "nav-tools": "Herramientas",
        "welcome-guest": "¡Bienvenido a nuestra plataforma!", "admin-panel": "Panel de Admin",
        "hero-title": "Centro Oficial BrainlyHQ", "hero-subtitle": "Donde la pasión por aprender se une con la tecnología y la comunidad.", "hero-cta": "Únete",
        "prod-title": "Nuestros Productos", "prod-lead": "Descubre las plataformas innovadoras diseñadas por nuestro equipo.",
        "mission-title": "Nuestra Misión", "mission-lead": "Creemos en hacer la educación accesible para todos los estudiantes.",
        "tools-title": "Herramientas de la Comunidad", "tools-lead": "Utilidades diseñadas para optimizar la moderación y seguridad."
    },
    pt: {
        "nav-home": "Início", "nav-products": "Produtos", "nav-mission": "Missão", "nav-documentation": "Documentação", "nav-tools": "Ferramentas",
        "welcome-guest": "Bem-vindo à nossa plataforma!", "admin-panel": "Painel do Admin",
        "hero-title": "Hub Oficial BrainlyHQ", "hero-subtitle": "Onde a paixão pelo aprendizado encontra a tecnologia e a comunidade.", "hero-cta": "Juntar-se",
        "prod-title": "Nossos Produtos", "prod-lead": "Descubra plataformas inovadoras desenvolvidas pela nossa equipe.",
        "mission-title": "Nossa Missão", "mission-lead": "Acreditamos em tornar a educação acessível para todos os alunos.",
        "tools-title": "Ferramentas do Moderador", "tools-lead": "Utilitários desenvolvidos para otimizar as tarefas de moderação."
    },
    ro: {
        "nav-home": "Acasă", "nav-products": "Produse", "nav-mission": "Misiune", "nav-documentation": "Documentație", "nav-tools": "Instrumente",
        "welcome-guest": "Bun venit pe platforma noastră!", "admin-panel": "Panel Admin",
        "hero-title": "Hub-ul Oficial BrainlyHQ", "hero-subtitle": "Unde pasiunea pentru învățare întâlnește tehnologia și comunitatea.", "hero-cta": "Alătură-te",
        "prod-title": "Produsele Noastre", "prod-lead": "Descoperă platformele inovatoare create de echipa noastră.",
        "mission-title": "Misiunea Noastră", "mission-lead": "Credem în facilitarea accesului la educație pentru fiecare elev.",
        "tools-title": "Instrumente Comunitate", "tools-lead": "O suită de utilitare concepute pentru optimizarea moderării."
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

        initNavigationHighlight();
        initThemeSystem();
        initProfileDropdown();
        initLanguageSystem();
        initPageTransitions();
        
        // KLUCZOWE: Inicjalizujemy edytor Markdown zaraz po tym, jak nagłówek i stopka zostaną wstrzyknięte do DOM
        initDiscordMarkdownSandbox();
        
    }).catch(err => console.error("Error loading components: ", err));
});

// ==========================================
// SYSTEMY STRONY (FUNKCJE POMOCNICZE)
// ==========================================

function initNavigationHighlight() {
    const path = window.location.pathname.split("/").pop() || "index.html";
    const activeLink = document.querySelector(`nav a[href="${path}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

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

// ==========================================
// SILNIK EDYTORA DISCORD MARKDOWN (LIVE)
// ==========================================
function initDiscordMarkdownSandbox() {
    const inputArea = document.getElementById('discord-input');
    const outputArea = document.getElementById('discord-preview-output');
    const timeElement = document.getElementById('discord-time');

    if (!inputArea || !outputArea) return;

    function setCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        if (timeElement) {
            timeElement.textContent = `Today at ${hours}:${minutes}`;
        }
    }
    setCurrentTime();

    function parseDiscordMarkdown(text) {
        if (!text) return "";
        let html = text;
        
        html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        html = html.replace(/```([\s\S]*?)```/g, '<div class="discord-code-block">$1</div>');
        
        html = html.replace(/^_\s+_\s*$/gim, '<span class="discord-spacer-line"></span>');
        
        // Zgodnie z wytycznymi: Pierwsze "-# " robi mały tekst, a kolejne "-# " w tej samej linii zostają jako tekst
        html = html.replace(/^-#\s+([\s\S]*?)$/gim, (match, content) => {
            return `<span class="discord-subtext">${content}</span>`;
        });
        
        html = html.replace(/^###\s+(.*)$/gim, '<h3>$1</h3>');
        html = html.replace(/^##\s+(.*)$/gim, '<h2>$1</h2>');
        html = html.replace(/^#\s+(.*)$/gim, '<h1>$1</h1>');
        html = html.replace(/^&gt;\s+(.*)$/gim, '<div class="discord-blockquote"><span class="discord-blockquote-line"></span><span class="discord-blockquote-content">$1</span></div>');
        html = html.replace(/^-\s+(.*)$/gim, '<ul class="discord-list"><li class="discord-list-item">$1</li></ul>');
        html = html.replace(/`([^`\n]+)`/g, '<span class="discord-inline-code">$1</span>');
        html = html.replace(/\|\|([\s\S]*?)\|\|/g, '<span class="discord-spoiler" onclick="this.classList.toggle(\'revealed\')">$1</span>');
        
        html = html.replace(/\*\*\*([\s\S]*?)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*([\s\S]*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*([\s\S]*?)\*/g, '<em>$1</em>');
        html = html.replace(/_([\s\S]*?)_/g, '<em>$1</em>');
        html = html.replace(/__([\s\S]*?)__/g, '<u>$1</u>');
        html = html.replace(/~~([\s\S]*?)~~/g, '<del>$1</del>');
        
        return html;
    }

    function updatePreview() {
        outputArea.innerHTML = parseDiscordMarkdown(inputArea.value);
    }

    // Zaawansowane wstawianie i usuwanie formatowania (Toggle/Cofanie akcji)
    function toggleFormatting(prefix, suffix) {
        const start = inputArea.selectionStart;
        const end = inputArea.selectionEnd;
        const text = inputArea.value;
        const selectedText = text.substring(start, end);

        // Przypadek 1: Jeśli tekst przed i za zaznaczeniem ma już te znaki (np. kliknięcie wewnątrz sformatowanego słowa)
        const hasSurrounding = prefix && suffix &&
            text.substring(start - prefix.length, start) === prefix &&
            text.substring(end, end + suffix.length) === suffix;

        // Przypadek 2: Jeśli samo zaznaczenie ma już w sobie te znaki na krańcach (np. zaznaczenie całego "**tekst**")
        const isEnclosed = prefix && suffix && selectedText.startsWith(prefix) && selectedText.endsWith(suffix);

        if (hasSurrounding) {
            // Cofnij formatowanie (usuń znaki wokół)
            inputArea.value = text.substring(0, start - prefix.length) + selectedText + text.substring(end + suffix.length);
            inputArea.focus();
            inputArea.setSelectionRange(start - prefix.length, end - prefix.length);
        } else if (isEnclosed) {
            // Cofnij formatowanie (usuń znaki z krańców zaznaczenia)
            const unwrapped = selectedText.substring(prefix.length, selectedText.length - suffix.length);
            inputArea.value = text.substring(0, start) + unwrapped + text.substring(end);
            inputArea.focus();
            inputArea.setSelectionRange(start, start + unwrapped.length);
        } else {
            // Brak formatowania: Nałóż je klasycznie
            const replacement = prefix + selectedText + suffix;
            inputArea.value = text.substring(0, start) + replacement + text.substring(end);
            inputArea.focus();
            
            let newStart = start + prefix.length;
            let newEnd = newStart + selectedText.length;
            
            // Jeśli nic nie było zaznaczone, postaw kursor w środku znaczników
            if (start === end) {
                newStart = start + prefix.length;
                newEnd = newStart;
            }
            inputArea.setSelectionRange(newStart, newEnd);
        }
        
        updatePreview();
    }

    const toolbarButtons = document.querySelectorAll('.toolbar-btn');
    toolbarButtons.forEach(button => {
        button.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const prefix = button.getAttribute('data-prefix');
            const suffix = button.getAttribute('data-suffix');
            if (prefix !== null && suffix !== null) {
                toggleFormatting(prefix, suffix);
            }
        });
    });

    inputArea.addEventListener('input', updatePreview);
    inputArea.addEventListener('keyup', updatePreview);
    inputArea.addEventListener('change', updatePreview);

    try {
        const storedAvatar = localStorage.getItem('selectedAvatar');
        const previewAvatar = document.getElementById('preview-avatar');
        if (storedAvatar && previewAvatar) {
            previewAvatar.src = storedAvatar;
        }
    } catch (e) {
        console.warn("Storage access restricted:", e);
    }

    updatePreview();
}
