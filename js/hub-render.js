// js/hub-render.js - Silnik renderowania, szablonów i ekstrakcji danych z bazy

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

// Precyzyjne wykrywanie kolumny F (FA / Link Group / Tytuł linku / Kategoria)
function extractLinkGroupComment(item) {
    if (!item || typeof item !== 'object') return '';
    
    // Lista kluczy potencjalnie zwracanych z backendu dla kolumny F
    const directKeys = [
        'fa', 'FA', 'Fa', 
        'linkGroup', 'linkgroup', 'LINK GROUP', 'link_group', 'Link Group', 'LinkGroup',
        'linkTitle', 'link_title', 'Link Title', 'title', 'Title',
        'category', 'Category', 'kategoria', 'Kategoria', 'tytul', 'Tytul', 'tytuł', 'Tytuł',
        'columnF', 'column_f', 'Column F', 'f', 'F'
    ];
    
    for (const k of directKeys) {
        if (item[k] !== undefined && item[k] !== null && String(item[k]).trim() !== '') {
            return String(item[k]).trim();
        }
    }
    
    // Szukanie dowolnego klucza po wzorcu w nagłówkach
    const allKeys = Object.keys(item);
    const matchedKey = allKeys.find(k => {
        const cleaned = k.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleaned === 'fa' || cleaned === 'linkgroup' || cleaned === 'linktitle' || 
               cleaned === 'category' || cleaned === 'kategoria' || cleaned === 'tytul';
    });

    if (matchedKey && item[matchedKey] !== undefined && item[matchedKey] !== null) {
        return String(item[matchedKey]).trim();
    }

    return '';
}

function groupDatabaseIntoPackages(rawData) {
    const packagesMap = new Map();

    rawData.forEach(item => {
        const rawTopic = (item.topic || 'Untitled Package').trim();
        const rawMarket = (item.market || 'GLOBAL').trim().toUpperCase();
        const packageKey = `${rawTopic.toLowerCase()}____${rawMarket}`;

        if (!packagesMap.has(packageKey)) {
            packagesMap.set(packageKey, {
                displayTopic: rawTopic,
                marketKey: rawMarket,
                maxRowId: item.id || 0,
                levels: new Set(),
                subjects: new Set(),
                linkGroups: new Set(),
                structuredLinks: []
            });
        }

        const pkg = packagesMap.get(packageKey);
        if (item.id && Number(item.id) > Number(pkg.maxRowId)) {
            pkg.maxRowId = item.id;
        }

        if (item.level) pkg.levels.add(item.level.trim().toUpperCase());
        if (item.subject) pkg.subjects.add(item.subject.trim());

        const extractedLinks = parseLinks(item.link);
        const commentFromColumnF = extractLinkGroupComment(item);

        if (commentFromColumnF) {
            pkg.linkGroups.add(commentFromColumnF);
        }

        extractedLinks.forEach((l, idx) => {
            let taskTitle = "";

            if (commentFromColumnF !== "") {
                taskTitle = extractedLinks.length > 1 ? `${commentFromColumnF} (#${idx + 1})` : commentFromColumnF;
            } else {
                taskTitle = extractedLinks.length > 1 ? `Task Link #${idx + 1}` : "Open Task";
            }

            pkg.structuredLinks.push({
                url: l,
                title: taskTitle,
                category: commentFromColumnF
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
