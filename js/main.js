/**
 * BrainlyHQ - Central System Core Engine
 * Handled features: i18n dynamic loading, navigation highlights, profile & notifications, theme switching
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
                
                // Po pomyślnym wstrzyknięciu HTML inicjujemy wszystkie nasłuchiwacze zdarzeń
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
 * Ładuje pliki .json bezpośrednio z katalogu /lang/
 */
function initLanguageSystem() {
    const langSelect = document.getElementById("custom-lang-select");
    
    // Odczytujemy zapisany wcześniej język z pamięci przeglądarki (domyślnie angielski 'en')
    const savedLang = localStorage.getItem("selectedLanguage") || "en";

    // Ustawiamy właściwą opcję w menu rozwijanym, jeśli element istnieje w DOM
    if (langSelect) {
        langSelect.value = savedLang;
        
        // Nasłuchiwanie ręcznej zmiany języka przez użytkownika
        langSelect.addEventListener("change", (e) => {
            const newLang = e.target.value;
            loadLanguage(newLang);
        });
    }

    // Pierwsze załadowanie tłumaczeń przy starcie strony
    loadLanguage(savedLang);
}

/**
 * Pobiera asynchronicznie plik JSON dla wybranego języka i aplikuje go na stronę
 */
async function loadLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        
        if (!response.ok) {
            throw new Error(`Could not load translation file for language: ${lang}`);
        }

        const translations = await response.json();

        // Podmieniamy teksty na stronie
        applyTranslations(translations);

        // Zapisujemy wybór języka w przeglądarce
        localStorage.setItem("selectedLanguage", lang);
    } catch (error) {
        console.error("i18n Error:", error);
        
        // W razie błędu (np. brak pliku json) przechodzimy awaryjnie na angielski
        if (lang !== "en") {
            console.log("Falling back to English...");
            loadLanguage("en");
        }
    }
}

/**
 * Mapuje pobrany słownik kluczy na elementy posiadające atrybut [data-translate]
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
 * --- PODŚWIETLANIE AKTYWNYCH STRON W NAWIGACJI ---
 */
function initNavigationHighlight() {
    let path = window.location.pathname.split("/").pop() || "index.html";

    // Grupowanie podstron pod główną zakładkę Careers
    if (path === "benefits.html" || path === "tracks.html") {
        path = "careers.html";
    }

    // Powiązanie podstrony statusu z główną zakładką Products
    if (path === "status.html") {
        path = "products.html";
    }

    const activeLink = document.querySelector(`nav a[href="${path}"]`);
    if (activeLink) {
        // Czyścimy inne aktywne podświetlenia
        document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
        // Nadajemy aktualnej stronie podświetlenie
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
 * --- PROFIL UŻYTKOWNIKA I MENU POWIADOMIEŃ ---
 */
function initProfileDropdown() {
    const profileBtn = document.getElementById("user-profile-btn");
    const dropdown = document.getElementById("profile-dropdown");
    const clearBtn = document.getElementById("clear-notifications-btn");
    const notifList = document.getElementById("dropdown-notifications-list");

    if (!profileBtn || !dropdown) return;

    // Przełączanie klasy .active przy kliknięciu w avatar
    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("active");
    });

    // Zamykanie dropdownu po kliknięciu gdziekolwiek poza nim i przyciskiem profilu
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target) && e.target !== profileBtn) {
            dropdown.classList.remove("active");
        }
    });

    // Obsługa przycisku "Clear All" w powiadomieniach
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
