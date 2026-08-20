// js/hub-render.js - Silnik renderowania i szablonów paczek z bazy

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
    "SUPER HARD": "Super Hard (professor)",
    "EXAM": "Exam Resource"
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

function groupDatabaseIntoPackages(rawData) {
    const packagesMap = new Map();

    rawData.forEach(item => {
        const rawTopic = (item.topic || 'Untitled Package').trim();
        const rawMarket = (item.market || 'GLOBAL').trim().toUpperCase();
        const packageKey = `${rawTopic.toLowerCase()}___${rawMarket}`;

        if (!packagesMap.has(packageKey)) {
            packagesMap.set(packageKey, {
                displayTopic: rawTopic,
                marketKey: rawMarket,
                maxRowId: item.id || 0,
                levels: new Set(),
                subjects: new Set(),
                structuredLinks: []
            });
        }

        const pkg = packagesMap.get(packageKey);
        if (item.id && item.id > pkg.maxRowId) {
            pkg.maxRowId = item.id;
        }

        if (item.level) pkg.levels.add(item.level.trim().toUpperCase());
        if (item.subject) pkg.subjects.add(item.subject.trim());

        const extractedLinks = parseLinks(item.link);
        
        // Odczytujemy pole linkGroup przesłane z kod.gs (uwzględniamy ewentualne różnice w wielkości liter)
        const rawGroupVal = String(item.linkGroup || item.linkgroup || '').trim();

        extractedLinks.forEach((l, idx) => {
            let taskTitle = "";

            if (rawGroupVal !== "") {
                // Jeśli w kolumnie F podano komentarz/tytuł, bierzemy go dokładnie tak jak wpisano
                taskTitle = extractedLinks.length > 1 ? `${rawGroupVal} (#${idx + 1})` : rawGroupVal;
            } else {
                // Jeśli kolumna F jest pusta, dajesz awaryjną nazwę
                taskTitle = extractedLinks.length > 1 ? `Task Link #${idx + 1}` : "Open Task";
            }

            pkg.structuredLinks.push({
                url: l,
                title: taskTitle
            });
        });
    });

    const allPackages = Array.from(packagesMap.values());
    const sortedByLatest = [...allPackages].sort((a, b) => Number(b.maxRowId) - Number(a.maxRowId));
    
    const top3LatestIds = new Set(sortedByLatest.slice(0, 3).map(p => p.maxRowId));

    allPackages.forEach(pkg => {
        pkg.isHot = top3LatestIds.has(pkg.maxRowId);
    });

    return sortedByLatest;
}

function renderPackagesGrid(containerElement, countDisplayElement, groupedPackages, isSearchOrFilterActive = false, isFeaturedGrid = false) {
    if (!containerElement) return;
    containerElement.innerHTML = "";

    if (countDisplayElement) {
        countDisplayElement.textContent = `${groupedPackages.length} package${groupedPackages.length === 1 ? '' : 's'} found`;
    }

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
        card.className = isFeaturedGrid ? "package-card package-card-featured" : "package-card";

        const isExam = Array.from(pkg.subjects).some(s => s.toLowerCase() === 'exam') || pkg.levels.has('EXAM');

        const marketLabel = MARKET_MAP[pkg.marketKey] || pkg.marketKey;
        const marketsHtml = `<span class="badge badge-market">${escapeHtml(marketLabel)}</span>`;

        let levelsHtml = "";
        if (isExam) {
            levelsHtml = `<span class="badge badge-exam">EXAM RESOURCE</span>`;
        } else {
            pkg.levels.forEach(lKey => {
                const lLabel = LEVEL_MAP[lKey] || lKey;
                levelsHtml += `<span class="badge badge-level">${escapeHtml(lLabel)}</span>`;
            });
        }

        let subjectsHtml = "";
        pkg.subjects.forEach(subj => {
            subjectsHtml += `<span class="badge badge-subject">${escapeHtml(subj)}</span>`;
        });

        const taskCount = pkg.structuredLinks.length;
        const taskCountText = `${taskCount} ${taskCount === 1 ? 'Task' : 'Tasks'}`;

        const packageUrl = `hub-package.html?topic=${encodeURIComponent(pkg.displayTopic)}&market=${encodeURIComponent(pkg.marketKey)}`;

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
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 0.82rem; color: var(--text-secondary); font-weight: 700;">
                    <span>Contains:</span>
                    <span style="color: var(--color-brainly-green); font-weight: 800;">${taskCountText}</span>
                </div>
                <a href="${packageUrl}" class="btn-open-package">
                    <span>Open Package</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </a>
            </div>
        `;

        containerElement.appendChild(card);
    });
}
