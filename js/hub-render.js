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
        const linkGroupTitle = (item.linkGroup || '').trim();

        extractedLinks.forEach((l, idx) => {
            pkg.structuredLinks.push({
                url: l,
                title: linkGroupTitle !== "" ? linkGroupTitle : (extractedLinks.length > 1 ? `Task Link #${idx + 1}` : "Open Task")
            });
        });
    });

    const allPackages = Array.from(packagesMap.values());
    const sortedByLatest = [...allPackages].sort((a, b) => b.maxRowId - a.maxRowId);
    const top4LatestIds = new Set(sortedByLatest.slice(0, 4).map(p => p.maxRowId));

    allPackages.forEach(pkg => {
        pkg.isHot = top4LatestIds.has(pkg.maxRowId);
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
        const showFlame = pkg.isHot && !isSearchOrFilterActive;
        const flameHtml = showFlame ? `<span class="badge badge-hot" style="background-color: rgba(255, 110, 0, 0.2); color: #ff6e00; border: 1px solid #ff6e00; font-weight: 900;">🔥 POPULAR</span>` : '';

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

        let linksHtml = "";
        if (pkg.structuredLinks.length === 0) {
            linksHtml = `<span style="font-size:0.8rem; color:var(--text-secondary);">No active link available</span>`;
        } else {
            linksHtml = `<div class="package-links-container" style="display:flex; flex-direction:column; gap:8px;">`;
            pkg.structuredLinks.forEach(linkObj => {
                linksHtml += `
                    <a href="${escapeHtml(linkObj.url)}" target="_blank" class="btn-open-package">
                        <span>${escapeHtml(linkObj.title)}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                `;
            });
            linksHtml += `</div>`;
        }

        card.innerHTML = `
            <div>
                <div class="package-badges">
                    ${flameHtml}
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
