/**
 * BrainlyHQ - Synapse AI Quick Help Drawer Component
 */

let synapseHelpData = null;

document.addEventListener("DOMContentLoaded", () => {
    injectSynapseHelpStyles();
    buildSynapseHelpDOM();
    loadSynapseHelpData();
    initSynapseHelpTriggers();
});

/**
 * Wstrzykuje dedykowany arkusz stylów CSS dla panelu
 */
function injectSynapseHelpStyles() {
    const style = document.createElement("style");
    style.textContent = `
        /* Overlay / Backdrop */
        .synapse-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(15, 23, 42, 0.3);
            backdrop-filter: blur(4px);
            z-index: 9998;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .synapse-backdrop.active {
            opacity: 1;
            pointer-events: auto;
        }

        /* Boczny panel okna pomocy Meta AI Style */
        .synapse-drawer {
            position: fixed;
            top: 0;
            right: -460px;
            width: 440px;
            max-width: 100vw;
            height: 100vh;
            background: #ffffff;
            z-index: 9999;
            box-shadow: -10px 0 30px rgba(0, 0, 0, 0.08);
            display: flex;
            flex-direction: column;
            transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            box-sizing: border-box;
            font-family: inherit;
        }

        .synapse-drawer.active {
            transform: translateX(-460px);
        }

        /* Górny pasek nawigacji okna */
        .synapse-drawer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            border-bottom: 1px solid #f1f5f9;
        }

        .synapse-header-actions {
            display: flex;
            align-items: center;
            gap: 12px;
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

        /* Zawartość przewijana */
        .synapse-drawer-body {
            flex: 1;
            overflow-y: auto;
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* Pływające logo i Nagłówek */
        .synapse-hero-brand {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-top: 10px;
            margin-bottom: 24px;
        }

        .synapse-logo-wrapper {
            position: relative;
            width: 90px;
            height: 90px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .synapse-logo-img {
            width: 80px;
            height: 80px;
            object-fit: contain;
            filter: drop-shadow(0 8px 16px rgba(61, 168, 10, 0.2));
            animation: synapse-float 4s ease-in-out infinite;
        }

        @keyframes synapse-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
        }

        .synapse-beta-badge {
            background-color: #f1f5f9;
            color: #475569;
            font-size: 0.72rem;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 6px;
            margin-left: 8px;
            vertical-align: middle;
        }

        .synapse-brand-title {
            font-size: 1.45rem;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.5px;
            margin: 0;
            display: flex;
            align-items: center;
        }

        /* Pole wpisywania / Input Card */
        .synapse-input-card {
            width: 100%;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 16px;
            box-sizing: border-box;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
            margin-bottom: 24px;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .synapse-input-card:focus-within {
            border-color: #cbd5e1;
            box-shadow: 0 6px 16px rgba(15, 23, 42, 0.06);
        }

        .synapse-textarea {
            width: 100%;
            border: none;
            outline: none;
            resize: none;
            font-family: inherit;
            font-size: 0.95rem;
            color: #0f172a;
            background: transparent;
            min-height: 48px;
        }

        .synapse-textarea::placeholder {
            color: #94a3b8;
        }

        .synapse-input-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 12px;
            padding-top: 8px;
        }

        .synapse-attach-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            color: #334155;
            cursor: pointer;
            transition: background 0.2s ease;
        }

        .synapse-attach-btn:hover {
            background: #f1f5f9;
        }

        .synapse-send-btn {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: #94a3b8;
            color: #ffffff;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.2s ease, transform 0.15s ease;
        }

        .synapse-send-btn.active {
            background-color: #3da80a;
        }

        .synapse-send-btn.active:hover {
            transform: scale(1.05);
        }

        /* Kontener czatu / Odpowiedzi */
        .synapse-response-box {
            width: 100%;
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 16px;
            box-sizing: border-box;
            margin-bottom: 24px;
            display: none;
            text-align: left;
        }

        .synapse-response-title {
            font-size: 0.9rem;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px;
        }

        .synapse-response-text {
            font-size: 0.88rem;
            color: #334155;
            line-height: 1.55;
            margin: 0;
        }

        /* Lista Sugestii Pytan */
        .synapse-suggestions-list {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .synapse-suggestion-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 14px 12px;
            border: none;
            background: transparent;
            border-bottom: 1px solid #f1f5f9;
            text-align: left;
            cursor: pointer;
            font-family: inherit;
            font-size: 0.9rem;
            font-weight: 600;
            color: #1e293b;
            transition: background-color 0.15s ease, color 0.15s ease;
            border-radius: 10px;
        }

        .synapse-suggestion-item:hover {
            background-color: #f8fafc;
            color: #3da80a;
        }

        .synapse-suggestion-icon {
            width: 20px;
            height: 20px;
            color: #64748b;
            flex-shrink: 0;
            margin-top: 1px;
        }

        @media (max-width: 480px) {
            .synapse-drawer {
                width: 100vw;
                right: -100vw;
            }
            .synapse-drawer.active {
                transform: translateX(-100vw);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Generuje kod HTML panelu i dodaje go na koniec <body>
 */
function buildSynapseHelpDOM() {
    const backdrop = document.createElement("div");
    backdrop.className = "synapse-backdrop";
    backdrop.id = "synapse-backdrop";

    const drawer = document.createElement("aside");
    drawer.className = "synapse-drawer";
    drawer.id = "synapse-drawer";
    drawer.setAttribute("aria-label", "Synapse AI Help Assistant");

    drawer.innerHTML = `
        <div class="synapse-drawer-header">
            <button class="synapse-icon-btn" id="synapse-reset-btn" title="Zresetuj konwersację">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
            </button>
            <div class="synapse-header-actions">
                <button class="synapse-icon-btn" id="synapse-close-btn" title="Zamknij">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        </div>

        <div class="synapse-drawer-body">
            <div class="synapse-hero-brand">
                <div class="synapse-logo-wrapper">
                    <img src="assets/brainlysynapse.png" alt="Synapse AI" class="synapse-logo-img">
                </div>
                <h2 class="synapse-brand-title">
                    Asystent Synapse AI <span class="synapse-beta-badge">Beta</span>
                </h2>
            </div>

            <div class="synapse-input-card">
                <textarea class="synapse-textarea" id="synapse-input" placeholder="Zadaj pytanie..."></textarea>
                <div class="synapse-input-footer">
                    <button class="synapse-attach-btn" type="button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                        Dodaj plik
                    </button>
                    <button class="synapse-send-btn" id="synapse-send-btn" type="button" aria-label="Wyślij">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                    </button>
                </div>
            </div>

            <div class="synapse-response-box" id="synapse-response-box">
                <div class="synapse-response-title" id="synapse-response-title">Odpowiedź</div>
                <p class="synapse-response-text" id="synapse-response-text"></p>
            </div>

            <div class="synapse-suggestions-list" id="synapse-suggestions-list">
                <!-- Sugestie będą wstrzykiwane dynamicznie -->
            </div>
        </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    // Rejestracja zdarzeń zamknięcia i wpisywania
    backdrop.addEventListener("click", closeSynapseHelp);
    document.getElementById("synapse-close-btn").addEventListener("click", closeSynapseHelp);

    const input = document.getElementById("synapse-input");
    const sendBtn = document.getElementById("synapse-send-btn");

    input.addEventListener("input", () => {
        if (input.value.trim().length > 0) {
            sendBtn.classList.add("active");
        } else {
            sendBtn.classList.remove("active");
        }
    });

    sendBtn.addEventListener("click", () => {
        if (input.value.trim().length > 0) {
            displaySynapseAnswer("Odpowiedź na Twoje pytanie", `Przeanalizowałem zapytanie: "${input.value.trim()}". Baza danych Synapse wskazuje, że rozwiązanie możesz znaleźć w dokumentacji technicznej lub kontaktując się z naszym zespołem wsparcia.`);
            input.value = "";
            sendBtn.classList.remove("active");
        }
    });

    document.getElementById("synapse-reset-btn").addEventListener("click", () => {
        document.getElementById("synapse-response-box").style.display = "none";
        input.value = "";
        sendBtn.classList.remove("active");
    });
}

/**
 * Ładuje treść z pliku help/questions.json
 */
function loadSynapseHelpData() {
    fetch("help/questions.json")
        .then(res => res.json())
        .then(data => {
            synapseHelpData = data;
        })
        .catch(err => console.error("Error loading help questions JSON:", err));
}

/**
 * Podpięcie zdarzeń kliknięcia do elementów z atrybutem data-help-topic
 */
function initSynapseHelpTriggers() {
    document.addEventListener("click", (e) => {
        const trigger = e.target.closest("[data-help-topic]");
        if (trigger) {
            e.preventDefault();
            const topicKey = trigger.getAttribute("data-help-topic");
            openSynapseHelp(topicKey);
        }
    });
}

/**
 * Otwiera panel pomocy dla wskazanego klucza tematu
 */
function openSynapseHelp(topicKey) {
    const backdrop = document.getElementById("synapse-backdrop");
    const drawer = document.getElementById("synapse-drawer");

    if (backdrop && drawer) {
        backdrop.classList.add("active");
        drawer.classList.add("active");
        document.body.style.overflow = "hidden"; // Zablokowanie scrolla tła

        if (synapseHelpData && synapseHelpData[topicKey]) {
            renderTopicContent(synapseHelpData[topicKey]);
        } else {
            renderDefaultContent();
        }
    }
}

/**
 * Zamyka panel pomocy
 */
function closeSynapseHelp() {
    const backdrop = document.getElementById("synapse-backdrop");
    const drawer = document.getElementById("synapse-drawer");

    if (backdrop && drawer) {
        backdrop.classList.remove("active");
        drawer.classList.remove("active");
        document.body.style.overflow = "";
    }
}

/**
 * Renderuje zawartość w oknie dla wybranego tematu
 */
function renderTopicContent(topicData) {
    const responseBox = document.getElementById("synapse-response-box");
    const responseTitle = document.getElementById("synapse-response-title");
    const responseText = document.getElementById("synapse-response-text");
    const suggestionsList = document.getElementById("synapse-suggestions-list");

    // Wyświetlenie głównej odpowiedzi dla wybranego tematu
    responseTitle.textContent = topicData.question;
    responseText.textContent = topicData.answer;
    responseBox.style.display = "block";

    // Wyświetlenie powiązanych pytań/sugestii
    suggestionsList.innerHTML = topicData.suggestions.map(sugg => `
        <button class="synapse-suggestion-item" type="button" data-suggestion="${sugg}">
            <svg class="synapse-suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>${sugg}</span>
        </button>
    `).join("");

    bindSuggestionClickEvents();
}

/**
 * Domyślna zawartość w przypadku braku tematu
 */
function renderDefaultContent() {
    const responseBox = document.getElementById("synapse-response-box");
    const suggestionsList = document.getElementById("synapse-suggestions-list");

    responseBox.style.display = "none";
    suggestionsList.innerHTML = `
        <button class="synapse-suggestion-item" type="button" data-suggestion="Jak działa ekosystem BrainlyHQ?">
            <svg class="synapse-suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Jak działa ekosystem BrainlyHQ?</span>
        </button>
        <button class="synapse-suggestion-item" type="button" data-suggestion="Jakie boty i moduły są dostępne?">
            <svg class="synapse-suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Jakie boty i moduły są dostępne?</span>
        </button>
    `;

    bindSuggestionClickEvents();
}

function bindSuggestionClickEvents() {
    document.querySelectorAll(".synapse-suggestion-item").forEach(btn => {
        btn.addEventListener("click", () => {
            const questionText = btn.getAttribute("data-suggestion");
            displaySynapseAnswer(questionText, `Odpowiedź na pytanie "${questionText}": Wszystkie szczegółowe konfiguracje oraz przewodniki krok po kroku są dostępne w naszej oficjalnej dokumentacji i panelu zarządzania Synapse.`);
        });
    });
}

function displaySynapseAnswer(title, text) {
    const responseBox = document.getElementById("synapse-response-box");
    const responseTitle = document.getElementById("synapse-response-title");
    const responseText = document.getElementById("synapse-response-text");

    responseTitle.textContent = title;
    responseText.textContent = text;
    responseBox.style.display = "block";
}
