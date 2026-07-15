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
        e.stopPropagation(); 
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

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target) && e.target !== userBtn) {
                dropdown.classList.remove('show');
            }
        });
    }

    // ==========================================
    // 3. NIEZAWODNA OBSŁUGA TRANSLATORA GOOGLE
    // ==========================================
    const customLangSelect = document.getElementById('custom-lang-select');
    
    if (customLangSelect) {
        customLangSelect.addEventListener('change', (e) => {
            triggerGoogleTranslate(e.target.value);
        });
    }

    function triggerGoogleTranslate(langCode) {
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) {
            googleSelect.value = langCode;
            googleSelect.dispatchEvent(new Event('change'));
        }
    }

    // Pętla sprawdzająca i synchronizująca stan translatora z naszym customowym selectem
    const syncTranslate = () => {
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect && customLangSelect) {
            // Jeśli google ustawił już jakiś język, zsynchronizuj go z naszym selectem
            if (googleSelect.value) {
                customLangSelect.value = googleSelect.value;
            }
        }
    };

    // Sprawdzaj co pół sekundy, dopóki Google Translate nie osadzi się w drzewie DOM
    const translateInterval = setInterval(() => {
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) {
            syncTranslate();
            // Nasłuchuj również bezpośrednich zmian w oryginalnym elemencie Google
            googleSelect.addEventListener('change', syncTranslate);
            clearInterval(translateInterval);
        }
    }, 500);

    // Awaryjne wyłączenie interwału po 10 sekundach (zapobiega pętlom w tle)
    setTimeout(() => clearInterval(translateInterval), 10000);

    // ==========================================
    // 4. PŁYNNE PRZEJŚCIA MIĘDZY STRONAMI
    // ==========================================
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
});
