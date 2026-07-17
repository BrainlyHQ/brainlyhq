// =========================================================================
// SYSTEM OBSŁUGI MOTYWÓW (DARK / LIGHT MODE)
// Ten skrypt wczytuje się w sekcji <head>, aby zapobiec mignięciu tła.
// =========================================================================

// Inicjalizacja motywu na samym starcie
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    let currentTheme;
    
    if (savedTheme) {
        currentTheme = savedTheme;
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        currentTheme = prefersDark ? 'dark' : 'light';
    }
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    // Obserwuj wstrzykiwanie DOM, aby zaktualizować elementy natychmiast po wyrenderowaniu nagłówka
    const observer = new MutationObserver(() => {
        const logo = document.getElementById('header-logo-img');
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (logo || themeBtn) {
            updateLogo(currentTheme);
            updateThemeIcon(currentTheme);
            observer.disconnect(); // Zakończ obserwację, gdy elementy zostały odnalezione
        }
    });
    
    observer.observe(document.documentElement, { childList: true, subtree: true });
}

// Funkcja przełączająca motyw (wywoływana przy kliknięciu przycisku)
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Zaktualizuj ikonkę wektorową w przycisku oraz plik logo
    updateThemeIcon(newTheme);
    updateLogo(newTheme);
}

// Podmiana pliku logo w zależności od motywu (Oryginał vs Białe wektory)
function updateLogo(theme) {
    const logoImg = document.getElementById('header-logo-img');
    if (!logoImg) return;
    
    if (theme === 'dark') {
        logoImg.src = 'assets/BRAINLYHQ LOGO white.png';
    } else {
        logoImg.src = 'assets/BRAINLYHQ LOGO.png';
    }
}

// Podmiana ikonki SVG w przycisku w zależności od aktywnego motywu
function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;
    
    // Sinc: Jeśli aktywny jest motyw ciemny, przycisk pokazuje SŁOŃCE (sugerując kliknięcie na tryb jasny).
    // Jeśli aktywny jest motyw jasny, przycisk wyświetla KSIĘŻYC (sugerując przejście na ciemny).
    if (theme === 'dark') {
        themeBtn.innerHTML = `
            <svg class="user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        `;
    } else {
        themeBtn.innerHTML = `
            <svg class="user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;
    }
}

// Natychmiastowe uruchomienie systemu
initTheme();
