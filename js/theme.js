// =========================================================================
// SYSTEM OBSŁUGI MOTYWU (BLOKADA STAŁA: PERMANENT LIGHT MODE)
// Ten skrypt natychmiast wymusza jasny motyw bez opcji przełączania na ciemny.
// =========================================================================

function forceLightMode() {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    
    const observer = new MutationObserver(() => {
        const logo = document.getElementById('header-logo-img');
        if (logo) {
            logo.src = 'assets/BRAINLYHQ LOGO.png';
            observer.disconnect();
        }
    });
    
    observer.observe(document.documentElement, { childList: true, subtree: true });
}

forceLightMode();
