/**
 * BrainlyHQ - Synapse Knowledge Base Drawer Component
 * Powered by Synapse AI (Static Knowledge Base System)
 */

let faqData = null;
let questionsData = null;
let isFirstLoad = true;

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
            width: 480px !important;
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
            gap: 4px;
        }

        .synapse-icon-btn {
            background: none;
            border: none;
            cursor: pointer;
            color: #64748b;
            padding: 7px;
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

        /* KONTENER STRUMIENIA HISTORII CZATU */
        .synapse-drawer-content {
            flex: 1;
            overflow-y: auto;
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 24px;
            scroll-behavior: smooth;
        }

        /* WIADOMOŚĆ UŻYTKOWNIKA (PYTANIE) */
        .synapse-msg-user {
            align-self: flex-end;
            max-width: 85%;
            background-color: #0f172a;
            color: #ffffff;
            font-size: 0.88rem;
            font-weight: 500;
            line-height: 1.45;
            padding: 10px 16px;
            border-radius: 18px 18px 4px 18px;
            box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
            animation: synapse-fade-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* WIADOMOŚĆ AI (ODPOWIEDŹ LUB ŁADOWANIE) */
        .synapse-msg-ai {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            width: 100%;
            animation: synapse-fade-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .synapse-ai-avatar {
            width: 28px;
            height: 28px;
            object-fit: contain;
            flex-shrink: 0;
            margin-top: 2px;
        }

        .synapse-ai-bubble {
            flex: 1;
            min-width: 0;
            color: #0f172a;
        }

        /* STYL ŁADOWANIA AI */
        .synapse-ai-loading {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 4px 0;
            color: #64748b;
            font-size: 0.88rem;
            font-weight: 500;
        }

        .synapse-dots {
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }

        .synapse-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #3da80a;
            animation: synapse-bounce 1.4s infinite ease-in-out both;
        }

        .synapse-dot:nth-child(1) { animation-delay: -0.32s; }
        .synapse-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes synapse-bounce {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
            40% { transform: scale(1.1); opacity: 1; }
        }

        @keyframes synapse-fade-up {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Widok Artykułu / Zawartości */
        .synapse-article-title {
            font-size: 1.3rem;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.3px;
            line-height: 1.35;
            margin: 0 0 12px 0;
        }

        .synapse-article-summary {
            font-size: 0.92rem;
            color: #475569;
            font-weight: 500;
            line-height: 1.5;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 1px solid #f1f5f9;
        }

        .synapse-article-body {
            font-size: 0.9rem;
            color: #1e293b;
            line-height: 1.6;
        }

        /* PRECYZYJNE WYRÓWNANIE KROPEK (BULLET POINTS) */
        .synapse-highlights-list {
            margin: 14px 0 0 0;
            padding: 0;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .synapse-highlights-list li {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            font-size: 0.86rem;
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
            margin-top: 6px;
        }

        /* SEKCJA SUGEROWANYCH PYTAŃ */
        .synapse-questions-wrapper {
            margin-top: 20px;
            padding-top: 16px;
            border-top: 1px solid #f1f5f9;
        }

        .synapse-questions-header {
            font-size: 0.7rem;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            margin-bottom: 10px;
        }

        .synapse-question-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            padding: 10px 12px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 10px;
            font-size: 0.84rem;
            font-weight: 500;
            color: #1e293b;
            cursor: pointer;
            text-align: left;
            margin-bottom: 6px;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 1px 2px rgba(15, 23, 42, 0.02);
        }

        .synapse-question-btn:hover {
            border-color: #cbd5e1;
            background-color: #f8fafc;
            color: #3da80a;
            transform: translateX(2px);
        }

        .synapse-question-arrow {
            width: 15px;
            height: 15px;
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
            opacity: 0.85;
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
            <div class="synapse-header-actions">
                <button class="synapse-icon-btn" id="synapse-clear-btn" title="Clear conversation history">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                </button>
                <button class="synapse-icon-btn" id="synapse-report-btn" title="Report an issue">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m8 2 1.88 1.88"></path>
                        <path d="M14.12 3.88 16 2"></path>
                        <path d="M9 7.13v-1a3 3 0 0 1 6 0v1"></path>
                        <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z"></path>
                        <path d="M12 20v-9"></path>
                        <path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path>
                        <path d="M6 13H2"></path>
                        <path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path>
                        <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path>
                        <path d="M22 13h-4"></path>
                        <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path>
                    </svg>
                </button>
                <button class="synapse-icon-btn" id="synapse-close-btn" title="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        </div>

        <div class="synapse-drawer-content" id="synapse-drawer-content">
            <!-- Dynamiczny strumień wiadomości -->
        </div>
    `;

    document.documentElement.appendChild(backdrop);
    document.documentElement.appendChild(drawer);

    backdrop.addEventListener("click", closeSynapseHelp);
    document.getElementById("synapse-close-btn").addEventListener("click", closeSynapseHelp);
    document.getElementById("synapse-report-btn").addEventListener("click", handleReportBug);
    document.getElementById("synapse-clear-btn").addEventListener("click", resetChatStream);
}

/**
 * Podpięcie zdarzeń kliknięcia do klocków/kart w całej witrynie
 */
function initSynapseHelpTriggers() {
    document.addEventListener("click", (e) => {
        const trigger = e.target.closest("[data-help-topic], .help-trigger, .synapse-trigger");
        if (trigger) {
            e.preventDefault();
            const topicId = trigger.getAttribute("data-help-topic");
            const customQueryText = trigger.getAttribute("data-query-text") || trigger.getAttribute("title") || trigger.innerText.trim();
            openSynapseHelp(topicId, customQueryText);
        }
    });
}

/**
 * Przetwarza zapytanie, dopisuje chmurkę użytkownika oraz animowaną odpowiedź AI do historii
 */
async function appendTopicToChat(topicId, userPromptText = null) {
    const container = document.getElementById("synapse-drawer-content");
    if (!container) return;

    if (!faqData || !questionsData) {
        await preloadKnowledgeData();
    }

    const data = faqData ? faqData[topicId] : null;
    const promptLabel = userPromptText || (data ? data.title : "Query Information");

    if (isFirstLoad) {
        container.innerHTML = "";
        isFirstLoad = false;
    }

    // 1. Wiadomość użytkownika
    const userMsg = document.createElement("div");
    userMsg.className = "synapse-msg-user";
    userMsg.innerText = promptLabel;
    container.appendChild(userMsg);

    // 2. Wiersz odpowiedzi AI z ładowaniem
    const aiMsg = document.createElement("div");
    aiMsg.className = "synapse-msg-ai";
    aiMsg.innerHTML = `
        <img src="assets/brainlysynapse.png" alt="Synapse AI" class="synapse-ai-avatar">
        <div class="synapse-ai-bubble">
            <div class="synapse-ai-loading">
                <span>Reading context</span>
                <span class="synapse-dots">
                    <span class="synapse-dot"></span>
                    <span class="synapse-dot"></span>
                    <span class="synapse-dot"></span>
                </span>
            </div>
        </div>
    `;
    container.appendChild(aiMsg);
    scrollToBottom();

    // 3. Opóźnienie generatora AI
    await new Promise(resolve => setTimeout(resolve, 450));

    const bubble = aiMsg.querySelector(".synapse-ai-bubble");

    if (data) {
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
                        <button class="synapse-question-btn" type="button" data-help-topic="${escapeHtml(q.topicId)}" data-query-text="${escapeHtml(q.text)}">
                            <span>${escapeHtml(q.text)}</span>
                            <svg class="synapse-question-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    `).join("")}
                </div>
            `;
        }

        bubble.innerHTML = `
            <h2 class="synapse-article-title">${escapeHtml(data.title)}</h2>
            <div class="synapse-article-summary">${escapeHtml(data.summary || '')}</div>
            <div class="synapse-article-body">
                <p>${escapeHtml(data.content)}</p>
                ${highlightsHtml}
            </div>
            ${questionsHtml}
        `;
    } else {
        bubble.innerHTML = `
            <p style="font-size: 0.9rem; color: #64748b;">No matching entry was found in the Knowledge Base for topic: <strong>${escapeHtml(topicId || 'unknown')}</strong>.</p>
        `;
    }

    scrollToBottom();
}

/**
 * Otwiera panel i wstrzykuje nowe pytanie do wątku historii
 */
function openSynapseHelp(topicId, customQueryText = null) {
    const backdrop = document.getElementById("synapse-backdrop");
    const drawer = document.getElementById("synapse-drawer");

    if (backdrop && drawer) {
        backdrop.classList.add("active");
        drawer.classList.add("active");
        document.body.classList.add("synapse-open");
    }

    appendTopicToChat(topicId, customQueryText);
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
 * Resetuje historię czatu do stanu początkowego
 */
function resetChatStream() {
    const container = document.getElementById("synapse-drawer-content");
    if (!container) return;

    isFirstLoad = true;
    container.innerHTML = `
        <div class="synapse-empty-state">
            <img src="assets/brainlysynapse.png" alt="Synapse Logo">
            <h3 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 8px;">BrainlyHQ Knowledge Base</h3>
            <p style="font-size: 0.88rem;">Select any item or card across the site to view detailed technical specifications and documentation.</p>
        </div>
    `;
}

/**
 * Przewija kontener czatu do dołu
 */
function scrollToBottom() {
    const container = document.getElementById("synapse-drawer-content");
    if (container) {
        container.scrollTop = container.scrollHeight;
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
