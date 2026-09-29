/**
 * BrainlyHQ - Central System Core Engine
 * Enforces Light Theme, handles header/footer dynamic injection, notifications, & PWA.
 */

let deferredInstallPrompt = null;

document.addEventListener("DOMContentLoaded", () => {
    // Wymuszenie stałego motywu jasnego
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");

    // 1. Inicjalizacja komponentów i sekcji
    initHeaderAndFooter();
    initExpositionSection();

    // 2. Service Worker & PWA
    initPwaServiceWorker();

    // 3. Prompt instalacyjny PWA
    initInstallPrompt();
});

/**
 * Ładuje nagłówek oraz stopkę z plików HTML
 */
function initHeaderAndFooter() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");

    if (headerPlaceholder) {
        fetch("components/header.html")
            .then(res => res.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Ustawienie motywu
                document.documentElement.setAttribute("data-theme", "light");
                
                // Inicjalizacja podkomponentów nagłówka
                initProfileDropdown();
                initNavigationHighlight(); 
                initMobileMenu();
            })
            .catch(err => console.error("Error loading header:", err));
    }

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
 * Ładuje sekcję Exposition z pliku HTML
 */
function initExpositionSection() {
    const expositionPlaceholder = document.getElementById("exposition-placeholder");

    if (expositionPlaceholder) {
        fetch("sections/exposition.html")
            .then(res => {
                if (!res.ok) throw new Error("Błąd podczas ładowania pliku sections/exposition.html");
                return res.text();
            })
            .then(data => {
                expositionPlaceholder.innerHTML = data;
            })
            .catch(err => console.error("Error loading exposition section:", err));
    }
}

/**
 * Service Worker PWA
 */
function initPwaServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('BrainlyHQ Service Worker registered:', registration.scope);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }
}

/**
 * Prompty instalacyjne PWA
 */
function initInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredInstallPrompt = e;

        const installBtns = document.querySelectorAll('.trigger-pwa-install');
        installBtns.forEach(btn => {
            btn.style.display = 'inline-flex';
            btn.addEventListener('click', async () => {
                if (deferredInstallPrompt) {
                    deferredInstallPrompt.prompt();
                    const { outcome } = await deferredInstallPrompt.userChoice;
                    console.log(`User response to install prompt: ${outcome}`);
                    deferredInstallPrompt = null;
                }
            });
        });
    });
}

/**
 * Podświetlanie aktywnej nawigacji
 */
function initNavigationHighlight() {
    let path = window.location.pathname.split("/").pop() || "index.html";

    if (path === "benefits.html" || path === "tracks.html") path = "careers.html";
    if (path === "status.html" || path === "instal.html" || path === "maintenance.html") path = "support.html";
    if (path === "post.html") path = "blog.html";
    if (path === "documentation.html") path = "docs.html";

    const activeLink = document.querySelector(`nav.categories-nav a[href="${path}"]`);
    if (activeLink) {
        document.querySelectorAll("nav.categories-nav .nav-link").forEach(link => link.classList.remove("active"));
        activeLink.classList.add("active");
    }
}

/**
 * System Powiadomień
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
        
        if (activeLogs.length === 0) {
            notifList.innerHTML = `
                <div style="font-size: 0.78rem; color: var(--text-secondary); text-align: left; font-style: italic; padding: 4px 0;">
                    No recent activities.
                </div>
            `;
            return;
        }

        notifList.innerHTML = activeLogs.map(log => `
            <div style="padding: 10px 12px; margin-bottom: 6px; border-radius: 8px; border: 1px solid var(--border-color); background-color: #f8fafc;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; text-align: left;">
                    <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-primary); line-height: 1.3;">${log.text}</span>
                    <span style="font-family: monospace; font-size: 0.65rem; color: var(--text-secondary); opacity: 0.8;">${log.time}</span>
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
 * Rozwijany Profil Użytkownika
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
}

/**
 * Nawigacja Mobilna
 */
function initMobileMenu() {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const navMenu = document.querySelector("nav.categories-nav");

    if (!menuBtn || !navMenu) return;

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isActive = navMenu.classList.toggle("mobile-active");
        document.body.classList.toggle("mobile-menu-open", isActive);
    });

    document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && e.target !== menuBtn) {
            navMenu.classList.remove("mobile-active");
            document.body.classList.remove("mobile-menu-open");
        }
    });

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 960) {
                if (!link.nextElementSibling || !link.nextElementSibling.classList.contains("nav-submenu")) {
                    navMenu.classList.remove("mobile-active");
                    document.body.classList.remove("mobile-menu-open");
                }
            }
        });
    });
}
