document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. OBSŁUGA MOTYWU (Ciemny / Jasny)
    // ==========================================
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (typeof updateThemeIcon === 'function') {
        updateThemeIcon(currentTheme);
    }

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn && typeof toggleTheme === 'function') {
        themeBtn.addEventListener('click', themeBtnClick);
    }

    function themeBtnClick(e) {
        e.stopPropagation(); // Zapobiega zamykaniu dropdownu przy zmianie motywu
        toggleTheme();
    }

    // ==========================================
    // 2. DROPDOWN PROFILU (IKONA UŻYTKOWNIKA)
    // ==========================================
    const userBtn = document.getElementById('user-profile-btn');
    const dropdown = document.getElementById('profile-dropdown');

    if (userBtn && dropdown) {
        userBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });

        // Zamknij menu jeśli kliknięto gdziekolwiek indziej na ekranie
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== userBtn) {
                dropdown.classList.remove('show');
            }
        });
    }

    // ==========================================
    // 3. OBSŁUGA POŁĄCZENIA TRANSLATORA Z SELECTEM
    // ==========================================
    const customLangSelect = document.getElementById('custom-lang-select');
    if (customLangSelect) {
        customLangSelect.addEventListener('change', (e) => {
            const targetLang = e.target.value;
            triggerGoogleTranslate(targetLang);
        });
    }

    function triggerGoogleTranslate(langCode) {
        // Znajduje ukryty oryginalny select wygenerowany przez Google Translate
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) {
            googleSelect.value = langCode;
            // Wywołanie sztucznego zdarzenia 'change' w przeglądarce, aby skrypt Google zareagował
            googleSelect.dispatchEvent(new Event('change'));
        }
    }

    // Synchronizuj nasz select po załadowaniu Google Translate
    const checkTranslateInterval = setInterval(() => {
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect && customLangSelect) {
            customLangSelect.value = googleSelect.value || 'en';
            clearInterval(checkTranslateInterval);
        }
    }, 500);

    // ==========================================
    // 4. PŁYNNE PRZEJŚCIA MIĘDZY STRONAMI (FADE OUT)
    // ==========================================
    const localLinks = document.querySelectorAll('nav a, .logo-container a, .card a, a.cta-btn');
    localLinks.forEach(link => {
        // Sprawdzamy tylko lokalne linki do podstron .html
        if (link.hostname === window.location.hostname && link.pathname.endsWith('.html')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetUrl = link.href;
                
                document.body.classList.add('fade-out');
                
                // Czekamy na koniec animacji (300ms) i przenosimy użytkownika
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 300);
            });
        }
    });
});
