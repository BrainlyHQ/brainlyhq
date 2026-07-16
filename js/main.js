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
        "nav-home": "Beranda", "nav-products": "Produk", "nav-careers": "Karir", "nav-documentation": "Dokumentasi", "nav-tools": "Alat",
        "welcome-guest": "Selamat datang di platform kami!", "admin-panel": "Panel Admin",
        "hero-title": "Pusat Resmi BrainlyHQ", "hero-subtitle": "Tempat di mana semangat belajar bertemu dengan teknologi i komunitas.", "hero-cta": "Gabung Sekarang",
        "prod-title": "Produk Kami", "prod-lead": "Temukan platform inovatif yang dibuat oleh tim kami.",
        "mission-title": "Misi Kami", "mission-lead": "Kami believe dalam membuat pendidikan dapat diakses oleh semua siswa.",
        "tools-title": "Alat Komunitas", "tools-lead": "Kumpulan alat yang dirancang untuk mengoptimalkan tugas moderasi."
    },
    fr: {
        "nav-home": "Accueil", "nav-products": "Produits", "nav-careers": "Carrières", "nav-documentation": "Documentation", "nav-tools": "Outils",
        "welcome-guest": "Bienvenue sur notre plateforme !", "admin-panel": "Panel Admin",
        "hero-title": "Hub Officiel BrainlyHQ", "hero-subtitle": "Où la passion d'apprendre rencontre la technologie et la communauté.", "hero-cta": "Reignez-nous",
        "prod-title": "Nos Produits", "prod-lead": "Découvrez les plateformes innovantes créées par notre équipe.",
        "mission-title": "Notre Mission", "mission-lead": "Nous croyons en une éducation accessible et collaborative pour tous.",
        "tools-title": "Outils Communautaires", "tools-lead": "Une suite d'outils conçus pour optimiser la modération."
    },
    ru: {
        "nav-home": "Главная", "nav-products": "Продукты", "nav-careers": "Карьера", "nav-documentation": "Документация", "nav-tools": "Инструменты",
        "welcome-guest": "Добро пожаловать!", "admin-panel": "Панель админа",
        "hero-title": "Официальный хаб BrainlyHQ", "hero-subtitle": "Где страсть к обучению встречается с технологиями и сообществом.", "hero-cta": "Присоединиться",
        "prod-title": "Наши продукты", "prod-lead": "Откройте для себя инновационные платформы нашей команды.",
        "mission-title": "Наша миссия", "mission-lead": "Мы верим, что образование должно быть доступным для каждого.",
        "tools-title": "Инструменты сообщества", "tools-lead": "Набор утилит для оптимизации модерации и безопасности."
    },
    es: {
        "nav-home": "Inicio", "nav-products": "Productos", "nav-careers": "Carreras", "nav-documentation": "Documentación", "nav-tools": "Herramientas",
        "welcome-guest": "¡Bienvenido a nuestra plataforma!", "admin-panel": "Panel de Admin",
        "hero-title": "Centro Oficial BrainlyHQ", "hero-subtitle": "Donde la pasión por aprender se une con la tecnología y la comunidad.", "hero-cta": "Únete",
        "prod-title": "Nuestros Productos", "prod-lead": "Descubre las plataformas innovadoras diseñadas por Employee.",
        "mission-title": "Nuestra Misión", "mission-lead": "Creemos en hacer la educación accesible para todos los Estados.",
        "tools-title": "Herramientas de la Comunidad", "tools-lead": "Utilidades diseñadas para optimizar la moderación y seguridad."
    },
    pt: {
        "nav-home": "Início", "nav-products": "Produtos", "nav-careers": "Carreiras", "nav-documentation": "Documentação", "nav-tools": "Ferramentas",
        "welcome-guest": "Bem-vindo à nossa platforma!", "admin-panel": "Painel do Admin",
        "hero-title": "Hub Oficial BrainlyHQ", "hero-subtitle": "Onde a paixão pelo aprendizado encontra a tecnologia i a comunidade.", "hero-cta": "Juntar-se",
        "prod-title": "Nossos Produtos", "prod-lead": "Descubra plataformas inovadoras desenvolvidas pela nossa equipe.",
        "mission-title": "Nossa Missão", "mission-lead": "Acreditamos em tornar a educação acessível para todos os alunos.",
        "tools-title": "Ferramentas do Moderador", "tools-lead": "Utilitários desenvolvidos para otimizar las tarefas de moderação."
    },
    ro: {
        "nav-home": "Acasă", "nav-products": "Produse", "nav-careers": "Cariere", "nav-documentation": "Documentație", "nav-tools": "Instrumente",
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

        // Inicjalizacja systemów po wstrzyknięciu struktury do drzewa DOM
        initThemeSystem();
        initNavigationHighlight();
        initProfileDropdown();
        initLanguageSystem();
        initPageTransitions();
        
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
    // Odczyt zapisanego motywu lub domyślny ciemny
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Aktualizacja widoku logotypu oraz powiązanych ikon
    updateLogoState(currentTheme);
    if (typeof updateThemeIcon === 'function') updateThemeIcon(currentTheme);

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Pobieramy aktualny stan bezpośrednio z dokumentu, bez sztywnych uproszczeń
            const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            updateLogoState(newTheme);
            if (typeof updateThemeIcon === 'function') updateThemeIcon(newTheme);
            
            // Zapis zdarzenia zmiany motywu do panelu powiadomień
            try {
                const now = new Date();
                const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                const themeLabel = newTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
                
                let logs = JSON.parse(localStorage.getItem('brainly_notifications')) || [];
                logs.unshift({
                    time: timestamp,
                    dateMs: now.getTime(),
                    text: `Switched theme to ${themeLabel}`,
                    details: `System UI theme set to ${newTheme}`
                });
                
                if(logs.length > 15) logs.pop();
                localStorage.setItem('brainly_notifications', JSON.stringify(logs));
            } catch(err) {
                console.warn("Storage restricted", err);
            }
        });
    }
}

function updateLogoState(theme) {
    const logoImg = document.getElementById('header-logo-img');
    if (logoImg) {
        if (theme === 'dark') {
            logoImg.src = 'assets/BRAINLYHQ LOGO WHITE.png';
        } else {
            logoImg.src = 'assets/BRAINLYHQ LOGO.png';
        }
    }
}

function initProfileDropdown() {
    const userBtn = document.getElementById('user-profile-btn');
    const dropdown = document.getElementById('profile-dropdown');
    const notificationsList = document.getElementById('dropdown-notifications-list');
    const clearBtn = document.getElementById('clear-notifications-btn');

    function renderDropdownNotifications() {
        if (!notificationsList) return;
        try {
            let logs = JSON.parse(localStorage.getItem('brainly_notifications')) || [];
            const nowMs = new Date().getTime();
            const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

            const filteredLogs = logs.filter(log => {
                if (!log.dateMs) return true;
                return (nowMs - log.dateMs) < sevenDaysMs;
            });

            if (filteredLogs.length !== logs.length) {
                logs = filteredLogs;
                localStorage.setItem('brainly_notifications', JSON.stringify(logs));
            }

            if (logs.length === 0) {
                notificationsList.innerHTML = `
                    <div style="font-size: 0.78rem; color: var(--text-secondary); text-align: left; font-style: italic; padding: 4px 0;">
                        No recent activities.
                    </div>`;
                return;
            }

            notificationsList.innerHTML = logs.map(log => `
                <div style="display: flex; flex-direction: column; background: var(--bg-primary); border: 1px solid var(--border-color); padding: 8px 10px; border-radius: 8px; text-align: left;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                        <span style="font-size: 0.78rem; font-weight: 600; color: var(--text-primary); line-height: 1.3;">${log.text}</span>
                        <span style="font-size: 0.7rem; color: var(--text-secondary); font-weight: 500; white-space: nowrap;">${log.time}</span>
                    </div>
                    ${log.details ? `<span style="font-family: monospace; font-size: 0.72rem; color: #99ee60; font-weight: 700; margin-top: 2px;">${log.details}</span>` : ''}
                </div>
            `).join('');
        } catch (e) {
            console.warn("Could not load or filter notifications:", e);
        }
    }

    if (userBtn && dropdown) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!dropdown.classList.contains('show')) {
                renderDropdownNotifications();
            }
            dropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== userBtn) {
                dropdown.classList.remove('show');
            }
        });

        if (clearBtn) {
            clearBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                localStorage.removeItem('brainly_notifications');
                renderDropdownNotifications();
            });
        }
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
        html = html.replace(/^-#\s+(.*)$/gim, '<span class="discord-subtext">$1</span>');
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

    function toggleFormatting(prefix, suffix) {
        const start = inputArea.selectionStart;
        const end = inputArea.selectionEnd;
        const text = inputArea.value;
        const selectedText = text.substring(start, end);

        const hasSurrounding = prefix && suffix &&
            text.substring(start - prefix.length, start) === prefix &&
            text.substring(end, end + suffix.length) === suffix;

        const isEnclosed = prefix && suffix && selectedText.startsWith(prefix) && selectedText.endsWith(suffix);

        if (hasSurrounding) {
            inputArea.value = text.substring(0, start - prefix.length) + selectedText + text.substring(end + suffix.length);
            inputArea.focus();
            inputArea.setSelectionRange(start - prefix.length, end - prefix.length);
        } else if (isEnclosed) {
            const unwrapped = selectedText.substring(prefix.length, selectedText.length - suffix.length);
            inputArea.value = text.substring(0, start) + unwrapped + text.substring(end);
            inputArea.focus();
            inputArea.setSelectionRange(start, start + unwrapped.length);
        } else {
            const replacement = prefix + selectedText + suffix;
            inputArea.value = text.substring(0, start) + replacement + text.substring(end);
            inputArea.focus();
            let newStart = start + prefix.length;
            let newEnd = newStart + selectedText.length;
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
        console.warn("Storage restricted", e);
    }
    updatePreview();
}
