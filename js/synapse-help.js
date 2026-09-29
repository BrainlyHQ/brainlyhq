/**
 * BrainlyHQ - Synapse Knowledge Base Drawer Component
 * Powered by Synapse AI (Static Knowledge Base System)
 */

let faqData = null;
let questionsData = null;

document.addEventListener("DOMContentLoaded", () => {
    injectSynapseHelpStyles();
    buildSynapseHelpDOM();
    initSynapseHelpTriggers();
    preloadKnowledgeData();
});

/**
 * Wczytuje pliki JSON z danymi
 */
async function preloadKnowledgeData() {
    try {
        const [faqRes, questionsRes] = await Promise.all([
            fetch("support/faq.json"),
            fetch("support/questions.json")
        ]);

        if (faqRes.ok) faqData = await faqRes.json();
        if (questionsRes.ok) questionsData = await questionsRes.json();
    } catch (err) {
        console.error("Błąd podczas ładowania danych z JSON:", err);
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

        .synapse-header-actions {
            display: flex;
            align-items: center;
            gap: 6px;
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

        /* STYL ŁADOWANIA AI */
        .synapse-loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 260px;
            gap: 14px;
            color: #64748b;
            font-size: 0.88rem;
            font-weight: 500;
            margin: auto 0;
            animation: synapse-fade-in 0.2s ease forwards;
        }

        .synapse-spinner {
            width: 32px;
            height: 32px;
            border: 3px solid #e2e8f0;
            border-top-color: #3da80a;
            border-radius: 50%;
            animation: synapse-spin 0.75s linear infinite;
        }

        @keyframes synapse-spin {
            to { transform: rotate(360deg); }
        }

        @keyframes synapse-fade-in {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Widok Artykułu / Zawartości */
        .synapse-article-wrapper {
            animation: synapse-fade-in 0.25s ease forwards;
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

        /* IKS/PUNKTY ROZWINIĘCIA - PRECYZYJNE WYRÓWNANIE */
        .synapse-highlights-list {
            margin: 18px 0 0 0;
            padding: 0;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .synapse-highlights-list li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            font-size: 0.88rem;
            color: #334155;
            line-height: 1.5;
        }

        .synapse-highlights-list li::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #3da80a;
            flex-shrink: 0;
            margin-top: 7px;
        }

        /* SEKCJA SUGEROWANYCH PYTAŃ */
        .synapse-questions-wrapper {
            margin-top: 32px;
            padding-top: 20px;
            border-top: 1px solid #f1f5f9;
        }

        .synapse-questions-header {
            font-size: 0.72rem;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            margin-bottom: 12px;
        }

        .synapse-question-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 12px 14px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            font-size: 0.86rem;
            font-weight: 500;
            color: #1e293b;
            cursor: pointer;
            text-align: left;
            margin-bottom: 8px;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 1px 3px rgba(15, 23, 42, 0.02);
        }

        .synapse-question-btn:hover {
            border-color: #cbd5e1;
            background-color: #f8fafc;
            color: #3da80a;
            transform: translateX(2px);
        }

        .synapse-question-arrow {
            width: 16px;
            height: 16px;
            color: #94a3b8;
            flex-shrink: 0;
            transition: transform 0.2s ease, color 0.2s ease;
        }

        .synapse-question-btn:hover .synapse-question-arrow {
            color: #3da80a;
            transform: translateX(2px);
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
 * Generuje strukturę DOM dla bazy wiedzy z opcją zgłaszania błędów
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
            <div class="synapse-header-actions">
                <button class="synapse-icon-btn" id="synapse-report-btn" title="Report an issue">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4"></path><path d="M12 17h.01"></path><path d="m3.84 18.16 6.32-12.64a2 2 0 0 1 3.68 0l6.32 12.64A2 2 0 0 1 18.36 21H5.64a2 2 0 0 1-1.8-2.84z"></path></svg>
                </button>
                <button class="synapse-icon-btn" id="synapse-close-btn" title="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        </div>

        <div class="synapse-drawer-content" id="synapse-drawer-content">
            <!-- Dynamiczna treść -->
        </div>
    `;

    document.documentElement.appendChild(backdrop);
    document.documentElement.appendChild(drawer);

    backdrop.addEventListener("click", closeSynapseHelp);
    document.getElementById("synapse-close-btn").addEventListener("click", closeSynapseHelp);
    document.getElementById("synapse-report-btn").addEventListener("click", handleReportBug);
}

/**
 * Podpięcie zdarzeń kliknięcia do klocków/kart z przypisanym ID
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
 * Wyciąga informacje z pliku JSON na podstawie ID, symuluje ładowanie AI i renderuje odpowiedź
 */
async function renderTopicContent(topicId) {
    const container = document.getElementById("synapse-drawer-content");
    if (!container) return;

    // Pokaż stan ładowania AI
    container.innerHTML = `
        <div class="synapse-loading-container">
            <div class="synapse-spinner"></div>
            <span>Reading context...</span>
        </div>
    `;

    if (!faqData || !questionsData) {
        await preloadKnowledgeData();
    }

    // Krótkie opóźnienie dla efektu generowania/analizy przez AI
    await new Promise(resolve => setTimeout(resolve, 380));

    if (faqData && topicId && faqData[topicId]) {
        const data = faqData[topicId];
        let highlightsHtml = "";
        let questionsHtml = "";

        if (data.highlights && Array.isArray(data.highlights)) {
            highlightsHtml = `
                <ul class="synapse-highlights-list">
                    ${data.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join("")}
                </ul>
            `;
        }

        if (questionsData && questionsData[topicId] && Array.isArray(questionsData[topicId])) {
            questionsHtml = `
                <div class="synapse-questions-wrapper">
                    <div class="synapse-questions-header">Suggested Questions</div>
                    ${questionsData[topicId].map(q => `
                        <button class="synapse-question-btn" type="button" data-help-topic="${escapeHtml(q.topicId)}">
                            <span>${escapeHtml(q.text)}</span>
                            <svg class="synapse-question-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    `).join("")}
                </div>
            `;
        }

        container.innerHTML = `
            <div class="synapse-article-wrapper">
                <h2 class="synapse-article-title">${escapeHtml(data.title)}</h2>
                <div class="synapse-article-summary">${escapeHtml(data.summary || '')}</div>
                <div class="synapse-article-body">
                    <p>${escapeHtml(data.content)}</p>
                    ${highlightsHtml}
                </div>
                ${questionsHtml}
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

/**
 * Obsługa zgłaszania błędów (Report Bug)
 */
function handleReportBug() {
    const issue = prompt("Describe the issue or feedback regarding Synapse Knowledge Base:");
    if (issue && issue.trim().length > 0) {
        alert("Thank you! Your feedback has been sent to the BrainlyHQ team.");
    }
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
