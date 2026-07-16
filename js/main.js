/**
 * BrainlyHQ - Central System Core Engine
 * Handled features: i18n dynamic loading, navigation highlights, profile, dynamic notifications & theme loggers
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicjalizacja komponentów strukturalnych (Header i Footer)
    initHeaderAndFooter();
});

/**
 * Ładuje dynamicznie nagłówek oraz stopkę z zewnętrznych plików HTML i inicjuje ich logikę
 */
function initHeaderAndFooter() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");

    // Ładowanie nagłówka (Header)
    if (headerPlaceholder) {
        fetch("components/header.html")
            .then(res => res.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Po pomyślnym wstrzyknięciu HTML inicjujemy wszystkie komponenty
                initThemeToggle();
                initProfileDropdown();
                initLanguageSystem(); 
                initNavigationHighlight(); 
            })
            .catch(err => console.error("Error loading header:", err));
    }

    // Ładowanie stopki (Footer)
    if (footerPlaceholder) {
        fetch("components/footer.html")
            .then(res => res.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(err => console.error("Error loading footer:", err));
    }
}

/**
 * --- DYNAMICZNY SYSTEM TŁUMACZEŃ (i18n) ---
 */
function initLanguageSystem() {
    const langSelect = document.getElementById("custom-lang-select");
    const savedLang = localStorage.getItem("selectedLanguage") || "en";

    if (langSelect) {
        langSelect.value = savedLang;
        langSelect.addEventListener("change", (e) => {
            const newLang = e.target.value;
            loadLanguage(newLang);
        });
    }

    loadLanguage(savedLang);
}

async function loadLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        if (!response.ok) throw new Error(`Could not load translations for: ${lang}`);

        const translations = await response.json();
        applyTranslations(translations);
        localStorage.setItem("selectedLanguage", lang);
    } catch (error) {
        console.error("i18n Error:", error);
        if (lang !== "en") loadLanguage("en");
    }
}

function applyTranslations(translations) {
    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.getAttribute("data-translate");
        if (translations[key]) {
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                element.placeholder = translations[key];
            } else {
                element.textContent = translations[key];
            }
        }
    });
}

/**
 * --- PODŚWIETLANIE AKTYWNYCH STRON W NAWIGACJI ---
 */
function initNavigationHighlight() {
    let path = window.location.pathname.split("/").pop() || "index.html";

    if (path === "benefits.html" || path === "tracks.html") {
        path = "careers.html";
    }
    if (path === "status.html") {
        path = "products.html";
    }

    const activeLink = document.querySelector(`nav a[href="${path}"]`);
    if (activeLink) {
        document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
        activeLink.classList.add("active");
    }
}

/**
 * --- GLOBALNY SYSTEM POWIADOMIEŃ (Zapis i odczyt localStorage) ---
 */

// Pomocnicza funkcja generująca wpis logu i powiadomienia
function createNotification(text, details = "") {
    try {
        const now = new Date();
        const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const timeMs = now.getTime();
        
        let logs = JSON.parse(localStorage.getItem('brainly_notifications')) || [];
        
        // Dodajemy nowe zdarzenie na sam początek tablicy
        logs.unshift({
            time: timestamp,
            dateMs: timeMs,
            text: text,
            details: details
        });
        
        // Ograniczenie pojemności do 15 wpisów
        if (logs.length > 15) logs.pop();
        
        localStorage.setItem('brainly_notifications', JSON.stringify(logs));
        
        // Natychmiast odświeżamy listę w otwartym dropdownie
        renderNotifications();
    } catch (e) {
        console.warn("Storage write restricted:", e);
    }
}

// Funkcja renderująca elementy listy powiadomień w dropdownie
function renderNotifications() {
    const notifList = document.getElementById("dropdown-notifications-list");
    if (!notifList) return;

    try {
        const logs = JSON.parse(localStorage.getItem('brainly_notifications')) || [];
        const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
        const nowMs = new Date().getTime();

        // Filtrujemy wpisy starsze niż 7 dni (retencja)
        const activeLogs = logs.filter(log => (nowMs - (log.dateMs || 0)) < sevenDaysMs);
        
        // Zapisujemy przefiltrowaną tablicę
        if (activeLogs.length !== logs.length) {
            localStorage.setItem('brainly_notifications', JSON.stringify(activeLogs));
        }

        if (activeLogs.length === 0) {
            notifList.innerHTML = `
                <div style="font-size: 0.78rem; color: var(--text-secondary); text-align: left; font-style: italic; padding: 4px 0;">
                    No recent activities.
                </div>
            `;
            return;
        }

        // Generowanie struktury HTML powiadomień
        notifList.innerHTML = activeLogs.map(log => `
            <div style="border-bottom: 1px solid rgba(255,255,255,0.03); padding: 6px 0; text-align: left;">
                <div style="display: flex; justify-content: space-between; font-size: 0.72rem; font-weight: 700; color: var(--text-secondary);">
                    <span>${log.text}</span>
                    <span style="font-family: monospace; opacity: 0.7;">${log.time}</span>
                </div>
                ${log.details ? `<div style="font-size: 0.68rem; font-family: monospace; color: var(--color-brainly-green); opacity: 0.85; margin-top: 2px;">${log.details}</div>` : ''}
            </div>
        `).join('');

    } catch (e) {
        console.error("Error reading notifications:", e);
    }
}

/**
 * --- OBSŁUGA MOTYWÓW (Zintegrowana z systemem logowania powiadomień) ---
 */
function initThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);

        // LOGOWANIE ZMIANY MOTYWU: Generuje powiadomienie
        const formattedThemeName = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);
        createNotification("Theme updated", `Switched to ${formattedThemeName} mode`);
    });
}

/**
 * --- PROFIL UŻYTKOWNIKA I DROPDOWN POWIADOMIEŃ ---
 */
function initProfileDropdown() {
    const profileBtn = document.getElementById("user-profile-btn");
    const dropdown = document.getElementById("profile-dropdown");
    const clearBtn = document.getElementById("clear-notifications-btn");

    if (!profileBtn || !dropdown) return;

    // Przełączanie klasy .active przy kliknięciu w avatar
    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("active");
        
        // Przy każdym otwarciu dropdownu odświeżamy listę powiadomień
        if (dropdown.classList.contains("active")) {
            renderNotifications();
        }
    });

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && e.target !== profileBtn) {
            dropdown.classList.remove("active");
        }
    });

    // Czyszczenie powiadomień
    if (clearBtn) {
        clearBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            localStorage.removeItem('brainly_notifications');
            renderNotifications();
        });
    }

    // Inicjalne wczytanie logów przy starcie nagłówka
    renderNotifications();
}
