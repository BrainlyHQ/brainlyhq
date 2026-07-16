/**
 * BrainlyHQ - Central System Core Engine
 * Handled features: i18n dynamic loading, navigation highlights, profile & notifications
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicjalizacja nagłówka i stopki
    initHeaderAndFooter();

    // 2. Obsługa aktywnego podświetlania menu
    initNavigationHighlight();
});

/**
 * Ładuje nagłówek i stopkę z plików HTML i inicjuje powiązane z nimi akcje
 */
function initHeaderAndFooter() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");

    // Ładowanie Headeru
    if (headerPlaceholder) {
        fetch("components/header.html")
            .then(res => res.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Po załadowaniu headeru inicjujemy wszystkie jego funkcje
                initThemeToggle();
                initProfileDropdown();
                initLanguageSystem(); // System tłumaczeń
                initNavigationHighlight(); // Ponowne upewnienie się o podświetleniu
            })
            .catch(err => console.error("Error loading header:", err));
    }

    // Ładowanie Footeru
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
 * Pobiera pliki JSON z katalogu /lang/ bez zaśmiecania kodu głównego
 */
function initLanguageSystem() {
    const langSelect = document.getElementById("custom-lang-select");
    
    // Odczytujemy zapisany język z pamięci przeglądarki (domyślnie 'en')
    const savedLang = localStorage.getItem("selectedLanguage") || "en";

    // Ustawiamy odpowiednią wartość w selektorze w menu, jeśli istnieje
    if (langSelect) {
        langSelect.value = savedLang;
        
        // Słuchacz zmiany języka przez użytkownika
        langSelect.addEventListener("change", (e) => {
            const newLang = e.target.value;
            loadLanguage(newLang);
        });
    }

    // Ładujemy początkowy język
    loadLanguage(savedLang);
}

/**
 * Asynchronicznie pobiera odpowiedni plik JSON i aplikuje tłumaczenia
 */
async function loadLanguage(lang) {
    try {
        // Pobieranie pliku językowego z folderu /lang/
        const response = await fetch(`lang/${lang}.json`);
        
        if (!response.ok) {
            throw new Error(`Could not load translation file for language: ${lang}`);
        }

        const translations = await response.json();

        // Aplikowanie tłumaczeń na elementy DOM
        applyTranslations(translations);

        // Zapisujemy preferencję w localStorage
        localStorage.setItem("selectedLanguage", lang);
    } catch (error) {
        console.error("i18n Error:", error);
        
        // Awaryjne przejście na angielski (fallback), jeśli wybrany plik JSON nie istnieje
        if (lang !== "en") {
            console.log("Falling back to English...");
            loadLanguage("en");
        }
    }
}

/**
 * Mapuje pobrane klucze JSON na elementy na stronie posiadające atrybut [data-translate]
 */
function applyTranslations(translations) {
    const translatableElements = document.querySelectorAll("[data-translate]");

    translatableElements.forEach(element => {
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
 * --- PODŚWIETLANIE AKTYWNYCH STRON ---
 */
function initNavigationHighlight() {
    let path = window.location.pathname.split("/").pop() || "index.html";

    // Obsługa podstron kariery (Why Us, Tracks -> podświetla główną zakładkę Careers)
    if (path === "benefits.html" || path === "tracks.html") {
        path = "careers.html";
    }

    // Jeśli jesteśmy na stronie statusu systemów, powiąż to z przyciskiem Products
    if (path === "status.html") {
        path = "products.html";
    }

    const activeLink = document.querySelector(`nav a[href="${path}"]`);
    if (activeLink) {
        // Usuwamy klasę active z innych linków w nawigacji
        document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
        // Nadajemy aktywnemu linkowi klasę
        activeLink.classList.add("active");
    }
}

/**
 * --- OBSŁUGA MOTYWÓW (DARK / LIGHT TOGGLE) ---
 */
function initThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle-btn");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });
}

/**
 * --- PROFIL UŻYTKOWNIKA I POWIADOMIENIA ---
 */
function initProfileDropdown() {
    const profileBtn = document.getElementById("user-profile-btn");
    const dropdown = document.getElementById("profile-dropdown");
    const clearBtn = document.getElementById("clear-notifications-btn");
    const notifList = document.getElementById("dropdown-notifications-list");

    if (!profileBtn || !dropdown) return;

    // Przełączanie widoczności dropdownu profilu
    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("active");
    });

    // Zamykanie dropdownu po kliknięciu poza niego
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && e.target !== profileBtn) {
            dropdown.classList.remove("active");
        }
    });

    // Czyszczenie powiadomień w dropdownie
    if (clearBtn && notifList) {
        clearBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            notifList.innerHTML = `
                <div style="font-size: 0.78rem; color: var(--text-secondary); text-align: left; font-style: italic; padding: 4px 0;">
                    No recent activities.
                </div>
            `;
        });
    }
}
