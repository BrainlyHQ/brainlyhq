document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicjalizacja systemów
    initLanguage();
    
    // Ustawienie poprawnej ikonki motywu na starcie
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeIcon(currentTheme);

    // 2. Obsługa przełącznika motywu (Dark/Light)
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // 3. Obsługa zmiany języka
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
});
