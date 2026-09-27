/**
 * BrainlyHQ - Synapse AI Quick Help Drawer Component
 * Secure Vercel Endpoint Integration
 */

let synapseHelpData = null;
let isChatActive = false;
let messageHistory = [];

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

        /* Boczny panel okna pomocy System UI */
        .synapse-drawer {
            position: fixed !important;
            top: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 450px !important;
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
            padding: 14px 20px;
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
            width: 24px;
            height: 24px;
            object-fit: contain;
        }

        .synapse-mini-title {
            font-size: 0.92rem;
            font-weight: 700;
            color: #0f172a;
            letter-spacing: -0.2px;
        }

        .synapse-header-actions {
            display: flex;
            align-items: center;
            gap: 8px;
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
            display: flex;
            flex-direction: column;
            overflow: hidden;
            position: relative;
        }

        /* Ekran początkowy (Initial View) */
        .synapse-initial-view {
            flex: 1;
            overflow-y: auto;
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
        }

        .synapse-hero-section {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            margin-top: 10px;
        }

        .synapse-logo-wrapper {
            position: relative;
            width: 80px;
            height: 80px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .synapse-logo-img {
            width: 72px;
            height: 72px;
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
            font-size: 0.7rem;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 6px;
            margin-left: 8px;
            vertical-align: middle;
        }

        .synapse-brand-title {
            font-size: 1.35rem;
            font-weight: 700;
            color: #0f172a;
            letter-spacing: -0.3px;
            margin: 0 0 6px 0;
        }

        .synapse-brand-subtitle {
            font-size: 0.88rem;
            color: #64748b;
            margin: 0;
            line-height: 1.4;
        }

        /* Sugestie początkowe */
        .synapse-suggestions-wrapper {
            width: 100%;
            margin: 20px 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .synapse-suggestions-header {
            font-size: 0.75rem;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
            text-align: left;
        }

        .synapse-suggestion-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            text-align: left;
            cursor: pointer;
            font-family: inherit;
            font-size: 0.88rem;
            font-weight: 500;
            color: #1e293b;
            transition: all 0.2s ease;
            box-shadow: 0 2px 6px rgba(15, 23, 42, 0.02);
        }

        .synapse-suggestion-btn:hover {
            border-color: #cbd5e1;
            background-color: #f8fafc;
            color: #3da80a;
            transform: translateY(-1px);
        }

        .synapse-suggestion-arrow {
            width: 16px;
            height: 16px;
            color: #94a3b8;
            flex-shrink: 0;
            transition: transform 0.2s ease, color 0.2s ease;
        }

        .synapse-suggestion-btn:hover .synapse-suggestion-arrow {
            color: #3da80a;
            transform: translateX(2px);
        }

        /* KONTENER CZATU AKTYWNEGO */
        .synapse-chat-view {
            display: none;
            flex: 1;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
        }

        .synapse-messages-container {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 18px;
            scroll-behavior: smooth;
        }

        /* STYLIZACJA WIADOMOŚCI */
        .synapse-msg {
            display: flex;
            gap: 12px;
            width: 100%;
            animation: synapse-msg-fade 0.25s ease forwards;
        }

        @keyframes synapse-msg-fade {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .synapse-msg-user {
            justify-content: flex-end;
        }

        .synapse-msg-user .synapse-msg-bubble {
            background-color: #0f172a;
            color: #ffffff;
            border-radius: 18px 18px 4px 18px;
            padding: 12px 16px;
            max-width: 85%;
            font-size: 0.92rem;
            line-height: 1.5;
            box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
        }

        .synapse-msg-ai {
            justify-content: flex-start;
            align-items: flex-start;
        }

        .synapse-msg-ai-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            object-fit: contain;
            flex-shrink: 0;
            margin-top: 2px;
        }

        .synapse-msg-ai .synapse-msg-content {
            flex: 1;
            color: #0f172a;
            font-size: 0.92rem;
            line-height: 1.6;
            padding-top: 4px;
        }

        .synapse-msg-ai .synapse-msg-content p {
            margin: 0 0 10px 0;
        }

        .synapse-msg-ai .synapse-msg-content p:last-child {
            margin-bottom: 0;
        }

        .synapse-msg-ai .synapse-msg-content ul, 
        .synapse-msg-ai .synapse-msg-content ol {
            margin: 6px 0 10px 18px;
            padding: 0;
        }

        /* TYPING INDICATOR */
        .synapse-typing-indicator {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 8px 0;
        }

        .synapse-typing-dot {
            width: 6px;
            height: 6px;
            background-color: #94a3b8;
            border-radius: 50%;
            animation: synapse-bounce 1.4s infinite ease-in-out both;
        }

        .synapse-typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .synapse-typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes synapse-bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }

        /* KARTA WEJŚCIOWA (POLE PISANIA NA DOLE) */
        .synapse-input-wrapper {
            width: 100%;
            padding: 16px 20px;
            background: #ffffff;
            box-sizing: border-box;
            border-top: 1px solid #f1f5f9;
            flex-shrink: 0;
        }

        .synapse-input-card {
            width: 100%;
            background: #ffffff;
            border: 1.5px solid #e2e8f0;
            border-radius: 20px;
            padding: 12px 16px;
            box-sizing: border-box;
            box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .synapse-input-card:focus-within {
            border-color: #0f172a;
            box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
        }

        .synapse-textarea {
            width: 100%;
            border: none;
            outline: none;
            resize: none;
            font-family: inherit;
            font-size: 0.92rem;
            color: #0f172a;
            background: transparent;
            min-height: 40px;
            max-height: 120px;
            line-height: 1.45;
        }

        .synapse-textarea::placeholder {
            color: #94a3b8;
        }

        .synapse-input-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 8px;
        }

        .synapse-attach-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            background: transparent;
            border: none;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
            color: #64748b;
            cursor: pointer;
            transition: background 0.2s ease, color 0.2s ease;
        }

        .synapse-attach-btn:hover {
            background: #f1f5f9;
            color: #0f172a;
        }

        .synapse-send-btn {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background-color: #cbd5e1;
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
            transform: scale(1.06);
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
 * Generuje czystą strukturę DOM dla asystenta
 */
function buildSynapseHelpDOM() {
    const backdrop = document.createElement("div");
    backdrop.className = "synapse-backdrop";
    backdrop.id = "synapse-backdrop";

    const drawer = document.createElement("aside");
    drawer.className = "synapse-drawer";
    drawer.id = "synapse-drawer";
    drawer.setAttribute("aria-label", "Synapse AI Assistant");

    drawer.innerHTML = `
        <div class="synapse-drawer-header">
            <div class="synapse-header-brand-mini">
                <img src="assets/brainlysynapse.png" alt="Synapse Logo" class="synapse-mini-logo">
                <span class="synapse-mini-title">Synapse AI</span>
            </div>
            <div class="synapse-header-actions">
                <button class="synapse-icon-btn" id="synapse-reset-btn" title="Reset conversation">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                </button>
                <button class="synapse-icon-btn" id="synapse-close-btn" title="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        </div>

        <div class="synapse-drawer-content">
            <!-- EKRAN INITIAL (Gdy brak konwersacji) -->
            <div class="synapse-initial-view" id="synapse-initial-view">
                <div class="synapse-hero-section">
                    <div class="synapse-logo-wrapper">
                        <img src="assets/brainlysynapse.png" alt="Synapse AI" class="synapse-logo-img">
                    </div>
                    <h2 class="synapse-brand-title">
                        Synapse AI <span class="synapse-beta-badge">Beta</span>
                    </h2>
                    <p class="synapse-brand-subtitle">Ask anything about BrainlyHQ ecosystem, bot integrations, or automation.</p>
                </div>

                <div class="synapse-suggestions-wrapper">
                    <div class="synapse-suggestions-header">Suggested Topics</div>
                    <div id="synapse-initial-suggestions" style="display: flex; flex-direction: column; gap: 8px;">
                        <!-- Sugestie z jsona -->
                    </div>
                </div>

                <!-- Pole wpisywania w widoku początkowym -->
                <div class="synapse-input-wrapper" style="padding: 0; border: none;">
                    <div class="synapse-input-card">
                        <textarea class="synapse-textarea" id="synapse-input-initial" placeholder="Ask a question..."></textarea>
                        <div class="synapse-input-footer">
                            <button class="synapse-attach-btn" type="button">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                Attach
                            </button>
                            <button class="synapse-send-btn" id="synapse-send-btn-initial" type="button" aria-label="Send">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- EKRAN CZATU (Pole na dole po 1. wiadomości) -->
            <div class="synapse-chat-view" id="synapse-chat-view">
                <div class="synapse-messages-container" id="synapse-messages-container">
                    <!-- Wiadomości wpadają tutaj -->
                </div>

                <div class="synapse-input-wrapper">
                    <div class="synapse-input-card">
                        <textarea class="synapse-textarea" id="synapse-input-chat" placeholder="Ask follow-up question..."></textarea>
                        <div class="synapse-input-footer">
                            <button class="synapse-attach-btn" type="button">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                Attach
                            </button>
                            <button class="synapse-send-btn" id="synapse-send-btn-chat" type="button" aria-label="Send">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.documentElement.appendChild(backdrop);
    document.documentElement.appendChild(drawer);

    backdrop.addEventListener("click", closeSynapseHelp);
    document.getElementById("synapse-close-btn").addEventListener("click", closeSynapseHelp);
    document.getElementById("synapse-reset-btn").addEventListener("click", resetConversation);

    bindInputEvents("synapse-input-initial", "synapse-send-btn-initial");
    bindInputEvents("synapse-input-chat", "synapse-send-btn-chat");
}

function bindInputEvents(inputId, btnId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);

    if (!input || !btn) return;

    input.addEventListener("input", () => {
        if (input.value.trim().length > 0) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (input.value.trim().length > 0) {
                handleUserSend(input.value.trim());
                input.value = "";
                btn.classList.remove("active");
            }
        }
    });

    btn.addEventListener("click", () => {
        if (input.value.trim().length > 0) {
            handleUserSend(input.value.trim());
            input.value = "";
            btn.classList.remove("active");
        }
    });
}

function handleUserSend(text) {
    switchToChatMode();
    appendUserMessage(text);
    fetchGroqResponse(text);
}

function switchToChatMode() {
    if (!isChatActive) {
        isChatActive = true;
        document.getElementById("synapse-initial-view").style.display = "none";
        const chatView = document.getElementById("synapse-chat-view");
        chatView.style.display = "flex";
    }
}

function appendUserMessage(text) {
    const container = document.getElementById("synapse-messages-container");
    const msgDiv = document.createElement("div");
    msgDiv.className = "synapse-msg synapse-msg-user";
    msgDiv.innerHTML = `<div class="synapse-msg-bubble">${escapeHtml(text)}</div>`;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;

    messageHistory.push({ role: "user", content: text });
}

function appendAiMessage(htmlContent) {
    const container = document.getElementById("synapse-messages-container");
    const msgDiv = document.createElement("div");
    msgDiv.className = "synapse-msg synapse-msg-ai";
    msgDiv.innerHTML = `
        <img src="assets/brainlysynapse.png" alt="Synapse AI" class="synapse-msg-ai-avatar">
        <div class="synapse-msg-content">${htmlContent}</div>
    `;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
    const container = document.getElementById("synapse-messages-container");
    const typingDiv = document.createElement("div");
    typingDiv.className = "synapse-msg synapse-msg-ai";
    typingDiv.id = "synapse-typing";
    typingDiv.innerHTML = `
        <img src="assets/brainlysynapse.png" alt="Synapse AI" class="synapse-msg-ai-avatar">
        <div class="synapse-msg-content">
            <div class="synapse-typing-indicator">
                <div class="synapse-typing-dot"></div>
                <div class="synapse-typing-dot"></div>
                <div class="synapse-typing-dot"></div>
            </div>
        </div>
    `;
    container.appendChild(typingDiv);
    container.scrollTop = container.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById("synapse-typing");
    if (typing) typing.remove();
}

/**
 * Zapytanie wysyłane do wewnętrznego punktu Serverless Vercela /api/chat
 */
async function fetchGroqResponse(userPrompt) {
    showTypingIndicator();

    try {
        const systemPrompt = `You are Synapse AI, an intelligent assistant embedded in the BrainlyHQ ecosystem. 
Provide concise, elegant, accurate, and professional answers in English. 
Use clear paragraphs or bullet points if necessary. Avoid referencing raw internal system code.`;

        const apiMessages = [
            { role: "system", content: systemPrompt },
            ...messageHistory
        ];

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: apiMessages
            })
        });

        removeTypingIndicator();

        if (!response.ok) {
            throw new Error(`Serverless Endpoint Error: ${response.status}`);
        }

        const data = await response.json();
        const aiAnswer = data.choices[0]?.message?.content || "I couldn't process your request at this moment.";
        
        appendAiMessage(formatTextToHtml(aiAnswer));
        messageHistory.push({ role: "assistant", content: aiAnswer });

    } catch (err) {
        console.error("Vercel Proxy Call Failed:", err);
        removeTypingIndicator();
        const fallbackText = getStaticFallbackAnswer(userPrompt);
        appendAiMessage(`<p>${fallbackText}</p>`);
        messageHistory.push({ role: "assistant", content: fallbackText });
    }
}

function getStaticFallbackAnswer(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    
    if (synapseHelpData) {
        for (const key in synapseHelpData) {
            const item = synapseHelpData[key];
            if (item.question && lowerPrompt.includes(key)) {
                return item.answer;
            }
        }
    }

    return `Thank you for your inquiry about "${prompt}". Our Synapse AI system has received your request. For in-depth configurations and technical support, please refer to our official developer portal or contact our team directly.`;
}

function loadSynapseHelpData() {
    fetch("help/questions.json")
        .then(res => res.json())
        .then(data => {
            synapseHelpData = data;
            renderInitialSuggestions(data);
        })
        .catch(err => {
            console.error("Error loading help questions JSON:", err);
            renderDefaultInitialSuggestions();
        });
}

function renderInitialSuggestions(data) {
    const container = document.getElementById("synapse-initial-suggestions");
    if (!container) return;

    let html = "";
    for (const key in data) {
        const item = data[key];
        html += `
            <button class="synapse-suggestion-btn" type="button" data-question="${escapeHtml(item.question)}" data-answer="${escapeHtml(item.answer)}">
                <span>${escapeHtml(item.question)}</span>
                <svg class="synapse-suggestion-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
        `;
    }
    container.innerHTML = html;
    bindSuggestionClicks();
}

function renderDefaultInitialSuggestions() {
    const container = document.getElementById("synapse-initial-suggestions");
    if (!container) return;

    container.innerHTML = `
        <button class="synapse-suggestion-btn" type="button" data-question="How does the BrainlyHQ ecosystem work?">
            <span>How does the BrainlyHQ ecosystem work?</span>
            <svg class="synapse-suggestion-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
        <button class="synapse-suggestion-btn" type="button" data-question="What are Brainly Core, Speech, and custom integrations?">
            <span>What are Brainly Core, Speech, and custom integrations?</span>
            <svg class="synapse-suggestion-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
    `;
    bindSuggestionClicks();
}

function bindSuggestionClicks() {
    document.querySelectorAll(".synapse-suggestion-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const question = btn.getAttribute("data-question");
            const predefinedAnswer = btn.getAttribute("data-answer");

            switchToChatMode();
            appendUserMessage(question);

            if (predefinedAnswer) {
                showTypingIndicator();
                setTimeout(() => {
                    removeTypingIndicator();
                    appendAiMessage(`<p>${predefinedAnswer}</p>`);
                    messageHistory.push({ role: "assistant", content: predefinedAnswer });
                }, 400);
            } else {
                fetchGroqResponse(question);
            }
        });
    });
}

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

function openSynapseHelp(topicKey) {
    const backdrop = document.getElementById("synapse-backdrop");
    const drawer = document.getElementById("synapse-drawer");

    if (backdrop && drawer) {
        backdrop.classList.add("active");
        drawer.classList.add("active");
        document.body.classList.add("synapse-open");

        if (topicKey && synapseHelpData && synapseHelpData[topicKey]) {
            const item = synapseHelpData[topicKey];
            switchToChatMode();
            appendUserMessage(item.question);
            appendAiMessage(`<p>${item.answer}</p>`);
            messageHistory.push({ role: "assistant", content: item.answer });
        }
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

function resetConversation() {
    isChatActive = false;
    messageHistory = [];

    document.getElementById("synapse-messages-container").innerHTML = "";
    document.getElementById("synapse-chat-view").style.display = "none";
    document.getElementById("synapse-initial-view").style.display = "flex";

    const inputInit = document.getElementById("synapse-input-initial");
    const inputChat = document.getElementById("synapse-input-chat");
    if (inputInit) inputInit.value = "";
    if (inputChat) inputChat.value = "";
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function formatTextToHtml(text) {
    const paragraphs = text.split("\n\n");
    return paragraphs
        .map(p => {
            const trimmed = p.trim();
            if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const items = trimmed.split("\n").map(li => `<li>${escapeHtml(li.replace(/^[-*]\s+/, ""))}</li>`).join("");
                return `<ul>${items}</ul>`;
            }
            return `<p>${escapeHtml(trimmed)}</p>`;
        })
        .join("");
}
