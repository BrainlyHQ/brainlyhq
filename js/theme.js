// Funkcja inicjalizująca motyw przy załadowaniu strony
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Jeśli użytkownik ma już zapisany wybór, użyj go. 
    // W przeciwnym razie sprawdź preferencje jego systemu operacyjnego.
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = prefersDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', defaultTheme);
        localStorage.setItem('theme', defaultTheme);
    }
}

// Funkcja przełączająca motyw
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Aktualizuj wygląd ikonki słońca/księżyca, jeśli istnieje
    updateThemeIcon(newTheme);
}

// Pomocnicza funkcja do zmiany ikonki na przycisku
function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (!themeBtn) return;
    
    if (theme === 'dark') {
        // Ikonka słońca dla trybu ciemnego (kliknięcie włączy jasny)
        themeBtn.innerHTML = '☀️';
    } else {
        // Ikonka księżyca dla trybu jasnego (kliknięcie włączy ciemny)
        themeBtn.innerHTML = '🌙';
    }
}

// Wywołujemy inicjalizację od razu przy ładowaniu skryptu
initTheme();
