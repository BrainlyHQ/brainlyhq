/**
 * BrainlyHQ - Synapse Knowledge Base Drawer Component
 * Powered by Synapse AI (Static Knowledge Base System)
 */

let faqData = null;

document.addEventListener("DOMContentLoaded", () => {
    injectSynapseHelpStyles();
    buildSynapseHelpDOM();
    initSynapseHelpTriggers();
    preloadFaqData();
});

/**
 * Wczytuje bazę wiedzy z pliku JSON
 */
async function preloadFaqData() {
    try {
        const response = await fetch("support/faq.json");
        if (response.ok) {
            faqData = await response.json();
        } else {
            console.error("Błąd podczas ładowania support/faq.json:", response.status);
        }
    } catch (err) {
        console.error("Nie udało się pobrać pliku support/faq.json:", err);
    }
}

/**
 * Wstrzykuje dedykowany arkusz stylów CSS dla panelu
 */
function injectSynapseHelpStyles() {
    const style = document.createElement("style");
    style.textContent = `
        /* Lock przewijania tła */
        body.synapse-open {
            overflow: hidden !important;
        }

        /* Overlay / Backdrop */
        .synapse-backdrop {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            height: 100dvh !important;
            background-color: rgba(15, 23, 42, 0.35) !important;
            backdrop-filter: blur(6px) !important;
            -webkit-backdrop-filter: blur(6px) !important;
            z-index: 999998 !important;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .synapse-backdrop.active {
            opacity: 1;
            pointer-events: auto;
        }

        /* Boczny panel okna pomocy */
        .synapse-drawer {
            position: fixed !important;
            top: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 460px !important;
            max-width: 100vw !important;
            height: 100vh !important;
            height: 100dvh !important;
            background: #ffffff !important;
            z-index: 999999 !important;
            box-shadow: -12px 0 36px rgba(0, 0, 0, 0.12) !important;
            display: flex !important;
            flex-direction: column !important;
            transform: translateX(100%) !important;
            transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
            box-sizing: border-box !important;
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
            -webkit-font-smoothing: antialiased;
        }

        .synapse-drawer.active {
            transform: translateX(0) !important;
        }

        /* Górny pasek nawigacji */
        .synapse-drawer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 22px;
            border-bottom: 1px solid rgba(226, 232, 240, 0.8);
            flex-shrink: 0;
            background: #ffffff;
        }

        .synapse-header-brand-mini {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .synapse-mini-logo {
            width: 26px;
            height: 26px;
            object-fit: contain;
        }

        .synapse-header-titles {
            display: flex;
            flex-direction: column;
        }

        .synapse-mini-title {
            font-size: 0.95rem;
            font-weight: 700;
            color: #0f172a;
            line-height: 1.1;
            letter-spacing: -0.2px;
        }

        .synapse-mini-subtitle {
            font-size: 0.7rem;
            font-weight: 600;
            color: #3da80a;
            letter-spacing: 0.2px;
            margin-top: 2px;
        }

        .synapse-icon-btn {
            background: none;
            border: none;
            cursor: pointer;
            color: #64748b;
            padding: 6px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s ease, color 0.2s ease;
        }

        .synapse-icon-btn:hover {
            background-color: #f1f5f9;
            color: #0f172a;
        }

        /* GŁÓWNY KONTENER ZAWARTOŚCI */
        .synapse-drawer-content {
            flex: 1;
            overflow-y: auto;
            padding: 28px 24px;
            display: flex;
            flex-direction: column;
        }

        /* Widok Artykułu / Zawartości */
        .synapse-article-badge {
            display: inline-block;
            font-size: 0.72rem;
            font-weight: 800;
            color: #3da80a;
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            padding: 4px 10px;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 12px;
            width: fit-content;
        }

        .synapse-article-title {
            font-size: 1.45rem;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.4px;
            line-height: 1.3;
            margin: 0 0 16px 0;
        }

        .synapse-article-summary {
            font-size: 0.98rem;
            color: #475569;
            font-weight: 500;
            line-height: 1.5;
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid #f1f5f9;
        }

        .synapse-article-body {
            font-size: 0.92rem;
            color: #1e293b;
            line-height: 1.65;
            margin-bottom: 24px;
        }

        .synapse-highlights-list {
            margin: 16px 0 0 0;
            padding: 0;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .synapse-highlights-list li {
            position: relative;
            padding-left: 20px;
            font-size: 0.88rem;
            color: #334155;
            line-height: 1.5;
        }

        .synapse-highlights-list li::before {
            content: "•";
            position: absolute;
            left: 4px;
            top: -2px;
            color: #3da80a;
            font-size: 1.3rem;
            font-weight: bold;
        }

        .synapse-empty-state {
            text-align: center;
            margin: auto 0;
            color: #64748b;
        }

        .synapse-empty-state img {
            width: 64px;
            height: 64px;
            margin-bottom: 16px;
            opacity: 0.8;
        }

        @media (max-width: 480px) {
            .synapse-drawer {
                width: 100vw !important;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Generuje strukturę DOM dla bazy wiedzy
 */
function buildSynapseHelpDOM() {
    const backdrop = document.createElement("div");
    backdrop.className = "synapse-backdrop";
    backdrop.id = "synapse-backdrop";

    const drawer = document.createElement("aside");
    drawer.className = "synapse-drawer";
    drawer.id = "synapse-drawer";
    drawer.setAttribute("aria-label", "Synapse Knowledge Base");

    drawer.innerHTML = `
        <div class="synapse-drawer-header">
            <div class="synapse-header-brand-mini">
                <img src="assets/brainlysynapse.png" alt="Synapse Logo" class="synapse-mini-logo">
                <div class="synapse-header-titles">
                    <span class="synapse-mini-title">Knowledge Base</span>
                    <span class="synapse-mini-subtitle">Powered by Synapse AI</span>
                </div>
            </div>
            <button class="synapse-icon-btn" id="synapse-close-btn" title="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>

        <div class="synapse-drawer-content" id="synapse-drawer-content">
            <!-- Tutaj będzie dynamicznie wstrzykiwana treść z jsona -->
        </div>
    `;

    document.documentElement.appendChild(backdrop);
    document.documentElement.appendChild(drawer);

    backdrop.addEventListener("click", closeSynapseHelp);
    document.getElementById("synapse-close-btn").addEventListener("click", closeSynapseHelp);
}

/**
 * Podpięcie zdarzeń kliknięcia do klocków / kart z przypisanym ID
 */
function initSynapseHelpTriggers() {
    document.addEventListener("click", (e) => {
        const trigger = e.target.closest("[data-help-topic], .help-trigger, .synapse-trigger");
        if (trigger) {
            e.preventDefault();
            const topicId = trigger.getAttribute("data-help-topic");
            openSynapseHelp(topicId);
        }
    });
}

/**
 * Wyciąga informacje z pliku JSON na podstawie ID i renderuje w panelu
 */
async function renderTopicContent(topicId) {
    const container = document.getElementById("synapse-drawer-content");
    if (!container) return;

    if (!faqData) {
        await preloadFaqData();
    }

    if (faqData && topicId && faqData[topicId]) {
        const data = faqData[topicId];
        let highlightsHtml = "";

        if (data.highlights && Array.isArray(data.highlights)) {
            highlightsHtml = `
                <ul class="synapse-highlights-list">
                    ${data.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join("")}
                </ul>
            `;
        }

        container.innerHTML = `
            <div>
                <span class="synapse-article-badge">${escapeHtml(data.category || 'INFO')}</span>
                <h2 class="synapse-article-title">${escapeHtml(data.title)}</h2>
                <div class="synapse-article-summary">${escapeHtml(data.summary || '')}</div>
                <div class="synapse-article-body">
                    <p>${escapeHtml(data.content)}</p>
                    ${highlightsHtml}
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="synapse-empty-state">
                <img src="assets/brainlysynapse.png" alt="Synapse Logo">
                <h3 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 8px;">BrainlyHQ Knowledge Base</h3>
                <p style="font-size: 0.88rem;">Select any item or card across the site to view detailed technical specifications and documentation.</p>
            </div>
        `;
    }
}

/**
 * Otwiera panel i wyświetla artykuł na podstawie podanego topicId
 */
function openSynapseHelp(topicId) {
    const backdrop = document.getElementById("synapse-backdrop");
    const drawer = document.getElementById("synapse-drawer");

    renderTopicContent(topicId);

    if (backdrop && drawer) {
        backdrop.classList.add("active");
        drawer.classList.add("active");
        document.body.classList.add("synapse-open");
    }
}

function closeSynapseHelp() {
    const backdrop = document.getElementById("synapse-backdrop");
    const drawer = document.getElementById("synapse-drawer");

    if (backdrop && drawer) {
        backdrop.classList.remove("active");
        drawer.classList.remove("active");
        document.body.classList.remove("synapse-open");
    }
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
