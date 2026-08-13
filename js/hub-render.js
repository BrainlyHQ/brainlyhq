// js/hub-render.js - Silnik grupowania i renderowania paczek zadań BrainlyHub

const MARKET_MAP = {
    "US": "Brainly.com",
    "LAT": "Brainly.lat",
    "FR": "Nosdevoirs.fr",
    "IN": "Brainly.in",
    "ID": "Brainly.co.id",
    "RO": "Brainly.ro",
    "BR": "Brainly.com.br",
    "RU": "Znanija.com",
    "PH": "Brainly.ph",
    "TU": "Eodev.com",
    "PL": "Brainly.pl"
};

const LEVEL_MAP = {
    "EASY": "Easy (beginner)",
    "MID": "Mid (student)",
    "HARD": "Hard (teacher)",
    "SUPER HARD": "Super Hard (professor)"
};

function parseLinks(rawLinkString) {
    if (!rawLinkString) return [];
    return String(rawLinkString)
        .split(/[\n,;]+/)
        .map(l => l.trim())
        .filter(l => l.length > 0 && (l.startsWith("http://") || l.startsWith("https://")));
}

function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
}

/**
 * Grupuje surowe wiersze z Arkusza po unikalnej kombinacji TOPIC + MARKET.
 * Przykład: "Trigonometry" w "PL" i "Trigonometry" w "ID" stanowią DWIE osobne paczki.
 */
function groupDatabaseIntoPackages(rawData) {
    const packagesMap = new Map();

    rawData.forEach(item => {
        const rawTopic = (item.topic || 'Untitled Package').trim();
        const rawMarket = (item.market || 'GLOBAL').trim().toUpperCase();
        
        // KLUCZ PACZKI = TOPIC + MARKET
        const packageKey = `${rawTopic.toLowerCase()}___${rawMarket}`;

        if (!packagesMap.has(packageKey)) {
            packagesMap.set(packageKey, {
                displayTopic: rawTopic,
                marketKey: rawMarket,
                levels: new Set(),
                subjects: new Set(),
                links: new Set()
            });
        }

        const pkg = packagesMap.get(packageKey);

        if (item.level) pkg.levels.add(item.level.trim().toUpperCase());
        if (item.subject) pkg.subjects.add(item.subject.trim());

        const extractedLinks = parseLinks(item.link);
        extractedLinks.forEach(l => pkg.links.add(l));
    });

    return Array.from(packagesMap.values());
}

/**
 * Generuje kafelki HTML paczek w kontenerze
 */
function renderPackagesGrid(containerElement, countDisplayElement, groupedPackages) {
    containerElement.innerHTML = "";
    countDisplayElement.textContent = `${groupedPackages.length} package${groupedPackages.length === 1 ? '' : 's'} found`;

    if (groupedPackages.length === 0) {
        containerElement.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; color: var(--text-secondary);">
                <h4>No packages match your search criteria</h4>
                <p style="font-size: 0.85rem;">Try changing your keywords or resetting filters.</p>
            </div>
        `;
        return;
    }

    groupedPackages.forEach(pkg => {
        const card = document.createElement("div");
        card.className = "package-card";

        const isExam = Array.from(pkg.subjects).some(s => s.toLowerCase() === 'exam');

        // Badge dla Rynku (Adresy domenowe Brainly)
        const marketLabel = MARKET_MAP[pkg.marketKey] || pkg.marketKey;
        const marketsHtml = `<span class="badge badge-market">${escapeHtml(marketLabel)}</span>`;

        // Badge dla Poziomów Trudności (Po angielsku z dużej litery)
        let levelsHtml = "";
        if (isExam) {
            levelsHtml = `<span class="badge badge-exam">EXAM RESOURCE</span>`;
        } else {
            pkg.levels.forEach(lKey => {
                const lLabel = LEVEL_MAP[lKey] || lKey;
                levelsHtml += `<span class="badge badge-level">${escapeHtml(lLabel)}</span>`;
            });
        }

        // Badge dla Przedmiotów
        let subjectsHtml = "";
        pkg.subjects.forEach(subj => {
            subjectsHtml += `<span class="badge badge-subject">${escapeHtml(subj)}</span>`;
        });

        // Linki wewnątrz paczki
        const linkList = Array.from(pkg.links);
        let linksHtml = "";

        if (linkList.length === 0) {
            linksHtml = `<span style="font-size:0.8rem; color:var(--text-secondary);">No active link available</span>`;
        } else if (linkList.length === 1) {
            linksHtml = `
                <a href="${escapeHtml(linkList[0])}" target="_blank" class="btn-open-package">
                    <span>Open Task</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            `;
        } else {
            linksHtml = `<div class="package-links-container">`;
            linkList.forEach((linkUrl, idx) => {
                linksHtml += `
                    <a href="${escapeHtml(linkUrl)}" target="_blank" class="btn-open-package">
                        <span>Task Link #${idx + 1}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                `;
            });
            linksHtml += `</div>`;
        }

        card.innerHTML = `
            <div>
                <div class="package-badges">
                    ${marketsHtml}
                    ${levelsHtml}
                    ${subjectsHtml}
                </div>
                <div class="package-topic">${escapeHtml(pkg.displayTopic)}</div>
            </div>
            <div>
                ${linksHtml}
            </div>
        `;

        containerElement.appendChild(card);
    });
}
