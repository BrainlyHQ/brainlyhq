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
        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            toggleTheme();
        });
    }

    // ==========================================
    // 2. DROPDOWN PROFILU
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
    // 3. OBSŁUGA TRANSLATORA GOOGLE
    // ==========================================
    const customLangSelect = document.getElementById('custom-lang-select');
    
    if (customLangSelect) {
        customLangSelect.addEventListener('change', (e) => {
            const googleSelect = document.querySelector('.goog-te-combo');
            if (googleSelect) {
                googleSelect.value = e.target.value;
                googleSelect.dispatchEvent(new Event('change'));
            } else {
                console.warn("Google Translate is still loading...");
            }
        });
    }

    // Synchronizacja po pełnym wczytaniu widżetu Google
    const syncInterval = setInterval(() => {
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect && customLangSelect) {
            if (googleSelect.value) {
                customLangSelect.value = googleSelect.value;
            }
            clearInterval(syncInterval);
        }
    }, 1000);

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
