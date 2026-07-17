/**
 * BrainlyHQ - Central System Core Engine
 * Handled features: i18n dynamic loading, navigation highlights, profile, dynamic notifications (cards) & theme loggers
 */

let domObserver = null;

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
                
                // --- KLUCZOWA SYNCHRONIZACJA MOTYWU ---
                const savedTheme = localStorage.getItem("theme") || "dark";
                document.documentElement.setAttribute("data-theme", savedTheme);
                
                // Po pomyślnym wstrzyknięciu HTML inicjujemy wszystkie komponenty nagłówka
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
 * --- DYNAMICZNY SYSTEM TŁUMACZEŃ (i18n z plików JSON) ---
 */
function initLanguageSystem() {
    const langSelect = document.getElementById("custom-lang-select");
    const savedLang = localStorage.getItem("selectedLanguage") || "en";

    // Synchronizacja stanu listy rozwijanej w panelu gościa
    if (langSelect) {
        langSelect.value = savedLang;
        langSelect.addEventListener("change", (e) => {
            const newLang = e.target.value;
            loadLanguage(newLang);
        });
    }

    // Pierwsze załadowanie języka z pliku JSON przy starcie witryny
    loadLanguage(savedLang);

    // Bezpieczny obserwator struktury DOM - zapobiega zapętleniom przy zmianie języka
    if (!domObserver) {
        domObserver = new MutationObserver(() => {
            if (window.__cachedTranslations) {
                domObserver.disconnect(); // Chwilowe odłączenie blokuje powstawanie pętli
                applyTranslations(window.__cachedTranslations);
                startObserving(); // Ponowne bezpieczne uruchomienie nasłuchiwania
            }
        });
        startObserving();
    }
}

function startObserving() {
    if (domObserver) {
        domObserver.observe(document.body, { childList: true, subtree: true });
    }
}

async function loadLanguage(lang) {
    try {
        // Pobieranie dedykowanego pliku JSON z katalogu /lang/
        const response = await fetch(`lang/${lang}.json`);
        if (!response.ok) throw new Error(`Could not load translation file: lang/${lang}.json`);

        const translations = await response.json();
        window.__cachedTranslations = translations;
        
        if (domObserver) domObserver.disconnect();
        applyTranslations(translations);
        startObserving();
        
        localStorage.setItem("selectedLanguage", lang);
    } catch (error) {
        console.error("i18n Engine Error:", error);
    }
}

function applyTranslations(translations) {
    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.getAttribute("data-translate");
        if (translations[key]) {
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                if (element.placeholder !== translations[key]) {
                    element.placeholder = translations[key];
                }
            } else {
                if (element.textContent !== translations[key]) {
                    element.textContent = translations[key];
                }
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
function createNotification(text, details = "") {
    try {
        const now = new Date();
        const timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const timeMs = now.getTime();
        
        let logs = JSON.parse(localStorage.getItem('brainly_notifications')) || [];
        
        logs.unshift({
            time: timestamp,
            dateMs: timeMs,
            text: text,
            details: details
        });
        
        if (logs.length > 15) logs.pop();
        
        localStorage.setItem('brainly_notifications', JSON.stringify(logs));
        renderNotifications();
    } catch (e) {
        console.warn("Storage write restricted:", e);
    }
}

function renderNotifications() {
    const notifList = document.getElementById("dropdown-notifications-list");
    if (!notifList) return;

    try {
        const logs = JSON.parse(localStorage.getItem('brainly_notifications')) || [];
        const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
        const nowMs = new Date().getTime();

        const activeLogs = logs.filter(log => (nowMs - (log.dateMs || 0)) < sevenDaysMs);
        
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

        notifList.innerHTML = activeLogs.map(log => `
            <div class="card" style="padding: 10px 12px; margin-bottom: 6px; border-radius: 8px; border: 1px solid var(--border-color); background-color: var(--bg-secondary); transition: none; transform: none; box-shadow: none;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; text-align: left;">
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-primary); line-height: 1.3;">${log.text}</span>
                    <span style="font-family: monospace; font-size: 0.65rem; color: var(--text-secondary); opacity: 0.8; white-space: nowrap;">${log.time}</span>
                </div>
                ${log.details ? `
                    <div style="font-family: monospace; font-size: 0.68rem; color: var(--color-brainly-green); margin-top: 4px; text-align: left; word-break: break-all;">
                        ${log.details}
                    </div>
                ` : ''}
            </div>
        `).join('');

    } catch (e) {
        console.error("Error reading notifications:", e);
    }
}

/**
 * --- OBSŁUGA MOTYWÓW ---
 */
function initThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (!toggleBtn) return;

    // Pobierz aktualny stan i wymuś synchronizację wyglądu ikony oraz logo
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    if (typeof updateThemeIcon === "function") updateThemeIcon(currentTheme);
    if (typeof updateLogo === "function") updateLogo(currentTheme);

    toggleBtn.addEventListener("click", () => {
        // Wywołaj główną funkcję przełączającą z pliku theme.js
        if (typeof toggleTheme === "function") {
            toggleTheme();
            
            // Rejestracja powiadomienia na podstawie zaktualizowanego stanu
            const newTheme = document.documentElement.getAttribute("data-theme");
            const formattedThemeName = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);
            createNotification("Theme updated", `Switched to ${formattedThemeName} mode`);
        }
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

    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("active");
        
        if (dropdown.classList.contains("active")) {
            renderNotifications();
        }
    });

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && e.target !== profileBtn) {
            dropdown.classList.remove("active");
        }
    });

    if (clearBtn) {
        clearBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            localStorage.removeItem('brainly_notifications');
            renderNotifications();
        });
    }

    renderNotifications();
}
