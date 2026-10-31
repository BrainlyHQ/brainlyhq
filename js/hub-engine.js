// js/hub-engine.js - Silnik obsługi bazy i zaawansowanej logiki wyszukiwania

const DATABASE_API_URL = "https://script.google.com/macros/s/AKfycbz8b4O-3LXd4ZVbQb3YDoueoaK-wzJvOBUlDG6BqT1IOloyFrhMLClg-5tqDcWWyHPu/exec";

const COMPLETE_SUBJECTS_LIST = [
    "Arts", "Biology", "Business", "Chemistry", "Chinese", 
    "Computers and Technology", "Engineering", "English", "Exam", "French", 
    "Geography", "German", "Health", "Hindi", "History", 
    "India Languages", "Italian", "Law", "Mathematics", "Music", 
    "Nature", "Other Languages", "Physics", "Polish", "Psychology", 
    "Religion", "Russian", "Safety Education", "Social Studies", "Spanish"
];

let fullDatabase = [];

function fetchDatabaseJSONP() {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonp_db_' + Math.round(100000 * Math.random());
        const script = document.createElement('script');

        window[callbackName] = function(data) {
            delete window[callbackName];
            if (script.parentNode) script.parentNode.removeChild(script);
            resolve(data);
        };

        script.onerror = function() {
            delete window[callbackName];
            if (script.parentNode) script.parentNode.removeChild(script);
            reject(new Error('JSONP Database fetch failed'));
        };

        script.src = `${DATABASE_API_URL}?callback=${callbackName}&_t=${Date.now()}`;
        document.body.appendChild(script);
    });
}

function initCachedData() {
    try {
        const cachedRaw = localStorage.getItem("brainly_db_cache");
        if (cachedRaw) {
            const parsed = JSON.parse(cachedRaw);
            if (Array.isArray(parsed) && parsed.length > 0) {
                fullDatabase = parsed;
                updateEngineMetrics(fullDatabase);
                renderFeaturedThree();
            }
        }
    } catch(e) {
        console.warn("Cache read failed", e);
    }
}

async function loadDatabase() {
    try {
        const response = await fetchDatabaseJSONP();
        if (response && response.success && Array.isArray(response.data)) {
            fullDatabase = response.data;
            try { localStorage.setItem("brainly_db_cache", JSON.stringify(fullDatabase)); } catch(e){}
            
            updateEngineMetrics(fullDatabase);
            renderFeaturedThree();

            const searchInput = document.getElementById("ai-search-input");
            const filterMarket = document.getElementById("filter-market");
            const filterLevel = document.getElementById("filter-level");
            const filterSubject = document.getElementById("filter-subject");
            
            if (searchInput && (searchInput.value.trim().length > 0 || filterMarket.value || filterLevel.value || filterSubject.value)) {
                filterData();
            }
        }
    } catch (err) {
        console.error("Database error:", err);
    }
}

function populateAllStaticFilterDropdowns() {
    const filterMarket = document.getElementById("filter-market");
    const filterLevel = document.getElementById("filter-level");
    const filterSubject = document.getElementById("filter-subject");

    if (!filterMarket || !filterLevel || !filterSubject) return;

    filterMarket.innerHTML = '<option value="">All Markets</option>';
    filterLevel.innerHTML = '<option value="">All Levels</option>';
    filterSubject.innerHTML = '<option value="">All Subjects</option>';

    if (typeof MARKET_MAP !== 'undefined') {
        Object.keys(MARKET_MAP).sort().forEach(mKey => {
            const opt = document.createElement("option");
            opt.value = mKey;
            opt.textContent = MARKET_MAP[mKey];
            filterMarket.appendChild(opt);
        });
    }

    if (typeof LEVEL_MAP !== 'undefined') {
        Object.keys(LEVEL_MAP).forEach(lKey => {
            const opt = document.createElement("option");
            opt.value = lKey;
            opt.textContent = LEVEL_MAP[lKey];
            filterLevel.appendChild(opt);
        });
    }

    COMPLETE_SUBJECTS_LIST.sort((a, b) => a.localeCompare(b)).forEach(s => {
        const opt = document.createElement("option");
        opt.value = s;
        opt.textContent = s;
        filterSubject.appendChild(opt);
    });
}

function updateEngineMetrics(data) {
    const statPackages = document.getElementById("stat-packages-count");
    const statLinks = document.getElementById("stat-links-count");
    const statMarkets = document.getElementById("stat-markets-count");
    const statSubjects = document.getElementById("stat-subjects-count");
    const statLevels = document.getElementById("stat-levels-count");

    const grouped = typeof groupDatabaseIntoPackages === 'function' ? groupDatabaseIntoPackages(data) : [];
    const totalLinks = data.filter(i => i.link && String(i.link).trim().length > 0).length;

    if (statPackages) statPackages.textContent = grouped.length;
    if (statLinks) statLinks.textContent = totalLinks;
    if (statMarkets) statMarkets.textContent = typeof MARKET_MAP !== 'undefined' ? Object.keys(MARKET_MAP).length : 11;
    if (statSubjects) statSubjects.textContent = COMPLETE_SUBJECTS_LIST.length;
    if (statLevels) statLevels.textContent = typeof LEVEL_MAP !== 'undefined' ? Object.keys(LEVEL_MAP).length : 5;
}

function renderFeaturedThree() {
    const featuredContainer = document.getElementById("featured-packages-grid");
    if (!featuredContainer || fullDatabase.length === 0) return;

    const grouped = typeof groupDatabaseIntoPackages === 'function' ? groupDatabaseIntoPackages(fullDatabase) : [];
    const latestSix = grouped.slice(0, 6);

    if (typeof renderPackagesGrid === 'function') {
        renderPackagesGrid(featuredContainer, null, latestSix, false, true);
    }
}

function handleSubjectChange() {
    const filterSubject = document.getElementById("filter-subject");
    const filterLevel = document.getElementById("filter-level");
    const isExam = filterSubject.value.trim().toLowerCase() === "exam";

    if (isExam) {
        filterLevel.value = "EXAM";
    } else if (filterLevel.value === "EXAM") {
        filterLevel.value = "";
    }

    filterData();
}

function handleLevelChange() {
    const filterSubject = document.getElementById("filter-subject");
    const filterLevel = document.getElementById("filter-level");
    const isExamLevel = filterLevel.value.trim().toUpperCase() === "EXAM";

    if (isExamLevel) {
        filterSubject.value = "Exam";
    } else if (filterSubject.value.toLowerCase() === "exam") {
        filterSubject.value = "";
    }

    filterData();
}

function handleInputQuery() {
    const searchInput = document.getElementById("ai-search-input");
    const filterSubject = document.getElementById("filter-subject");
    const query = searchInput.value.trim().toLowerCase();

    if (query.includes("trygonometria") || query.includes("trigonometr") || query.includes("algebra") || query.includes("geometry")) {
        if (filterSubject.value !== "Exam") {
            filterSubject.value = "Mathematics";
        }
    }

    filterData();
}

// Zaktualizowana funkcja wyszukiwarki z obsługą zapytań wielowyrazowych (tokenized search)
function filterData() {
    const searchInput = document.getElementById("ai-search-input");
    const clearSearchBtn = document.getElementById("clear-search-btn");
    const filterMarket = document.getElementById("filter-market");
    const filterLevel = document.getElementById("filter-level");
    const filterSubject = document.getElementById("filter-subject");

    const initialPlaceholder = document.getElementById("initial-placeholder");
    const resultsSection = document.getElementById("results-section");
    const packagesContainer = document.getElementById("packages-container");
    const resultsCountText = document.getElementById("results-count-text");

    const rawQuery = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const selectedMarket = filterMarket ? filterMarket.value.trim().toUpperCase() : "";
    const selectedLevel = filterLevel ? filterLevel.value.trim().toUpperCase() : "";
    const selectedSubject = filterSubject ? filterSubject.value.trim() : "";

    const isFilterActive = rawQuery.length > 0 || selectedMarket !== "" || selectedLevel !== "" || selectedSubject !== "";

    if (clearSearchBtn) {
        clearSearchBtn.style.display = rawQuery.length > 0 ? "flex" : "none";
    }

    if (!isFilterActive) {
        if (initialPlaceholder) initialPlaceholder.style.display = "block";
        if (resultsSection) resultsSection.style.display = "none";
        return;
    }

    if (initialPlaceholder) initialPlaceholder.style.display = "none";
    if (resultsSection) resultsSection.style.display = "block";

    // Rozbicie zapytania tekstowego na słowa (tokeny)
    const queryTokens = rawQuery.split(/\s+/).filter(Boolean);

    const filteredRawRows = fullDatabase.filter(item => {
        const topic = String(item.topic || "").toLowerCase();
        const marketKey = String(item.market || "").toUpperCase();
        const marketName = (typeof MARKET_MAP !== 'undefined' && MARKET_MAP[marketKey]) ? MARKET_MAP[marketKey].toLowerCase() : "";
        const levelKey = String(item.level || "").toLowerCase();
        const levelName = (typeof LEVEL_MAP !== 'undefined' && LEVEL_MAP[item.level]) ? LEVEL_MAP[item.level].toLowerCase() : "";
        const subject = String(item.subject || "").toLowerCase();
        
        const linkGroup = (typeof extractLinkGroupComment === 'function' 
            ? extractLinkGroupComment(item) 
            : String(item.fa || item.linkGroup || item.link_group || item.title || "")).toLowerCase();

        // Połączenie danych danej pozycji w jeden przeszukiwalny ciąg znaków
        const combinedText = `${topic} ${subject} ${linkGroup} ${levelKey} ${levelName} ${marketKey.toLowerCase()} ${marketName}`;

        // Wyszukiwanie elastyczne: Każde ze wpisanych słów musi się znajdować w opisie pozycji
        const matchesQuery = queryTokens.length === 0 || queryTokens.every(token => combinedText.includes(token));

        const matchesMarket = !selectedMarket || marketKey === selectedMarket;
        const matchesSubject = !selectedSubject || subject === selectedSubject.toLowerCase();
        const matchesLevel = !selectedLevel || levelKey.toUpperCase() === selectedLevel;

        return matchesQuery && matchesMarket && matchesLevel && matchesSubject;
    });

    const groupedPackages = typeof groupDatabaseIntoPackages === 'function' ? groupDatabaseIntoPackages(filteredRawRows) : [];
    if (typeof renderPackagesGrid === 'function') {
        renderPackagesGrid(packagesContainer, resultsCountText, groupedPackages, isFilterActive, false);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    populateAllStaticFilterDropdowns();

    const searchInput = document.getElementById("ai-search-input");
    const clearSearchBtn = document.getElementById("clear-search-btn");
    const filterMarket = document.getElementById("filter-market");
    const filterLevel = document.getElementById("filter-level");
    const filterSubject = document.getElementById("filter-subject");
    const logoutBtn = document.getElementById("hub-logout-btn");
    const usernameDisplay = document.getElementById("hub-username-display");

    const sessionUser = sessionStorage.getItem("brainly_hub_user");
    if (usernameDisplay) usernameDisplay.textContent = sessionUser || "User";

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            sessionStorage.removeItem("brainly_hub_user");
            window.location.replace("hub.html");
        });
    }

    if (searchInput) searchInput.addEventListener("input", handleInputQuery);
    if (filterMarket) filterMarket.addEventListener("change", filterData);
    if (filterLevel) filterLevel.addEventListener("change", handleLevelChange);
    if (filterSubject) filterSubject.addEventListener("change", handleSubjectChange);

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
            searchInput.value = "";
            filterSubject.value = "";
            filterLevel.value = "";
            filterMarket.value = "";
            filterData();
            searchInput.focus();
        });
    }

    initCachedData();
    loadDatabase();
});
