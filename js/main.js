document.addEventListener('DOMContentLoaded', () => {
    // 1. Ustawienie poprawnej ikonki motywu (słońce/księżyc) na starcie
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    if (typeof updateThemeIcon === 'function') {
        updateThemeIcon(currentTheme);
    }

    // 2. Obsługa kliknięcia przełącznika motywu (Dark/Light)
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn && typeof toggleTheme === 'function') {
        themeBtn.addEventListener('click', toggleTheme);
    }
});
